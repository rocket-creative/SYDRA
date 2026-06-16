/**
 * Seeds Supabase with the entity taxonomy and placeholder benchmark data.
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run seed
 *
 * Every benchmark/profile row is written with data_source='seed', so the pages
 * exist for internal linking and crawling but stay noindex until real MRF/IDR
 * data replaces them. Re-run is idempotent (upserts on the natural keys).
 */
import { createClient } from "@supabase/supabase-js";

import { IDR_CODES, IDR_PAYERS } from "@/lib/idr/taxonomy";
import { SEED_BENCHMARKS, SEED_STATE_PROFILES } from "@/lib/idr/seed-data";

async function main() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to seed the database.",
    );
  }

  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`Seeding ${IDR_CODES.length} codes…`);
  const { error: codesErr } = await db.from("idr_codes").upsert(
    IDR_CODES.map((c) => ({
      code: c.code,
      code_system: c.codeSystem,
      short_label: c.shortLabel,
      descriptor: c.descriptor,
      descriptor_source: c.descriptorSource,
      specialty: c.specialty,
      is_relevant: c.isRelevant,
    })),
    { onConflict: "code" },
  );
  if (codesErr) throw codesErr;

  console.log(`Seeding ${IDR_PAYERS.length} payers…`);
  const { error: payersErr } = await db.from("idr_payers").upsert(
    IDR_PAYERS.map((p) => ({ slug: p.slug, name: p.name, has_mrf: p.hasMrf })),
    { onConflict: "slug" },
  );
  if (payersErr) throw payersErr;

  console.log(`Seeding ${SEED_STATE_PROFILES.length} state profiles…`);
  const { error: profErr } = await db.from("idr_state_profiles").upsert(
    SEED_STATE_PROFILES.map((s) => ({
      state: s.state,
      nsa_pathway: s.nsaPathway,
      state_law_summary: s.stateLawSummary,
      idr_win_rate: s.idrWinRate,
      idr_median_pct_qpa: s.idrMedianPctQpa,
      data_source: s.dataSource,
    })),
    { onConflict: "state" },
  );
  if (profErr) throw profErr;

  console.log(`Seeding ${SEED_BENCHMARKS.length} benchmark rows…`);
  const rows = SEED_BENCHMARKS.map((b) => ({
    code: b.code,
    state: b.state,
    payer_slug: b.payerSlug,
    in_network_median: b.inNetworkMedian,
    oon_allowed: b.oonAllowed,
    medicare_rate: b.medicareRate,
    idr_win_rate: b.idrWinRate,
    idr_median_pct_qpa: b.idrMedianPctQpa,
    data_source: b.dataSource,
    updated_at: b.updatedAt,
  }));

  // Two partial unique indexes (aggregate vs payer) mean a single onConflict
  // target does not cover both, so split the upsert by row kind.
  const aggregates = rows.filter((r) => r.payer_slug === null);
  const payerRows = rows.filter((r) => r.payer_slug !== null);

  const { error: aggErr } = await db
    .from("idr_benchmarks")
    .upsert(aggregates, { onConflict: "code,state" });
  if (aggErr) throw aggErr;

  const { error: payErr } = await db
    .from("idr_benchmarks")
    .upsert(payerRows, { onConflict: "code,state,payer_slug" });
  if (payErr) throw payErr;

  console.log("Seed complete.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
