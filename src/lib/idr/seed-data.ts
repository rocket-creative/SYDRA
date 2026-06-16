import { US_STATES } from "@/lib/constants/us-states";
import { STATE_PROFILE_INPUTS } from "@/lib/idr/state-profiles-data";
import { getCodeMeta } from "@/lib/idr/taxonomy";
import type {
  IdrBenchmark,
  IdrStateProfile,
  SpecialtySlug,
} from "@/lib/idr/types";

/**
 * Placeholder benchmark generator. Every row is flagged dataSource="seed" so
 * index-gating keeps the whole surface noindex until real MRF/IDR data lands.
 * Values are deterministic (hash based) so a given code x state x payer always
 * renders the same numbers across builds, but they are NOT real and must not be
 * indexed. The real ETL (phase C) replaces these rows in Supabase.
 *
 * Benchmarks and state profiles are computed on demand (per code x state x
 * payer cell) rather than precomputed into a giant array, so the full surface
 * of 190+ codes across all 51 jurisdictions scales without building tens of
 * thousands of objects at module load.
 */

/** Every jurisdiction we render a surface for (50 states + DC). */
export const ALL_STATE_CODES: string[] = US_STATES.map((s) => s.code);
const STATE_CODE_SET = new Set(ALL_STATE_CODES);

const SEED_UPDATED_AT = "2026-06-01T00:00:00.000Z";

/** Specialty Medicare benchmark bands (professional fee, USD). Illustrative. */
const MEDICARE_BANDS: Record<SpecialtySlug, [number, number]> = {
  spine: [1400, 2600],
  orthopedics: [1100, 2100],
  neurosurgery: [1600, 3200],
  plastics: [900, 1900],
  hand: [600, 1300],
  pain: [300, 1100],
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

function medicareFor(code: string, specialty: SpecialtySlug): number {
  const [min, max] = MEDICARE_BANDS[specialty];
  return roundTo(band(min, max, hash(code)), 5);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Deterministic placeholder benchmark for a single code x state x payer cell.
 * Returns null when the code or state is not recognized. dataSource is always
 * "seed", so the page never indexes until real data replaces it.
 */
export function seedBenchmark(
  code: string,
  state: string,
  payerSlug: string | null,
): IdrBenchmark | null {
  const codeMeta = getCodeMeta(code);
  if (!codeMeta || !STATE_CODE_SET.has(state)) return null;

  const key = `${code}|${state}|${payerSlug ?? "all"}`;
  const medicare = medicareFor(code, codeMeta.specialty);
  const stateProfile = STATE_PROFILE_INPUTS[state];

  // In network median sits well above Medicare; OON allowed is the low number
  // insurers pay before a dispute. The spread between them is the sales hook.
  const inNetworkMedian = roundTo(medicare * band(2.4, 3.4, hash(`${key}|in`)), 5);
  const oonAllowed = roundTo(medicare * band(1.05, 1.55, hash(`${key}|oon`)), 5);

  const winRate = clamp(
    (stateProfile?.winRate ?? 0.85) + band(-0.05, 0.06, hash(`${key}|win`)),
    0.55,
    0.94,
  );
  const medianPctQpa = Number(band(3.1, 5.4, hash(`${key}|qpa`)).toFixed(1));

  return {
    code,
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

/**
 * Deterministic placeholder state profile for any of the 51 jurisdictions.
 * Pulls the eligibility summary and win rate from the reviewed state profile
 * data. Returns null when the state code is not recognized.
 */
export function seedStateProfile(state: string): IdrStateProfile | null {
  if (!STATE_CODE_SET.has(state)) return null;
  const input = STATE_PROFILE_INPUTS[state];
  return {
    state,
    nsaPathway: input?.pathway ?? "federal",
    stateLawSummary:
      input?.lawSummary ??
      "Self funded plans route to federal IDR. Confirm fully insured routing against the CMS applicability chart for your specific plan and service.",
    idrWinRate: input?.winRate ?? 0.85,
    idrMedianPctQpa: Number(
      band(3.6, 4.8, hash(`${state}|stateqpa`)).toFixed(1),
    ),
    dataSource: "seed",
  };
}
