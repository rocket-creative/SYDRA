export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type ArticleFaq = {
  q: string;
  a: string;
};

export type ResourceArticle = {
  slug: string;
  /** h1 */
  title: string;
  /** h1 subline */
  subtitle: string;
  /** Clean, intent based document title for the browser and search results. */
  metaTitle: string;
  /** 150 to 160 character meta description, no keyword stuffing. */
  metaDescription: string;
  datePublished: string;
  dateModified?: string;
  /** Short hub blurb shown on the /resources index. */
  excerpt: string;
  lead: string;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  /** Slugs of related articles for the keep reading block. */
  related: string[];
  /** When true, this article uses the Group A primary/secondary CTA pair instead of a demo-only button. */
  dualCtas?: boolean;
};

const FEDERAL_IDR_PROCESS: ResourceArticle = {
  slug: "federal-idr-process",
  title: "How the federal IDR process works.",
  subtitle: "Open negotiation to determination, step by step.",
  metaTitle: "How the Federal IDR Process Works for Providers | Sydra",
  metaDescription:
    "A step by step walkthrough of federal independent dispute resolution under the No Surprises Act: open negotiation, initiating IDR, the portal, offers, and the determination.",
  datePublished: "2026-06-10",
  excerpt:
    "The full federal IDR sequence for surgical billing teams, from the open negotiation notice to the arbitrator's final determination.",
  lead: "Federal IDR is final offer arbitration. Each side submits one number with evidence, and a certified entity picks one. There is no splitting the difference and no third figure.\n\nThat structure is why the sequence matters as much as the argument. This page walks the whole thing, from the open negotiation notice your billing team sends to the determination the entity returns, with the clock that governs each step.",
  sections: [
    {
      id: "what-is-idr",
      heading: "What federal IDR is.",
      paragraphs: [
        "Federal IDR is final offer arbitration. Each side submits a single payment amount for the disputed service, and a certified independent dispute resolution entity, the IDRE, picks one of the two offers. The arbitrator cannot split the difference or invent a third number. It selects the offer better supported by the evidence.",
        "That structure is sometimes called baseball style arbitration, because each side commits to one number and the arbitrator chooses between them. It rewards the party that submits a credible, well documented offer and penalizes a number that looks arbitrary.",
        "IDR applies to qualifying out of network claims governed by the No Surprises Act. It does not apply to Medicare, Medicaid, or claims a state arbitration law already covers. Confirming the claim qualifies is the first thing your team should settle before investing time in a submission.",
        "Five steps. Six deadlines. Nothing here is difficult; all of it is unforgiving.",
      ],
    },
    {
      id: "open-negotiation",
      heading: "Step one: the open negotiation period.",
      paragraphs: [
        "Before any claim can reach arbitration, the No Surprises Act requires a 30 business day open negotiation period. Either party can start it by sending an Open Negotiation Notice on the federal standard notice form within 30 business days of receiving the initial payment or the denial.",
        "The 30 business day window is a real negotiation opportunity. Many disputes settle here once a plan sees that the provider intends to pursue arbitration. If the period ends without agreement, the open negotiation step is complete and the claim becomes eligible to move forward.",
        "Keep proof that the notice was sent and the date it was sent. The IDRE will expect documentation that open negotiation happened and that the 30 business day period elapsed.",
      ],
    },
    {
      id: "initiate-idr",
      heading: "Step two: initiate IDR through the federal portal.",
      paragraphs: [
        "Once open negotiation closes without a deal, the initiating party has four business days to start IDR. You file through the federal IDR portal hosted by CMS, the same portal both parties and the arbitrators use to manage a dispute.",
        "Initiation identifies the claim, the service, the parties, and the qualified payment amount the plan reported. It also proposes a certified IDRE. The portal is where every later step lives, so your billing team should have portal access set up before the first filing, not during it.",
      ],
    },
    {
      id: "select-idre",
      heading: "Step three: select the certified IDRE.",
      paragraphs: [
        "After initiation, the two parties have three business days to jointly agree on a certified independent dispute resolution entity. If they cannot agree, CMS assigns one from the list of certified entities.",
        "The IDRE must be free of conflicts with either party. Once selected and conflict cleared, the arbitrator sets the schedule for offers and evidence.",
      ],
    },
    {
      id: "submit-offers",
      heading: "Step four: submit offers and supporting evidence.",
      paragraphs: [
        "Both parties submit their offer and their supporting documentation within 10 business days of selecting the IDRE. This is the heart of the dispute and where most of the work lives.",
        "A strong submission pairs a specific payment offer with evidence the arbitrator can act on: market rate justification grounded in prior determinations for the same service and geography, clinical necessity tied to the operative note, and the provider's credentials and procedure volume on the specific code.",
      ],
      list: [
        "A single payment offer per service, stated as one number with its basis documented.",
        "Market rate justification that cites comparable prior IDR determinations rather than a generic usual and customary claim.",
        "Clinical necessity documentation drawn from the operative note and specific to the patient's circumstances.",
        "Provider credentials and procedure volume on the exact code in dispute.",
        "Proof that open negotiation occurred and the 30 business day period elapsed.",
      ],
    },
    {
      id: "determination",
      heading: "Step five: the determination and payment.",
      paragraphs: [
        "The IDRE issues a written determination, typically within 30 business days of being selected. It picks one offer and explains the basis. The losing party generally bears the IDRE fee, which raises the stakes on submitting a credible number.",
        "When the provider's offer prevails, the plan must pay the difference between what it already paid and the determined amount, generally within 30 calendar days of the determination. If the plan does not pay on time, the determination is enforceable and the provider has recourse.",
      ],
    },
    {
      id: "where-sydra-fits",
      heading: "Where Sydra fits in the process.",
      paragraphs: [
        "Sydra sits at step four. Steps one through three are administrative and your team runs them. Step four is where the dispute is actually won or lost, and where building by hand takes 25 to 40 minutes per claim against under 5 minutes with Sydra. Nothing files itself. Your billing team reviews every submission and files it through the portal.",
      ],
    },
  ],
  faqs: [
    {
      q: "How does the federal IDR process work?",
      a: "Federal IDR is final offer arbitration under the No Surprises Act. After a 30 business day open negotiation period ends without agreement, either party initiates IDR through the federal portal, the parties select a certified IDRE, both sides submit a single payment offer with supporting evidence, and the arbitrator picks one offer. The plan pays the determined amount, generally within 30 calendar days.",
    },
    {
      q: "How do I file an IDR claim?",
      a: "First complete the 30 business day open negotiation by sending the Open Negotiation Notice. Within four business days after that period ends, initiate the dispute through the federal IDR portal hosted by CMS, propose a certified IDRE, and then submit your payment offer and supporting documentation within 10 business days of IDRE selection.",
    },
    {
      q: "What is the federal IDR portal?",
      a: "The federal IDR portal is the CMS hosted system where providers and plans initiate disputes, select arbitrators, exchange offers and evidence, and receive determinations. It is the system of record for every step of a federal No Surprises Act dispute.",
    },
    {
      q: "Can my billing team run the IDR process in house?",
      a: "Yes. The No Surprises Act does not require an attorney. A trained billing team can complete every step, from the open negotiation notice through submission and follow up on payment. Software that prepares the submission packet lets a billing team do this in minutes per claim.",
    },
  ],
  related: ["idr-eligibility-deadlines-fees", "idr-win-rates-and-awards", "no-surprises-act-for-surgeons"],
};

