import type { EntityFaqItem } from "@/components/idr/entity-faq";

/**
 * Comparison pages (playbook section 2). Slugs are always sydra-vs-{alternative}
 * and validated against this set so the route does not mint arbitrary URLs.
 */
export type Comparison = {
  slug: string;
  alternative: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  rows: { label: string; sydra: string; other: string }[];
  faqs: EntityFaqItem[];
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "sydra-vs-idr-attorney",
    alternative: "an IDR attorney",
    title: "Sydra vs an IDR attorney.",
    metaTitle: "Sydra vs an IDR Attorney | Keep the 20% You Would Pay | Sydra",
    metaDescription:
      "Compare Sydra software your billing team runs in house against an IDR attorney who keeps about 20% of every recovery. See the fee math and what you keep.",
    lead: "An IDR attorney typically keeps about 20% of every recovery, indefinitely. Sydra is software your billing team runs in house for a platform fee structured below that. Here is the comparison.",
    rows: [
      { label: "Who operates the workflow", sydra: "Your billing team", other: "The attorney's firm" },
      { label: "Cost structure", sydra: "Platform fee, below 20% contingency", other: "About 20% of every recovery" },
      { label: "Who keeps the recovery", sydra: "Your practice", other: "Practice, less the contingency" },
      { label: "Claims per CPT", sydra: "One claim per CPT", other: "Often batched" },
      { label: "Control of the submission", sydra: "Your team reviews and submits", other: "Handled by the firm" },
    ],
    faqs: [
      {
        q: "Is Sydra cheaper than an IDR attorney?",
        a: "For most practices at most volumes, yes. Attorneys keep about 20% of every recovery; Sydra is a platform fee structured below that, with an exact quote on the demo call.",
      },
      {
        q: "Do I lose support by moving off an attorney?",
        a: "Sydra plus Kronos Support adds a live specialist for complex or high value disputes, so your team keeps an escalation path while running the workflow in house.",
      },
    ],
  },
  {
    slug: "sydra-vs-in-house-manual",
    alternative: "manual in house filing",
    title: "Sydra vs filing IDR by hand.",
    metaTitle: "Sydra vs Manual In House IDR | 30 Minutes to Under 5 | Sydra",
    metaDescription:
      "Filing federal IDR by hand takes 25 to 40 minutes per claim. Compare manual in house filing against Sydra, which prepares the submission in under 5 minutes.",
    lead: "Filing federal IDR by hand takes 25 to 40 minutes per claim, so most teams file far fewer claims than they should. Sydra prepares the submission in under 5 minutes. Here is the comparison.",
    rows: [
      { label: "Time per claim", sydra: "Under 5 minutes", other: "25 to 40 minutes" },
      { label: "Market rate justification", sydra: "Prior determinations cited automatically", other: "Researched by hand" },
      { label: "Clinical narrative", sydra: "Drafted from the operative note", other: "Written from scratch" },
      { label: "Eligibility checks", sydra: "Flagged before drafting", other: "Manual review" },
      { label: "Throughput", sydra: "Scales without added headcount", other: "Limited by biller hours" },
    ],
    faqs: [
      {
        q: "How much time does Sydra actually save?",
        a: "Sydra reduces preparation from 25 to 40 minutes per claim to under 5, which returns hours of billing team time each month and lets practices file the claims they were skipping.",
      },
    ],
  },
];

const COMPARISON_INDEX = new Map(COMPARISONS.map((c) => [c.slug, c]));

export const COMPARISON_SLUGS = COMPARISONS.map((c) => c.slug);

export function getComparison(slug: string): Comparison | null {
  return COMPARISON_INDEX.get(slug) ?? null;
}
