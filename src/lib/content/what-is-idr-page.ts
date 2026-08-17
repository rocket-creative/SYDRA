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
  title: "What is federal IDR?",
  subtitle: "The No Surprises Act dispute path, explained for providers.",
  lead: "If a health plan paid you less than your out of network claim was worth, federal law gives you a way to dispute it. Most practices have never heard of it. Here is what it is, who qualifies, and how the process works.",
};

export const WHAT_IS_IDR_SECTIONS: ContentSection[] = [
  {
    id: "heading-nsa",
    title: "First, the No Surprises Act.",
    paragraphs: [
      "The No Surprises Act, or NSA, is a federal law that took effect in 2022. It protects patients from surprise bills for out of network care they could not reasonably avoid, such as emergency treatment or care from an out of network surgeon at an in network facility.",
      "Under the NSA the patient pays only their in network cost share. The health plan and the provider settle the rest between themselves. That is where most disputes begin, because the plan's first payment is often far below the value of the work.",
    ],
  },
  {
    id: "heading-idr",
    title: "Then, independent dispute resolution.",
    paragraphs: [
      "When the provider and the health plan cannot agree on a fair payment, either side can take the claim to independent dispute resolution, or IDR. IDR is a federal arbitration process run by certified neutral entities.",
      "Both sides submit a single proposed payment amount with supporting evidence. The arbiter picks one of the two offers. There is no splitting the difference. The offer best supported by the evidence wins, which is why how you build the submission matters.",
      "The arbiter weighs the qualifying payment amount, or QPA, which is the plan's median contracted rate for the service, against the provider's evidence on case complexity, surgeon training, and prior determinations for the same code and region.",
    ],
  },
  {
    id: "heading-who",
    title: "Who can use it.",
    paragraphs: [
      "Federal IDR covers out of network claims protected by the No Surprises Act once open negotiation has failed. It is most relevant to surgical specialties with high value procedures.",
    ],
    list: [
      "Out of network emergency services.",
      "Out of network care delivered at an in network facility, including most surgical specialties.",
      "Air ambulance services.",
      "Claims where the plan's payment is lower than the value supported by your documentation.",
    ],
  },
  {
    id: "heading-deadlines",
    title: "The deadlines that matter.",
    paragraphs: [
      "IDR runs on strict clocks. You must complete a 30 business day open negotiation period first. After that closes, you have 4 business days to initiate IDR for the claim. Miss a window and the claim is closed for that cycle.",
      "Because the deadlines are unforgiving, the part that should never depend on judgment, the timing, is the part to get right first.",
    ],
  },
  {
    id: "heading-2026",
    title: "What changed in 2026.",
    paragraphs: [
      "The process used to be too expensive for smaller practices. On May 28, 2026, CMS finalized a rule that cut the administrative filing fee from $115 to $15 and explicitly permitted batching multiple claims into one IDR submission. That fee cut opens IDR to practices that could not justify the cost before. Batching is now a real option with a real tradeoff on win rate. See the dated CMS final rule update for the full breakdown.",
    ],
  },
  {
    id: "heading-win",
    title: "How often properly filed disputes win.",
    paragraphs: [
      "CMS data shows 88 percent of properly filed federal IDR disputes result in a provider win. Source: Georgetown University CHIR, March 2026. This is a published benchmark, not a Sydra performance claim.",
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
    a: "A federal law in effect since 2022 that shields patients from surprise out of network bills. The patient pays only the in network cost share, and the provider and plan resolve the balance, through IDR when they cannot agree.",
  },
  {
    q: "Do I need a lawyer to file IDR?",
    a: "No. The No Surprises Act does not require a lawyer. A trained billing team can complete every step. Some practices pay a typical 20 percent contingency; others run the process on software and keep the full award. See the fee comparison on Compare your IDR options.",
  },
  {
    q: "How much does it cost to file in 2026?",
    a: "The May 28, 2026 CMS final rule set the standard administrative filing fee at $15, down from $115. Confirm the current per dispute administrative fee when you initiate, because CMS can update fee guidance, and plan around the IDRE fee separately.",
  },
];

export const WHAT_IS_IDR_CTA_LEAD =
  "Once you know the process exists, the question is who runs it. See Sydra prepare a real federal IDR submission in about five minutes.";