const IDR_ELIGIBILITY_DEADLINES_FEES: ResourceArticle = {
  slug: "idr-eligibility-deadlines-fees",
  title: "IDR eligibility, deadlines, and fees.",
  subtitle: "What qualifies a claim, and what disqualifies one.",
  metaTitle: "IDR Eligibility, Deadlines, and Fees Explained | Sydra",
  metaDescription:
    "Which claims qualify for federal IDR, the business day deadlines that govern every step, the fees both parties pay, and the most common reasons a claim is ruled ineligible.",
  datePublished: "2026-06-10",
  dateModified: "2026-07-18",
  excerpt:
    "Eligibility rules, the business day deadline sequence, the fee structure, and the batching rules that decide whether a claim survives arbitration.",
  lead: "More than four in ten federal IDR disputes are challenged as ineligible by the other side. Almost none of those challenges are about the medicine. They are about whether the claim qualified, whether a clock was met, and whether the paperwork proved it.\n\nThis page covers which claims are eligible, the deadline sequence in business days, what the process costs, and how batching changes the arithmetic.",
  sections: [
    {
      id: "eligibility",
      heading: "Which claims are eligible for IDR.",
      paragraphs: [
        "Federal IDR covers out of network claims protected by the No Surprises Act. In broad terms, that means emergency services, out of network care delivered at an in network facility, and air ambulance services, where the patient is enrolled in a group or individual plan subject to the Act.",
        "A claim is eligible when the No Surprises Act applies, the open negotiation period has run, and no state arbitration law governs the dispute instead. If a state process applies, that pathway controls, and the federal process does not.",
      ],
    },
    {
      id: "ineligible",
      heading: "The most common reasons a claim is ruled ineligible.",
      paragraphs: [
        "Eligibility challenges are routine. In 2024, the non initiating party challenged eligibility in 44 percent of disputes, according to analysis of CMS data. A claim that looks eligible to a billing team can still be knocked out on a technicality.",
        "Resolving eligibility before you draft a submission saves the time you would otherwise spend on a claim that never reaches a determination.",
      ],
      list: [
        "The claim falls under Medicare, Medicaid, or another program the No Surprises Act does not cover.",
        "A state arbitration or mediation law governs the dispute instead of the federal process.",
        "The open negotiation step was skipped or the notice was sent outside the 30 business day window.",
        "The dispute was initiated after the four business day window following open negotiation.",
        "The service does not fall within the protected categories under the Act.",
      ],
    },
    {
      id: "deadlines",
      heading: "The deadline sequence, in business days.",
      paragraphs: [
        "Federal IDR runs on business day deadlines, and missing one can end a dispute regardless of its merits. The sequence below reflects the timing set under the federal regulations.",
      ],
      list: [
        "Open negotiation notice: sent within 30 business days of the initial payment or denial.",
        "Open negotiation period: 30 business days from the date the notice is sent.",
        "Initiate IDR: within four business days after the open negotiation period ends.",
        "Select the IDRE: the parties have three business days to agree, or CMS assigns one.",
        "Submit offers and evidence: within 10 business days of IDRE selection.",
        "Determination: the IDRE generally issues its decision within 30 business days of selection.",
        "Payment: the plan generally pays within 30 calendar days of the determination.",
      ],
    },
    {
      id: "missed-deadline",
      heading: "What happens if you miss an IDR deadline.",
      paragraphs: [
        "A missed deadline usually forfeits the step, and the dispute can be dismissed. There is no general grace period built into the federal process, which is why high volume practices benefit from a tracked workflow rather than a spreadsheet and memory.",
        "If you missed the window to initiate on a specific claim, the revenue on that claim is generally lost to the process. The practical fix is forward looking: catch eligible claims at the explanation of benefits stage and start the clock deliberately.",
      ],
    },
    {
      id: "fees",
      heading: "What IDR costs: the fee structure.",
      paragraphs: [
        "Two fees, and they are commonly confused. The **administrative fee** is paid by both parties and is non refundable: $15 per party, per dispute, cut from $115 by the CMS final rule of May 28, 2026, effective June 11, 2026. The **certified IDRE fee** is separate, falls within a CMS approved range, and is effectively borne by the losing party. Confirm both before filing, because CMS updates fee guidance.",
      ],
    },
    {
      id: "batching",
      heading: "Batching and the one claim per service question.",
      paragraphs: [
        "As of the May 28, 2026 CMS final rule, federal rules allow batching of certain similar items and services into one dispute, which can lower the per claim administrative cost. It is tempting to batch aggressively to save on fees.",
        "The tradeoff is at the determination. A batched submission produces one offer for the whole batch, so codes can win or lose together. Filing one claim per service keeps each offer tied to comparable prior determinations for that exact code.",
        "Sydra defaults to one claim per code for this reason, and batching is available when your team chooses it for a specific submission. If a case involves several codes, each becomes its own submission by default, and each takes under five minutes to prepare.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if my claim is eligible for IDR?",
      a: "A claim is generally eligible when the No Surprises Act applies to the service, the patient's plan is subject to the Act, the open negotiation period has run without agreement, and no state arbitration law governs instead. Medicare, Medicaid, and claims covered by a state process are not eligible for federal IDR.",
    },
    {
      q: "What are the federal IDR deadlines?",
      a: "Send the open negotiation notice within 30 business days of the initial payment or denial. The open negotiation period lasts 30 business days. Initiate IDR within four business days after it ends. Select the IDRE within three business days. Submit offers within 10 business days of selection. The determination generally comes within 30 business days, and payment within 30 calendar days.",
    },
    {
      q: "What happens if I miss an IDR deadline?",
      a: "Missing a federal IDR deadline usually forfeits the step and can result in dismissal of the dispute, with no general grace period. The revenue on that claim is typically lost to the process, which is why a tracked workflow that flags eligible claims early matters.",
    },
    {
      q: "How much does IDR cost?",
      a: "Two fees, and they are commonly confused. The administrative fee is paid by both parties and is non refundable: $15 per party, per dispute, cut from $115 by the CMS final rule of May 28, 2026, effective June 11, 2026. The certified IDRE fee is separate, falls within a CMS approved range, and is effectively borne by the losing party. Confirm both before filing, because CMS updates fee guidance.",
    },
    {
      q: "Should I batch IDR claims?",
      a: "Batching can reduce per claim fees and is CMS sanctioned as of May 2026, but high value codes can win or lose together on one arbiter offer. Filing one claim per code by default keeps each offer tied to the right comparables. Choose batching per submission when the correlated risk is acceptable.",
    },
  ],
  related: ["federal-idr-process", "idr-win-rates-and-awards", "idr-attorney-vs-software"],
};

const IDR_WIN_RATES_AND_AWARDS: ResourceArticle = {
  slug: "idr-win-rates-and-awards",
  title: "What the federal record shows.",
  subtitle: "Win rates, award multiples, and what happens after the determination.",
  metaTitle: "IDR Win Rates and Award Amounts for Providers | Sydra",
  metaDescription:
    "What federal IDR data shows about provider win rates, how award amounts compare to the qualifying payment amount, and what happens after a determination is issued.",
  datePublished: "2026-06-10",
  excerpt:
    "Provider win rates, how awards compare to the QPA, what happens after a determination, and your recourse when a plan does not pay.",
  lead: "Providers win the large majority of federal IDR disputes, and winning awards routinely land well above the plan's qualifying payment amount. Both of those statements come from published federal data, not from Sydra.\n\nThis page summarizes what that record shows, how to think about it against your own claims, and what happens once an arbitrator decides.",
  sections: [
    {
      id: "win-rates",
      heading: "Provider win rates in federal IDR.",
      paragraphs: [
        "The published data favors providers. Analysis of CMS figures through mid 2025 found providers prevailing in roughly 88 percent of resolved disputes. The American College of Radiology reported the same direction in its review: disputes were decided in the provider's favor in the vast majority of cases.",
        "Win rate is not a guarantee on any single claim. It reflects the pattern across a large body of determinations, and it rewards submissions that pair a credible offer with evidence an arbitrator can act on. A weak submission can lose a winnable claim.",
      ],
    },
    {
      id: "awards-vs-qpa",
      heading: "How awards compare to the qualifying payment amount.",
      paragraphs: [
        "The qualifying payment amount, or QPA, is the plan's median contracted rate for the service, and it is the number plans lean on. In practice, arbitrators award above it most of the time. Reviews of the data found that the prevailing offer exceeded the QPA in roughly 87 percent of determinations, with a median award several times the in network rate.",
        "That gap is the core of the opportunity. When a plan pays at or near the QPA on an out of network claim, the difference between that payment and a well supported IDR award is the revenue a practice leaves behind by not filing.",
      ],
    },
    {
      id: "how-much",
      heading: "How much you can recover.",
      paragraphs: [
        "Recovery depends on the service, the geography, the strength of the submission, and the gap between what the plan paid and the defensible market rate. There is no flat figure, and any honest answer is a range tied to your own claims.",
        "The reliable way to size it is to review a sample of denied or underpaid out of network explanations of benefits, identify the codes, and compare the plan's payment to comparable prior determinations for those codes. That comparison turns an abstract win rate into a dollar figure for your practice.",
      ],
    },
    {
      id: "after-determination",
      heading: "What happens after the IDR determination.",
      paragraphs: [
        "The IDRE issues a written determination that selects one offer and explains the basis. There is no appeal of the merits. The decision stands, which is why the quality of the submission matters so much going in.",
        "When the provider's offer prevails, the plan owes the difference between what it already paid and the determined amount.",
      ],
    },
    {
      id: "unpaid-award",
      heading: "When the insurer does not pay the award.",
      paragraphs: [
        "The plan is generally required to pay the determined amount within 30 calendar days of the determination. Most do. When a plan does not, the determination is enforceable, and the provider has recourse to pursue payment.",
        "Track the payment date the same way you track filing deadlines. An award that is won but not collected is not recovery. Following determinations through to payment is part of running IDR well.",
      ],
    },
    {
      id: "unclaimed-revenue",
      heading: "The unclaimed revenue most practices leave behind.",
      paragraphs: [
        "Roughly 10 percent of eligible claims reach arbitration at all. Set that against an 88 percent provider win rate and the gap is not a dispute problem. It is a filing problem. The claims are winnable and they are not being filed, because filing takes longer than the claim appears to be worth.",
        "That calculation changed on June 11, 2026, when the administrative fee dropped from $115 to $15.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the provider win rate in IDR?",
      a: "Analysis of CMS data through mid 2025 found providers prevailing in roughly 88 percent of resolved federal IDR disputes. Win rate reflects the pattern across many determinations and is not a guarantee on any single claim, since a weak submission can lose a winnable one.",
    },
    {
      q: "How do IDR awards compare to the QPA?",
      a: "The prevailing offer exceeded the qualifying payment amount in roughly 87 percent of determinations in published reviews, with a median award several times the in network rate. The gap between a plan's QPA based payment and a well supported award is the recovery opportunity.",
    },
    {
      q: "How much can I recover through IDR?",
      a: "Recovery depends on the service, geography, the strength of the submission, and the gap between the plan's payment and the defensible market rate. The reliable way to size it is to compare a sample of underpaid out of network claims to comparable prior determinations for those codes.",
    },
    {
      q: "What if the insurer does not pay the IDR award?",
      a: "Plans are generally required to pay the determined amount within 30 calendar days. When a plan does not, the determination is enforceable and the provider has recourse to pursue payment. Tracking the payment date is part of running IDR effectively.",
    },
  ],
  related: ["federal-idr-process", "idr-eligibility-deadlines-fees", "idr-attorney-vs-software"],
};

const IDR_ATTORNEY_VS_SOFTWARE: ResourceArticle = {
  slug: "idr-attorney-vs-software",
  title: "Do you need an attorney to file federal IDR?",
  subtitle: "Who can file, when legal help is worth paying for, and how the economics compare.",
  metaTitle: "Do You Need a Lawyer to File Federal IDR? | Sydra",
  metaDescription:
    "Whether you need an attorney to file federal IDR, who can run the process, and how a typical contingency compares to software your billing team operates in house.",
  datePublished: "2026-06-10",
  excerpt:
    "Whether an attorney is required, who can run IDR, and how a typical contingency compares to software your team operates in house.",
  lead: "Many practices assume federal IDR requires a lawyer. It does not. The No Surprises Act lets a provider or its authorized representative run the entire process. What follows is who can file, when legal help genuinely earns its cost, and how a contingency compares to operating software in house.",
  dualCtas: true,
  sections: [
    {
      id: "do-you-need-a-lawyer",
      heading: "Do you need a lawyer to file IDR?",
      paragraphs: [
        "No. The No Surprises Act does not require an attorney to initiate or pursue federal IDR. A provider can file directly, and so can the provider's authorized representative, including an in house billing team or a billing company acting on the provider's behalf.",
        "Attorneys can add value on novel legal questions, large dollar disputes, or enforcement when a plan refuses to pay. For routine, repeatable IDR on standard out of network claims, the work is procedural and evidentiary, not adversarial litigation. That is work a trained billing team can do.",
      ],
    },
    {
      id: "who-can-file",
      heading: "Can a billing company or in house team file IDR?",
      paragraphs: [
        "Yes. A billing company or an internal revenue cycle team can complete every step: sending the open negotiation notice, initiating through the federal portal, selecting the IDRE, and submitting the offer and evidence. The provider authorizes the representative, and the representative does the work.",
        "The practical question is not permission. It is capacity. A complete submission built by hand runs 25 to 40 minutes. At volume, that is the bottleneck, not the law.",
      ],
    },
    {
      id: "economics",
      heading: "The economics: contingency fee vs software.",
      paragraphs: [
        "A contingency typically keeps 10 to 20 percent of every recovery. On a single claim that is a reasonable price for someone else carrying the risk and the work.",
        "On a steady stream of out of network claims it compounds: 20 percent of every award, on every claim, indefinitely. The work per claim does not grow with the size of the award, but the fee does.",
        "Sydra is priced on per claim and subscription models rather than a percentage of recovery, so the cost of the service stops scaling against you at exactly the point your volume makes it most expensive. That is the whole of the economic argument. It is about the pricing model, not about the firms that use it.",
      ],
    },
    {
      id: "in-house-vs-outsourcing",
      heading: "In house vs outsourcing IDR.",
      paragraphs: [
        "The right model depends on who operates the workflow, not claim volume alone. Three patterns are common.",
      ],
      list: [
        "In house with software: your billing team prepares and files submissions with a tool that does the heavy drafting. You keep the full recovery and control every submission.",
        "In house with support: your team operates the software, with specialist support available on edge cases and periodic account review.",
        "Full service: an outside team handles every claim end to end. This fits practices without billing capacity to run the workflow themselves.",
      ],
    },
    {
      id: "what-good-looks-like",
      heading: "What good IDR support looks like.",
      paragraphs: [
        "An attorney, a billing company, or your own team can all do this well. What separates good from bad is whether the six required elements get built properly and whether the deadlines get met. Both are process questions.",
      ],
    },
    {
      id: "contingency-firm",
      heading: "If you run a contingency firm",
      paragraphs: [
        "Same engine, aimed at a different number: recoveries per FTE. Automating the mechanical steps makes smaller dollar claims economical to pursue that currently are not worth a reviewer's time, and it lets your experienced people spend their hours on the disputes where judgment actually changes the outcome.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need an attorney for the No Surprises Act IDR process?",
      a: "No. The statute does not require one to initiate or pursue federal IDR.",
    },
    {
      q: "Can I file IDR without a lawyer?",
      a: "Yes. A provider can file directly, and so can an authorized representative — an in house billing team or a billing company acting on the practice's behalf.",
    },
    {
      q: "How do typical contingency fees compare to software?",
      a: "A contingency typically keeps 10 to 20 percent of every recovery, and that share grows with your volume. Sydra is priced on per claim and subscription models rather than a percentage of recovery.",
    },
    {
      q: "Can a billing company file IDR on my behalf?",
      a: "Yes, as your authorized representative. Many do, and Sydra can run white label under their brand.",
    },
  ],
  related: ["federal-idr-process", "idr-win-rates-and-awards", "idr-eligibility-deadlines-fees"],
};

const NO_SURPRISES_ACT_FOR_SURGEONS: ResourceArticle = {
  slug: "no-surprises-act-for-surgeons",
  title: "The No Surprises Act, explained for surgeons.",
  subtitle: "QPA, open negotiation, and what IDR means for your practice.",
  metaTitle: "The No Surprises Act Explained for Surgeons and Providers | Sydra",
  metaDescription:
    "A plain explanation of the No Surprises Act for surgical practices: why out of network claims are underpaid, what the QPA is, open negotiation, and independent dispute resolution.",
  datePublished: "2026-06-10",
  excerpt:
    "A plain explanation of the No Surprises Act from the provider side: underpayment, the QPA, open negotiation, and how IDR works.",
  lead: "The No Surprises Act removed the patient from out of network billing disputes. The patient pays the in network cost share, and the provider and the plan settle the balance between themselves.\n\nMost practices operationalized the first half and never touched the second. This page covers the provider side: why out of network claims come back short, what the qualifying payment amount is and is not, and how IDR gives you a route to the difference.",
  sections: [
    {
      id: "what-it-does",
      heading: "What the No Surprises Act does.",
      paragraphs: [
        "The No Surprises Act, in effect since 2022, protects patients from surprise out of network bills in specific situations: emergency care, and out of network care delivered at an in network facility. The patient pays their in network cost share, and the provider cannot balance bill them for the rest.",
        "That protection moves the payment dispute off the patient and onto the provider and the plan. The Act replaced balance billing with a defined resolution process: open negotiation first, then federal independent dispute resolution if the parties do not agree.",
      ],
    },
    {
      id: "why-underpaid",
      heading: "Why out of network claims come back underpaid.",
      paragraphs: [
        "Because the provider can no longer bill the patient for the balance, the only counterparty is the plan, and plans tend to pay out of network claims at or near their own benchmark rather than the provider's charge. For complex surgical work, that benchmark often sits well below a defensible market rate.",
        "The result is a steady stream of out of network explanations of benefits that pay a fraction of billed charges. For orthopedic, spine, neurosurgery, and plastics practices, where individual procedures carry significant value, the gap on a single claim can be large, and it repeats across the panel.",
      ],
    },
    {
      id: "qpa",
      heading: "What the qualifying payment amount is.",
      paragraphs: [
        "The qualifying payment amount, or QPA, is generally the plan's median contracted rate for the same service in the same geographic area, calculated under federal rules. It sets the patient's cost share and anchors the plan's position in a dispute.",
        "The QPA is the plan's number, and plans present it as the reasonable rate. It is one factor an arbitrator weighs, not the ceiling. In practice, IDR awards exceed the QPA in the large majority of determinations, which is why a QPA based payment is often a starting point rather than the final word.",
      ],
    },
    {
      id: "open-negotiation",
      heading: "Open negotiation: the required first step.",
      paragraphs: [
        "Before a dispute can reach arbitration, the Act requires a 30 business day open negotiation period. Either party starts it with the federal Open Negotiation Notice, and the window is a genuine chance to settle.",
        "Many disputes resolve here once a plan understands the provider intends to pursue IDR. If the 30 business day period closes without agreement, the claim becomes eligible for independent dispute resolution.",
      ],
    },
    {
      id: "idr",
      heading: "Independent dispute resolution and baseball style arbitration.",
      paragraphs: [
        "Independent dispute resolution is the arbitration the Act created. It is final offer arbitration: each side submits a single payment amount, and a certified arbitrator picks one of the two. The arbitrator cannot split the difference.",
        "That format, sometimes called baseball style arbitration, rewards the side that brings a credible, well documented number. For a surgical practice, that means an offer backed by comparable prior determinations, clinical necessity from the operative note, and the surgeon's credentials and volume on the specific procedure.",
      ],
    },
    {
      id: "what-it-means",
      heading: "What it means for a surgical practice.",
      paragraphs: [
        "Surgical specialties feel this most, because the gap between a plan's qualifying payment amount and the market rate for a complex procedure is widest exactly where the procedure is most complex. That is also where prior determinations are most favorable, and where a documented submission is most likely to be picked.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the No Surprises Act for providers?",
      a: "The No Surprises Act protects patients from surprise out of network bills in emergencies and at in network facilities, and it replaces balance billing with a defined process between the provider and the plan: a 30 business day open negotiation, then federal independent dispute resolution if the parties do not agree.",
    },
    {
      q: "What is independent dispute resolution in medical billing?",
      a: "Independent dispute resolution, or IDR, is the federal arbitration the No Surprises Act created to settle out of network payment disputes. It is final offer arbitration: each side submits one payment amount, and a certified arbitrator selects one of the two based on the supporting evidence.",
    },
    {
      q: "What is a qualifying payment amount?",
      a: "The qualifying payment amount, or QPA, is generally the plan's median contracted rate for the same service in the same geographic area. It sets the patient's cost share and anchors the plan's position, but it is one factor an arbitrator weighs, not a ceiling. IDR awards exceed the QPA in most determinations.",
    },
    {
      q: "Why are out of network surgical claims underpaid?",
      a: "Because the No Surprises Act prevents balance billing the patient, the plan is the only counterparty, and plans tend to pay out of network claims near their own benchmark rather than the provider's charge. For complex surgical procedures, that benchmark often sits well below a defensible market rate, leaving a recoverable gap.",
    },
  ],
  related: ["federal-idr-process", "idr-win-rates-and-awards", "idr-eligibility-deadlines-fees"],
};

const IDR_WIN_RATE_AWARD_BENCHMARK: ResourceArticle = {
  slug: "sydra-idr-win-rate-award-benchmark",
  title: "The federal IDR record, in one place.",
  subtitle: "Published win rates and award multiples, with the source and reporting period on every figure.",
  metaTitle: "Federal IDR Win Rates and Award Benchmarks | Sydra",
  metaDescription:
    "A citable benchmark of federal IDR outcomes: provider win rates, how awards compare to the QPA, surgical and neurology award multiples, dispute volume, and the sources behind each figure.",
  datePublished: "2026-07-18",
  dateModified: "2026-07-18",
  excerpt:
    "One standalone reference for federal IDR outcomes: win rates, award multiples over the QPA, and dispute volume, each figure sourced and dated.",
  lead: "This benchmark aggregates the published federal IDR record into one citable page. Every figure below is drawn from CMS Public Use Files and independent analyses by Georgetown CHIR, the Congressional Research Service, and others, with the source and reporting period noted. These are aggregate federal figures, not a prediction about any one claim, and they move as new public use files publish.\n\nThese are aggregate federal figures from CMS Public Use Files and independent analyses. They are not Sydra outcomes. They describe the federal IDR record across all disputes and they update as new public use files publish.",
  sections: [
    {
      id: "win-rate",
      heading: "Provider win rate.",
      paragraphs: [
        "Providers win the large majority of properly filed federal IDR disputes. Analysis of CMS figures found providers prevailing in about 88 percent of resolved disputes through the first half of 2025, and separate review put 2024 determinations at about 85 percent in the provider's favor.",
      ],
      list: [
        "About 88 percent provider win rate. Source: CMS Federal IDR Public Use Files and Georgetown University CHIR analysis. As of H1 2025.",
        "About 85 percent of 2024 determinations decided for the provider. Source: Congressional Research Service R48738. As of 2024.",
      ],
    },
    {
      id: "awards-vs-qpa",
      heading: "Awards versus the qualifying payment amount.",
      paragraphs: [
        "The qualifying payment amount, or QPA, is the plan's median contracted rate and its anchor in a dispute. In practice the prevailing offer beats the QPA in the large majority of determinations.",
      ],
      list: [
        "In about 88 percent of determinations, the prevailing offer beat the qualifying payment amount. Source: CMS Federal IDR Public Use Files. As of 2024 to 2025.",
        "Independent review found the prevailing offer exceeded the QPA in about 87 percent of awards, with a median award several times the in network rate. Source: American College of Radiology analysis of CMS data. As of January 2026.",
      ],
    },
    {
      id: "specialty-multiples",
      heading: "Award multiples by specialty.",
      paragraphs: [
        "The averages hide the real story, which is how far surgical awards run above the QPA compared with the high volume specialties. Surgery and neurology recover the widest multiples in the dataset.",
      ],
      list: [
        "Surgical disputes win the largest award multiples versus the QPA across recent reporting periods. Source: CMS PUF, CRS R48738, and Georgetown CHIR. As of 2024 to 2025.",
        "Neurology and neuromuscular disputes have awarded over 1,200 percent of the QPA. Source: CMS PUF and Georgetown CHIR. As of 2024.",
        "Radiology disputes award around 559 to 594 percent of the QPA. Source: Georgetown CHIR and CMS PUF. As of 2024 to 2025.",
        "Emergency disputes award far smaller multiples than surgery, which is why aggregators crowd that lane and surgery stays open. Source: Georgetown CHIR and CMS PUF. As of H1 2024.",
      ],
    },
    {
      id: "volume",
      heading: "Dispute volume and who files.",
      paragraphs: [
        "Volume is dominated by a handful of high frequency filers, while the highest value specialties file rarely. That gap is why the surgical lane stays open.",
      ],
      list: [
        "About 4.8 million disputes were filed through the end of 2025, against the roughly 17,000 per year Congress expected. Source: Georgetown CHIR and CMS bimonthly updates. As of December 2025.",
        "Surgery and neurology together were only about 9 percent of resolved cases, yet they win the largest multiples. Source: Georgetown CHIR. As of 2024.",
        "An estimated 10 percent of eligible claims ever reach IDR arbitration. Source: ACEP analysis of CMS data.",
      ],
    },
    {
      id: "routing",
      heading: "Plan routing context.",
      paragraphs: [
        "How a claim routes shapes the benchmark that applies. Self funded plans are the dominant path to the federal process.",
      ],
      list: [
        "About 65 percent of covered workers are in self funded plans, which route to federal IDR regardless of state. Source: Peterson KFF Health System Tracker. 2021 baseline.",
        "About 22 states have a specified state law that can govern fully insured disputes instead of the federal process. Source: Commonwealth Fund. As of 2024 to 2025.",
      ],
    },
    {
      id: "how-to-cite",
      heading: "How to cite this benchmark.",
      paragraphs: [
        "Each figure above links back to a primary source in the references below. When citing, name the underlying source and its reporting period rather than this page alone, since the figures update as new CMS Public Use Files publish. Sydra maintains this page against the current public use files.",
        "For the methodology behind the process these figures describe, see the federal IDR process walkthrough and the eligibility, deadlines, and fees reference.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the provider win rate in federal IDR?",
      a: "Analysis of CMS data found providers prevailing in about 88 percent of resolved federal IDR disputes through the first half of 2025, and about 85 percent of 2024 determinations were decided for the provider. Win rate reflects the pattern across many determinations and is not a guarantee on any single claim.",
    },
    {
      q: "How much higher than the QPA are IDR awards?",
      a: "The prevailing offer beat the qualifying payment amount in roughly 87 to 88 percent of determinations. Surgical disputes win the largest multiples versus the QPA, and neurology disputes over 1,200 percent, far above emergency disputes.",
    },
    {
      q: "How many IDR disputes have been filed?",
      a: "About 4.8 million disputes were filed through the end of 2025, against the roughly 17,000 per year Congress originally expected. Surgery and neurology were only about 9 percent of resolved cases despite winning the largest multiples.",
    },
    {
      q: "Are these Sydra performance figures?",
      a: "No. These are aggregate federal figures from CMS Public Use Files and independent analyses, not Sydra outcomes. They describe the federal IDR record across all disputes and update as new public use files publish.",
    },
  ],
  related: ["idr-win-rates-and-awards", "federal-idr-process", "idr-eligibility-deadlines-fees"],
};

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  FEDERAL_IDR_PROCESS,
  IDR_ELIGIBILITY_DEADLINES_FEES,
  IDR_WIN_RATES_AND_AWARDS,
  IDR_ATTORNEY_VS_SOFTWARE,
  NO_SURPRISES_ACT_FOR_SURGEONS,
  IDR_WIN_RATE_AWARD_BENCHMARK,
];

export const RESOURCE_SLUGS = RESOURCE_ARTICLES.map((article) => article.slug);

export function getArticleBySlug(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((article) => article.slug === slug);
}
