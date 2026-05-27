export type TierId = "basic" | "plus" | "pro";

export type TierDefinition = {
  id: TierId;
  name: string;
  tagline: string;
  bestFor: string;
  inclusions: string[];
  compactInclusions: string[];
  notIncluded?: string;
  recommended?: boolean;
  /** Tier lives on Kronos Revenue; card links out instead of demo. */
  externalOnly?: boolean;
};

export const PRICING_QUALITATIVE_LINE =
  "Pricing is shared on your demo call after we learn your specialty, state, and volume. No published list prices.";

export const PRICING_SECTION_HEADLINE = "Three ways to handle NSA";

export const TIER_ROUTING_HEADLINE =
  "The right fit depends on who operates the workflow, not claim volume alone.";

export const TIER_ROUTING_LINES = [
  "Comfortable running software → Sydra Self-Serve (any volume)",
  "Software plus a backstop → Sydra + Kronos Support",
  "Zero ops / fully outsourced → Kronos Full-Service (any volume)",
] as const;

export const PRICING_SECTION_SUBHEAD =
  "Same specialty depth across every tier. Schedule a demo and we will recommend the fit for your practice.";

export function tierRoutingFaqAnswer(): string {
  return `${TIER_ROUTING_HEADLINE} ${TIER_ROUTING_LINES.join(". ")}.`;
}

export const DEMO_TRUST_BLOCK =
  "A 15 minute call with a Kronos specialist. We walk through Sydra live on a real claim, ask about your specialty and OON volume, and recommend the tier that fits. You leave with a quote, a sandbox account if you want one, and zero pressure.";

export const TIERS: TierDefinition[] = [
  {
    id: "basic",
    name: "Sydra Self-Serve",
    tagline: "The software, run by your team.",
    bestFor: "Your team runs the software in house.",
    inclusions: [
      "Full Sydra software access for your billing team",
      "Unlimited claims in the platform",
      "Specialty trained CPT coding, one claim per code",
      "Documentation, knowledge base, and community forum",
      "Federal and state IDR submission drafting",
    ],
    compactInclusions: [
      "Full software access, your team operates claims",
      "Specialty trained, one claim per CPT",
      "Documentation and knowledge base",
    ],
  },
  {
    id: "plus",
    name: "Sydra + Kronos Support",
    tagline: "The software, with a Kronos specialist on call.",
    bestFor: "Software you operate, plus a backstop on tricky cases.",
    recommended: true,
    inclusions: [
      "Everything in Self-Serve",
      "Live support 9 to 5 ET, Monday through Friday",
      "24 hour email response on escalations",
      "Monthly account review with your team",
      "Escalation path on disputed claims and edge case CPTs",
      "Training included for new billers",
    ],
    compactInclusions: [
      "Everything in Self-Serve",
      "Live support and monthly account review",
      "Escalation on disputed claims",
    ],
  },
  {
    id: "pro",
    name: "Kronos Full-Service",
    tagline: "Every claim handled end to end.",
    bestFor: "You want every claim handled without operating software.",
    externalOnly: true,
    inclusions: [
      "Lives on the Kronos Revenue site",
      "Kronos team operates every claim",
      "Specialty trained, custom coded submissions",
      "Dedicated specialist and quarterly recovery review",
      "Materially less than typical 20% attorney contingency",
    ],
    compactInclusions: [
      "Fully outsourced on Kronos Revenue",
      "Dedicated specialist on every file",
      "Alternative to IDR attorneys",
    ],
  },
];

export type ComparisonCell = boolean | "partial" | string;

export type ComparisonRow = {
  feature: string;
  basic: ComparisonCell;
  plus: ComparisonCell;
  pro: ComparisonCell;
};

export const TIER_COMPARISON: ComparisonRow[] = [
  {
    feature: "Who runs claims",
    basic: "Your team",
    plus: "Your team + Kronos on call",
    pro: "Kronos team",
  },
  {
    feature: "Software platform access",
    basic: true,
    plus: true,
    pro: "Managed for you",
  },
  {
    feature: "Support",
    basic: "Docs, KB, community",
    plus: "Live 9–5 ET, 24 hr email",
    pro: "Dedicated specialist",
  },
  {
    feature: "Account review",
    basic: false,
    plus: "Monthly",
    pro: "Quarterly",
  },
  {
    feature: "Specialty depth",
    basic: "Ortho, neuro, spine, plastics, anesthesia, gen surg",
    plus: "Same + Kronos specialist",
    pro: "Same + specialist on every file",
  },
  {
    feature: "One claim per CPT (no batching)",
    basic: true,
    plus: true,
    pro: true,
  },
  {
    feature: "How to start",
    basic: "Schedule a demo",
    plus: "Schedule a demo",
    pro: "Get a free NSA IDR review",
  },
];

export function getTierById(id: TierId): TierDefinition {
  const tier = TIERS.find((t) => t.id === id);
  if (!tier) {
    throw new Error(`Unknown tier: ${id}`);
  }
  return tier;
}

export function pricingFaqAnswer(): string {
  return `${PRICING_SECTION_HEADLINE}. Self-Serve is software your team runs in house. Sydra + Kronos Support adds live specialists and monthly reviews. Kronos Full-Service is fully outsourced on our sister site. ${PRICING_QUALITATIVE_LINE}`;
}

export function isValidTierId(value: string | null): value is TierId {
  return value === "basic" || value === "plus" || value === "pro";
}
