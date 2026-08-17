import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

export const IDR_FOR_BILLING_HERO = {
  eyebrow: "For billing companies and RCM firms",
  title: "Filing federal IDR across more than one client practice?",
  lead: "IDR is one of the last major revenue functions still handled largely by hand: eligibility screening, batch construction, deadline tracking, and submission assembly, all done claim by claim. That labor intensity is why most RCM firms either decline the work or price it painfully. Sydra supplies the automation layer underneath it, so you can open or expand an IDR service line without adding headcount in proportion to volume.",
  whiteLabelBold: "It can run white label under your own brand.",
  whiteLabelRest: "Your clients see your service, not ours.",
  ctaLabel: "Request a 15-minute demo",
  ctaHref: "/demo",
};

export const IDR_FOR_BILLING_STATS = [
  {
    value: "88%",
    label: "of properly filed federal IDR disputes get paid",
    caption: "Source: Georgetown University CHIR, March 2026",
  },
  {
    value: "5 minutes",
    label: "to prepare a complete submission packet",
  },
  {
    value: "~10%",
    label: "of eligible out of network claims are estimated to actually reach IDR today",
    caption: "Source: ACEP analysis of CMS data",
  },
] as const;

export const IDR_FOR_BILLING_VOLUME_SECTION: ContentSection = {
  id: "heading-volume-problem",
  title: "The volume problem is different when it's not your practice.",
  paragraphs: [
    "A single practice's billing team can absorb 25 to 40 minutes per manual IDR submission because the volume is bounded by one practice's claims. A billing company or RCM firm doesn't have that ceiling. The volume is the sum of every client practice's eligible claims, and it grows every time you sign a new client.",
    "At that scale, the 25 to 40 minute manual build time isn't a staffing inconvenience. It is the reason claims across your whole book go unfiled.",
  ],
};

export const IDR_FOR_BILLING_SECTIONS: ContentSection[] = [
  {
    id: "heading-tenant-isolation",
    title: "What stays separate, client by client.",
    paragraphs: [
      "Sydra prepares a specialty coded federal IDR submission in about five minutes, with tenant isolation built in at the data layer so each client's claims, documents, and history stay separate.",
      "Sydra's tenant isolation is enforced at multiple layers, not just a permissions toggle: application logic, API authorization, database row level security, and audit logging all scope to the individual practice's tenant identifier. For a firm handling several clients' PHI under separate BAAs, that separation is the part that has to be structurally true, not just promised in a contract.",
    ],
    list: [
      "Each practice's claims, documents, and submission history stay within that practice's tenant.",
      "Audit logs capture user, timestamp to the second, action, record affected, and IP address, available to the account administrator on request.",
      "A Business Associate Agreement is available for every covered entity and business associate using Sydra to process PHI, executed during contracting.",
    ],
  },
  {
    id: "heading-one-claim-per-cpt",
    title: "One claim per CPT by default, across every client practice.",
    paragraphs: [
      "Sydra defaults to one claim per CPT, because filing individually generally protects win rate when high value codes would otherwise share one arbiter offer. Batching is CMS sanctioned as of the 2026 rule and available when your team chooses it for a specific submission. That discipline matters more, not less, at billing company scale: the more claims moving through your team every week, the more an unexamined batch decision compounds across every client's disputes.",
      "Sydra's specialty coding covers orthopedics, neurosurgery, spine, plastics, anesthesia, and general surgery, the same specialty depth on every tier, whether it's one practice or ten.",
    ],
  },
  {
    id: "heading-pricing-volume",
    title: "Pricing that scales with volume, not a per seat model.",
    paragraphs: [
      "Sydra doesn't publish list pricing because the right structure depends on specialty mix, state mix, and monthly out of network volume, all of which look different for a billing company aggregating several clients than for a single practice. Every tier is structured below a typical 20 percent contingency.",
      "On the demo call, bring your actual client volume and specialty mix and get a real number instead of a generic estimate that doesn't reflect how your book is built.",
    ],
  },
];

export const IDR_FOR_BILLING_FAQS: ContentFaq[] = [
  {
    q: "Can Sydra handle IDR for more than one practice at once?",
    a: "Sydra's tenant isolation is built at the data layer for exactly this kind of separation. Each practice's claims, documents, and history stay scoped to that practice's tenant identifier. Bring your specific client structure to the demo call and we'll confirm the account setup that fits how your firm operates.",
  },
  {
    q: "Do you offer a firm wide dashboard across all our client practices?",
    a: "This depends on your specific setup. Ask on the demo call so we can show you accurately rather than guess here.",
  },
  {
    q: "Is pricing different for a billing company than for a single practice?",
    a: "Sydra doesn't publish list pricing for any tier. The quote depends on specialty mix, state mix, and monthly out of network volume, which we walk through on the demo call.",
  },
  {
    q: "Does Sydra replace our clearinghouse or EMR integrations across multiple client systems?",
    a: "No. Sydra is the IDR layer. It assembles the federal submission packet and exports a submission ready file. Your clearinghouse and EMR relationships, per client, stay exactly as they are.",
  },
  {
    q: "Do you still take a percentage of recovery at billing company volume?",
    a: "No. Sydra is priced on per claim and subscription models rather than a percentage of recovery, so your cost does not grow with the size of the recoveries you win for clients.",
  },
];

export const IDR_FOR_BILLING_CTA_LEAD =
  "Free 15 minute demo. No commitment. Bring a real claim from any specialty in your book and we'll show you what Sydra generates, and talk through how the account structure fits a multi client firm.";

export const IDR_FOR_BILLING_CTA_BAND = {
  title: "Ready to see Sydra on a real denied claim from one of your client practices?",
  lead: "Free 15 minute demo. No commitment. Bring a real claim from any specialty in your book and we'll show you what Sydra generates, and talk through how the account structure fits a multi client firm.",
  ctaLabel: "Request a 15-minute demo",
};
