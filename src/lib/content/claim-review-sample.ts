/** Labeled sample claim review. Figures are illustrative, not a specific practice. */

export const CLAIM_REVIEW_SAMPLE = {
  title: "Claim Review — Sample",
  kicker: "",
  preparedLine: "Sample document · Prepared for illustration · Figures are representative, not a specific practice",
  verdict: "Eligible for federal IDR.",
  verdictDetail:
    "Non-emergency service by an out-of-network surgeon at an in-network facility, with no valid notice-and-consent on file. This is squarely within the No Surprises Act, and it's underpaid.",
  why: [
    "Service was furnished at an in-network ambulatory surgery center by an out-of-network provider. Under the NSA, the patient can't be balance-billed and the payment dispute goes to federal IDR.",
    "No valid notice-and-consent waiver was obtained. Had one been signed correctly, the claim would fall outside the process — this is the single most common reason a claim we review turns out ineligible.",
    "Plan is fully insured and issued in North Carolina. North Carolina has no qualifying state process for this service type, so federal IDR governs.",
  ],
  money: [
    { label: "CPT", value: "64721 — open carpal tunnel release" },
    { label: "Billed", value: "$6,800" },
    { label: "Plan allowed", value: "$1,410" },
    { label: "Plan paid", value: "$1,128" },
    { label: "Payer's stated QPA", value: "$1,410" },
    { label: "Comparable resolved disputes", value: "$3,100 – $4,900" },
    {
      label: "Estimated recovery on this claim",
      value: "$2,400 – $3,500 above what was paid",
      emphasize: true,
    },
  ],
  moneyNote:
    "Confidence is moderate. A copy of the plan's QPA disclosure would tighten this — payers frequently understate QPA, and a challenge to the calculation itself is often worth more than the offer.",
  clock: [
    { label: "Date of service", value: "March 4, 2026" },
    {
      label: "Open negotiation window",
      value: "30 business days, initiated through the federal IDR portal",
    },
    {
      label: "Open negotiation must start by",
      value: "on or before the deadline tied to your initial payment date",
    },
    {
      label: "Estimated IDR filing deadline",
      value: "shortly after the open negotiation window closes",
    },
  ],
  clockCallout: "This one is still comfortably in window.",
  clockNote:
    "Roughly a third of the claims we review are not, which is the main reason practices lose money they were entitled to.",
  clockRule: "Deadlines are strict and there is no cure for missing one.",
  offer: "$4,200",
  fileNote:
    "Three supporting factors: the provider's level of training and the complexity of the specific case; the market rate for this service in this geography, which sits well above the payer's stated QPA; and the payer's own historical contracted rates for comparable open procedures. The QPA is a floor in this dispute, not a ceiling — and the gap between $1,410 and the comparable award range is the argument.",
  costs: [
    "Administrative fee: $15 per party (down from $115 as of June 11, 2026)",
    "Certified IDRE fee: set per the current published range; the losing party pays it",
    "This claim could be batched with other 64721 disputes against the same payer, spreading the fee",
  ],
  costsNote: "Against a claim worth $2,400–$3,500, the arithmetic is not close.",
  nextSelfHeading: "See it run on your own claim.",
  nextSelf:
    "Fifteen minutes on Zoom, using your claim and your CPT codes. You will see the real output and get a price. Nothing to sign on the call.",
  nextFullHeading: "Or we file it for you.",
  nextFull: "We prepare and submit, you keep the recovery.",
  footer:
    "Sample document. Figures are representative of a typical hand surgery claim and are not drawn from a specific practice. Not a guarantee of recovery, and not legal advice.",
} as const;
