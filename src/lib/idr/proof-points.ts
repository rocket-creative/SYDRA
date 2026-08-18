/**
 * Sourced, dated statistics used as on-page data atoms and proof points.
 *
 * Two kinds of figure live here and they must never be blended:
 *
 *   PROOF_POINTS      published federal data. Category facts about every filer
 *                     in the CMS dataset. Not claims about Sydra.
 *   SYDRA_PERFORMANCE Sydra's own client outcomes. Performance claims, each one
 *                     carrying the denominator that makes it defensible.
 *
 * Every PROOF_POINTS value is accurate to the most recent public reporting at
 * the time of writing. `verifyBeforePublish` marks a figure that moves as new
 * public use files publish, so it needs a fresh read against the current CMS
 * PUF or cited analysis at each review. It is a review marker only: nothing
 * reads it, and every one of these figures is already live on /idr. The
 * enforced staleness gate is `npm run check:sources`, which fails the build
 * when a `lastVerified` date in src/lib/content/sources.json passes 120 days.
 * Update the source entry there when you re-verify a number here.
 */

export interface ProofPoint {
  id: string;
  value: string;
  claim: string;
  source: string;
  asOf: string;
  verifyBeforePublish: boolean;
}

export type ProofPointId =
  | "win-rate"
  | "win-rate-2024"
  | "above-qpa"
  | "radiology-multiple"
  | "total-volume"
  | "specialty-share"
  | "self-funded-share"
  | "ny-lookback"
  | "ssl-states"
  | "deadline";

export const PROOF_POINTS: ProofPoint[] = [
  {
    id: "win-rate",
    value: "88%",
    claim: "Providers win about 88 percent of properly filed federal IDR disputes.",
    source: "CMS Federal IDR Public Use Files; Georgetown University CHIR analysis",
    asOf: "H1 2025",
    verifyBeforePublish: true,
  },
  {
    id: "win-rate-2024",
    value: "85%",
    claim: "Providers prevailed in about 85 percent of determinations in 2024.",
    source: "Congressional Research Service R48738",
    asOf: "2024",
    verifyBeforePublish: true,
  },
  /*
   * One entry, not two. This claim previously appeared twice in this array at
   * 88% (2024 to 2025) and 87% (H2 2025), which put a contradiction on /idr
   * where the whole array renders. The later-dated CMS figure wins.
   */
  {
    id: "above-qpa",
    value: "87%",
    claim: "In about 87 percent of payment determinations, the prevailing offer exceeded the qualifying payment amount.",
    source: "CMS, Federal IDR Supplemental Background, July to December 2025",
    asOf: "H2 2025",
    verifyBeforePublish: true,
  },
  {
    id: "radiology-multiple",
    value: "5.6x to 5.9x QPA",
    claim: "Radiology disputes award around 5.6 to 5.9 times the qualifying payment amount.",
    source: "Georgetown CHIR; CMS PUF (Radiology Partners cohort)",
    asOf: "2024 to 2025",
    verifyBeforePublish: true,
  },
  {
    id: "total-volume",
    value: "3.4 million",
    claim: "About 3.4 million disputes through June 2025, against the roughly 17,000 per year Congress expected. Most eligible claims are never disputed.",
    source: "Georgetown CHIR; CMS bimonthly updates",
    asOf: "June 2025",
    verifyBeforePublish: true,
  },
  {
    id: "specialty-share",
    value: "~9%",
    claim: "Surgery and neurology together were only about 9 percent of resolved cases, yet they win the largest multiples in the dataset.",
    source: "Georgetown CHIR",
    asOf: "2024",
    verifyBeforePublish: true,
  },
  {
    id: "self-funded-share",
    value: "~65%",
    claim: "About 65 percent of covered workers are in self funded plans, which always route to federal IDR regardless of state.",
    source: "Peterson KFF Health System Tracker",
    asOf: "2021 baseline",
    verifyBeforePublish: true,
  },
  {
    id: "ny-lookback",
    value: "3 years",
    claim: "New York lets providers challenge commercial payments going back three years, so claims written off as dead can be revived.",
    source: "New York surprise bill law; practitioner analyses",
    asOf: "2025",
    verifyBeforePublish: true,
  },
  {
    id: "ssl-states",
    value: "22 states",
    claim: "About 22 states have a specified state law that can govern fully insured disputes instead of the federal process.",
    source: "Commonwealth Fund",
    asOf: "2024 to 2025",
    verifyBeforePublish: true,
  },
  {
    id: "deadline",
    value: "4 business days",
    claim: "After the 30 business day open negotiation period, a provider has only four business days to initiate IDR or the claim is lost.",
    source: "CMS No Surprises Act IDR guidance",
    asOf: "2026",
    verifyBeforePublish: true,
  },
];

