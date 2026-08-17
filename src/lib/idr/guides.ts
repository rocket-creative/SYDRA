import type { EntityFaqItem } from "@/components/idr/entity-faq";

/**
 * Question / how-to pages (playbook section 2: the highest commercial-intent
 * surface). These are hand-written evergreen guides, indexable by default.
 */
export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: EntityFaqItem[];
  /**
   * Anchor text to use when this guide is linked from browse lists (for example
   * the /idr how-to guides list). Lets the on-page H1 stay readable while the
   * internal link matches the exact query string it targets.
   */
  listLabel?: string;
  /**
   * Ordered steps for HowTo structured data. Present only on procedural guides
   * whose sections describe a start to finish sequence.
   */
  howToSteps?: { name: string; text: string }[];
  /**
   * Contextual link up to the primary pillar page this guide supports. Rendered
   * near the top of the guide so the two pages reinforce rather than compete.
   */
  crossLink?: { href: string; anchor: string; intro: string };
};

export const GUIDES: Guide[] = [
  {
    slug: "what-is-no-surprises-act-idr",
    title: "No Surprises Act IDR: how the law creates the dispute path",
    listLabel: "what is no surprises act IDR",
    crossLink: {
      href: "/what-is-idr",
      anchor: "what is IDR",
      intro: "For the plain definition and who qualifies, start with",
    },
    metaTitle: "No Surprises Act IDR: How the Law Works | Sydra",
    metaDescription:
      "How the No Surprises Act creates and governs federal IDR: the statutory basis, which plans route to the federal process, the QPA anchor, and the 2026 operations rule.",
    lead: "No Surprises Act IDR is the arbitration mechanism the statute itself created to replace balance billing. The law does more than name a process. It sets who is covered, which plans route to the federal forum, what evidence an arbitrator may weigh, and the clocks that gate a filing. This page explains those regulatory mechanics, so it pairs with the definitional overview of what federal IDR is.",
    sections: [
      {
        heading: "The statute that created the process.",
        paragraphs: [
          "The No Surprises Act was enacted as part of the Consolidated Appropriations Act of 2021 and took effect in 2022. Alongside the patient protections, it directed federal agencies to build an independent dispute resolution process, and those agencies implemented it through regulations at 45 CFR Part 149. IDR is not a private service a provider opts into. It is the remedy the law wrote in place of balance billing.",
          "That distinction matters for how a claim is argued. Because IDR is a creature of the statute and its rules, eligibility, timing, and evidence all trace back to specific regulatory requirements rather than to negotiation custom.",
        ],
      },
      {
        heading: "Which plans the federal process governs.",
        paragraphs: [
          "The federal IDR process governs disputes the No Surprises Act reaches: out of network emergency care, out of network care at an in network facility, and air ambulance services. Whether a specific claim uses the federal forum or a state one turns on plan type.",
          "Self funded employer plans are governed by federal law, so they route to federal IDR in every state. Fully insured plans can fall under a state surprise billing law where one exists, and in that case the state process controls and the federal one steps aside. Confirming plan type is the first regulatory question on any claim, because filing in the wrong forum wastes the window.",
        ],
      },
      {
        heading: "What the arbitrator is allowed to weigh.",
        paragraphs: [
          "The rules define the qualifying payment amount, or QPA, as the plan's median contracted rate for the service in the area, and they make it the starting anchor in a dispute. The regulations also list the additional factors an arbitrator may consider, including the complexity of the service, the provider's training and experience, and prior determinations on the same code.",
          "This is the regulatory reason surgical awards run high. The statute does not cap the award at the QPA. It requires the arbitrator to weigh the QPA against credible evidence, and for complex operative work that evidence pulls the fair number well above the plan's anchor.",
        ],
      },
      {
        heading: "The statutory gate and the 2026 rule.",
        paragraphs: [
          "Before a claim can reach arbitration, the law requires a 30 business day open negotiation period, and once it closes a provider has four business days to initiate IDR. These are not soft targets. They are regulatory deadlines, and missing the four business day window forecloses the claim.",
          "A federal operations rule finalized in 2026 tightened the mechanics further. Open negotiation moved into the federal portal, disputes now carry registration numbers, and a structured eligibility review happens early. The economics that favor providers did not change, but the documentation bar did.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is No Surprises Act IDR a federal law or a service?",
        a: "It is a process the federal statute created and that regulations at 45 CFR Part 149 govern. It replaced balance billing with a defined arbitration remedy, so eligibility, timing, and evidence all trace to regulatory requirements.",
      },
      {
        q: "How does the No Surprises Act decide federal versus state IDR?",
        a: "Plan type decides. Self funded employer plans are governed by federal law and route to federal IDR in every state. Fully insured plans can fall under a state surprise billing process where one exists, and that state pathway then controls.",
      },
      {
        q: "Does the No Surprises Act cap the award at the QPA?",
        a: "No. The rules make the qualifying payment amount the anchor, but they require the arbitrator to weigh it against other factors such as service complexity, provider training, and prior determinations, which is why surgical awards frequently land above the QPA.",
      },
    ],
  },
  {
    slug: "how-to-file-idr",
    title: "How to file federal IDR step by step",
    listLabel: "federal IDR process",
    metaTitle: "How to file federal IDR step by step | Sydra",
    metaDescription:
      "The exact sequence to dispute an underpaid out of network claim through the No Surprises Act IDR process, with the deadlines that decide the outcome.",
    lead: "To file federal IDR, first confirm the claim is eligible, then complete the 30 business day open negotiation period, then initiate IDR within four business days of that period closing. Select a certified dispute resolution entity, submit your offer with supporting data, and the arbitrator picks one final number. Miss the four business day window and the claim is lost.",
    howToSteps: [
      {
        name: "Confirm the claim is eligible",
        text: "Verify the claim is out of network and within the scope of the No Surprises Act. Plan type matters: self funded employer plans route to federal IDR everywhere, while fully insured plans may route to a state process in states that have one.",
      },
      {
        name: "Complete the 30 business day open negotiation period",
        text: "Send the open negotiation notice and run the required 30 business day period during which you and the plan try to settle directly. Most disputes do not settle, but the period is required before IDR can begin.",
      },
      {
        name: "Initiate IDR within four business days",
        text: "After open negotiation closes, you have only four business days to initiate IDR through the federal portal. This is the window where most recoverable claims quietly die when a practice gets busy.",
      },
      {
        name: "Submit one offer backed by evidence",
        text: "Submit a single payment offer supported by benchmark data and prior determinations on the same code. File one claim per CPT so each award is decided on its own merits rather than dragged toward the weakest claim in a batch.",
      },
      {
        name: "Receive the arbitrator's determination",
        text: "A certified dispute resolution entity picks one of the two offers. There is no splitting the difference, so the offer best supported by the evidence prevails, and the plan pays the determined amount.",
      },
    ],
    sections: [
      {
        heading: "Timing decides the outcome.",
        paragraphs: [
          "Filing IDR is not complicated, but it is unforgiving on timing. The process rewards practices that move quickly and punishes the ones that let a window close.",
        ],
      },
      {
        heading: "Eligibility and open negotiation.",
        paragraphs: [
          "Start with eligibility. The claim must be out of network and within the scope of the No Surprises Act. Plan type matters here: self funded employer plans route to federal IDR everywhere, while fully insured plans may route to a state process in states that have one.",
          "Next comes open negotiation. This is a 30 business day period where you and the plan try to settle directly. Most do not settle, but the period is required before IDR.",
        ],
      },
      {
        heading: "The window that decides everything.",
        paragraphs: [
          "Then the window that decides everything. After open negotiation closes, you have only four business days to initiate IDR. This is where most recoverable claims quietly die. A practice gets busy, the window passes, and the underpayment becomes permanent.",
          "Once initiated, you submit one offer backed by benchmark data and prior determinations on the same code. The arbitrator picks one number.",
        ],
      },
      {
        heading: "Running it at volume.",
        paragraphs: [
          "These five steps are the easy part to understand. The hard part is running them across a full claim volume without a single window slipping, and that is the part that loses practices money. Sydra builds the packet, cites the supporting determinations, files one claim per CPT, and keeps both clocks visible for every claim at once, so knowing the steps turns into actually getting paid.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the most common filing mistake?",
        a: "Missing the four business day window to initiate IDR after open negotiation closes. The clock is short and unforgiving, which is why Sydra tracks it automatically.",
      },
      {
        q: "Should claims be batched?",
        a: "Federal rules allow batching similar claims into one dispute as of the May 2026 CMS rule, but for high multiple surgical claims one arbiter offer can make the whole batch win or lose together. Sydra defaults to one claim per CPT so each award is decided on its own merits, and your team can choose to batch per submission when the tradeoff fits.",
      },
    ],
  },
  {
    slug: "idr-deadlines-explained",
    title: "IDR deadlines and the four business day window",
    crossLink: {
      href: "/idr-filing-deadline",
      anchor: "federal IDR filing deadline",
      intro: "To check whether a claim is still inside the window, start with",
    },
    metaTitle: "IDR deadlines and the four business day window | Sydra",
    metaDescription:
      "The open negotiation period and the four business day window that decide whether an out of network claim can still be recovered, and how to track both.",
    lead: "Two clocks govern federal IDR. First, a 30 business day open negotiation period must run before you can file. Second, once that period closes, you have only four business days to initiate IDR. Miss the second window and the claim cannot be disputed. Tracking both clocks across a full claim volume is the single hardest part of filing in house.",
    sections: [
      {
        heading: "Two deadlines govern everything.",
        paragraphs: [
          "The federal IDR process lives and dies on two deadlines. Understand them and the rest is paperwork.",
        ],
      },
      {
        heading: "The open negotiation period.",
        paragraphs: [
          "The first is open negotiation. Before any claim reaches arbitration, a 30 business day open negotiation period must run. This is a required attempt to settle directly with the plan. Most claims do not settle here, but the period cannot be skipped.",
        ],
      },
      {
        heading: "The four business day window.",
        paragraphs: [
          "The second is the window that catches everyone. Once open negotiation closes, you have four business days to initiate IDR. Four. Not calendar days, business days, but still a narrow window that closes fast when a billing team is managing dozens of claims at once.",
        ],
      },
      {
        heading: "Why in house filing breaks down.",
        paragraphs: [
          "This is why in house filing breaks down at scale. A spreadsheet cannot reliably flag four business day windows across a rolling volume of claims, each with its own open negotiation start date. Something always slips. Every slipped claim is money the practice earned and then lost on a calendar technicality.",
          "Sydra tracks both clocks for every claim and surfaces the windows before they close. The deadline stops being the thing that loses you money.",
        ],
      },
    ],
    faqs: [
      {
        q: "When does the open negotiation clock start?",
        a: "On the date you or the plan sends the open negotiation notice for the claim. Document that date carefully, because the four business day window counts from 30 business days later.",
      },
      {
        q: "What happens if I miss the four business day window?",
        a: "The claim is no longer eligible for IDR. The underpayment becomes permanent. This is the most expensive mistake in the process and the easiest to make at volume.",
      },
    ],
  },
  {
    slug: "qualifying-payment-amount-explained",
    title: "What the qualifying payment amount is and why it runs low",
    metaTitle: "What the qualifying payment amount is and why it runs low | Sydra",
    metaDescription:
      "How the qualifying payment amount is calculated, why it often sits below true market value, and what that means for the size of surgical IDR awards.",
    lead: "The qualifying payment amount, or QPA, is the health plan's median contracted rate for a service in a geographic area. It is the insurer's starting number in an IDR dispute. Because plans set and calculate it, the QPA often sits below true market value, which is why surgical IDR awards frequently land far above it.",
    sections: [
      {
        heading: "The most important number.",
        paragraphs: [
          "The qualifying payment amount is the most important number in an IDR dispute, and the one most weighted toward the plan.",
        ],
      },
      {
        heading: "How the QPA is set.",
        paragraphs: [
          "By rule, the QPA is the plan's median contracted rate for the service in your region, indexed forward. In theory it represents the going in network rate. In practice, because the plan defines its own network and calculates the figure, the QPA often understates true market value for complex surgical work.",
        ],
      },
      {
        heading: "Where the opportunity lives.",
        paragraphs: [
          "That gap is the whole opportunity. The arbitrator weighs the QPA alongside other factors, including the complexity of the service, the provider's training, and prior determinations on the same code. For surgical specialties, those other factors pull the credible number well above the QPA. The published data bears this out: surgical prevailing offers have run many multiples of the QPA across recent reporting periods, far above what emergency or radiology disputes recover.",
        ],
      },
      {
        heading: "Turning the spread into claims.",
        paragraphs: [
          "Knowing the QPA runs low does not recover a dollar on its own. Capturing the spread means filing every eligible claim before its window closes, which is the work Sydra does. The benchmark table on each code and state page shows the spread for your specific payer, so the number you are leaving on the table stops being abstract and starts being a claim you file.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who calculates the QPA?",
        a: "The health plan calculates it from its own median in network rates. That self interest is exactly why prevailing IDR offers so often exceed it.",
      },
      {
        q: "Is the QPA the same as what I will be paid?",
        a: "No. The QPA is the plan's offer anchor. In surgical disputes, the final award has frequently run many times the QPA.",
      },
    ],
  },
  {
    slug: "self-funded-vs-fully-insured",
    title: "Self funded versus fully insured and why it decides your IDR path",
    crossLink: {
      href: "/idr/guide/federal-vs-state-jurisdiction",
      anchor: "federal vs state IDR jurisdiction",
      intro: "For how plan type and specified state law decide the filing forum, see",
    },
    metaTitle: "Self funded versus fully insured: your IDR path | Sydra",
    metaDescription:
      "How to tell whether an out of network claim routes to federal IDR or a state process, and why plan type is the first thing your team should check.",
    lead: "Plan type decides where your dispute goes. Self funded employer plans are governed by federal law and route to federal IDR in every state. Fully insured plans may route to a state process in states that have one. About 65 percent of covered workers are in self funded plans, so federal IDR is in play almost everywhere.",
    sections: [
      {
        heading: "Answer one question first.",
        paragraphs: [
          "Before you think about benchmarks or offers, answer one question: is the plan self funded or fully insured? Everything downstream depends on it.",
        ],
      },
      {
        heading: "What self funded plans are.",
        paragraphs: [
          "Self funded plans are employer plans where the employer pays claims directly and uses an insurer only to administer them. These are governed by federal law, which means they route to federal IDR regardless of what state you are in. Since roughly two thirds of covered workers are in self funded plans, federal IDR is the dominant path almost everywhere.",
        ],
      },
      {
        heading: "What fully insured plans are.",
        paragraphs: [
          "Fully insured plans are the traditional model where the employer buys coverage and the insurer bears the risk. These can fall under a state surprise billing process in the states that have one. About 22 states have such a law for fully insured disputes.",
        ],
      },
      {
        heading: "The practical takeaway.",
        paragraphs: [
          "The practical takeaway is simple. Identify plan type first. Self funded means federal IDR. Fully insured means check whether your state runs its own process. Get this wrong and you can burn the filing window in the wrong forum. Sydra classifies the plan and routes the claim correctly before the clock starts.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I know if a plan is self funded?",
        a: "The explanation of benefits and the plan documents indicate it, and a third party administrator name is often a clue. Sydra helps your team classify the plan before filing.",
      },
      {
        q: "Why does it matter so much?",
        a: "It determines the entire process, the deadlines, and the benchmarks. Filing in the wrong forum wastes the window.",
      },
    ],
  },
  {
    slug: "may-2026-idr-rule-change",
    title: "What changed in the May 2026 IDR operations rule",
    crossLink: {
      href: "/resources/updates/may-2026-idr-operations-rule",
      anchor: "May 2026 IDR operations rule update",
      intro: "For a short dated changelog of the same rule, see the",
    },
    metaTitle: "What changed in the May 2026 IDR operations rule | Sydra",
    metaDescription:
      "The 2026 federal IDR operations rule explained, and what it means for how surgical practices file, register, and track disputes under tighter standards.",
    lead: "A federal IDR operations rule finalized in 2026 moved open negotiation into the federal portal, introduced IDR registration numbers, and set a structured eligibility review early in the process. The changes tighten documentation and make clean, well tracked filings more important than ever.",
    sections: [
      {
        heading: "The most consequential update.",
        paragraphs: [
          "The federal IDR process keeps evolving, and the 2026 operations rule is the most consequential update for how practices actually file.",
        ],
      },
      {
        heading: "The headline operational changes.",
        paragraphs: [
          "The headline changes are operational. Open negotiation moves into the federal portal rather than living in email threads. Disputes carry registration numbers that follow the claim. And there is a structured eligibility review early in the process, which means a sloppy or mistimed filing gets caught and bounced sooner.",
        ],
      },
      {
        heading: "What the rule does not change.",
        paragraphs: [
          "None of this changes the math that makes surgical IDR worth doing. Win rates and award multiples still favor providers who file. What changes is the operational bar. The process now rewards clean documentation, accurate timing, and disciplined tracking, and it punishes the ad hoc spreadsheet approach more than before.",
        ],
      },
      {
        heading: "The case for software.",
        paragraphs: [
          "That is the case for software over manual filing in one sentence. The rules got tighter, the tracking got stricter, and the cost of a missed step went up. Sydra is built to the current process, so your team files cleanly and spends its time on the claims, not the compliance.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the rule change who wins?",
        a: "It does not change the underlying economics that favor surgical providers. It changes the operational discipline required to file cleanly, which raises the cost of doing this by hand.",
      },
      {
        q: "Do I need to do anything differently?",
        a: "Yes. Open negotiation and registration now run through the portal with stricter tracking. Sydra is built to the current process so your filings stay compliant.",
      },
    ],
  },
  {
    slug: "surgical-idr-award-multiples",
    title: "Why surgical IDR awards run so far above the QPA",
    metaTitle: "Why surgical IDR awards run so far above the QPA | Sydra",
    metaDescription:
      "The specialty data behind surgical IDR, why surgery and neurology win the largest multiples over the QPA, and why the lane stays uncrowded for now.",
    lead: "Surgical disputes win the largest multiples in the entire federal IDR dataset. Surgery and neurology together are only about 9 percent of cases, yet they recover the most per claim, while emergency and radiology crowd the low multiple lane.",
    sections: [
      {
        heading: "What total volume hides.",
        paragraphs: [
          "If you only look at total IDR volume, you miss the real story. Emergency and radiology make up roughly two thirds of all disputes, dominated by a handful of large staffing and imaging companies. They file constantly, and they win modest multiples.",
        ],
      },
      {
        heading: "Surgery wins the biggest awards.",
        paragraphs: [
          "Surgery is the opposite. Surgery and neurology together are a small slice of cases, around 9 percent, but they win the biggest awards in the dataset. Neurology disputes have topped 1,200 percent.",
        ],
      },
      {
        heading: "Why the gap is structural.",
        paragraphs: [
          "The reason is structural. The QPA leans on the plan's median contracted rate, which understates complex operative work. Arbitrators weigh complexity, training, and prior determinations, all of which favor the surgeon. The harder and rarer the procedure, the wider the gap between the plan's anchor and fair value.",
        ],
      },
      {
        heading: "Why the lane stays open.",
        paragraphs: [
          "The lane stays open because the aggregators are busy with high volume, low complexity claims, and independent surgical practices have historically absorbed underpayments rather than fight for each one. The data tells you the opportunity is real. It does not file the claims. Sydra makes filing fast enough that the highest value, least crowded lane in IDR is finally worth working at scale, which is the difference between knowing the multiples and banking them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is surgery the highest multiple specialty?",
        a: "The QPA understates complex surgical work, and arbitrators weigh complexity and training heavily. The gap between the plan's anchor and fair value is widest here.",
      },
      {
        q: "Why do so few surgical practices file?",
        a: "The volume leaders are emergency and radiology aggregators. Independent surgical practices often absorb underpayments because no one has made filing fast enough to be worth it. Sydra changes that.",
      },
    ],
  },
  {
    slug: "new-york-three-year-lookback",
    title: "New York lets you revive claims going back three years",
    metaTitle: "New York lets you revive claims going back three years | Sydra",
    metaDescription:
      "How the New York surprise billing process and its three year lookback let surgical practices recover commercial underpayments they already wrote off.",
    lead: "New York's surprise billing process uses baseball arbitration and references the FAIR Health 80th percentile benchmark, and it allows providers to challenge commercial payments going back three years. That lookback means claims a New York practice already wrote off as dead may still be recoverable. It is the most valuable and most overlooked angle in the state.",
    sections: [
      {
        heading: "Old claims are not always dead.",
        paragraphs: [
          "Most practices treat an underpaid claim as a closed book once a few months pass. In New York, that instinct leaves real money on the table.",
        ],
      },
      {
        heading: "What sets New York apart.",
        paragraphs: [
          "The New York surprise billing process has two features that set it apart. It references the FAIR Health 80th percentile as a benchmark, which tends to sit well above what plans pay. And it allows providers to challenge commercial payments going back three years.",
          "That second feature is the headline. A three year lookback means a New York surgical practice can pull claims it already wrote off, claims that are months or years old, and put them back into dispute. For a busy practice that has been absorbing underpayments, the backlog of recoverable claims can be substantial.",
        ],
      },
      {
        heading: "Plan type still comes first.",
        paragraphs: [
          "The detail that matters: this applies to fully insured commercial disputes under the New York process. Self funded plans still route to federal IDR. So the first step is always plan type. Once a claim is confirmed as eligible under the state process, the three year window turns dead claims back into recoverable ones.",
        ],
      },
      {
        heading: "Turning the lookback into a list.",
        paragraphs: [
          "The catch is that pulling three years of written off claims and checking each for eligibility by hand is a project no busy practice gets to. Sydra surfaces which of your historical New York claims still qualify, so the lookback becomes a list you can act on instead of a rule you read about.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the three year window apply to every New York claim?",
        a: "It applies to commercial fully insured disputes under the New York process. Self funded plans route to federal IDR. Confirm plan type before relying on the lookback.",
      },
      {
        q: "What makes New York different from federal IDR?",
        a: "The FAIR Health 80th percentile benchmark and the long lookback. Together they create recovery opportunities that the federal timeline does not.",
      },
    ],
  },
  {
    slug: "do-you-need-an-attorney",
    title: "Do you need an attorney to file IDR",
    metaTitle: "Do you need an attorney to file IDR? | Sydra",
    metaDescription:
      "Whether the federal IDR process requires a lawyer, what a typical contingency really costs you, and the rare cases when hiring counsel is actually worth it.",
    lead: "No, you do not need an attorney to file federal IDR. The process is administrative, not litigation, and your billing team can prepare and submit packets directly. A typical contingency takes 20 to 30 percent of every recovery for work that takes about five minutes per claim on software. Counsel earns their keep on rare, novel, or contested cases, not routine surgical disputes.",
    sections: [
      {
        heading: "The short answer is no.",
        paragraphs: [
          "The short answer is no. The federal IDR process was built to be administrative, not adversarial in the way litigation is. There is no courtroom and no requirement that a lawyer file on your behalf. A billing team can run the entire process.",
        ],
      },
      {
        heading: "Why practices hand it off.",
        paragraphs: [
          "So why do so many practices hand it to a typical contingency arrangement? Usually because filing by hand is tedious and the deadlines are easy to miss, so outsourcing feels safer. The cost of that comfort is steep. A typical contingency commonly takes 20 to 30 percent of every recovery. On a practice's full surgical volume, that is a large and permanent tax on money you earned.",
        ],
      },
      {
        heading: "When counsel is worth it.",
        paragraphs: [
          "There is a narrow case where counsel is worth it. A genuinely novel dispute, a contested eligibility question, or a claim headed toward litigation can justify a lawyer. Those are rare.",
        ],
      },
      {
        heading: "Why software wins the rest.",
        paragraphs: [
          "For everything else, which is most of the volume, software wins. Sydra lets your team prepare and submit a packet in about five minutes, track the deadlines automatically, and keep the full recovery. The typical 20 percent stays in your practice.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is IDR a court process?",
        a: "No. It is administrative arbitration run through a federal portal. There is no courtroom, no judge, and no requirement for counsel.",
      },
      {
        q: "When does hiring an attorney make sense?",
        a: "For a small number of unusual or contested cases. For routine surgical underpayments, a typical 20 percent contingency is pure margin you could have kept.",
      },
    ],
  },
  {
    slug: "open-negotiation-explained",
    title: "The 30 business day open negotiation period explained",
    crossLink: {
      href: "/idr-filing-deadline",
      anchor: "federal IDR filing deadline",
      intro: "When open negotiation closes, the initiation clock starts. See",
    },
    metaTitle: "The 30 business day open negotiation period explained | Sydra",
    metaDescription:
      "What the open negotiation period is, how to document it correctly, and why it is a required gate before any out of network IDR filing can begin.",
    lead: "Open negotiation is a required 30 business day period to settle a payment dispute directly with the plan before IDR. It starts when either party sends the open negotiation notice. Most disputes do not settle here, but the period cannot be skipped, and its closing date starts the four business day clock to initiate IDR.",
    sections: [
      {
        heading: "The step you cannot skip.",
        paragraphs: [
          "Open negotiation is the step everyone wants to skip and no one can. Before a claim reaches arbitration, the No Surprises Act requires a 30 business day window to settle directly with the plan.",
        ],
      },
      {
        heading: "Why it rarely settles.",
        paragraphs: [
          "In practice, open negotiation rarely produces a fair settlement. Plans know the period is required and often hold their number. The value of the step is not the settlement, it is the gate. You cannot file IDR until open negotiation has run.",
        ],
      },
      {
        heading: "The dates that decide the window.",
        paragraphs: [
          "What matters operationally is the dates. The period starts when the open negotiation notice goes out, and it closes 30 business days later. That closing date is the one that starts the four business day window to initiate IDR. Get the closing date wrong and you either file early and get bounced or file late and lose the claim.",
        ],
      },
      {
        heading: "Tracking it without guessing.",
        paragraphs: [
          "Sydra logs the notice date, keeps the exchanges in one place, and counts the business days so the closing date and the IDR window are never a guess.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do most claims settle in open negotiation?",
        a: "No. Plans rarely move to a fair number during open negotiation, which is exactly why the IDR option matters. Treat the period as a required gate, not a real chance to settle.",
      },
      {
        q: "What should I document?",
        a: "The notice date, every exchange, and the closing date. The closing date is what starts the four business day IDR window, so it must be exact.",
      },
    ],
  },
  {
    slug: "idr-batching-claims",
    title: "Batching vs filing individually: the actual tradeoff, and who decides",
    listLabel: "batching vs filing individually",
    crossLink: {
      href: "/resources/updates/cms-2026-idr-final-rule",
      anchor: "CMS May 2026 final rule update",
      intro: "For the dated fee cut and batching announcement, read the",
    },
    metaTitle: "Batching vs Filing Individually in Federal IDR | Sydra",
    metaDescription:
      "CMS now allows batching claims into one IDR submission to cut fees and speed resolution. Here is the real tradeoff on win rate, and why Sydra defaults to per submission filing with the client deciding.",
    lead: "CMS finalized new federal IDR rules on May 28, 2026. The administrative filing fee dropped from $115 to $15, batching multiple claims into one submission is now permitted, and a new IDR Gateway platform is rolling out in phases. Batching is a real, sanctioned option. It also carries correlated risk. Sydra defaults to one claim per CPT because that setting protects win rate for most cases, and your billing team decides per submission whether to batch.",
    sections: [
      {
        heading: "What the May 2026 rule changed.",
        paragraphs: [
          "On May 28, 2026, CMS finalized a rule overhauling federal IDR, jointly with the Departments of Labor, Treasury, and the Office of Personnel Management. The standard administrative filing fee fell from $115 to $15 per dispute. CMS also finalized permission to batch multiple related claims into a single IDR submission, aimed at lowering costs and speeding resolution. A centralized IDR Gateway platform is rolling out in phases so providers can initiate disputes, track status, and manage filings in one place.",
          "Source: CMS final rule announcement, May 28, 2026. See the dated update post for the full changelog and press release link.",
        ],
      },
      {
        heading: "The correlated risk tradeoff.",
        paragraphs: [
          "When several claims are batched into one submission, the arbiter picks one offer for the whole batch. If that offer is not selected, every code in the batch loses together. Filed individually, each code stands on its own evidence.",
          "This is Dr. Abrahams' experience from filing these claims directly, not a published CMS win rate statistic. Ten high value codes batched into one submission can win or lose as a block. The same ten codes filed individually might land eight or nine wins instead of an all or nothing outcome on the batch.",
        ],
      },
      {
        heading: "Sydra's default: one claim per CPT.",
        paragraphs: [
          "Sydra still defaults to one claim per CPT. Each claim is cited to the prior determinations closest to it, so each award is decided on its own merits. That is the setting that protects win rate for most surgical submissions, and it remains the product default.",
        ],
      },
      {
        heading: "Batching is available when you choose it.",
        paragraphs: [
          "Batching is available, CMS sanctioned, and can lower administrative fees and speed resolution when the correlated risk is acceptable. Examples include lower value codes, or codes from the same encounter with strongly overlapping evidence. Your billing team decides per submission. Sydra surfaces the tradeoff so the choice is informed, not forced.",
        ],
      },
      {
        heading: "The $15 fee changes the volume math either way.",
        paragraphs: [
          "Whether you file individually or batch, the $15 administrative fee (down from $115) makes more claims economically worth disputing than a year ago. Sydra prepares each submission in about five minutes, so filing the full book one claim per CPT stays practical at volume, and batching remains an available tool when your team wants it for a specific set of claims.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I batch my surgical IDR claims?",
        a: "Usually keep high value surgical codes individual, because one arbiter offer covers the whole batch. Batching can make sense for lower value codes or same encounter claims with overlapping evidence. Sydra defaults to one claim per CPT and lets your team choose per submission.",
      },
      {
        q: "Does Sydra refuse to batch?",
        a: "No. Sydra defaults to one claim per CPT because that protects win rate for most cases. Batching is CMS sanctioned as of the May 28, 2026 rule and available when your team wants it for a specific submission.",
      },
      {
        q: "Does filing one claim per CPT cost more in administrative fees?",
        a: "Each dispute carries its own administrative fee, now $15 under the 2026 rule. On surgical claims the protected award is often many multiples of the qualifying payment amount, which usually dwarfs the fee difference. Sydra prepares each claim in about five minutes, so per claim filing stays practical at volume.",
      },
    ],
  },
  {
    slug: "out-of-network-underpayment-recovery",
    title: "How surgical practices recover out of network underpayments",
    metaTitle: "How practices recover out of network underpayments | Sydra",
    metaDescription:
      "A practical overview of recovering underpaid out of network surgical claims through federal IDR instead of quietly absorbing the loss year after year.",
    lead: "Out of network underpayment recovery means using federal IDR to get paid fairly when a plan pays a surgical claim below market. Most practices absorb these losses because filing by hand is slow and the deadlines are easy to miss. With software, a billing team can dispute the full volume in minutes per claim and recover awards that run well above the qualifying payment amount.",
    sections: [
      {
        heading: "The hidden line item.",
        paragraphs: [
          "Every out of network surgical practice has the same hidden line item: underpayments it absorbed because chasing them was not worth the effort. Across a year, that line item is large.",
        ],
      },
      {
        heading: "The recovery path exists.",
        paragraphs: [
          "The recovery path exists and the data is favorable. Federal IDR lets a provider dispute an underpayment and have a neutral arbitrator pick the fairer of two numbers. Providers win most properly filed disputes, and surgical awards run well above the qualifying payment amount.",
        ],
      },
      {
        heading: "Why the money gets left behind.",
        paragraphs: [
          "So why does the money get left behind? Two reasons, both operational. Filing each claim by hand takes time most billing teams do not have. And the deadlines, especially the four business day window after open negotiation, are easy to miss at volume. The result is that practices file a few large claims and write off the rest.",
        ],
      },
      {
        heading: "How software removes the barriers.",
        paragraphs: [
          "Software removes both barriers. Sydra assembles the federal packet, cites prior determinations on the code, defaults to one claim per CPT to protect each award, offers CMS sanctioned batching when your team chooses it, and tracks every deadline. The practice files its full volume in minutes per claim and keeps the entire recovery. The hidden line item stops being a loss.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much is recoverable?",
        a: "Surgical prevailing offers have run many multiples of the QPA. The benchmark table on each code and state page shows the spread for your payer.",
      },
      {
        q: "Why do practices leave this money behind?",
        a: "Time and deadlines. Filing each claim by hand and tracking the windows is too slow at volume, so underpayments get written off. Sydra removes that friction.",
      },
    ],
  },
  {
    slug: "federal-vs-state-jurisdiction",
    title: "Federal vs state IDR jurisdiction: the two questions that decide",
    listLabel: "federal vs state IDR jurisdiction",
    crossLink: {
      href: "/idr/guide/self-funded-vs-fully-insured",
      anchor: "self funded versus fully insured",
      intro: "For the plan type primer that feeds this decision tree, start with",
    },
    metaTitle: "Federal vs State IDR Jurisdiction | Sydra",
    metaDescription:
      "How plan funding and specified state law decide whether an out of network dispute files in federal IDR or a state process, with NY, NJ, NH, and other examples.",
    lead: "Every out of network dispute answers two questions before you know where it gets filed: whether the health plan is self funded or fully insured, and whether the state has a specified state law that covers the service. Get either answer wrong and you can burn the filing window in the wrong forum.",
    sections: [
      {
        heading: "The two questions that decide jurisdiction.",
        paragraphs: [
          "Every out of network dispute answers two questions before you know where it gets filed.",
          "Question one: is the health plan self funded or fully insured? Self funded ERISA plans are regulated federally regardless of what state the patient is in. About 65 percent of covered workers are in self funded plans, so the majority of employer coverage routes to federal IDR no matter which state you are filing from. Fully insured plans, the kind sold and regulated at the state level, are the ones where state law gets a chance to apply instead.",
          "Question two: does the state have a specified state law? If the plan is fully insured, the next question is whether that state has what CMS calls a specified state law, a state law with its own method for determining the out of network payment amount. Where one exists and applies to the service in question, state law controls instead of federal IDR. Where it does not, or does not cover that particular service, federal IDR is the default. Commonwealth Fund research puts the count at roughly 22 states with some form of specified state law on the books, generally using a standard payment rule, a state run dispute process, or a hybrid of both.",
          "This is why the same billing company managing claims across five states can be running five different processes depending on plan funding and state law, even when the underlying dispute looks identical on paper.",
        ],
      },
      {
        heading: "States with their own process worth knowing in detail.",
        paragraphs: [
          "New York has run its own IDR process since 2015, predating the federal law. It applies to patients in fully insured, state regulated plans. One detail that matters operationally: New York allows providers to challenge commercial payments going back three years, which means claims a billing company wrote off as dead can sometimes be revived well outside the federal filing window.",
          "New Jersey runs a baseball style binding arbitration process under its Out of Network Consumer Protection, Transparency, Cost Containment, and Accountability Act. The timeline runs on its own clock, separate from the federal 30 business day open negotiation period: carriers have 20 days to pay or dispute a bill, and the provider then has 30 days to negotiate before either side can invoke arbitration. Unlike federal IDR, which is barred from considering provider billed charges, New Jersey's process can still weigh them as a factor.",
          "New Hampshire is one of the earlier states, alongside New York, New Jersey, and Illinois, to build its own arbitration process rather than defaulting to the federal one. If you're filing in New Hampshire, do not assume the federal timeline and evidence standards apply without checking eligibility first, since a fully insured plan in this state is more likely to route to the state process than the federal one.",
        ],
      },
      {
        heading: "Texas, California, Ohio, Virginia, and Georgia, as examples of how it gets complicated.",
        paragraphs: [
          "These states illustrate why jurisdiction is not always a clean state by state answer. Texas requires binding arbitration for out of network professional and lab charges but not for facility charges, so the same patient encounter can split across two processes depending on which bill you're disputing. California's state law continues to apply to individual out of network providers at in network facilities, but its common law approach to reasonable charge for emergency services was found by CMS not to qualify as a specified state law, so federal IDR applies there instead. Ohio and Virginia both have specified state laws covering emergency and certain non emergency services at in network facilities, with federal IDR filling the gaps state law doesn't reach. Georgia has a state law, but CMS's own enforcement letter notes federal IDR still applies wherever that state law doesn't.",
        ],
      },
      {
        heading: "For every other state.",
        paragraphs: [
          "CMS publishes state specific enforcement letters and a determination chart that lays out, state by state, whether a specified state law or All Payer Model Agreement applies. That is the authoritative source for any state not covered in detail above.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the same insurer always use the same process in every state?",
        a: "No. The same national insurer can be subject to federal IDR for a self funded employer plan in one state and a state arbitration process for a fully insured plan in another, depending entirely on how that specific plan is funded and what state law applies where the service was rendered.",
      },
      {
        q: "If a state has its own process, does that mean federal IDR never applies there?",
        a: "No. State law generally applies only to fully insured plans and only to the specific services the state law covers. Self funded plans in that same state still route to federal IDR, and any service the state law doesn't reach falls back to the federal process by default.",
      },
      {
        q: "How do we confirm jurisdiction for a claim before filing?",
        a: "Confirm the plan's funding status first, self funded plans go federal regardless of state. If the plan is fully insured, check whether the state has a specified state law covering that type of service. CMS's published state determination letters are the authoritative source when a state isn't covered in detail on this page.",
      },
      {
        q: "How is the CMS IDR Gateway changing the federal process in 2026?",
        a: "The May 28, 2026 CMS final rule cut the federal IDR administrative fee from $115 to $15 per party per dispute and formally sanctioned batching. CMS is also rolling out a new centralized IDR Gateway in phases through late 2026, replacing the old single use web forms.",
      },
    ],
  },
];

const GUIDE_INDEX = new Map(GUIDES.map((g) => [g.slug, g]));

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): Guide | null {
  return GUIDE_INDEX.get(slug) ?? null;
}
