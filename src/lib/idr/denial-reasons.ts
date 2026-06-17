import { getCodeMeta } from "@/lib/idr/taxonomy";
import type { SpecialtySlug } from "@/lib/idr/types";

/**
 * The difference engine data (build spec section 3.3).
 *
 * These reasons are the heart of the catalog. Composed per code, state, and
 * payer they make a spine page read differently from an ortho page and an Aetna
 * page differently from a Cigna page, in a way that is true rather than a name
 * swap. Every body is factual and general: it describes the typical pattern and
 * never asserts why a specific claim was denied, and never gives filing advice.
 *
 * Bodies are templates. The engine in denial-engine.ts interpolates these
 * tokens: {proc} (the code short label), {state} (the state name), and
 * {specialty} (the specialty name). No dollar figures or win rates ever appear.
 */

export type DenialReasonKey =
  | "qpa-anchoring"
  | "bundling"
  | "instrumentation-stripped"
  | "multiple-procedure-reduction"
  | "assistant-cosurgeon-stripped"
  | "medical-necessity"
  | "modifier-gap"
  | "downcoding"
  | "oon-benefit-reduction"
  | "prior-auth-mismatch"
  | "frequency-limit";

export type DenialReason = {
  key: DenialReasonKey;
  /** Specialties this reason applies to, or ["*"] for all. */
  specialtyScope: (SpecialtySlug | "*")[];
  /** Short label rendered as the reason headline. */
  headline: string;
  /** Factual, general body. No guarantee, no advice. Supports {proc}/{state}/{specialty}. */
  body: string;
};

export const DENIAL_REASONS: Record<DenialReasonKey, DenialReason> = {
  "qpa-anchoring": {
    key: "qpa-anchoring",
    specialtyScope: ["*"],
    headline: "Anchored to the qualifying payment amount",
    body: "The payer priced the claim off the qualifying payment amount, which often sits well below the real market rate for {proc}.",
  },
  bundling: {
    key: "bundling",
    specialtyScope: ["*"],
    headline: "Bundled into another code",
    body: "The {proc} line was bundled into another code, so part of the work was never separately paid.",
  },
  "instrumentation-stripped": {
    key: "instrumentation-stripped",
    specialtyScope: ["spine"],
    headline: "Instrumentation stripped",
    body: "Instrumentation or the implant line was denied as not separately payable, a frequent pattern on multi step spine cases.",
  },
  "multiple-procedure-reduction": {
    key: "multiple-procedure-reduction",
    specialtyScope: ["*"],
    headline: "Aggressive multiple procedure reduction",
    body: "Multiple procedure reductions were applied aggressively, cutting the secondary lines below their value.",
  },
  "assistant-cosurgeon-stripped": {
    key: "assistant-cosurgeon-stripped",
    specialtyScope: ["spine", "orthopedics", "neurosurgery", "plastics", "hand"],
    headline: "Assistant or co surgeon line removed",
    body: "The assistant surgeon or co surgeon line was reduced or removed despite the operative note supporting it.",
  },
  "medical-necessity": {
    key: "medical-necessity",
    specialtyScope: ["*"],
    headline: "Denied as not medically necessary",
    body: "The claim was denied as not medically necessary, common on {specialty} procedures where the payer second guesses the indication.",
  },
  "modifier-gap": {
    key: "modifier-gap",
    specialtyScope: ["*"],
    headline: "Modifier or documentation gap",
    body: "A modifier or documentation gap let the payer downcode or deny rather than pay the level billed.",
  },
  downcoding: {
    key: "downcoding",
    specialtyScope: ["*"],
    headline: "Downcoded to a lower level",
    body: "The payer paid a lower level code than the one billed for {proc}.",
  },
  "oon-benefit-reduction": {
    key: "oon-benefit-reduction",
    specialtyScope: ["*"],
    headline: "Low out of network allowed amount",
    body: "The claim was paid at a low out of network allowed amount, far under the billed charge.",
  },
  "prior-auth-mismatch": {
    key: "prior-auth-mismatch",
    specialtyScope: ["*"],
    headline: "Prior authorization mismatch",
    body: "A prior authorization mismatch triggered a retroactive denial after the procedure was done.",
  },
  "frequency-limit": {
    key: "frequency-limit",
    specialtyScope: ["pain"],
    headline: "Frequency or level limit applied",
    body: "A frequency or level limit was applied to the injection series, denying covered levels.",
  },
};

