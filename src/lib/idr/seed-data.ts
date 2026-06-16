import {
  IDR_CODES,
  IDR_PAYERS,
  LAUNCH_STATE_CODES,
} from "@/lib/idr/taxonomy";
import type {
  IdrBenchmark,
  IdrCode,
  IdrStateProfile,
  SpecialtySlug,
} from "@/lib/idr/types";

/**
 * Placeholder benchmark generator. Every row is flagged dataSource="seed" so
 * index-gating keeps the whole surface noindex until real MRF/IDR data lands.
 * Values are deterministic (hash based) so a given code x state x payer always
 * renders the same numbers across builds, but they are NOT real and must not be
 * indexed. The real ETL (phase C) replaces these rows in Supabase.
 */

const SEED_UPDATED_AT = "2026-06-01T00:00:00.000Z";

/** Specialty Medicare benchmark bands (professional fee, USD). Illustrative. */
const MEDICARE_BANDS: Record<SpecialtySlug, [number, number]> = {
  spine: [1400, 2600],
  orthopedics: [1100, 2100],
  neurosurgery: [1600, 3200],
  plastics: [900, 1900],
  hand: [600, 1300],
};

/** State-level IDR posture. Win rates echo the spread cited in the playbook. */
const STATE_PROFILE_INPUTS: Record<
  string,
  { pathway: IdrStateProfile["nsaPathway"]; winRate: number; lawSummary: string }
> = {
  NY: {
    pathway: "mixed",
    winRate: 0.81,
    lawSummary:
      "New York runs its own surprise billing arbitration for many fully insured plans, while self funded ERISA plans fall under federal IDR. Providers prevail in roughly four of five disputes resolved in the state.",
  },
  NJ: {
    pathway: "mixed",
    winRate: 0.66,
    lawSummary:
      "New Jersey's out of network law covers many state regulated plans; self funded plans use federal IDR. Eligibility turns on the plan type behind each claim.",
  },
  TX: {
    pathway: "federal",
    winRate: 0.74,
    lawSummary:
      "Texas surprise billing protections largely route surgical out of network disputes into the federal IDR process for plans subject to the No Surprises Act.",
  },
  CA: {
    pathway: "mixed",
    winRate: 0.7,
    lawSummary:
      "California's AB 72 governs many state regulated commercial plans; federal IDR applies to self funded plans. Confirm plan type before assuming a pathway.",
  },
  FL: {
    pathway: "federal",
    winRate: 0.72,
    lawSummary:
      "Florida out of network surgical disputes for No Surprises Act plans proceed through federal IDR, with state law addressing a narrower set of plans.",
  },
  AZ: {
    pathway: "federal",
    winRate: 0.69,
    lawSummary:
      "Arizona surgical out of network disputes for covered plans use the federal IDR process under the No Surprises Act.",
  },
};

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function band(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function medicareFor(codeMeta: IdrCode): number {
  const [min, max] = MEDICARE_BANDS[codeMeta.specialty];
  return roundTo(band(min, max, hash(codeMeta.code)), 5);
}

function benchmarkRow(
  codeMeta: IdrCode,
  state: string,
  payerSlug: string | null,
): IdrBenchmark {
  const key = `${codeMeta.code}|${state}|${payerSlug ?? "all"}`;
  const medicare = medicareFor(codeMeta);
  const stateProfile = STATE_PROFILE_INPUTS[state];

  // In-network median sits well above Medicare; OON allowed is the low number
  // insurers pay before a dispute. The spread between them is the sales hook.
  const inNetworkMedian = roundTo(medicare * band(2.4, 3.4, hash(`${key}|in`)), 5);
  const oonAllowed = roundTo(medicare * band(1.05, 1.55, hash(`${key}|oon`)), 5);

  const winRate = clamp(
    (stateProfile?.winRate ?? 0.72) + band(-0.05, 0.06, hash(`${key}|win`)),
    0.55,
    0.94,
  );
  const medianPctQpa = Number(band(3.1, 5.4, hash(`${key}|qpa`)).toFixed(1));

  return {
    code: codeMeta.code,
    state,
    payerSlug,
    inNetworkMedian,
    oonAllowed,
    medicareRate: medicare,
    idrWinRate: Number(winRate.toFixed(2)),
    idrMedianPctQpa: medianPctQpa,
    dataSource: "seed",
    updatedAt: SEED_UPDATED_AT,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** All seeded benchmark rows: code x state aggregates + code x state x payer (MRF payers only). */
export function buildSeedBenchmarks(): IdrBenchmark[] {
  const rows: IdrBenchmark[] = [];
  const mrfPayers = IDR_PAYERS.filter((p) => p.hasMrf);

  for (const codeMeta of IDR_CODES) {
    for (const state of LAUNCH_STATE_CODES) {
      rows.push(benchmarkRow(codeMeta, state, null));
      for (const payer of mrfPayers) {
        rows.push(benchmarkRow(codeMeta, state, payer.slug));
      }
    }
  }
  return rows;
}

export function buildSeedStateProfiles(): IdrStateProfile[] {
  return LAUNCH_STATE_CODES.map((state) => {
    const input = STATE_PROFILE_INPUTS[state];
    return {
      state,
      nsaPathway: input.pathway,
      stateLawSummary: input.lawSummary,
      idrWinRate: input.winRate,
      idrMedianPctQpa: Number(band(3.6, 4.8, hash(`${state}|stateqpa`)).toFixed(1)),
      dataSource: "seed",
    };
  });
}

export const SEED_BENCHMARKS = buildSeedBenchmarks();
export const SEED_STATE_PROFILES = buildSeedStateProfiles();
