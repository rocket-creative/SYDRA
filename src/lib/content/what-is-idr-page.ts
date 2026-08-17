export type ContentSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type ContentFaq = {
  q: string;
  a: string;
};

export const WHAT_IS_IDR_HERO = {
  title: "That payment is an opening offer.",
  subtitle: "Federal IDR, explained for providers.",
  paragraphs: [
    "When a health plan pays an out of network claim, most practices treat the amount that arrives as the amount owed. Under the No Surprises Act, it isn't. That payment is an opening offer, and federal Independent Dispute Resolution exists specifically to contest it.",
    "Most practices have never used it. This page covers what it is, who qualifies, what the deadlines are, and what changed in 2026.",
  ],
};

export const WHAT_IS_IDR_SECTIONS: ContentSection[] = [
  {
    id: "heading-nsa",
    title: "First, the No Surprises Act.",
    paragraphs: [
      "The No Surprises Act took effect in 2022. It removed the patient from the middle of out of network billing disputes: the patient pays only the in network cost share, and the provider and the plan resolve the balance between themselves.",
      "That second half is the part most practices never operationalised. The law did not simply cap what you can bill. It created a mechanism for recovering what the plan should have paid, and left it to providers to use.",
    ],
  },
  {
    id: "heading-idr",
    title: "Then, independent dispute resolution.",
    paragraphs: [
      "Federal IDR is final offer arbitration. You submit an offer, the plan submits an offer, and a certified independent dispute resolution entity picks one. There is no splitting the difference. The entity picks the offer better supported by evidence.",
      "That structure is why preparation determines outcome. The dispute is not argued; it is documented.",
    ],
  },
  {
    id: "heading-who",
    title: "Who can use it.",
    paragraphs: [
      "Out of network claims that fall under the No Surprises Act qualify — emergency services, and non emergency services delivered by out of network providers at in network facilities where no valid notice and consent was obtained.",
      "You do not need a lawyer. The statute does not require one. A provider can file directly, and so can an authorised representative — an in house billing team or a billing company acting on the practice's behalf.",
    ],
  },
  {
    id: "heading-deadlines",
    title: "The deadlines that matter.",
    paragraphs: [
      "There is a defined federal pathway between a payer's underpayment and a binding arbitrated amount: an open negotiation window, an eligibility determination, a batching decision, then arbitration. Each step has a hard deadline, and missing one forfeits the claim.",
      "The open negotiation period runs 30 business days. Once it closes, you have 4 business days to initiate IDR. There is no cure for missing either one. That is the entire reason this work goes undone. Not that it is legally difficult, but that it is deadline driven, document heavy, and unforgiving of administrative error.",
    ],
  },
  {
    id: "heading-2026",
    title: "What changed in 2026.",
    paragraphs: [
      "The CMS final rule of May 28, 2026, effective June 11, 2026, cut the administrative fee from $115 to $15 per party, per dispute. It also moved open negotiation into the federal IDR portal rather than leaving it as a direct exchange with the payer, and set batching at up to 50 qualified items per dispute.",
      "The practical effect is on which claims are worth filing. At $115 a side, small dollar disputes were not worth the administrative cost. At $15 they are. Confirm the current per dispute administrative fee when you initiate, because CMS can update fee guidance, and plan around the certified IDRE fee separately.",
    ],
  },
  {
    id: "heading-win",
    title: "How often properly filed disputes win.",
    paragraphs: [
      "88 percent of properly filed federal IDR disputes result in a provider win, according to Georgetown University CHIR, March 2026. Across 3.4 million disputes through June 2025, 87 percent of awards exceeded the qualifying payment amount, and the median award ran roughly 4.5 times the in network rate.",
      "Two numbers explain why the opportunity persists. Roughly 10 percent of eligible claims are estimated to reach arbitration at all. And 44 percent of 2024 IDR cases were challenged as ineligible — usually on administrative grounds that correct preparation prevents.",
    ],
  },
];

export const WHAT_IS_IDR_FAQS: ContentFaq[] = [
  {
    q: "What does IDR stand for?",
    a: "Independent dispute resolution. It is the federal arbitration process under the No Surprises Act for settling out of network payment disputes between a provider and a health plan.",
  },
  {
    q: "What is the No Surprises Act?",
    a: "A federal law in effect since 2022 that removes the patient from out of network billing disputes. The patient pays the in network cost share, and the provider and plan resolve the balance — through IDR when they cannot agree.",
  },
  {
    q: "Do I need a lawyer to file IDR?",
    a: "No. The No Surprises Act does not require one. A trained billing team can complete every step. Some practices hand the work to a contingency firm that takes 20 percent or more of whatever comes back. Others run the process on software and keep the award.",
  },
  {
    q: "How much does it cost to file in 2026?",
    a: "The CMS final rule of May 28, 2026, effective June 11, 2026, set the administrative fee at $15 per party, per dispute, down from $115. The certified IDRE fee is separate and is paid by the losing party. Confirm both when you initiate, because CMS can update fee guidance.",
  },
];

export const WHAT_IS_IDR_CTA_LEAD =
  "Send us one denied out of network EOB. You'll get a written IDR eligibility check and a dollar estimate back within one business day. No call required.";
