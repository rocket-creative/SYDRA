import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

export const IDR_FILING_DEADLINE_HERO = {
  eyebrow: "THE CLOCK IS ALREADY RUNNING",
  title: "You have 4 business days to file.",
  subtitle: "Not 4 weeks.",
  paragraphs: [
    "A payer's out of network payment is an opening offer, not the amount owed. Federal IDR is how you contest it, and it runs on two clocks that never move.",
    "The open negotiation period runs 30 business days. Once it closes, you have exactly 4 business days to initiate. Miss that window and the claim is closed for that cycle. Permanently. No extension, no appeal path.",
    "This is the part of the process that should never depend on anyone's judgment, because the deadline does not depend on anyone's judgment either.",
  ],
};

export const IDR_FILING_DEADLINE_WINDOWS = [
  {
    step: "1",
    title: "Open negotiation",
    duration: "30 business days",
    detail:
      "Required attempt to settle with the plan before IDR can begin. The period cannot be skipped.",
  },
  {
    step: "2",
    title: "IDR initiation",
    duration: "4 business days",
    detail:
      "Once open negotiation closes, this is the only window left to file. Miss it and that cycle is over.",
  },
] as const;

export const IDR_FILING_DEADLINE_SECTIONS: ContentSection[] = [
  {
    id: "heading-two-windows",
    title: "The two windows that matter.",
    paragraphs: [
      "Federal IDR lives on two clocks. First, a 30 business day open negotiation period must run. Second, once that period closes, you have exactly 4 business days to initiate IDR for the claim.",
      "Miss either window and the claim is closed for that cycle. These are federal rules, not soft targets, and they do not extend for volume, staffing, or holidays inside a business day count.",
    ],
  },
  {
    id: "heading-get-deadline-right",
    title: "Why the deadline is the part to get right first.",
    paragraphs: [
      "Everything else in federal IDR is recoverable. A weak market rate justification can be strengthened next time. A missed deadline cannot be anything next time. The claim is simply gone, and it is gone for administrative reasons rather than because the plan was right about the money.",
      "That is why deadline tracking is the first thing Sydra does with a claim, before anything is drafted against it.",
    ],
  },
  {
    id: "heading-2026-urgency",
    title: "What changed in 2026 that makes this more urgent.",
    paragraphs: [
      "The CMS final rule of May 28, 2026, effective June 11, 2026, cut the administrative fee from $115 to $15 per party, per dispute. The clocks did not change. What changed is how many of your claims are now worth filing, which means more claims moving through the same two windows, and more opportunities to miss one.",
    ],
  },
  {
    id: "heading-close-to-window",
    title: "If you think you might already be close to the window.",
    paragraphs: [
      "Bring the claim to a free 15-minute call. Sydra runs an eligibility check that includes whether the filing window is still open before any packet is built.",
      "If the window is open, you see what a submission looks like on a real claim from your specialty. If it has already closed, you know that before spending time on documentation that cannot be filed this cycle.",
    ],
  },
];

export const IDR_FILING_DEADLINE_FAQS: ContentFaq[] = [
  {
    q: "How long do I have to initiate IDR after open negotiation ends?",
    a: "You have 4 business days to initiate federal IDR after the open negotiation period closes. That count is business days, not calendar days, and it does not extend once it starts.",
  },
  {
    q: "Is the 30 day open negotiation window business days or calendar days?",
    a: "Business days. The open negotiation period runs 30 business days, and the initiation window that follows is also 4 business days.",
  },
  {
    q: "What happens if I miss the 4 business day window?",
    a: "The claim is closed for that cycle. There is no appeal path for a missed initiation deadline. The underpayment cannot be disputed through federal IDR for that same cycle once the window closes.",
  },
  {
    q: "Can Sydra tell me if a claim is still inside the filing window?",
    a: "Yes. Sydra runs an eligibility check before building a packet, including whether the initiation window is still open for that claim.",
  },
  {
    q: "Does the 2026 filing fee change affect the deadline?",
    a: "No. The fee cut changed the economics of which claims are worth filing. The clocks themselves are unchanged: 30 business days for open negotiation, then 4 business days to initiate.",
  },
];

export const IDR_FILING_DEADLINE_CTA_LEAD =
  "Not sure if your window is still open?";

export const IDR_FILING_DEADLINE_CMS_HREF = "https://www.cms.gov/nosurprises";
export const IDR_FILING_DEADLINE_CMS_LABEL = "CMS No Surprises Act guidance";
