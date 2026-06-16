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
  // Note: the sydra-vs-idr-attorney topic lives at the canonical root page
  // /sydra-vs-idr-attorney. The /compare/sydra-vs-idr-attorney variant 301s to
  // it (see next.config.ts redirects) to avoid two pages competing for the same
  // query, so it is intentionally not minted here.
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
