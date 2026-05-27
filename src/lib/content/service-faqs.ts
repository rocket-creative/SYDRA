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
    a: "Controls are aligned with SOC 2 requirements. A formal report is available to qualified prospects under NDA during evaluation.",
  },
  {
    q: "Can we get a security summary for our compliance team?",
    a: "Yes. Use the form on this page or email sales@sydrahealth.com. We send the one pager and schedule a walkthrough if you need one.",
  },
];

export const PLANS_FAQ: ServiceFaqItem[] = [
  {
    q: "What Sydra plans are available?",
    a: "Three tiers: Sydra Self Serve for teams that want software only, Sydra plus Kronos Support for hands on help on tricky claims, and Kronos Full Service for full outsourcing.",
  },
  {
    q: "Is Sydra pricing published online?",
    a: "No. Pricing is quoted on your demo call based on volume and tier. There are no setup fees on Self Serve or Sydra plus Kronos Support.",
  },
  {
    q: "Which plan is right for a small surgical practice?",
    a: "Most practices start Self Serve if they have billing staff and want to keep recoveries in house. Schedule a demo and we recommend the right tier on your volume.",
  },
  {
    q: "Can we switch tiers later?",
    a: "Yes. Many practices start Self Serve and move to Sydra plus Kronos Support as they want more hands on support, or move to Kronos Full Service when they want full outsourcing.",
  },
  {
    q: "How does Sydra compare to using an IDR attorney?",
    a: "Attorneys typically take 20% of every recovery. Sydra is software your billing team runs, structured below typical contingency fees. You keep the workflow and more of the win.",
  },
  {
    q: "When should we choose Kronos Full Service instead?",
    a: "Practices that do not want to operate software themselves should look at Kronos Full Service. Kronos runs every claim end to end on the sister site.",
  },
];
