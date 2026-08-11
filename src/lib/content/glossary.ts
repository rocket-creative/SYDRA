export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  relatedHref?: string;
  relatedLabel?: string;
};

/**
 * Short definitions only. Full explainers live on the linked guide or resource.
 * Copy is drawn from existing guides and resources; no new statistics.
 * Sorted alphabetically by display term.
 */
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "administrative-fee",
    term: "Administrative fee",
    definition:
      "A non refundable fee each party pays when initiating federal IDR. CMS sets the amount annually. It is separate from the IDRE fee, which the losing party generally bears after the determination.",
    relatedHref: "/resources/idr-eligibility-deadlines-fees",
    relatedLabel: "Eligibility, deadlines, and fees",
  },
  {
    slug: "batching",
    term: "Batching",
    definition:
      "Grouping similar claims into one IDR dispute to lower per claim administrative cost. CMS sanctioned batching as of the May 28, 2026 final rule. For high value surgical claims, batching can make several codes win or lose together on one arbiter offer. Sydra defaults to one claim per CPT and lets your team decide per submission.",
    relatedHref: "/idr/guide/idr-batching-claims",
    relatedLabel: "Batching vs filing individually",
  },
  {
    slug: "business-day",
    term: "Business day",
    definition:
      "A weekday used for federal IDR clocks. Open negotiation runs 30 business days, and the initiation window that follows is 4 business days. These counts are business days, not calendar days, and they do not extend once they start.",
    relatedHref: "/idr-filing-deadline",
    relatedLabel: "Federal IDR filing deadline",
  },
  {
    slug: "cms-federal-idr-puf",
    term: "CMS Federal IDR Public Use File (PUF)",
    definition:
      "CMS published files that summarize resolved federal IDR disputes under the No Surprises Act. Sydra site benchmarks for win rates and award multiples are sourced from these Public Use Files and related analyses, not from Sydra performance claims.",
    relatedHref: "/resources/updates/cms-federal-idr-puf-benchmarks",
    relatedLabel: "CMS Federal IDR PUF update",
  },
  {
    slug: "contingency-fee",
    term: "Contingency fee",
    definition:
      "A fee model where an IDR attorney typically keeps about 20 percent of every recovery. The cost rises with every successful dispute. Sydra is software your billing team operates, priced below typical attorney contingency fees.",
    relatedHref: "/sydra-vs-idr-attorney",
    relatedLabel: "Sydra vs an IDR attorney",
  },
  {
    slug: "cooling-off-period",
    term: "Cooling off period",
    definition:
      "A 90 calendar day wait after an adverse determination before the same code and payer combination can be re filed. Sydra tracks cooling off status so your team knows when a combination becomes eligible again.",
    relatedHref: "/faq",
    relatedLabel: "Sydra FAQ",
  },
  {
    slug: "cost-sharing",
    term: "Cost sharing",
    definition:
      "Under the No Surprises Act, the patient pays only their in network cost share for qualifying out of network care. The health plan and the provider settle the rest between themselves, which is where most payment disputes begin.",
    relatedHref: "/what-is-idr",
    relatedLabel: "What is IDR",
  },
  {
    slug: "federal-idr-portal",
    term: "Federal IDR portal",
    definition:
      "The CMS hosted system where providers and plans initiate disputes, select arbitrators, exchange offers and evidence, and receive determinations. It is the system of record for every step of a federal No Surprises Act dispute.",
    relatedHref: "/resources/federal-idr-process",
    relatedLabel: "Federal IDR process",
  },
  {
    slug: "fully-insured",
    term: "Fully insured",
    definition:
      "A traditional plan where the employer buys coverage and the insurer bears the risk. Fully insured disputes may route to a state surprise billing process in states that have one, instead of federal IDR.",
    relatedHref: "/idr/guide/self-funded-vs-fully-insured",
    relatedLabel: "Self funded vs fully insured",
  },
  {
    slug: "georgetown-chir",
    term: "Georgetown CHIR",
    definition:
      "Georgetown University CHIR analyses of CMS Federal IDR Public Use Files. Site figures such as the about 88 percent provider win rate through the first half of 2025 cite Georgetown CHIR alongside CMS source files.",
    relatedHref: "/resources/updates/cms-federal-idr-puf-benchmarks",
    relatedLabel: "CMS Federal IDR PUF update",
  },
  {
    slug: "idr",
    term: "IDR",
    definition:
      "Independent Dispute Resolution. The federal arbitration process under the No Surprises Act that settles out of network payment disputes between providers and health plans when open negotiation does not resolve the claim.",
    relatedHref: "/what-is-idr",
    relatedLabel: "What is IDR",
  },
  {
    slug: "idr-initiation-window",
    term: "IDR initiation window",
    definition:
      "The 4 business day period after open negotiation closes in which a party must initiate federal IDR through the portal. Miss that window and the claim is closed for that cycle. There is no general grace period.",
    relatedHref: "/idr-filing-deadline",
    relatedLabel: "Federal IDR filing deadline",
  },
  {
    slug: "idre",
    term: "IDRE",
    definition:
      "Independent dispute resolution entity. A certified arbitrator that receives both parties' final offers and evidence, then selects one offer. The IDRE cannot invent a third number or split the difference.",
    relatedHref: "/resources/federal-idr-process",
    relatedLabel: "Federal IDR process",
  },
  {
    slug: "no-surprises-act",
    term: "No Surprises Act",
    definition:
      "Federal law that protects patients from many surprise medical bills and creates the federal IDR process for qualifying out of network payment disputes between providers and plans.",
    relatedHref: "/idr/guide/what-is-no-surprises-act-idr",
    relatedLabel: "No Surprises Act IDR guide",
  },
  {
    slug: "open-negotiation",
    term: "Open negotiation",
    definition:
      "A required 30 business day period to try to settle a payment dispute directly with the plan before IDR can begin. Either party starts it by sending an Open Negotiation Notice. Most disputes do not settle here, but the period cannot be skipped.",
    relatedHref: "/idr/guide/open-negotiation-explained",
    relatedLabel: "Open negotiation explained",
  },
  {
    slug: "prior-determination",
    term: "Prior determination",
    definition:
      "A prior IDR award or written decision on a comparable code, geography, or service. Market rate justifications cite prior determinations so the arbitrator can weigh the provider's offer against real outcomes, not only the plan's qualifying payment amount.",
    relatedHref: "/how-it-works",
    relatedLabel: "How Sydra files a claim",
  },
  {
    slug: "qpa",
    term: "QPA",
    definition:
      "Short for qualifying payment amount. The plan's median contracted rate for a service in a geographic area. It is the insurer's starting anchor in an IDR dispute, not a cap on the award. Arbitrators weigh it against other evidence and are not required to pick the QPA.",
    relatedHref: "/idr/guide/qualifying-payment-amount-explained",
    relatedLabel: "QPA explained",
  },
  {
    slug: "self-funded",
    term: "Self funded",
    definition:
      "An employer plan where the employer pays claims directly and uses an insurer only to administer them. Self funded plans are governed by federal law and route to federal IDR in every state.",
    relatedHref: "/idr/guide/self-funded-vs-fully-insured",
    relatedLabel: "Self funded vs fully insured",
  },
];

export const GLOSSARY_SLUGS = GLOSSARY_TERMS.map((term) => term.slug);

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((term) => term.slug === slug);
}
