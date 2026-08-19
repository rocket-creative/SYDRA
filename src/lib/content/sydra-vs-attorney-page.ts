export const SYDRA_VS_ATTORNEY_HERO = {
  title: "Federal IDR: your options compared.",
  lead: "You don't need convincing that IDR recovers money. You've seen it. The question is how much of that recovery you keep, and whether the share you give up should keep growing as your volume does. Sydra is priced on per claim and subscription models rather than a percentage of recovery, so the cost of the service stops scaling against you at exactly the point your volume makes it most expensive.",
};

/**
 * Three filing arrangements compared on cost. These are not the four audience
 * paths on the homepage, which describe who you are rather than how the filing
 * gets done. Both Sydra columns are available to any of those four audiences.
 */
export const OPTIONS_COMPARISON_COLUMNS = [
  "Contingency firm",
  "In house with Sydra",
  "Sydra files for you",
] as const;

export type OptionsComparisonRow = {
  feature: string;
  values: [string, string, string];
};

export const OPTIONS_COMPARISON_ROWS: OptionsComparisonRow[] = [
  {
    feature: "Cost",
    values: [
      "Typically 20% of every recovery",
      "Per claim or subscription, quoted to volume",
      "Per claim or subscription, quoted to volume",
    ],
  },
  {
    feature: "Your time per claim",
    values: ["Minimal", "About five minutes", "Minimal"],
  },
  {
    feature: "Who owns the submission",
    values: ["The firm", "Your billing team", "Sydra, with your approval"],
  },
  {
    feature: "Scales with volume",
    values: [
      "Cost scales with every dollar recovered",
      "Cost stays flat as volume grows",
      "Cost stays flat as volume grows",
    ],
  },
  {
    feature: "Handles related litigation",
    values: ["Yes", "No", "No"],
  },
];

export const OPTIONS_COMPARED_SECTIONS = [
  {
    id: "heading-when-contingency-firm",
    title: "When a contingency firm is the right answer",
    paragraphs: [
      "A firm is genuinely the better choice in three situations. If the dispute has escalated beyond IDR into litigation, you need counsel and software will not help. If you are fighting a broader contract or network fight with a payer, IDR is one front in a larger matter and it should be run by lawyers. And if you have no billing staff at all and want zero involvement, a firm that takes a percentage carries all of the risk — that is what the percentage buys.",
      "Where the percentage stops making sense is volume. A contingency rate that is reasonable on four claims a year is expensive on four hundred, because the cost grows with every dollar you recover while the work per claim does not.",
    ],
  },
  /*
   * Signpost, not a second argument. This page is written for a practice paying
   * a contingency and weighing its options, and the case for the firms
   * themselves turns on recoveries per FTE, a different reader entirely. It gets
   * its own page rather than a competing section here.
   */
  {
    id: "heading-if-you-are-a-firm",
    title: "If you are the firm, not the practice",
    paragraphs: [
      "Firms filing on behalf of client practices use Sydra too, and for a different reason. The constraint on an IDR practice is reviewer hours per case, which is why small disputes get declined. The argument there is recoveries per FTE, not cost per recovery, and it is set out on its own page.",
    ],
    ctaHref: "/idr-for-contingency-firms",
    ctaLabel: "See the per FTE argument",
  },
] as const;
