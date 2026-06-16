import "server-only";

import { getSupabase } from "@/lib/idr/db";
import {
  ALL_STATE_CODES,
  seedBenchmark,
  seedStateProfile,
} from "@/lib/idr/seed-data";
import { IDR_PAYERS, getCodeMeta, getStateName } from "@/lib/idr/taxonomy";
import type { IdrBenchmark, IdrStateProfile } from "@/lib/idr/types";

/**
 * Read layer for entity benchmark data. Every function reads from Supabase when
 * it is configured and falls back to the in-repo seed dataset otherwise, so the
 * entity surface renders identically in dev/preview before a database exists.
 * All lookups return null/[] on a miss; callers use that to drive notFound().
 */

type BenchmarkRow = {
  code: string;
  state: string;
  payer_slug: string | null;
  in_network_median: number | string;
  oon_allowed: number | string;
  medicare_rate: number | string;
  idr_win_rate: number | string;
  idr_median_pct_qpa: number | string;
  data_source: IdrBenchmark["dataSource"];
  updated_at: string;
};

type StateProfileRow = {
  state: string;
  nsa_pathway: IdrStateProfile["nsaPathway"];
  state_law_summary: string;
  idr_win_rate: number | string;
  idr_median_pct_qpa: number | string;
  data_source: IdrStateProfile["dataSource"];
};

function num(value: number | string): number {
  return typeof value === "number" ? value : Number(value);
}

function mapBenchmark(row: BenchmarkRow): IdrBenchmark {
  return {
    code: row.code,
    state: row.state,
    payerSlug: row.payer_slug,
    inNetworkMedian: num(row.in_network_median),
    oonAllowed: num(row.oon_allowed),
    medicareRate: num(row.medicare_rate),
    idrWinRate: num(row.idr_win_rate),
    idrMedianPctQpa: num(row.idr_median_pct_qpa),
    dataSource: row.data_source,
    updatedAt: row.updated_at,
  };
}

function mapStateProfile(row: StateProfileRow): IdrStateProfile {
  return {
    state: row.state,
    nsaPathway: row.nsa_pathway,
    stateLawSummary: row.state_law_summary,
    idrWinRate: num(row.idr_win_rate),
    idrMedianPctQpa: num(row.idr_median_pct_qpa),
    dataSource: row.data_source,
  };
}

/** The code x state aggregate benchmark that powers the primary money page. */
export async function getCodeStateBenchmark(
  code: string,
  state: string,
): Promise<IdrBenchmark | null> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("*")
      .eq("code", code)
      .eq("state", state)
      .is("payer_slug", null)
      .maybeSingle();
    return data ? mapBenchmark(data as BenchmarkRow) : null;
  }
  return seedBenchmark(code, state, null);
}

/** All payer-level benchmark rows for a code x state (drives the spread table). */
export async function getPayerBenchmarks(
  code: string,
  state: string,
): Promise<IdrBenchmark[]> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("*")
      .eq("code", code)
      .eq("state", state)
      .not("payer_slug", "is", null)
      .order("payer_slug", { ascending: true });
    return (data ?? []).map((row) => mapBenchmark(row as BenchmarkRow));
  }
  return IDR_PAYERS.filter((p) => p.hasMrf)
    .map((p) => seedBenchmark(code, state, p.slug))
    .filter((row): row is NonNullable<typeof row> => row !== null);
}

/** A single code x state x payer cell, gated to payers we hold data for. */
export async function getCodeStatePayerBenchmark(
  code: string,
  state: string,
  payerSlug: string,
): Promise<IdrBenchmark | null> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("*")
      .eq("code", code)
      .eq("state", state)
      .eq("payer_slug", payerSlug)
      .maybeSingle();
    return data ? mapBenchmark(data as BenchmarkRow) : null;
  }
  return seedBenchmark(code, state, payerSlug);
}

export async function getStateProfile(
  state: string,
): Promise<IdrStateProfile | null> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_state_profiles")
      .select("*")
      .eq("state", state)
      .maybeSingle();
    return data ? mapStateProfile(data as StateProfileRow) : null;
  }
  return seedStateProfile(state);
}

/** States that have an aggregate benchmark for a code (powers the code hub). */
export async function getStatesForCode(code: string): Promise<string[]> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("state")
      .eq("code", code)
      .is("payer_slug", null)
      .order("state", { ascending: true });
    return (data ?? []).map((row) => (row as { state: string }).state);
  }
  // Seed coverage exists for every jurisdiction, so a known code links to all
  // 51 states. Real data later narrows the indexable subset via the sitemap.
  return getCodeMeta(code) ? [...ALL_STATE_CODES].sort() : [];
}

type CodeStatePair = { code: string; state: string };

/** All code x state aggregates (any data source). Used for sitemap + hub links. */
export async function getAllCodeStates(): Promise<CodeStatePair[]> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("code, state")
      .is("payer_slug", null);
    return (data ?? []).map((row) => row as CodeStatePair);
  }
  // Not enumerated in seed-only environments; the indexable variant below is
  // what the sitemap consumes.
  return [];
}

/** Only indexable (real-data) code x state pairs. Used by the sitemap. */
export async function getIndexableCodeStates(): Promise<CodeStatePair[]> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("code, state")
      .is("payer_slug", null)
      .neq("data_source", "seed");
    return (data ?? []).map((row) => row as CodeStatePair);
  }
  // Seed-only environments have nothing indexable by design.
  return [];
}

type CodeStatePayerTriple = CodeStatePair & { payerSlug: string };

export async function getIndexableCodeStatePayers(): Promise<CodeStatePayerTriple[]> {
  const db = getSupabase();
  if (db) {
    const { data } = await db
      .from("idr_benchmarks")
      .select("code, state, payer_slug")
      .not("payer_slug", "is", null)
      .neq("data_source", "seed");
    return (data ?? []).map((row) => {
      const r = row as { code: string; state: string; payer_slug: string };
      return { code: r.code, state: r.state, payerSlug: r.payer_slug };
    });
  }
  // Seed-only environments have nothing indexable by design.
  return [];
}

/** Convenience: resolve a code x state page's full context in one call. */
export type CodeStateContext = {
  benchmark: IdrBenchmark;
  payerBenchmarks: IdrBenchmark[];
  stateProfile: IdrStateProfile | null;
  codeLabel: string;
  stateName: string;
};

export async function getCodeStateContext(
  code: string,
  state: string,
): Promise<CodeStateContext | null> {
  const codeMeta = getCodeMeta(code);
  const stateName = getStateName(state);
  if (!codeMeta || !stateName) return null;

  const benchmark = await getCodeStateBenchmark(code, state);
  if (!benchmark) return null;

  const [payerBenchmarks, stateProfile] = await Promise.all([
    getPayerBenchmarks(code, state),
    getStateProfile(state),
  ]);

  return {
    benchmark,
    payerBenchmarks,
    stateProfile,
    codeLabel: codeMeta.shortLabel,
    stateName,
  };
}
