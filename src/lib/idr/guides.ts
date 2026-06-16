import type { EntityFaqItem } from "@/components/idr/entity-faq";

/**
 * Question / how-to pages (playbook section 2: the highest commercial-intent
 * surface). These are hand-written evergreen guides, indexable by default.
 */
export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: EntityFaqItem[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-dispute-an-underpaid-out-of-network-claim",
    title: "How to dispute an underpaid out of network claim.",
    metaTitle:
      "How to Dispute an Underpaid Out of Network Claim | Federal IDR | Sydra",
    metaDescription:
      "A step by step guide for surgical billing teams: open negotiation, federal IDR eligibility, deadlines, and how to build a winning submission for an underpaid out of network claim.",
    lead: "When an insurer pays a surgical claim below the market rate out of network, the No Surprises Act gives providers a path to dispute it. Here is how the process works, step by step.",
    sections: [
      {
        heading: "Start with open negotiation.",
        paragraphs: [
          "Before federal IDR, the No Surprises Act requires a 30 business day open negotiation period. Send the Notice of Open Negotiation to the payer with the claim details and your proposed amount.",
          "If the period elapses without agreement, the claim becomes eligible to move into independent dispute resolution.",
        ],
      },
      {
        heading: "Confirm eligibility.",
        paragraphs: [
          "Federal IDR applies to out of network claims covered by the No Surprises Act. Self funded ERISA plans follow the federal process; some fully insured plans follow a state pathway. Confirm the plan type before filing.",
          "Eligibility errors are the leading cause of dispute delays, so resolve any flags before preparing the submission.",
        ],
      },
      {
        heading: "Build the submission.",
        paragraphs: [
          "A strong submission pairs a specific payment offer with a market rate justification citing prior determinations on the same code, plus a clinical narrative from the operative note and the provider credential block.",
          "Sydra prepares all of this from an uploaded EOB and operative note in under 5 minutes; your billing team reviews and submits.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do I have to file federal IDR?",
        a: "After open negotiation ends without agreement, the No Surprises Act sets a limited window to initiate IDR. Missing it forfeits the dispute, so track the negotiation end date and the initiation deadline per claim.",
      },
      {
        q: "What does it cost to file?",
        a: "Each party pays an IDR administrative fee, plus the certified entity fee. The losing party generally bears more of the cost, so eligibility and submission quality matter.",
      },
    ],
  },
  {
    slug: "what-is-the-qpa-and-why-it-matters",
    title: "What is the QPA, and why it matters in IDR.",
    metaTitle: "What Is the QPA in Federal IDR? | No Surprises Act | Sydra",
    metaDescription:
      "The qualifying payment amount (QPA) anchors the insurer's offer in federal IDR. Learn what the QPA is, how it is set, and how providers win awards above it.",
    lead: "The qualifying payment amount, or QPA, is the benchmark insurers lean on in federal IDR. Understanding it is the key to building an offer that wins.",
    sections: [
      {
        heading: "What the QPA is.",
        paragraphs: [
          "The QPA is the insurer's median contracted rate for a service in a geographic region, set under the No Surprises Act. Insurers argue it is the correct payment benchmark.",
          "Federal IDR is final offer arbitration: the certified entity picks one of the two submitted offers. The provider's offer wins when the evidence supports a higher, market consistent amount.",
        ],
      },
      {
        heading: "How providers win above the QPA.",
        paragraphs: [
          "Awards routinely exceed the QPA when the submission cites prior determinations on the same code and documents the clinical complexity of the specific case.",
          "A generic usual and customary argument rarely beats the QPA; prior determination citations do the work that wins.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do IDR awards usually exceed the QPA?",
        a: "Yes. Public CMS data shows the large majority of awards exceed the qualifying payment amount, often by a multiple, when submissions are well supported.",
      },
    ],
  },
];

const GUIDE_INDEX = new Map(GUIDES.map((g) => [g.slug, g]));

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): Guide | null {
  return GUIDE_INDEX.get(slug) ?? null;
}
