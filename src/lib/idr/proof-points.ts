/**
 * Sourced, dated statistics used as on-page data atoms and proof points.
 *
 * Every value is accurate to the most recent public reporting at the time of
 * writing. A `verifyBeforePublish: true` flag means the figure must be
 * re-checked against the current-year CMS IDR Public Use File (PUF) or the
 * cited analysis before it appears on a live page, because these numbers move
 * as new public use files publish.
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
  | "surgery-multiple"
  | "neuro-multiple"
  | "emergency-multiple"
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
  {
    id: "above-qpa",
    value: "88%",
    claim: "In about 88 percent of determinations, the prevailing offer beat the qualifying payment amount.",
    source: "CMS Federal IDR Public Use Files",
    asOf: "2024 to 2025",
    verifyBeforePublish: true,
  },
  {
    id: "surgery-multiple",
    value: "up to 1,700%+",
    claim: "Surgical disputes have awarded roughly 970 percent to over 1,700 percent of the qualifying payment amount across recent reporting periods.",
    source: "CMS Federal IDR Public Use Files; CRS R48738; Georgetown CHIR",
    asOf: "2024 to 2025",
    verifyBeforePublish: true,
  },
  {
    id: "neuro-multiple",
    value: "1,200%+",
    claim: "Neurology and neuromuscular disputes have awarded over 1,200 percent of the qualifying payment amount.",
    source: "CMS Federal IDR Public Use Files; Georgetown CHIR",
    asOf: "2024",
    verifyBeforePublish: true,
  },
  {
    id: "emergency-multiple",
    value: "~257%",
    claim: "Emergency disputes award far smaller multiples, around 257 percent of the qualifying payment amount, which is why the aggregators crowd that lane and surgery stays open.",
    source: "Georgetown CHIR; CMS PUF",
    asOf: "H1 2024",
    verifyBeforePublish: true,
  },
  {
    id: "radiology-multiple",
    value: "~559% to 594%",
    claim: "Radiology disputes award around 559 to 594 percent of the qualifying payment amount.",
    source: "Georgetown CHIR; CMS PUF (Radiology Partners cohort)",
    asOf: "2024 to 2025",
    verifyBeforePublish: true,
  },
  {
    id: "total-volume",
    value: "~4.8 million",
    claim: "About 4.8 million disputes were filed through the end of 2025, against the roughly 17,000 per year Congress expected. Most eligible claims are never disputed.",
    source: "Georgetown CHIR; CMS bi-monthly updates",
    asOf: "through Dec 2025",
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
