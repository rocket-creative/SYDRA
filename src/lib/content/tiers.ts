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
  /** Full Service starts with an in-site claim review, not a software demo. */
  externalOnly?: boolean;
};

export const PRICING_QUALITATIVE_LINE =
  "Pricing is shared on your demo call after we learn your specialty, state, and volume. No published list prices.";

export const PRICING_SECTION_HEADLINE =
  "Three ways to handle NSA IDR. Same specialty depth. Different operator.";

export const TIER_ROUTING_HEADLINE =
  "The right fit depends on who operates the workflow, not claim volume alone.";

export const TIER_ROUTING_LINES = [
  "Comfortable running software → Sydra Self Serve (any volume)",
  "Software plus a backstop → Sydra + Support",
  "Zero ops / fully outsourced → Sydra Full Service (any volume)",
] as const;

export const PRICING_SECTION_SUBHEAD =
  "Same specialty depth across every tier. Request a 15-minute demo and we'll recommend the fit for your practice.";

export function tierRoutingFaqAnswer(): string {
  return `${TIER_ROUTING_HEADLINE} ${TIER_ROUTING_LINES.join(". ")}.`;
}

export const DEMO_TRUST_BLOCK =
  "A 15 minute call with a Sydra specialist. We walk through Sydra live on a real claim, ask about your specialty and OON volume, and recommend the tier that fits. You leave with a quote, a sandbox account if you want one, and zero pressure.";

export const TIERS: TierDefinition[] = [
  {
    id: "basic",
    name: "Sydra Self Serve",
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
    name: "Sydra + Support",
    tagline: "The software, with a Sydra specialist on call.",
    bestFor: "Software you operate, plus a backstop on tricky cases.",
    recommended: true,
    inclusions: [
      "Everything in Self Serve",
      "Live support 9 to 5 ET, Monday through Friday",
      "24 hour email response on escalations",
      "Monthly account review with your team",
      "Escalation path on disputed claims and edge case CPTs",
      "Training included for new billers",
    ],
    compactInclusions: [
      "Everything in Self Serve",
      "Live support and monthly account review",
      "Escalation on disputed claims",
    ],
  },
  {
    id: "pro",
    name: "Sydra Full Service",
    tagline: "Every claim handled end to end.",
    bestFor: "You want every claim handled without operating software.",
    externalOnly: true,
    inclusions: [
      "Start with a free claim review on this site",
      "Sydra team operates every claim",
      "Specialty trained, custom coded submissions",
      "Dedicated specialist and quarterly recovery review",
      "Materially less than a typical 20% contingency",
    ],
    compactInclusions: [
      "Fully outsourced claim handling",
      "Dedicated specialist on every file",
      "A flat fee alternative to a typical 20% contingency",
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
    plus: "Your team + Sydra on call",
    pro: "Sydra team",
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
    plus: "Same + Sydra specialist",
    pro: "Same + specialist on every file",
  },
  {
    feature: "Per submission filing (client decides on batching)",
    basic: "Yes, by default. Batching available on request",
    plus: "Yes, by default. Batching available on request",
    pro: "Yes, by default. Batching available on request",
  },
  {
    feature: "How to start",
    basic: "Request a 15-minute demo",
    plus: "Request a 15-minute demo",
    pro: "Get a free claim review",
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
  return `${PRICING_SECTION_HEADLINE}. Self Serve is software your team runs in house. Sydra + Support adds live specialists and monthly reviews. Sydra Full Service is fully outsourced. Start with a free claim review. ${PRICING_QUALITATIVE_LINE}`;
}

export function isValidTierId(value: string | null): value is TierId {
  return value === "basic" || value === "plus" || value === "pro";
}
