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
  lead: "Federal independent dispute resolution is the arbitration process the No Surprises Act created to settle out of network payment disputes between providers and health plans. This page walks through the entire sequence, from the open negotiation notice your billing team sends to the determination the arbitrator returns, so you know exactly what each step requires and when the clock starts.",
  sections: [
    {
      id: "what-is-idr",
      heading: "What federal IDR is.",
      paragraphs: [
        "Federal IDR is final offer arbitration. Each side submits a single payment amount for the disputed service, and a certified independent dispute resolution entity, the IDRE, picks one of the two offers. The arbitrator cannot split the difference or invent a third number. It selects the offer better supported by the evidence.",
        "That structure is sometimes called baseball style arbitration, because each side commits to one number and the arbitrator chooses between them. It rewards the party that submits a credible, well documented offer and penalizes a number that looks arbitrary.",
        "IDR applies to qualifying out of network claims governed by the No Surprises Act. It does not apply to Medicare, Medicaid, or claims a state arbitration law already covers. Confirming the claim qualifies is the first thing your team should settle before investing time in a submission.",
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
        "Sydra prepares the submission your team files. It identifies the correct code from the explanation of benefits, drafts the market rate justification from a library of prior determinations, builds the clinical narrative from the operative note, and assembles the credential block. Your billing team reviews, approves, and submits through the federal portal.",
        "The process above does not change. The time it takes does. Building a complete submission from scratch runs 25 to 40 minutes per claim. With Sydra, the same packet comes together in under five minutes, and your team stays in control of every submission.",
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
  excerpt:
    "Eligibility rules, the business day deadline sequence, the fee structure, and the batching rules that decide whether a claim survives arbitration.",
  lead: "More than four in ten federal IDR disputes are challenged as ineligible by the other party. Eligibility, timing, and fees decide whether a claim ever reaches a determination. This page covers which claims qualify, the deadlines that govern each step, what the process costs, and how batching works.",
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
        "Two fees apply. Each party pays a non refundable administrative fee set by CMS each year. Each party also pays the IDRE's fee, which falls within a CMS approved range that varies for single and batched determinations.",
        "The administrative fee is not returned regardless of outcome. The IDRE fee works differently: the prevailing party's IDRE fee is effectively returned, so the losing party bears the cost of the arbitrator. Because CMS updates these amounts, confirm the current figures in the CMS fee guidance before you file.",
      ],
    },
    {
      id: "batching",
      heading: "Batching and the one claim per service question.",
      paragraphs: [
        "The federal rules allow batching of certain similar items and services into one dispute, which can lower the per claim administrative cost. It is tempting to batch aggressively to save on fees.",
        "The tradeoff is at the determination. A batched submission produces a composite offer that cannot map cleanly to any single prior determination, and it tends to perform worse at arbitration. Filing one claim per service keeps each offer tied to comparable prior determinations for that exact code, which is what the arbitrator is weighing.",
        "Sydra files one claim per code for this reason. If a case involves several codes, each becomes its own submission, and each takes under five minutes to prepare.",
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
      a: "Each party pays a non refundable administrative fee set annually by CMS, plus the IDRE's fee, which falls within a CMS approved range. The losing party effectively bears the IDRE fee. Because CMS updates these amounts, confirm the current figures in the CMS fee guidance before filing.",
    },
    {
      q: "Should I batch IDR claims?",
      a: "Batching can reduce per claim fees, but it usually weakens the determination because a composite offer cannot map cleanly to comparable prior determinations. Filing one claim per code keeps each offer tied to the right comparables and tends to perform better at arbitration.",
    },
  ],
  related: ["federal-idr-process", "idr-win-rates-and-awards", "idr-attorney-vs-software"],
};

