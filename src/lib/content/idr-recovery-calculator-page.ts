import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

export const IDR_RECOVERY_CALCULATOR_HERO = {
  title: "How much could properly filed federal IDR recover for your practice?",
  lead: "Enter monthly out of network claim volume and average disputed amount. Uses the published CMS win rate on the amount already in dispute. Award multiples versus QPA are not applied — this estimate is deliberately conservative. Not a Sydra performance claim.",
};

export const IDR_RECOVERY_CALCULATOR_SECTIONS: ContentSection[] = [
  {
    id: "heading-how-calculated",
    title: "How this number is calculated",
    paragraphs: [
      "Estimated annual recovery = monthly eligible claims × average disputed amount × 12 × 88 percent, capped so recovery never exceeds the amount in dispute. The three to five times award multiple applies to QPA, not to the disputed amount.",
      "The contingency comparison = that same recovery figure × 0.20, the typical contingency rate charged for out of network recovery.",
      "88% of properly filed federal IDR disputes get paid. Source: Georgetown University CHIR, March 2026.",
    ],
  },
  {
    id: "heading-deliberately-conservative",
    title: "This estimate is deliberately conservative",
    paragraphs: [
      "We apply the published 88% provider win rate to the amount already in dispute, and we stop there. We do not apply award multiples, and recovery is capped so it can never exceed what you are disputing.",
      "Real determinations run higher. CMS reports that the prevailing offer exceeded the qualifying payment amount in approximately 87% of payment determinations in the second half of 2025. We leave that out of the estimate on purpose — a number you can defend to your CFO is worth more than a bigger one you cannot.",
      "What this does not account for: your specialty's award patterns, your state's dynamics, or your payer mix. For a number specific to your practice, request a 15-minute demo and we will walk through it with your actual claims.",
      "Source: CMS, Federal IDR Supplemental Background, July–December 2025.",
    ],
  },
];

export const IDR_RECOVERY_CALCULATOR_FAQS: ContentFaq[] = [
  {
    q: "What does this calculator estimate?",
    a: "It estimates annual recovery and the portion a typical 20 percent contingency would keep, using the published provider win rate applied to the amount already in dispute. It is an illustration for planning, not a promise for any single claim.",
  },
  {
    q: "Are these Sydra win rates?",
    a: "No. The inputs mirror the same published CMS and Georgetown CHIR figures used elsewhere on this site. Sydra does not claim those outcomes as its own performance.",
  },
  {
    q: "What should I do with the estimate?",
    a: "Use it to compare keeping recovery in house against paying a contingency fee. Request a 15-minute demo if you want to walk through a real denied claim from your specialty and see how Sydra prepares the submission.",
  },
];

export const IDR_RECOVERY_CALCULATOR_CTA_LEAD =
  "Want a number specific to your practice, not just the aggregate estimate?";
