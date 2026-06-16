// Stream a Transparency-in-Coverage in-network-rates MRF (.json or .json.gz),
// extract negotiated rates for our target codes only, and write per-code
// benchmark stats (median/min/max) into idr_benchmarks.
//
// MRFs are huge (up to ~1TB) so this NEVER loads the whole file — it streams the
// in_network[] array and keeps values only for codes in idr_codes.
//
// NOTE ON STATE: MRFs are national; a rate is tied to provider groups (NPI/TIN),
// not a state. This script writes NATIONAL benchmarks (state='US'). To get
// state-level benchmarks, enrich by joining provider_references NPIs to states
// via the NPPES NPI registry — that is the next layer (see README).
//
// Schema ref: github.com/CMSgov/price-transparency-guide (in-network-rates)
import fs from 'node:fs';
import zlib from 'node:zlib';
// CJS interop: default-import then destructure (most reliable across versions).
import StreamJson from 'stream-json';
import PickMod from 'stream-json/filters/Pick.js';
import StreamArrayMod from 'stream-json/streamers/StreamArray.js';
import { query, upsert, end } from '../lib/db.mjs';

const { parser } = StreamJson;
const pick = PickMod.pick || PickMod;
const streamArray = StreamArrayMod.streamArray || StreamArrayMod;
import { MRF, normalizeCodeSystem } from '../config/pipeline.config.mjs';

const mrfPath = process.env.MRF_PATH;
const payerSlug = process.env.MRF_PAYER_SLUG;
if (!mrfPath || !fs.existsSync(mrfPath)) {
  console.error(`MRF_PATH not found: ${mrfPath}. Set it in .env.`);
  process.exit(1);
}
if (!payerSlug) { console.error('Set MRF_PAYER_SLUG in .env (must match a slug in the app idr_payers table).'); process.exit(1); }

const MAX_SAMPLES_PER_CODE = 100000; // memory guard per code

const median = (arr) => {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

async function main() {
  const codeRes = await query('SELECT code, code_system FROM idr_codes');
  const codeSet = new Set(codeRes.rows.map((r) => `${r.code}|${r.code_system}`));
  if (codeSet.size === 0) { console.error('idr_codes empty — seed the app taxonomy first (npm run seed in the app).'); process.exit(1); }

  const payerRes = await query('SELECT slug FROM idr_payers WHERE slug = $1', [payerSlug]);
  if (payerRes.rowCount === 0) { console.error(`Payer slug '${payerSlug}' not in idr_payers — seed the app taxonomy first (npm run seed in the app).`); process.exit(1); }

  // code -> array of negotiated rates
  const samples = new Map();

  let input = fs.createReadStream(mrfPath);
  if (mrfPath.endsWith('.gz')) input = input.pipe(zlib.createGunzip());

  const pipeline = input.pipe(parser()).pipe(pick({ filter: 'in_network' })).pipe(streamArray());

  let items = 0, matched = 0;
  await new Promise((resolve, reject) => {
    pipeline.on('data', ({ value: item }) => {
      items++;
      const code = (item.billing_code || '').toString().trim();
      const codeSystem = normalizeCodeSystem(item.billing_code_type);
      const key = `${code}|${codeSystem}`;
      if (!codeSet.has(key)) return;
      matched++;
      const arr = samples.get(key) || [];
      for (const nr of item.negotiated_rates || []) {
        for (const np of nr.negotiated_prices || []) {
          if (MRF.billingClass && np.billing_class && np.billing_class !== MRF.billingClass) continue;
          if (!MRF.acceptNegotiatedTypes.includes(np.negotiated_type)) continue;
          const rate = Number(np.negotiated_rate);
          if (Number.isFinite(rate) && arr.length < MAX_SAMPLES_PER_CODE) arr.push(rate);
        }
      }
      samples.set(key, arr);
    });
    pipeline.on('end', resolve);
    pipeline.on('error', reject);
  });

  const rows = [];
  for (const [key, arr] of samples) {
    if (!arr.length) continue;
    const [code, code_system] = key.split('|');
    rows.push({
      code, code_system, state: 'US', payer_slug: payerSlug,
      in_network_median: median(arr),
      in_network_min: Math.min(...arr),
      in_network_max: Math.max(...arr),
      oon_allowed_median: null,
      sample_size: arr.length,
      source_file: mrfPath.split('/').pop(),
    });
  }

  const n = await upsert(
    'idr_benchmarks_raw',
    ['code', 'code_system', 'state', 'payer_slug', 'in_network_median', 'in_network_min',
      'in_network_max', 'oon_allowed_median', 'sample_size', 'source_file'],
    rows, ['code', 'code_system', 'state', 'payer_slug'],
    ['in_network_median', 'in_network_min', 'in_network_max', 'sample_size', 'source_file']
  );
  console.log(`in_network items scanned: ${items}; matched target codes: ${matched}`);
  console.log(`idr_benchmarks_raw: upserted ${n} national rows for payer '${payerSlug}'`);
}

main().catch((e) => { console.error(e); process.exitCode = 1; }).finally(end);