const IDR_WIN_RATES_AND_AWARDS: ResourceArticle = {
  slug: "idr-win-rates-and-awards",
  title: "IDR win rates and award amounts.",
  subtitle: "What surgical practices actually recover.",
  metaTitle: "IDR Win Rates and Award Amounts for Providers | Sydra",
  metaDescription:
    "What federal IDR data shows about provider win rates, how award amounts compare to the qualifying payment amount, and what happens after a determination is issued.",
  datePublished: "2026-06-10",
  excerpt:
    "Provider win rates, how awards compare to the QPA, what happens after a determination, and your recourse when a plan does not pay.",
  lead: "Providers win the large majority of federal IDR disputes, and winning awards routinely land well above the plan's qualifying payment amount. This page summarizes what the published data shows, how to think about recovery on your own claims, and what happens after the arbitrator decides.",
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
        "Only a small share of eligible claims ever reach arbitration. Estimates of CMS data suggest roughly 10 percent of eligible claims are taken to IDR. The rest are written off, often because preparing a submission by hand is slow and the volume looks unmanageable.",
        "Given the win rate and the typical gap above the QPA, the claims that never get filed represent real, recoverable revenue. The constraint is rarely whether the claims would win. It is whether a team has a fast enough way to file them.",
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
  title: "Do you need an IDR attorney?",
  subtitle: "Software, billing teams, and the economics of filing.",
  metaTitle: "IDR Attorney vs Software: Do You Need a Lawyer to File? | Sydra",
  metaDescription:
    "Whether you need an attorney to file federal IDR, who can run the process, and how attorney contingency fees compare to software your billing team operates in house.",
  datePublished: "2026-06-10",
  excerpt:
    "Whether an attorney is required, who can run IDR, and how contingency fees compare to software your team operates in house.",
  lead: "Many practices assume federal IDR requires a lawyer. It does not. The No Surprises Act lets a provider or its billing team run the entire process. This page covers who can file, when legal help is worth it, and how the economics of an attorney's contingency fee compare to operating software in house.",
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
        "IDR attorneys typically charge a contingency fee, often in the range of 10 to 20 percent of every recovery. On a steady stream of out of network claims, that compounds: 20 percent of every award, on every claim, indefinitely.",
        "Software your team operates changes the structure. Instead of a percentage of each recovery, you pay for the tool that prepares the submission, and you keep the award in house. Across a year of claims, the difference between a recurring percentage of recovery and a fixed software cost is usually the largest line in the comparison.",
        "The honest caveat is staffing. Software assumes you have a billing team to operate it. If you do not, a full service option that handles claims end to end may fit better, even at a higher effective cost, because it removes the labor entirely.",
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
        "Whichever model you choose, the markers of a good process are the same: claims are caught at the explanation of benefits stage, eligibility is confirmed before drafting, each code is filed as its own submission, market rate arguments cite comparable prior determinations, and determinations are tracked through to payment.",
        "An attorney, a billing company, or your own team can all do this well. The deciding factors are speed, cost structure, and who keeps the recovery.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need an attorney for the No Surprises Act IDR process?",
      a: "No. The No Surprises Act does not require an attorney to file federal IDR. A provider or its authorized representative, including an in house billing team or a billing company, can complete the entire process. Attorneys can help with novel legal questions or enforcement, but routine IDR is procedural work a trained team can handle.",
    },
    {
      q: "Can I file IDR without a lawyer?",
      a: "Yes. You can initiate and pursue federal IDR yourself or through your billing team. The steps are sending the open negotiation notice, initiating through the federal portal, selecting the IDRE, and submitting your offer and evidence. Software that prepares the submission lets a team do this in minutes per claim.",
    },
    {
      q: "How do IDR attorney fees compare to software?",
      a: "IDR attorneys typically charge a contingency fee, often 10 to 20 percent of each recovery, on every claim. Software your team operates replaces that recurring percentage with a fixed cost and keeps the award in house. Across a year of claims, that difference is usually the largest factor in the comparison.",
    },
    {
      q: "Can a billing company file IDR on my behalf?",
      a: "Yes. A billing company acting as your authorized representative can complete every step of federal IDR. The provider authorizes the representative, and the representative sends the notice, initiates the dispute, selects the IDRE, and files the submission.",
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
  lead: "The No Surprises Act reshaped how out of network claims are paid, and surgical specialties feel it most. This page explains the Act from the provider side: what it does, why out of network claims come back underpaid, what the qualifying payment amount is, and how independent dispute resolution gives practices a path to recover the difference.",
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
        "The Act took balance billing off the table, but it gave providers a structured way to recover fair payment on out of network claims. Practices that use it well treat underpaid out of network explanations of benefits as recoverable revenue, not write offs.",
        "The work is procedural and evidentiary, and it repeats claim after claim. The practices that capture the most are the ones that catch eligible claims early, file each code on its own merits, and move fast enough to keep up with their own volume.",
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

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  FEDERAL_IDR_PROCESS,
  IDR_ELIGIBILITY_DEADLINES_FEES,
  IDR_WIN_RATES_AND_AWARDS,
  IDR_ATTORNEY_VS_SOFTWARE,
  NO_SURPRISES_ACT_FOR_SURGEONS,
];

export const RESOURCE_SLUGS = RESOURCE_ARTICLES.map((article) => article.slug);

export function getArticleBySlug(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((article) => article.slug === slug);
}
