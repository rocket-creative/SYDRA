import type { ContentFaq, ContentSection } from "@/lib/content/what-is-idr-page";

/**
 * Path 4 of the four audience paths: firms already filing federal IDR on
 * contingency. This is the only page on the site written to that reader, and it
 * argues a different number than every other page.
 *
 * Everywhere else the argument is cost: per claim pricing instead of a
 * percentage of recovery. That argument does not land here, because a
 * contingency firm's fee is its revenue, not its cost. The number that moves for
 * this reader is recoveries per FTE. Do not import the cost argument onto this
 * page; it reads as an attack on the reader's own business model.
 */
export const IDR_FOR_CONTINGENCY_HERO = {
  eyebrow: "For contingency firms filing federal IDR",
  title: "Same engine, aimed at recoveries per FTE.",
  lead: "You already know federal IDR works and you already know how to win. The constraint is not expertise, it is that every dispute costs a reviewer 25 to 40 minutes of mechanical assembly before any judgment gets applied. Sydra automates the mechanical steps, so the same headcount clears more disputes.",
  whiteLabelBold: "It runs white label under your own brand.",
  whiteLabelRest: "Your clients see your firm, not ours.",
  // No ctaHref: the page carries its own form, so its buttons scroll to
  // #contingency-lead-form rather than routing to /demo.
  ctaLabel: "Set up a demo",
};

export const IDR_FOR_CONTINGENCY_STATS = [
  {
    value: "25 to 40 min",
    label: "of mechanical assembly per dispute filed by hand",
  },
  {
    value: "5 minutes",
    label: "to prepare a complete submission packet",
  },
  {
    value: "$15",
    label: "administrative fee per party per dispute, down from $115",
    caption: "Source: CMS final rule of May 28, 2026, effective June 11, 2026",
  },
] as const;

export const IDR_FOR_CONTINGENCY_THRESHOLD_SECTION: ContentSection = {
  id: "heading-threshold-problem",
  title: "The claims you decline are a threshold problem, not a merit problem.",
  paragraphs: [
    "A contingency practice carries an implicit floor. Below some disputed amount, the fee on a win does not cover the reviewer time the submission consumes, so the claim gets passed over. That floor is set by assembly time, not by whether the claim would have won.",
    "The CMS final rule of May 28, 2026, effective June 11, 2026, cut the administrative fee from $115 to $15 per party, per dispute. That moved the arithmetic on small dollar disputes for everyone. What did not move is the reviewer hour each one still costs to build by hand, which is the part that actually sets your floor.",
    "Take assembly from 25 to 40 minutes down to about five and the floor drops with it. Claims that were never worth opening become worth filing, on files you have already signed.",
  ],
};

export const IDR_FOR_CONTINGENCY_SECTIONS: ContentSection[] = [
  {
    id: "heading-judgment-vs-assembly",
    title: "Where your experienced people should actually be.",
    paragraphs: [
      "A federal IDR submission has six required elements. Four of them are assembly: identifying the eligible CPT and preparing the offer statement, pulling comparable prior determinations, drafting the clinical narrative from the operative note, and populating provider credentials. None of those reward seniority. They reward doing the same steps the same way every time.",
      "The disputes that reward judgment are the other kind: an unusual procedure mix, a payer with a pattern worth arguing against, a QPA that is genuinely close to market for that code in that region, a batching decision with real consequences. Those are worth a senior reviewer's full attention, and they rarely get it when the same reviewer spent the morning assembling routine packets.",
      "Sydra does the assembly and hands your reviewer a draft to interrogate. Nothing files itself. Every submission is reviewed and approved by your team before it goes to the certified IDR entity.",
    ],
  },
  {
    id: "heading-firm-throughput",
    title: "What changes, and what deliberately does not.",
    paragraphs: [
      "Sydra is the preparation layer. It does not touch your client relationships, your fee agreements, your intake, or how you decide which matters to take. It changes how long a filing takes to build and therefore how many your team can build.",
      "IDR is a process problem, not a legal mystery. The rules and the deadlines are fixed and published, which is exactly what makes the mechanical steps automatable, and exactly why the judgment your firm sells is not.",
    ],
    list: [
      "One claim per CPT by default, because filing individually generally protects win rate when high value codes would otherwise share one arbiter offer. Batching is available per submission when your reviewer chooses it.",
      "Deadline tracking across every matter: the 30 business day open negotiation window, the 4 business day window to initiate after it closes, and the 90 calendar day cooling period after an adverse determination.",
      "Tenant isolation at the data layer, so each client practice's claims, documents, and history stay separate under separate BAAs.",
      "Audit logging on every action, with user, timestamp to the second, record affected, and IP address, available to your account administrator on request.",
    ],
  },
  {
    id: "heading-contingency-pricing",
    title: "How Sydra is priced to a firm.",
    paragraphs: [
      "Sydra is licensed per claim or by subscription. It does not take a share of what you recover, which means it does not sit between your firm and its fee, and your software cost does not rise every time you win a larger award.",
      "There is no published list price, because the right structure depends on matter volume, specialty mix, and how many states you file in. Bring your actual numbers to the call and get a real figure.",
    ],
  },
];

export const IDR_FOR_CONTINGENCY_FAQS: ContentFaq[] = [
  {
    q: "Does Sydra compete with our firm for clients?",
    a: "No. Sydra is the preparation layer your team operates, and it can run white label under your brand. We do not solicit your client practices.",
  },
  {
    q: "Do we lose control of what gets filed?",
    a: "No. Nothing files itself. Sydra assembles the submission and your reviewer approves it, edits it, or discards it. The judgment stays with your people, which is what your clients are paying for.",
  },
  {
    q: "How does this change our economics if our fee is a percentage?",
    a: "It does not touch your fee. It changes the cost side: recoveries per FTE. The same reviewers clear more disputes, and the disputed amount below which a claim is not worth opening drops, because that floor is set by assembly time.",
  },
  {
    q: "Do you take a percentage of our recoveries?",
    a: "No. Sydra is priced per claim or by subscription. Your software cost does not scale with the size of the awards you win.",
  },
  {
    q: "Can Sydra handle matters across multiple client practices and states?",
    a: "Yes. Each client practice is a separate tenant at the data layer, and determination comparables are filtered by CPT code and state so each submission is built against the market the dispute actually sits in.",
  },
];

export const IDR_FOR_CONTINGENCY_CTA_LEAD =
  "Free 15-minute call. No commitment. Bring a matter you would normally have declined on size and we'll build the submission live, so you can judge the output against what your own reviewer would have produced.";

export const IDR_FOR_CONTINGENCY_CTA_BAND = {
  title: "Book a demo",
  lead: IDR_FOR_CONTINGENCY_CTA_LEAD,
  ctaLabel: "Set up a demo",
};
