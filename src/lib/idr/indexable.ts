import { isReleasedCptWave } from "@/lib/seo/phasing";

/**
 * The slow index gate (build spec section 5).
 *
 * Build everything now. Control what Google sees with one data driven flag, not
 * with a staged build. A catalog page may be indexed only when it passes the
 * real difference check AND its tier wave has been released. Pages that are not
 * yet indexable still render fully and still serve paid traffic on noindex.
 */

export type CatalogTier =
  | "core"
  | "specialty"
  | "guide"
  | "state"
  | "specialtyState"
  | "cpt"
  | "cptState"
  | "cptStatePayer";

/**
 * The single config value SEO raises over time. Raising it flips eligible pages
 * to index automatically, with no content redeploy. Driven by SEO_CURRENT_WAVE.
 */
export const CURRENT_WAVE: number = (() => {
  const raw = Number(process.env.SEO_CURRENT_WAVE);
  return Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1;
})();

/** Which wave each tier belongs to (build spec section 5.2). */
export const TIER_WAVE: Record<CatalogTier, number> = {
  core: 1,
  specialty: 1,
  guide: 1,
  state: 2,
  specialtyState: 2,
  cpt: 3,
  cptState: 3,
  cptStatePayer: 4,
};

export type IndexInput = {
  tier: CatalogTier;
  /** Real pathway loaded for the page's state (state and deeper tiers). */
  hasStatePathway?: boolean;
  /** Count of genuine composed denial reasons on the page. */
  reasonCount?: number;
  /** Length of the procedure descriptor (cpt.plainLine). */
  plainLineLength?: number;
  /** Two letter state code, for deep tier batch release. */
  stateCode?: string;
  /** Whether the page's state is a launch state (state tier indexes in wave 1). */
  isLaunchState?: boolean;
  /** Payer tier only: the composed denial block is not a name swap. */
  payerAngleIsDistinct?: boolean;
};

/**
 * Effective wave for a page. The six launch state pages and their specialty by
 * state pages are strong and distinct, so they release in wave 1 even though the
 * remaining 51 states release in wave 2 (build spec section 5.2).
 */
function effectiveWave(input: IndexInput): number {
  const base = TIER_WAVE[input.tier];
  if (
    (input.tier === "state" || input.tier === "specialtyState") &&
    input.isLaunchState
  ) {
    return 1;
  }
  return base;
}

const PATHWAY_TIERS = new Set<CatalogTier>([
  "state",
  "specialtyState",
  "cptState",
  "cptStatePayer",
]);

const REASON_TIERS = new Set<CatalogTier>([
  "specialtyState",
  "cptState",
  "cptStatePayer",
]);

const PLAINLINE_TIERS = new Set<CatalogTier>([
  "cpt",
  "cptState",
  "cptStatePayer",
]);

/** Deep tiers whose rollout is batched by released state (waves 3 and 4). */
const BATCHED_TIERS = new Set<CatalogTier>(["cptState", "cptStatePayer"]);

/**
 * The real difference check (build spec section 5.1). A catalog page is
 * indexable only when its wave is released and it carries genuine, distinct
 * substance: a state pathway, three or more denial reasons, a procedure
 * descriptor, and, for a payer page, a payer angle that is not a name swap.
 */
export function isIndexable(input: IndexInput): boolean {
  if (effectiveWave(input) > CURRENT_WAVE) return false;

  if (PATHWAY_TIERS.has(input.tier) && !input.hasStatePathway) return false;
  if (REASON_TIERS.has(input.tier) && (input.reasonCount ?? 0) < 3) return false;
  if (PLAINLINE_TIERS.has(input.tier) && (input.plainLineLength ?? 0) <= 0) {
    return false;
  }
  if (input.tier === "cptStatePayer" && !input.payerAngleIsDistinct) {
    return false;
  }
  if (
    BATCHED_TIERS.has(input.tier) &&
    input.stateCode &&
    !isReleasedCptWave(input.stateCode)
  ) {
    return false;
  }

  return true;
}

const INDEX = { index: true, follow: true } as const;
/** Noindex pages still render fully and still serve paid traffic. */
const NOINDEX = { index: false, follow: true } as const;

export function robotsFor(indexable: boolean) {
  return indexable ? INDEX : NOINDEX;
}
