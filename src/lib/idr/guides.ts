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
};

export const GUIDES: Guide[] = [
  {
    slug: "what-is-no-surprises-act-idr",
    title: "What is No Surprises Act IDR",
    metaTitle: "What is No Surprises Act IDR | Sydra",
    metaDescription:
      "A plain explanation of the federal Independent Dispute Resolution process and how out of network surgical practices use it to recover underpayments fast.",
    lead: "Independent Dispute Resolution, or IDR, is the federal process created by the No Surprises Act to settle payment disputes between out of network providers and health plans. When a plan pays a surgical claim below market, the provider can take it to a neutral arbitrator who picks one final number. Providers win most properly filed disputes, and surgical awards run far above the insurer's qualifying payment amount.",
    sections: [
      {
        heading: "What the No Surprises Act changed.",
        paragraphs: [
          "The No Surprises Act took effect in 2022 and changed how out of network bills get paid. Patients can no longer be balance billed for most emergency care and for many services at in network facilities. That protection is good for patients, but it left providers with a question: when the plan underpays, how do you recover the difference?",
        ],
      },
      {
        heading: "How Independent Dispute Resolution works.",
        paragraphs: [
          "The answer is Independent Dispute Resolution. IDR is baseball style arbitration. The provider submits one offer, the plan submits one offer, and a neutral entity picks one of the two. There is no splitting the difference, which rewards the side whose number is closest to fair market value.",
        ],
      },
      {
        heading: "Why the data favors providers.",
        paragraphs: [
          "The data favors providers who file. Across recent reporting periods, the prevailing offer beat the insurer's qualifying payment amount in the large majority of determinations, and surgical specialties have seen the widest spreads of any category. Most eligible claims are never disputed, which means most underpayments are simply absorbed.",
        ],
      },
      {
        heading: "Closing the recovery gap.",
        paragraphs: [
          "Sydra exists to close that gap. The process is public, but absorbing the loss is easier than fighting each claim by hand, so most practices absorb it. Sydra makes filing fast enough to work the whole book: your billing team checks eligibility, assembles the federal packet, and submits in about five minutes per claim. You keep the full recovery instead of handing a contingency attorney a fifth of it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who can use federal IDR?",
        a: "Out of network providers and facilities with claims covered by the No Surprises Act, once the open negotiation requirement is met. Self funded plans route to federal IDR in every state.",
      },
      {
        q: "Is IDR the same as balance billing?",
        a: "No. Balance billing the patient is what the No Surprises Act stops. IDR is how the provider recovers the difference from the plan instead of the patient.",
      },
      {
        q: "How long does IDR take?",
        a: "The arbitrator issues a determination within 30 business days of selection in most cases. The packet itself takes minutes to assemble on Sydra.",
      },
    ],
  },
  {
    slug: "how-to-file-idr",
    title: "How to file federal IDR step by step",
    metaTitle: "How to file federal IDR step by step | Sydra",
    metaDescription:
      "The exact sequence to dispute an underpaid out of network claim through the No Surprises Act IDR process, with the deadlines that decide the outcome.",
    lead: "To file federal IDR, first confirm the claim is eligible, then complete the 30 business day open negotiation period, then initiate IDR within four business days of that period closing. Select a certified dispute resolution entity, submit your offer with supporting data, and the arbitrator picks one final number. Miss the four business day window and the claim is lost.",
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
        a: "Federal rules allow batching similar claims into one dispute, but for high multiple surgical claims it can drag a strong award toward the weakest claim in the batch. Sydra files one claim per CPT so each award is decided on its own merits.",
      },
    ],
  },
  {
    slug: "idr-deadlines-explained",
    title: "IDR deadlines and the four business day window",
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
    lead: "Surgical disputes win the largest multiples in the entire federal IDR dataset, with prevailing offers running from roughly 970 percent to over 1,700 percent of the qualifying payment amount across recent periods. Surgery and neurology together are only about 9 percent of cases, yet they recover the most per claim, while emergency and radiology crowd the low multiple lane.",
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
          "Surgery is the opposite. Surgery and neurology together are a small slice of cases, around 9 percent, but they win the biggest awards in the dataset. Surgical prevailing offers have run from about 970 percent to more than 1,700 percent of the QPA across recent reporting periods. Neurology disputes have topped 1,200 percent.",
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
      "Whether the federal IDR process requires a lawyer, what a contingency attorney really costs you, and the rare cases when hiring one is actually worth it.",
    lead: "No, you do not need an attorney to file federal IDR. The process is administrative, not litigation, and your billing team can prepare and submit packets directly. A contingency attorney typically takes 20 to 30 percent of every recovery for work that takes about five minutes per claim on software. Lawyers earn their keep on rare, novel, or contested cases, not routine surgical disputes.",
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
          "So why do so many practices hand it to a contingency attorney? Usually because filing by hand is tedious and the deadlines are easy to miss, so outsourcing feels safer. The cost of that comfort is steep. A contingency attorney commonly takes 20 to 30 percent of every recovery. On a practice's full surgical volume, that is a large and permanent tax on money you earned.",
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
          "For everything else, which is most of the volume, software wins. Sydra lets your team prepare and submit a packet in about five minutes, track the deadlines automatically, and keep the full recovery. The attorney's 20 percent stays in your practice.",
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
        a: "For a small number of unusual or contested cases. For routine surgical underpayments, an attorney's cut is pure margin you could have kept.",
      },
    ],
  },
  {
    slug: "open-negotiation-explained",
    title: "The 30 business day open negotiation period explained",
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
    title: "Why Sydra files one claim per CPT instead of batching",
    metaTitle: "Batching IDR Claims vs One Claim per CPT | Sydra",
    metaDescription:
      "Batching saves a small administrative fee but can drag a high multiple surgical award down to the weakest claim in the batch. Why Sydra files one claim per CPT to protect each award.",
    lead: "Batching combines similar out of network claims into a single IDR dispute to spread the administrative fee across many claims. For low value, near identical claims that can make sense. For surgical claims it usually does not, because baseball style arbitration picks one number for the whole batch, so a strong, high multiple claim gets dragged toward the weakest claim it is grouped with. Sydra files one claim per CPT so every award is decided on its own merits.",
    sections: [
      {
        heading: "What batching actually does.",
        paragraphs: [
          "Federal rules let you combine similar claims involving the same provider and plan into one dispute, within defined criteria for service type and time period. The administrative fee attaches to the dispute, not to each claim inside it, so a batch carries that fee once rather than many times. The appeal is simple: lower per claim cost.",
        ],
      },
      {
        heading: "Why it hurts surgical awards.",
        paragraphs: [
          "IDR is baseball style arbitration. The arbitrator picks one offer for the entire dispute, not a separate number for each claim inside it. When you batch a high multiple surgical CPT together with routine, lower multiple claims, you force one number to cover all of them. The strong claim no longer stands on its own strongest comparable determinations; it gets averaged against the weakest claim in the group.",
          "For surgical practices that spread is the whole point. The administrative fee you save by batching is small. The award you compress by batching can be many multiples of the qualifying payment amount. Trading a large protected award for a small fee saving is a bad bargain.",
        ],
      },
      {
        heading: "The Sydra position: one claim per CPT.",
        paragraphs: [
          "Sydra files one claim per CPT. Each claim is submitted on its own, cited to the prior determinations that are closest to it, so each award is decided on its own merits. Nothing strong gets pulled down by something weak. This is the same position the product holds across the site, and it is why surgical awards run as high as they do when claims are filed individually.",
        ],
      },
      {
        heading: "When the fee is not the deciding factor.",
        paragraphs: [
          "The reason practices reach for batching is the per claim fee on routine underpayments. Sydra removes that pressure a different way: it prepares each submission in about five minutes, so filing every CPT on its own is fast enough that the fee stops being the thing that decides whether a claim is worth pursuing. You file the whole book, one claim per CPT, and protect every award.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I batch my surgical IDR claims?",
        a: "Generally no. Federal rules allow batching, but because the arbitrator picks one number for the whole dispute, batching a high multiple surgical claim with weaker claims drags the strong award down. Sydra files one claim per CPT so each award is decided on its own merits.",
      },
      {
        q: "Does filing one claim per CPT cost more in administrative fees?",
        a: "Slightly, because the fee attaches per dispute. But on surgical claims the protected award is many multiples of the qualifying payment amount, which dwarfs the small fee difference. Sydra also prepares each claim in about five minutes, so per claim filing stays practical at volume.",
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
          "Software removes both barriers. Sydra assembles the federal packet, cites prior determinations on the code, files one claim per CPT to protect each award, and tracks every deadline. The practice files its full volume in minutes per claim and keeps the entire recovery. The hidden line item stops being a loss.",
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
];

const GUIDE_INDEX = new Map(GUIDES.map((g) => [g.slug, g]));

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): Guide | null {
  return GUIDE_INDEX.get(slug) ?? null;
}