export function proofById(id: string): ProofPoint | undefined {
  return PROOF_POINTS.find((p) => p.id === id);
}

/**
 * Sydra's own client outcomes, as distinct from the published category figures
 * in PROOF_POINTS above. These are performance figures: they describe what
 * happened for a named (anonymized) Sydra client, not what the federal dataset
 * reports across all filers. Keep the two separated on the page, because a
 * reader who reads 92% as the federal rate or 88% as Sydra's record has been
 * misled in both directions.
 *
 * `scope` is not decoration. Every one of these figures is only defensible with
 * its denominator attached, so any page citing a value must render the scope
 * with it. The homepage does this through RESULTS_DISCLAIMER in
 * src/lib/content/homepage.ts; other pages must carry their own.
 */
export interface SydraPerformanceFigure {
  id: string;
  value: string;
  claim: string;
  /** The denominator and exclusions. Must be rendered wherever value is. */
  scope: string;
  source: string;
  asOf: string;
  /** True when the figure is a single outcome rather than a rate across cases. */
  singleCase: boolean;
}

export type SydraPerformanceId =
  | "sydra-win-rate"
  | "sydra-decided-cases"
  | "sydra-loss-rate"
  | "prior-firm-win-rate"
  | "award-multiple-case-example";

export const SYDRA_PERFORMANCE: SydraPerformanceFigure[] = [
  {
    id: "sydra-win-rate",
    value: "92%",
    claim: "Sydra clients have prevailed in 92 percent of decided federal IDR cases.",
    scope:
      "113 decided cases for one established client over the period measured. Excludes withdrawn, ineligible, and pending disputes.",
    source: "Sydra client records, presented with client permission",
    asOf: "2026",
    singleCase: false,
  },
  {
    id: "sydra-decided-cases",
    value: "113",
    claim: "113 decided federal IDR cases for the referenced Sydra client.",
    scope:
      "Decided cases only. Excludes withdrawn, ineligible, and pending disputes.",
    source: "Sydra client records, presented with client permission",
    asOf: "2026",
    singleCase: false,
  },
  {
    id: "sydra-loss-rate",
    value: "8%",
    claim: "8 percent of that client's decided cases were determined for the plan.",
    scope: "113 decided cases for one established client over the period measured.",
    source: "Sydra client records, presented with client permission",
    asOf: "2026",
    singleCase: false,
  },
  {
    id: "prior-firm-win-rate",
    value: "82.9%",
    claim:
      "The contingency firm the same client used previously prevailed in 82.9 percent of its decided cases.",
    scope:
      "76 decided cases under the prior firm, at a 20 percent contingency. Same client, earlier period.",
    source: "Sydra client records, presented with client permission",
    asOf: "2026",
    singleCase: false,
  },
  {
    id: "award-multiple-case-example",
    value: "20.30x QPA",
    claim:
      "One breast reduction claim (CPT 19318) with a qualifying payment amount of $2,500 was awarded $50,742.00.",
    scope:
      "A single case. Not a typical, average, or expected result, and not a rate across cases.",
    source: "Sydra client records, presented with client permission",
    asOf: "2026",
    singleCase: true,
  },
];

export function sydraPerformanceById(id: string): SydraPerformanceFigure | undefined {
  return SYDRA_PERFORMANCE.find((p) => p.id === id);
}