/**
 * Ordered default reason set per specialty. The composition rule fills toward
 * four or five reasons from this list after the payer emphasis reasons.
 */
export const SPECIALTY_REASON_KEYS: Record<SpecialtySlug, DenialReasonKey[]> = {
  spine: [
    "qpa-anchoring",
    "instrumentation-stripped",
    "multiple-procedure-reduction",
    "assistant-cosurgeon-stripped",
    "bundling",
    "oon-benefit-reduction",
    "downcoding",
  ],
  orthopedics: [
    "qpa-anchoring",
    "multiple-procedure-reduction",
    "bundling",
    "assistant-cosurgeon-stripped",
    "oon-benefit-reduction",
    "downcoding",
    "medical-necessity",
  ],
  neurosurgery: [
    "qpa-anchoring",
    "assistant-cosurgeon-stripped",
    "multiple-procedure-reduction",
    "bundling",
    "oon-benefit-reduction",
    "medical-necessity",
  ],
  plastics: [
    "medical-necessity",
    "qpa-anchoring",
    "bundling",
    "oon-benefit-reduction",
    "modifier-gap",
    "downcoding",
  ],
  pain: [
    "frequency-limit",
    "medical-necessity",
    "qpa-anchoring",
    "modifier-gap",
    "bundling",
    "oon-benefit-reduction",
    "prior-auth-mismatch",
  ],
  hand: [
    "qpa-anchoring",
    "bundling",
    "modifier-gap",
    "oon-benefit-reduction",
    "downcoding",
    "medical-necessity",
  ],
};

/**
 * Reason keys for a specific code: the specialty default set, with the bundling
 * pattern pulled forward for add on codes (which are the ones most often folded
 * into a primary line). Returns [] for an unknown code.
 */
export function codeReasonKeys(code: string): DenialReasonKey[] {
  const meta = getCodeMeta(code);
  if (!meta) return [];
  const base = SPECIALTY_REASON_KEYS[meta.specialty] ?? [];
  if (meta.addOn) {
    return ["bundling", ...base.filter((k) => k !== "bundling")];
  }
  return base;
}

/**
 * Payer emphasis (build spec section 3.3). Commonly observed patterns for each
 * named payer, never a rule about a specific claim. The first one or two that
 * fit a code's specialty seed the composed denial block.
 */
export const PAYER_EMPHASIS: Record<string, DenialReasonKey[]> = {
  unitedhealthcare: ["qpa-anchoring", "bundling"],
  aetna: ["medical-necessity", "downcoding"],
  cigna: ["multiple-procedure-reduction", "modifier-gap"],
  anthem: ["qpa-anchoring", "oon-benefit-reduction"],
  hcsc: ["bundling", "prior-auth-mismatch"],
  horizon: ["oon-benefit-reduction", "downcoding"],
  bcbs: ["qpa-anchoring", "oon-benefit-reduction"],
  humana: ["downcoding", "medical-necessity"],
  centene: ["prior-auth-mismatch", "oon-benefit-reduction"],
  molina: ["prior-auth-mismatch", "medical-necessity"],
  oscar: ["oon-benefit-reduction", "modifier-gap"],
  kaiser: ["medical-necessity", "oon-benefit-reduction"],
};

/** The twelve named payers that fan out into the deepest catalog tier. */
export const NAMED_PAYER_SLUGS: ReadonlySet<string> = new Set(
  Object.keys(PAYER_EMPHASIS),
);

export function isNamedPayer(slug: string): boolean {
  return NAMED_PAYER_SLUGS.has(slug);
}

export function payerEmphasis(slug: string): DenialReasonKey[] {
  return PAYER_EMPHASIS[slug] ?? [];
}

/** Reason scope check: does this reason apply to the given specialty? */
export function reasonAppliesToSpecialty(
  key: DenialReasonKey,
  specialty: SpecialtySlug,
): boolean {
  const scope = DENIAL_REASONS[key].specialtyScope;
  return scope.includes("*") || scope.includes(specialty);
}
