import { kronosCaseReviewUrl } from "@/lib/kronos-revenue";
import { pricingFaqAnswer, tierRoutingFaqAnswer } from "@/lib/content/tiers";
import { siteUrl } from "@/lib/site";

export type FaqItem = {
  q: string;
  a: string;
  category: string;
};

export const FAQ_CATEGORIES = [
  "Getting started",
  "Pricing",
  "Workflow",
  "Claims",
  "Support",
  "When Sydra is not enough",
] as const;

const ATTORNEY_COMPARISON_ANSWER =
  "Attorneys typically take 20% of every recovery. Sydra is software your billing team runs, quoted on a demo call and structured below typical contingency fees. You keep the workflow and more of the win. If you want zero ops, Kronos Full-Service eliminates headcount and is priced so you keep more of each win than typical attorney contingency.";

export const FAQ_PAGE_ITEMS: FaqItem[] = [
  {
    category: "Getting started",
    q: "How long is onboarding?",
    a: "Most practices are live within a week. We provision your tenant, connect your clearinghouse, and walk a billing lead through their first submission.",
  },
  {
    category: "Getting started",
    q: "Do I need IT to set up Sydra?",
    a: "No dedicated IT project. If your team can copy EOB data today, they can run Sydra. We handle tenant setup and integration guidance.",
  },
  {
    category: "Getting started",
    q: "How long is the demo?",
    a: "About 15 minutes for the walkthrough, plus 5 to 10 minutes of Q&A if you want it.",
  },
  {
    category: "Getting started",
    q: "Can I get a sandbox account after the demo?",
    a: "Yes. Most prospects who book a demo receive sandbox access on the call so they can try the workflow before deciding.",
  },
  {
    category: "Pricing",
    q: "How does Sydra compare to using an IDR attorney?",
    a: ATTORNEY_COMPARISON_ANSWER,
  },
  {
    category: "Pricing",
    q: "What does Sydra cost?",
    a: pricingFaqAnswer(),
  },
  {
    category: "Pricing",
    q: "Are there setup fees?",
    a: "No setup fees on Self-Serve or Sydra + Kronos Support. Kronos Full-Service terms are quoted on the Kronos Revenue site.",
  },
  {
    category: "Pricing",
    q: "Can we switch tiers later?",
    a: "Yes. Many practices start Self-Serve and move to Sydra + Kronos Support as they want more hands-on support, or move to Kronos Full-Service when they want full outsourcing.",
  },
  {
    category: "Workflow",
    q: "Does Sydra integrate with our EMR?",
    a: "ModMed is supported today with more EMRs on the roadmap. If you copy EOB data out of your system today, Sydra works with that workflow now.",
  },
  {
    category: "Workflow",
    q: "Can multiple users access the platform?",
    a: "Yes. Role based access for billing leads, admins, and physicians. Multi tenant isolation keeps your data separate from other practices.",
  },
  {
    category: "Claims",
    q: "What if a claim loses at IDR?",
    a: "Sydra documents the submission and outcome. Your team can revise and refile where the pathway allows. Tier 2 adds Kronos escalation on disputed cases.",
  },
  {
    category: "Claims",
    q: "How is QPA calculated?",
    a: "Sydra applies qualified payment amounts by geography and service type using the data in your EOB and payer rules. Operators review before submit.",
  },
  {
    category: "Support",
    q: "What support does Self-Serve include?",
    a: "Documentation, knowledge base, and community forum. No live phone queue on Tier 1.",
  },
  {
    category: "Support",
    q: "What does Sydra + Kronos Support add?",
    a: "Live support 9 to 5 ET Monday through Friday, 24 hour email on escalations, monthly account review, and a specialist on tricky claims.",
  },
  {
    category: "When Sydra is not enough",
    q: "When should we choose Sydra vs Sydra + Support vs Kronos Full-Service?",
    a: `${tierRoutingFaqAnswer()} Compare plans at ${siteUrl()}/plans, schedule a demo for software tiers, or get a free NSA IDR review at ${kronosCaseReviewUrl()}.`,
  },
  {
    category: "When Sydra is not enough",
    q: "When should we look at Kronos Full-Service instead?",
    a: `Practices that do not want to operate software themselves should look at Kronos Full-Service on our sister site. Kronos runs every claim end to end. Get a free NSA IDR review at ${kronosCaseReviewUrl()}.`,
  },
];
