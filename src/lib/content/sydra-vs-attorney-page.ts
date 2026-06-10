import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

export const SYDRA_VS_ATTORNEY_HERO = {
  title: "Sydra vs an IDR attorney",
  subtitle: "Same federal process. You keep the 20 percent.",
  lead: "An IDR attorney files the same federal disputes your billing team can. The difference is the bill. Most contingency arrangements keep about 20 percent of every recovery, for as long as you use them. Here is the comparison, with the fee math you can run yourself.",
};

export const SYDRA_VS_ATTORNEY_SECTIONS: ContentSection[] = [
  {
    id: "heading-fee",
    title: "What the 20 percent actually costs.",
    paragraphs: [
      "A contingency fee feels painless because it comes out of money you were not collecting before. But it scales with your success and it never ends. The better your win rate, the more the percentage takes, every month, on every recovery.",
      "Software you operate is a flat platform fee. As your volume grows, your cost per dispute falls instead of rising. The slider below uses the same published benchmarks as our recovery estimate, so you can see the annual difference for your own numbers.",
    ],
  },
  {
    id: "heading-control",
    title: "Who controls the work.",
    paragraphs: [
      "With an attorney, you hand over the file and wait. You see the outcome, not the reasoning. With Sydra, your billing team prepares the submission, reviews every decision, and files it. The work stays in your office and the relationship with the payer stays yours.",
    ],
  },
  {
    id: "heading-when-attorney",
    title: "When an attorney still makes sense.",
    paragraphs: [
      "We will not pretend a lawyer is never the right call. If a dispute escalates into litigation, or you have a one off claim and no interest in building a repeatable process, counsel can be the better fit. For practices with steady out of network volume that want to keep the recovery, software your team runs is usually the lower cost path.",
    ],
  },
];

export const SYDRA_VS_ATTORNEY_FAQS: ContentFaq[] = [
  {
    q: "How much do IDR attorneys charge?",
    a: "Most work on contingency and keep roughly 20 percent of every recovery. Some add hourly or filing fees on top. The exact terms vary, but the contingency model means your cost rises with every successful dispute.",
  },
  {
    q: "Is software cheaper than an attorney?",
    a: "For most practices at most claim volumes, yes. Sydra's platform fee is structured below a typical 20 percent contingency. The exact comparison for your specialty and volume is part of what we show on the demo call.",
  },
  {
    q: "Do I lose protection by not using a lawyer?",
    a: "No. IDR is an administrative arbitration process, not litigation. The arbiter weighs the evidence in the submission. A well built submission is what wins, which is what the software is for. If a case ever escalates beyond IDR, that is when counsel is worth it.",
  },
];

export const SYDRA_VS_ATTORNEY_CTA_LEAD =
  "Bring a recent denied claim. We will show you what Sydra prepares and what you would keep at your volume.";
