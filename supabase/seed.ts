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
import {
  ALL_STATE_CODES,
  seedBenchmark,
  seedStateProfile,
} from "@/lib/idr/seed-data";
import type { IdrBenchmark, IdrStateProfile } from "@/lib/idr/types";

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

  // Build placeholder state profiles for every jurisdiction (50 states + DC).
  const stateProfiles: IdrStateProfile[] = ALL_STATE_CODES.map((s) =>
    seedStateProfile(s),
  ).filter((p): p is IdrStateProfile => p !== null);

  console.log(`Seeding ${stateProfiles.length} state profiles…`);
  const { error: profErr } = await db.from("idr_state_profiles").upsert(
    stateProfiles.map((s) => ({
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

  // Build placeholder benchmarks across every code x state, plus a row per MRF
  // payer. All rows carry data_source='seed' so the pages stay noindex.
  const mrfPayerSlugs = IDR_PAYERS.filter((p) => p.hasMrf).map((p) => p.slug);
  const benchmarks: IdrBenchmark[] = [];
  for (const codeMeta of IDR_CODES) {
    for (const state of ALL_STATE_CODES) {
      const aggregate = seedBenchmark(codeMeta.code, state, null);
      if (aggregate) benchmarks.push(aggregate);
      for (const payerSlug of mrfPayerSlugs) {
        const payerRow = seedBenchmark(codeMeta.code, state, payerSlug);
        if (payerRow) benchmarks.push(payerRow);
      }
    }
  }

  console.log(`Seeding ${benchmarks.length} benchmark rows…`);
  const rows = benchmarks.map((b) => ({
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
