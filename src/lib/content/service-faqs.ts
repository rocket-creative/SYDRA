import { SALES_EMAIL_FALLBACK } from "@/lib/contact";

export type ServiceFaqItem = { q: string; a: string };

export const HOW_IT_WORKS_FAQ: ServiceFaqItem[] = [
  {
    q: "How long does it take to draft an IDR with Sydra?",
    a: "Most billing teams produce a specialty coded IDR draft in under 5 minutes per claim. Your operator reviews and approves before anything is submitted.",
  },
  {
    q: "Does Sydra integrate with our EMR?",
    a: "ModMed is supported today with more EMRs on the roadmap. If your team copies EOB data out of your system today, Sydra works with that workflow now.",
  },
  {
    q: "Who submits the IDR to the IDRE portal?",
    a: "Your billing team does. Sydra generates the draft and documentation. Your operator edits, approves, and owns the submission before it leaves your practice.",
  },
  {
    q: "Does Sydra batch CPT codes on one submission?",
    a: "No. Sydra files one claim per eligible CPT code. Batching codes that should be filed individually is a common manual error Sydra prevents.",
  },
  {
    q: "What happens after my team submits through Sydra?",
    a: "Export to the IDRE portal and monitor status in the Sydra dashboard. Tier 2 adds Kronos escalation on disputed cases.",
  },
  {
    q: "Can Sydra handle eligibility and prior auth too?",
    a: "Yes. Sydra also includes eligibility verification, prior authorization drafting, CPT review from op notes, and compliance checks in the same platform.",
  },
];

export const SECURITY_FAQ: ServiceFaqItem[] = [
  {
    q: "Is Sydra built for HIPAA?",
    a: "Sydra is built to support HIPAA safeguards for PHI your billing team processes. Business Associate Agreements are available on request for covered entities and their billing teams.",
  },
  {
    q: "Where is Sydra data hosted?",
    a: "Production workloads run on AWS with region appropriate data residency for U.S. healthcare workloads.",
  },
  {
    q: "Who are your subprocessors?",
    a: "Primary infrastructure is AWS. Integration partners such as clearinghouse and EMR connectors are reviewed under our vendor program. Request the security one pager for the current subprocessor list.",
  },
  {
    q: "How long are audit logs retained?",
    a: "Audit log retention follows your agreement and our infrastructure policy. Ask sales for current retention windows during procurement.",
  },
  {
    q: "Does Sydra support MFA?",
    a: "The production application supports modern session controls. MFA options for your practice are confirmed during onboarding and documented in the security summary.",
  },
  {
    q: "Does Sydra have SOC 2 certification?",
    a: "Yes. Sydra is SOC 2 Type II compliant. The report is available to qualified prospects on request during evaluation.",
  },
  {
    q: "Can we get a security summary for our compliance team?",
    a: `Yes. Use the form on this page or email ${SALES_EMAIL_FALLBACK}. We send the one pager and schedule a walkthrough if you need one.`,
  },
];

export const PRICING_FAQ: ServiceFaqItem[] = [
  {
    q: "Are there setup fees?",
    a: "No setup fees on Self Serve or Sydra + Kronos Support.",
  },
  {
    q: "Is there a minimum contract term?",
    a: "No. Month to month available on all Sydra tiers.",
  },
  {
    q: "Can we switch tiers?",
    a: "Yes. Many practices start Self Serve and add Kronos Support or move to Full Service. Tier switches don't require a new onboarding process.",
  },
  {
    q: "How does Sydra pricing compare to an attorney at 20%?",
    a: "For a practice with 20 claims per month, $15,000 average disputed amount, 88% win rate: Attorney at 20%: $31,680 in annual fees on recoveries. Sydra platform fee: quoted to your volume, structured below that figure. The exact comparison is part of what we show you on the demo call.",
  },
];

/** @deprecated Use PRICING_FAQ */
export const PLANS_FAQ = PRICING_FAQ;
