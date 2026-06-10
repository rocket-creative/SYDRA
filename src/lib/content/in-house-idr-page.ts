import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

export const IN_HOUSE_IDR_HERO = {
  title: "In house IDR, without the headcount.",
  subtitle: "Scale federal disputes with the team you already have.",
  lead: "Your billing team can already file federal IDR. The constraint is time. Building one submission by hand takes 25 to 40 minutes, and that is the ceiling on how many disputes you can pursue. Sydra changes the ceiling, not the team.",
};

export const IN_HOUSE_IDR_SECTIONS: ContentSection[] = [
  {
    id: "heading-cost-of-time",
    title: "The real cost is time, not fees.",
    paragraphs: [
      "Filing IDR yourself avoids the contingency fee, but it spends something else: your billing team's hours. Six elements, prior determination research, clinical narrative, credential blocks, eligibility checks. Done well by hand, it runs 25 to 40 minutes per submission.",
      "At any meaningful volume, that time becomes the reason claims go unfiled. The slider below puts a number on it for your practice.",
    ],
  },
  {
    id: "heading-capacity",
    title: "Capacity, not replacement.",
    paragraphs: [
      "Sydra is not about doing the same work with fewer people. It is about your existing team filing far more disputes in the same hours. A standard single CPT claim that took 25 to 40 minutes is prepared in about five minutes, reviewed, and submitted by the same biller who would have done it by hand.",
      "The hours that come back go to the disputes you are not filing today. That is where the recovery has been sitting.",
    ],
  },
  {
    id: "heading-control",
    title: "Your team stays in control.",
    paragraphs: [
      "Nothing files itself. Sydra prepares the submission, your billing team reviews every decision, and your team submits through the IDRE portal with a guided checklist. The workflow, the relationships, and the margin stay in your office.",
    ],
  },
];

export const IN_HOUSE_IDR_FAQS: ContentFaq[] = [
  {
    q: "Does Sydra replace my billing staff?",
    a: "No. Sydra gives your existing team capacity. The same biller prepares, reviews, and submits each dispute, just in a fraction of the time. The goal is more disputes filed, not fewer people.",
  },
  {
    q: "How long does a submission take with Sydra?",
    a: "A standard single CPT claim with documents on file is prepared in about five minutes, compared to 25 to 40 minutes by hand. Your team still reviews and submits, so total time depends on your review step.",
  },
  {
    q: "Do we still control what gets filed?",
    a: "Yes. Sydra never submits automatically. Your billing team reviews every draft and files it through the IDRE portal. You decide what goes out the door.",
  },
];

export const IN_HOUSE_IDR_CTA_LEAD =
  "See Sydra prepare a real submission from your specialty in about five minutes, reviewed and ready for your team to file.";
