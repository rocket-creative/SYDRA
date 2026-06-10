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
      "The arbiter weighs the qualified payment amount, or QPA, which is the plan's median contracted rate for the service, against the provider's evidence on case complexity, surgeon training, and prior determinations for the same code and region.",
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
      "The process used to be too expensive for smaller practices. As of 2026 a federal rule cut the administrative filing fees, opening IDR to practices that could not justify the cost before. It is one of the most useful developments for providers, and almost no one is talking about it yet.",
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
    a: "No. Some practices use IDR attorneys who typically keep about 20 percent of every recovery. Others run the process on software their billing team operates and keep the full award. See the fee comparison on the Sydra versus an IDR attorney page.",
  },
  {
    q: "How much does it cost to file in 2026?",
    a: "A 2026 federal rule cut the administrative filing fees, which is what opened the process to smaller practices. The current per dispute administrative fee is confirmed when you initiate, and your documentation team can plan around it.",
  },
];

export const WHAT_IS_IDR_CTA_LEAD =
  "Once you know the process exists, the question is who runs it. See Sydra prepare a real federal IDR submission in about five minutes.";
