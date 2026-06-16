/**
 * Seeds Supabase with the entity taxonomy and placeholder benchmark data.
 *
 * Two write paths, picked automatically from the environment:
 *   1. Service role (REST):  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run seed
 *   2. Direct Postgres:      DATABASE_URL=... npm run seed
 *
 * The service role bypasses RLS over PostgREST; the direct connection writes as
 * the table owner (also bypassing RLS). Use whichever credential you have. When
 * both are set, the service role path wins.
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

type Row = Record<string, string | number | boolean | null>;

function buildRows() {
  const codeRows: Row[] = IDR_CODES.map((c) => ({
    code: c.code,
    code_system: c.codeSystem,
    short_label: c.shortLabel,
    descriptor: c.descriptor,
    descriptor_source: c.descriptorSource,
    specialty: c.specialty,
    is_relevant: c.isRelevant,
  }));

  const payerRows: Row[] = IDR_PAYERS.map((p) => ({
    slug: p.slug,
    name: p.name,
    has_mrf: p.hasMrf,
  }));

  const stateProfiles: IdrStateProfile[] = ALL_STATE_CODES.map((s) =>
    seedStateProfile(s),
  ).filter((p): p is IdrStateProfile => p !== null);
  const stateProfileRows: Row[] = stateProfiles.map((s) => ({
    state: s.state,
    nsa_pathway: s.nsaPathway,
    state_law_summary: s.stateLawSummary,
    idr_win_rate: s.idrWinRate,
    idr_median_pct_qpa: s.idrMedianPctQpa,
    data_source: s.dataSource,
  }));

  // Placeholder benchmarks across every code x state, plus a row per MRF payer.
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
  const benchmarkRows: Row[] = benchmarks.map((b) => ({
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

  const aggregateRows = benchmarkRows.filter((r) => r.payer_slug === null);
  const payerBenchmarkRows = benchmarkRows.filter((r) => r.payer_slug !== null);

  return {
    codeRows,
    payerRows,
    stateProfileRows,
    aggregateRows,
    payerBenchmarkRows,
  };
}

async function seedWithServiceRole(url: string, key: string) {
  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const {
    codeRows,
    payerRows,
    stateProfileRows,
    aggregateRows,
    payerBenchmarkRows,
  } = buildRows();

  console.log(`Seeding ${codeRows.length} codes…`);
  const { error: codesErr } = await db
    .from("idr_codes")
    .upsert(codeRows, { onConflict: "code" });
  if (codesErr) throw codesErr;

  console.log(`Seeding ${payerRows.length} payers…`);
  const { error: payersErr } = await db
    .from("idr_payers")
    .upsert(payerRows, { onConflict: "slug" });
  if (payersErr) throw payersErr;

  console.log(`Seeding ${stateProfileRows.length} state profiles…`);
  const { error: profErr } = await db
    .from("idr_state_profiles")
    .upsert(stateProfileRows, { onConflict: "state" });
  if (profErr) throw profErr;

  console.log(
    `Seeding ${aggregateRows.length + payerBenchmarkRows.length} benchmark rows…`,
  );
  // Two partial unique indexes (aggregate vs payer) mean a single onConflict
  // target does not cover both, so split the upsert by row kind.
  const { error: aggErr } = await db
    .from("idr_benchmarks")
    .upsert(aggregateRows, { onConflict: "code,state" });
  if (aggErr) throw aggErr;

  const { error: payErr } = await db
    .from("idr_benchmarks")
    .upsert(payerBenchmarkRows, { onConflict: "code,state,payer_slug" });
  if (payErr) throw payErr;
}

async function seedWithPostgres(connectionString: string) {
  const { Client } = await import("pg");
  // Drop any sslmode query param so it does not force cert verification; we set
  // SSL explicitly below (Supabase requires SSL but presents a chain Node treats
  // as self-signed).
  const base = connectionString.split("?")[0];
  const client = new Client({
    connectionString: base,
    ssl: base.includes("localhost") ? false : { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    const {
      codeRows,
      payerRows,
      stateProfileRows,
      aggregateRows,
      payerBenchmarkRows,
    } = buildRows();

    async function upsert(
      table: string,
      columns: string[],
      rows: Row[],
      conflict: string,
    ) {
      if (rows.length === 0) return;
      const updates = columns
        .filter((c) => !conflict.includes(c) || conflict.includes("where"))
        .map((c) => `${c} = excluded.${c}`)
        .join(", ");
      const CHUNK = 500;
      for (let i = 0; i < rows.length; i += CHUNK) {
        const chunk = rows.slice(i, i + CHUNK);
        const params: (string | number | boolean | null)[] = [];
        const tuples = chunk.map((row) => {
          const placeholders = columns.map((c) => {
            params.push(row[c] ?? null);
            return `$${params.length}`;
          });
          return `(${placeholders.join(", ")})`;
        });
        const sql = `insert into ${table} (${columns.join(", ")}) values ${tuples.join(
          ", ",
        )} on conflict ${conflict} do update set ${updates}`;
        await client.query(sql, params);
      }
    }

    console.log(`Seeding ${codeRows.length} codes…`);
    await upsert(
      "idr_codes",
      [
        "code",
        "code_system",
        "short_label",
        "descriptor",
        "descriptor_source",
        "specialty",
        "is_relevant",
      ],
      codeRows,
      "(code)",
    );

    console.log(`Seeding ${payerRows.length} payers…`);
    await upsert("idr_payers", ["slug", "name", "has_mrf"], payerRows, "(slug)");

    console.log(`Seeding ${stateProfileRows.length} state profiles…`);
    await upsert(
      "idr_state_profiles",
      [
        "state",
        "nsa_pathway",
        "state_law_summary",
        "idr_win_rate",
        "idr_median_pct_qpa",
        "data_source",
      ],
      stateProfileRows,
      "(state)",
    );

    const benchCols = [
      "code",
      "state",
      "payer_slug",
      "in_network_median",
      "oon_allowed",
      "medicare_rate",
      "idr_win_rate",
      "idr_median_pct_qpa",
      "data_source",
      "updated_at",
    ];
    console.log(
      `Seeding ${aggregateRows.length + payerBenchmarkRows.length} benchmark rows…`,
    );
    // Partial unique indexes require the predicate in the conflict target.
    await upsert(
      "idr_benchmarks",
      benchCols,
      aggregateRows,
      "(code, state) where payer_slug is null",
    );
    await upsert(
      "idr_benchmarks",
      benchCols,
      payerBenchmarkRows,
      "(code, state, payer_slug) where payer_slug is not null",
    );
  } finally {
    await client.end();
  }
}

async function main() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (url && serviceKey) {
    console.log("Seeding via Supabase service role (REST)…");
    await seedWithServiceRole(url, serviceKey);
  } else if (databaseUrl) {
    console.log("Seeding via direct Postgres connection (DATABASE_URL)…");
    await seedWithPostgres(databaseUrl);
  } else {
    throw new Error(
      "Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, or DATABASE_URL, to seed the database.",
    );
  }

  console.log("Seed complete.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
