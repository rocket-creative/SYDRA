// Stream a CMS Federal IDR Public Use File (CSV), filter to our code set + valid
// states, load line-items into idr_disputes_raw, then aggregate to idr_outcomes
// (provider win rate + median prevailing offer as % of QPA, per code x state).
//
// Get the PUF: https://www.cms.gov/nosurprises/policies-and-resources/reports
// Set IDR_PUF_PATH and IDR_PUF_PERIOD in .env. Verify column headers in
// config/pipeline.config.mjs against the file's data dictionary (they change).
import fs from 'node:fs';
import { parse } from 'csv-parse';
import { query, end } from '../lib/db.mjs';
import {
  IDR_PUF_COLUMNS as COL, normalizeCodeSystem, normalizePrevailingParty,
  normalizeState, BATCH_SIZE,
} from '../config/pipeline.config.mjs';

const pufPath = process.env.IDR_PUF_PATH;
const period = process.env.IDR_PUF_PERIOD || 'unknown';
if (!pufPath || !fs.existsSync(pufPath)) {
  console.error(`IDR_PUF_PATH not found: ${pufPath}. Download a PUF and set it in .env.`);
  process.exit(1);
}

const num = (v) => {
  if (v == null || v === '') return null;
  const n = Number(String(v).replace(/[$,]/g, ''));
  return Number.isFinite(n) ? n : null;
};

async function loadCodeSet() {
  const { rows } = await query('SELECT code, code_system FROM idr_codes');
  const set = new Set(rows.map((r) => `${r.code}|${r.code_system}`));
  if (set.size === 0) console.warn('idr_codes is empty — seed the app taxonomy first (npm run seed in the app).');
  return set;
}

let buffer = [];
async function flush() {
  if (buffer.length === 0) return;
  const cols = ['code', 'code_system', 'state', 'payer_name', 'qpa',
    'prevailing_party', 'prevailing_offer', 'pct_of_qpa', 'period', 'source_file'];
  const values = [];
  const params = [];
  let p = 1;
  for (const r of buffer) {
    values.push(`(${cols.map(() => `$${p++}`).join(',')})`);
    cols.forEach((c) => params.push(r[c] ?? null));
  }
  await query(`INSERT INTO idr_disputes_raw (${cols.join(',')}) VALUES ${values.join(',')}`, params);
  buffer = [];
}

async function main() {
  const codeSet = await loadCodeSet();
  // Clear prior raw rows for this period so re-runs are idempotent.
  await query('DELETE FROM idr_disputes_raw WHERE period = $1', [period]);

  const sourceFile = pufPath.split('/').pop();
  let scanned = 0, kept = 0;

  const parser = fs.createReadStream(pufPath).pipe(parse({
    columns: true, skip_empty_lines: true, relax_quotes: true, relax_column_count: true, trim: true,
  }));

  for await (const rec of parser) {
    scanned++;
    const code = (rec[COL.serviceCode] || '').toString().trim();
    if (!code) continue;
    const codeSystem = normalizeCodeSystem(COL.serviceCodeType && rec[COL.serviceCodeType]);
    if (!codeSet.has(`${code}|${codeSystem}`)) continue;

    const state = normalizeState(rec[COL.state]);
    if (!state) continue;

    const qpa = num(rec[COL.qpa]);
    const offer = num(rec[COL.prevailingOffer]);
    let pct = COL.pctOfQpa ? num(rec[COL.pctOfQpa]) : null;
    if (pct == null && qpa && offer) pct = (offer / qpa) * 100;

    buffer.push({
      code, code_system: codeSystem, state,
      payer_name: (rec[COL.payerName] || '').toString().slice(0, 200),
      qpa, prevailing_party: normalizePrevailingParty(rec[COL.prevailingParty]),
      prevailing_offer: offer, pct_of_qpa: pct, period, source_file: sourceFile,
    });
    kept++;
    if (buffer.length >= BATCH_SIZE) await flush();
  }
  await flush();
  console.log(`PUF scanned: ${scanned} line-items; kept (in code set + valid state): ${kept}`);

  // Aggregate raw -> idr_outcomes
  const agg = await query(
    `INSERT INTO idr_outcomes
       (code, code_system, state, dispute_count, provider_win_rate, median_pct_qpa, period, source_file, updated_at)
     SELECT code, code_system, state,
       count(*) AS dispute_count,
       avg(CASE WHEN prevailing_party = 'provider' THEN 1.0 ELSE 0.0 END) AS provider_win_rate,
       percentile_cont(0.5) WITHIN GROUP (ORDER BY pct_of_qpa)
         FILTER (WHERE prevailing_party = 'provider' AND pct_of_qpa IS NOT NULL) AS median_pct_qpa,
       $1, $2, now()
     FROM idr_disputes_raw
     WHERE period = $1 AND code IS NOT NULL AND state IS NOT NULL
     GROUP BY code, code_system, state
     ON CONFLICT (code, code_system, state, period) DO UPDATE SET
       dispute_count = EXCLUDED.dispute_count,
       provider_win_rate = EXCLUDED.provider_win_rate,
       median_pct_qpa = EXCLUDED.median_pct_qpa,
       source_file = EXCLUDED.source_file, updated_at = now()`,
    [period, sourceFile]
  );
  console.log(`idr_outcomes: ${agg.rowCount} code x state rows for period ${period}`);
}

main().catch((e) => { console.error(e); process.exitCode = 1; }).finally(end);
