export type ResourceUpdateSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type ResourceUpdate = {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
  dateModified?: string;
  /** Short hub blurb on /resources/updates. */
  excerpt: string;
  lead: string;
  sections: ResourceUpdateSection[];
  /** Evergreen pages this update points back to. */
  relatedLinks: { href: string; label: string }[];
};

const CMS_2026_IDR_FINAL_RULE: ResourceUpdate = {
  slug: "cms-2026-idr-final-rule",
  title: "CMS cuts the IDR filing fee to $15 and now allows batching. Here's what changed.",
  subtitle: "May 28, 2026 final rule: $15 fee, batching permitted, IDR Gateway rolling out.",
  metaTitle: "CMS Cuts IDR Filing Fee to $15, Permits Batching | Sydra",
  metaDescription:
    "CMS finalized new IDR rules on May 28, 2026. The filing fee dropped from $115 to $15, batching is now permitted, and a new IDR Gateway platform is rolling out. Here's what changed and how Sydra handles it.",
  datePublished: "2026-08-11",
  excerpt:
    "CMS cut the federal IDR administrative fee from $115 to $15 and explicitly permitted batching. Here is what that means for win rate risk and how Sydra defaults to one claim per CPT.",
  lead: "On May 28, 2026, CMS finalized a new rule overhauling federal IDR, jointly with the Departments of Labor, Treasury, and the Office of Personnel Management. Two changes affect how your practice should think about filing: the administrative fee dropped from $115 to $15 per dispute, and batching multiple claims into one submission is now explicitly permitted to lower costs and speed resolution.",
  sections: [
    {
      id: "what-changed",
      heading: "What changed",
      paragraphs: [
        "The rule reduces the standard administrative filing fee from $115 to $15, a meaningful drop for any practice weighing whether a lower value claim is worth disputing. CMS also finalized permission to batch multiple related claims into a single IDR submission, aimed at reducing the backlog that has built up since the process launched. CMS cites more than 5 million disputes sent to IDR since April 2022. A new centralized platform, called IDR Gateway, is rolling out in phases to let providers initiate disputes, track case status, and manage the process in one place. Payers will be required to register on the Gateway, which should make it easier to confirm which party you are disputing with.",
        "Source: CMS final rule announcement, May 28, 2026.",
      ],
    },
    {
      id: "what-this-means",
      heading: "What this means for your practice",
      paragraphs: [
        "The lower fee makes filing economically worthwhile on more claims than it was a year ago. Batching is a real, sanctioned option now, but it comes with a real tradeoff worth understanding before you use it.",
        "When several claims are batched into one submission, the arbiter picks one offer for the whole batch. If that offer is not selected, every code in the batch loses together. Filed individually, each code stands on its own evidence. Dr. Abrahams, who built Sydra's process from his own practice's IDR filings, has seen this play out directly: ten high value codes batched together can win or lose as a block, where the same ten codes filed individually might land eight or nine wins instead of an all or nothing outcome on the batch.",
        "That is why Sydra's default stays one claim per CPT. It is the setting that protects win rate for most submissions. But batching is now available, CMS sanctioned, and can make sense for lower value codes or claims from the same encounter with strongly overlapping evidence, where the correlated risk is smaller. It is a per submission decision, and it is your call, not a fixed platform rule. See how Sydra handles batching decisions for the full breakdown.",
      ],
    },
    {
      id: "source",
      heading: "Source",
      paragraphs: [
        "CMS final rule announcement, May 28, 2026: cms.gov/newsroom/press-releases/federal-rule-takes-aim-saving-taxpayer-dollars-health-care-bureaucracy-reducing-dispute-fees",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/idr/guide/idr-batching-claims",
      label: "Batching vs filing individually",
    },
    { href: "/what-is-idr", label: "What is IDR" },
    { href: "/idr", label: "Federal IDR hub" },
  ],
};

const MAY_2026_RULE_UPDATE: ResourceUpdate = {
  slug: "may-2026-idr-operations-rule",
  title: "What the May 2026 IDR operations rule changed for filers.",
  subtitle: "Portal based open negotiation, registration numbers, and earlier eligibility review.",
  metaTitle: "May 2026 IDR Operations Rule Update | Sydra",
  metaDescription:
    "A short update on the 2026 federal IDR operations rule: portal based open negotiation, dispute registration numbers, and structured eligibility review for surgical billing teams.",
  datePublished: "2026-05-20",
  dateModified: "2026-08-11",
  excerpt:
    "The 2026 operations rule tightened how practices file and track federal IDR. Open negotiation moved into the portal, disputes carry registration numbers, and eligibility review happens earlier.",
  lead: "A federal IDR operations rule finalized in 2026 changed how practices actually file, not the underlying award math. Open negotiation moved into the federal portal, disputes carry registration numbers, and a structured eligibility review happens earlier in the process. For the May 28, 2026 fee cut and batching permission, see the CMS final rule update linked below.",
  sections: [
    {
      id: "what-changed",
      heading: "What changed",
      paragraphs: [
        "The federal IDR process keeps evolving, and the 2026 operations rule is a consequential update for how practices actually file. The headline changes are operational. Open negotiation now runs through the federal portal rather than living in email threads. Disputes carry registration numbers that follow the claim. And there is a structured eligibility review early in the process, which means a sloppy or mistimed filing gets caught and bounced sooner.",
        "Separately, the May 28, 2026 CMS final rule cut the administrative filing fee from $115 to $15 and permitted batching. That fee and batching story lives in its own dated update so the two changes do not get collapsed into one note.",
      ],
    },
    {
      id: "what-this-means",
      heading: "What this means for surgical practices filing IDR",
      paragraphs: [
        "None of this changes the math that makes surgical IDR worth doing. Win rates and award multiples still favor providers who file cleanly. What changed is the operational bar. The process now rewards clean documentation, accurate timing, and disciplined tracking, and it punishes the ad hoc spreadsheet approach more than before.",
        "If your team is still managing open negotiation dates and initiation windows by hand, the tighter portal workflow is the reason to revisit that process now. The four business day window after open negotiation closes remains unforgiving, and the portal based flow makes missed steps visible earlier.",
      ],
    },
    {
      id: "source",
      heading: "Source",
      paragraphs: [
        "For the full operational breakdown, including what the rule does and does not change for surgical filers, read the May 2026 IDR rule change guide. For the $15 fee and batching permission, read the CMS final rule update. For payment benchmarks by code, state, and payer, start on the Federal IDR hub.",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/resources/updates/cms-2026-idr-final-rule",
      label: "CMS May 2026 final rule update",
    },
    {
      href: "/idr/guide/may-2026-idr-rule-change",
      label: "May 2026 IDR rule change guide",
    },
    { href: "/idr", label: "Federal IDR hub" },
  ],
};

const CMS_PUF_REMINDER: ResourceUpdate = {
  slug: "cms-federal-idr-puf-benchmarks",
  title: "CMS Federal IDR Public Use Files remain the source for site benchmarks.",
  subtitle: "A reminder on where Sydra's published IDR figures come from.",
  metaTitle: "CMS Federal IDR PUF Benchmarks Reminder | Sydra",
  metaDescription:
    "Reminder that Sydra's federal IDR win rates and award multiples are sourced from CMS Federal IDR Public Use Files and independent analyses, not Sydra performance claims.",
  datePublished: "2026-06-18",
  excerpt:
    "Site benchmarks for provider win rates and award multiples come from CMS Federal IDR Public Use Files and related analyses. They are not Sydra outcome claims.",
  lead: "When you see win rates, award multiples, or dispute volume figures on Sydra pages, they come from CMS Federal IDR Public Use Files and independent analyses such as Georgetown CHIR. They describe the federal record across disputes, not Sydra performance on any single claim. This short update restates that sourcing so billing teams know where to look next.",
  sections: [
    {
      id: "what-changed",
      heading: "What changed",
      paragraphs: [
        "CMS publishes Federal IDR Public Use Files that summarize resolved disputes under the No Surprises Act. Independent analyses of those files report patterns such as providers prevailing in about 88 percent of resolved federal IDR disputes through the first half of 2025, and about 85 percent of 2024 determinations decided for the provider.",
        "Surgical disputes show the largest multiples in that public record, with prevailing offers running from about 970 percent to more than 1,700 percent of the qualifying payment amount across recent reporting periods, while surgery and neurology remain a small share of total cases. Those figures update as new public use files publish. When citing a number from this site, name the underlying CMS or Georgetown source and its reporting period rather than treating Sydra as the primary data publisher.",
      ],
    },
    {
      id: "what-this-means",
      heading: "What this means for surgical practices filing IDR",
      paragraphs: [
        "The Federal IDR hub and related resource pages surface payment benchmarks, eligibility context, and dispute outcomes by procedure, state, and payer. The recovery calculator and economics sections use the same published win rate and award multiple inputs so estimates stay tied to public data.",
        "None of those pages claim the aggregate federal win rate as a guarantee for your next dispute. They exist so your team can see the public record before deciding whether to file. Win rate reflects the pattern across many determinations and is not a promise on any single claim.",
      ],
    },
    {
      id: "source",
      heading: "Source",
      paragraphs: [
        "Browse the Federal IDR hub for code, state, and payer context, or open the IDR win rates and awards resource for the sourced figures in one place. If you want help filing eligible claims before their windows close, schedule a demo and bring a recent denial from your specialty.",
      ],
    },
  ],
  relatedLinks: [
    { href: "/idr", label: "Federal IDR hub" },
    {
      href: "/resources/idr-win-rates-and-awards",
      label: "IDR win rates and awards",
    },
  ],
};

const OPEN_NEGOTIATION_DEADLINES: ResourceUpdate = {
  slug: "open-negotiation-and-idr-deadlines",
  title: "Open negotiation and the four business day window still decide recovery.",
  subtitle: "An evergreen pointer to the clocks that close claims.",
  metaTitle: "Open Negotiation and IDR Deadlines Reminder | Sydra",
  metaDescription:
    "Reminder that the 30 business day open negotiation period and the four business day IDR initiation window still decide whether an out of network claim can be recovered.",
  datePublished: "2026-07-08",
  excerpt:
    "Two clocks still govern federal IDR: 30 business days of open negotiation, then four business days to initiate. Miss the second window and the claim cannot be disputed.",
  lead: "Federal IDR still runs on two unforgiving clocks. First, a 30 business day open negotiation period must run before you can file. Second, once that period closes, you have only four business days to initiate IDR. This update does not change those rules. It points billing teams back to the evergreen deadline and process guides when volume makes the calendar the risk.",
  sections: [
    {
      id: "what-changed",
      heading: "What changed",
      paragraphs: [
        "Open negotiation is a required 30 business day period to settle a payment dispute directly with the plan before IDR. It starts when either party sends the open negotiation notice within 30 business days of the initial payment or denial. Most disputes do not settle here, but the period cannot be skipped, and its closing date starts the four business day clock to initiate IDR.",
        "Once open negotiation closes, you have four business days to initiate through the federal portal. Miss that window and the claim cannot be disputed for that cycle. The revenue on that claim is generally lost to the process. There is no general grace period built into the federal timing rules.",
      ],
    },
    {
      id: "what-this-means",
      heading: "What this means for surgical practices filing IDR",
      paragraphs: [
        "A spreadsheet cannot reliably flag four business day windows across a rolling book of claims, each with its own open negotiation start date. Something always slips. Every slipped claim is money the practice earned and then lost on a calendar technicality.",
        "The practical fix is forward looking: catch eligible claims at the explanation of benefits stage, document the open negotiation notice date carefully, and treat the closing date as the start of the initiation window. Keep proof that the notice was sent, because the IDRE will expect documentation that open negotiation happened and that the 30 business day period elapsed.",
      ],
    },
    {
      id: "source",
      heading: "Source",
      paragraphs: [
        "For the full deadline sequence, see IDR deadlines explained. For a broader walkthrough of who qualifies and how the process works, start with What is IDR. For the open negotiation step itself, including how to document the notice date, read Open negotiation explained. Those pages stay evergreen as the operational details around the portal evolve.",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/idr/guide/idr-deadlines-explained",
      label: "IDR deadlines explained",
    },
    { href: "/what-is-idr", label: "What is IDR" },
    {
      href: "/idr/guide/open-negotiation-explained",
      label: "Open negotiation explained",
    },
  ],
};

export const RESOURCE_UPDATES: ResourceUpdate[] = [
  CMS_2026_IDR_FINAL_RULE,
  MAY_2026_RULE_UPDATE,
  CMS_PUF_REMINDER,
  OPEN_NEGOTIATION_DEADLINES,
].sort(
  (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
);

export const RESOURCE_UPDATE_SLUGS = RESOURCE_UPDATES.map((update) => update.slug);

export function getUpdateBySlug(slug: string): ResourceUpdate | undefined {
  return RESOURCE_UPDATES.find((update) => update.slug === slug);
}
