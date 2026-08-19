import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

export const IN_HOUSE_IDR_HERO = {
  title: "Your team can already file IDR. Time is the constraint.",
  subtitle: "Scale federal disputes with the team you already have.",
  lead: "A payer's out of network payment is an opening offer, not the amount owed, and federal IDR is how you contest it. Building one submission by hand takes 25 to 40 minutes, and that is the ceiling on how many disputes a practice pursues. The law, eligibility, and the win rate are not what holds the volume down. Sydra moves the ceiling, not the team.",
};

export const IN_HOUSE_IDR_SECTIONS: ContentSection[] = [
  {
    id: "heading-cost-of-time",
    title: "The real cost is time, not fees.",
    paragraphs: [
      "The administrative fee is $15 per party, per dispute. Set against a claim worth thousands, the fee was never the reason claims went unfiled. The reason is that a biller has a finite number of hours and each submission consumes half of one. The calculator above puts your own numbers on it. The output that matters is the last one: hours returned to your billing team each month.",
    ],
  },
  {
    id: "heading-capacity",
    title: "Capacity, not replacement.",
    paragraphs: [
      "Sydra is not about doing the same work with fewer people. It is about the team you already have filing far more disputes in the same hours. A standard single CPT claim with documents on file is prepared in about five minutes, against 25 to 40 by hand.",
    ],
  },
  {
    id: "heading-control",
    title: "Your team stays in control.",
    paragraphs: [
      "Nothing files itself. Sydra prepares the submission, your billing team reviews every decision, and your team submits through the IDRE portal with a guided checklist. Nothing changes in how you practice or how you bill. The work happens downstream of what your office already does.",
    ],
  },
];

export const IN_HOUSE_IDR_FAQS: ContentFaq[] = [
  {
    q: "Does Sydra replace my billing staff?",
    a: "No. The same biller prepares, reviews and submits each dispute — in a fraction of the time. What changes is how many disputes that biller can get through.",
  },
  {
    q: "How long does a submission take with Sydra?",
    a: "About five minutes for a standard single CPT claim with documents on file, against 25 to 40 minutes by hand.",
  },
  {
    q: "Do we still control what gets filed?",
    a: "Yes. Sydra never submits automatically. Your billing team reviews every draft and files it through the IDRE portal.",
  },
];
