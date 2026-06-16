// Publish staging data into the app's published tables.
//
// The app (src/lib/idr) reads idr_benchmarks + idr_state_profiles and gates
// indexing on data_source <> 'seed'. This step enriches those already-seeded
// rows in place with real public data and bumps data_source, so real-data pages
// become indexable while everything else stays noindex on the seed placeholders.
//
// Index gate (anti-thin-content): a benchmark row only flips to a real source
// when a real negotiated rate (MRF) backs its dollar figures — placeholder
// dollars never get indexed. IDR outcomes then upgrade the win-rate/award
// figures (and provenance to 'puf') on rows that are already real. State
// profiles flip on outcomes alone because they only surface outcome stats.
//
// Prerequisite: run the app seed first (npm run seed in the app) so the
// idr_benchmarks / idr_state_profiles rows exist to enrich.
import { query, end } from '../lib/db.mjs';

async function main() {
  // 1. MRF -> aggregate benchmark rows (payer_slug IS NULL). National rates are
  //    applied to every state until NPI/TIN -> state enrichment lands.
  const agg = await query(
    `UPDATE idr_benchmarks b SET
       in_network_median = round(m.inn::numeric, 2),
       oon_allowed = COALESCE(round(m.oon::numeric, 2), b.oon_allowed),
       data_source = 'mrf',
       updated_at = now()
     FROM (
       SELECT code, avg(in_network_median) AS inn, avg(oon_allowed_median) AS oon
       FROM idr_benchmarks_raw
       WHERE state = 'US' AND in_network_median IS NOT NULL
       GROUP BY code
     ) m
     WHERE b.code = m.code AND b.payer_slug IS NULL`
  );

  // 2. MRF -> per-payer benchmark rows. National rate per payer, every state.
  const perPayer = await query(
    `UPDATE idr_benchmarks b SET
       in_network_median = round(r.in_network_median::numeric, 2),
       oon_allowed = COALESCE(round(r.oon_allowed_median::numeric, 2), b.oon_allowed),
       data_source = 'mrf',
       updated_at = now()
     FROM idr_benchmarks_raw r
     WHERE r.state = 'US' AND r.in_network_median IS NOT NULL
       AND b.code = r.code AND b.payer_slug = r.payer_slug`
  );

  // 3. Medicare PFS -> medicare_rate on every row for the code (optional source).
  const medicare = await query(
    `UPDATE idr_benchmarks b SET medicare_rate = round(mr.rate::numeric, 2)
     FROM medicare_rates mr
     WHERE mr.locality = 'NATIONAL' AND mr.rate IS NOT NULL AND b.code = mr.code`
  );

  // 4. IDR outcomes -> win rate + median award multiple on rows that already
  //    carry real dollars (data_source <> 'seed'). pct_of_qpa is a percentage in
  //    staging; the app renders a multiple, so divide by 100. Aggregated across
  //    periods, dispute-count weighted.
  const outcomesOnBench = await query(
    `UPDATE idr_benchmarks b SET
       idr_win_rate = o.win_rate,
       idr_median_pct_qpa = o.median_mult,
       data_source = 'puf',
       updated_at = now()
     FROM (
       SELECT code, state,
         round((sum(provider_win_rate * dispute_count)
           / NULLIF(sum(dispute_count), 0))::numeric, 3) AS win_rate,
         round((sum(median_pct_qpa * dispute_count)
             FILTER (WHERE median_pct_qpa IS NOT NULL)
           / NULLIF(sum(dispute_count) FILTER (WHERE median_pct_qpa IS NOT NULL), 0)
           / 100)::numeric, 1) AS median_mult
       FROM idr_outcomes
       GROUP BY code, state
     ) o
     WHERE b.code = o.code AND b.state = o.state
       AND b.data_source <> 'seed' AND o.win_rate IS NOT NULL`
  );

  // 5. IDR outcomes -> state profiles (pure outcome stats: safe to flip on PUF).
  const stateProfiles = await query(
    `UPDATE idr_state_profiles p SET
       idr_win_rate = a.win_rate,
       idr_median_pct_qpa = a.median_mult,
       data_source = 'puf'
     FROM (
       SELECT state,
         round((sum(provider_win_rate * dispute_count)
           / NULLIF(sum(dispute_count), 0))::numeric, 3) AS win_rate,
         round((sum(median_pct_qpa * dispute_count)
             FILTER (WHERE median_pct_qpa IS NOT NULL)
           / NULLIF(sum(dispute_count) FILTER (WHERE median_pct_qpa IS NOT NULL), 0)
           / 100)::numeric, 1) AS median_mult
       FROM idr_outcomes
       GROUP BY state
     ) a
     WHERE p.state = a.state AND a.win_rate IS NOT NULL`
  );

  const summary = await query(
    `SELECT data_source,
       count(*) FILTER (WHERE payer_slug IS NULL) AS aggregate_rows,
       count(*) FILTER (WHERE payer_slug IS NOT NULL) AS payer_rows
     FROM idr_benchmarks GROUP BY data_source ORDER BY data_source`
  );

  console.log('publish complete:');
  console.log(`  benchmark aggregate rows enriched by MRF: ${agg.rowCount}`);
  console.log(`  benchmark payer rows enriched by MRF:     ${perPayer.rowCount}`);
  console.log(`  benchmark rows enriched by Medicare PFS:  ${medicare.rowCount}`);
  console.log(`  benchmark rows upgraded by IDR outcomes:  ${outcomesOnBench.rowCount}`);
  console.log(`  state profiles enriched by IDR outcomes:  ${stateProfiles.rowCount}`);
  console.log('\nidr_benchmarks by data_source (indexable = non-seed):');
  for (const r of summary.rows) {
    console.log(`  ${r.data_source.padEnd(5)}  aggregate=${r.aggregate_rows}  payer=${r.payer_rows}`);
  }
  console.log('\nHandoff: the app reads idr_benchmarks / idr_state_profiles; rows with');
  console.log("data_source <> 'seed' are indexable and enter the sitemap.");
}

main().catch((e) => { console.error(e); process.exitCode = 1; }).finally(end);
