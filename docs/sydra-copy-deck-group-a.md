# Sydra copy deck — Group A

**This is finished copy. Cursor implements it and writes nothing.**

Every sentence below is final. Paste character for character. Do not paraphrase, tighten, re-punctuate, split long sentences, convert em dashes to hyphens, or add transitions. Where a page section is not listed here, leave the existing markup and content alone and report it as a gap.

**Facts are load-bearing.** Every figure below was taken from the current live page and verified for internal consistency. Do not alter a number.

**One global correction, apply everywhere:** the CMS final rule was issued **May 28, 2026** and took effect **June 11, 2026**. Pages currently cite only one or the other. Both dates now appear together in the approved phrasing: `the CMS final rule of May 28, 2026, effective June 11, 2026`.

**Second global correction:** two different fees are being conflated across pages. The **administrative fee** is $15 per party per dispute, down from $115. The **certified IDRE fee** is separate and is paid by the losing party. Never let a page imply these are the same fee.

---

# 1. `/what-is-idr`

**Meta title:** `What Is Federal IDR? The No Surprises Act Dispute Path | Sydra`

**Meta description:** `A health plan's payment on an out of network claim is an opening offer. Federal IDR is the process for contesting it. Who qualifies, what the deadlines are, and what changed in 2026.`

**H1:** `That payment is an opening offer.`

**Subline:** `Federal IDR, explained for providers.`

**Opening:**

> When a health plan pays an out of network claim, most practices treat the amount that arrives as the amount owed. Under the No Surprises Act, it isn't. That payment is an opening offer, and federal Independent Dispute Resolution exists specifically to contest it.
>
> Most practices have never used it. This page covers what it is, who qualifies, what the deadlines are, and what changed in 2026.

**Section: `First, the No Surprises Act.`**

> The No Surprises Act took effect in 2022. It removed the patient from the middle of out of network billing disputes: the patient pays only the in network cost share, and the provider and the plan resolve the balance between themselves.
>
> That second half is the part most practices never operationalised. The law did not simply cap what you can bill. It created a mechanism for recovering what the plan should have paid, and left it to providers to use.

**Section: `Then, independent dispute resolution.`**

> Federal IDR is final offer arbitration. You submit an offer, the plan submits an offer, and a certified independent dispute resolution entity picks one. There is no splitting the difference. The entity picks the offer better supported by evidence.
>
> That structure is why preparation determines outcome. The dispute is not argued; it is documented.

**Section: `Who can use it.`**

> Out of network claims that fall under the No Surprises Act qualify — emergency services, and non emergency services delivered by out of network providers at in network facilities where no valid notice and consent was obtained.
>
> You do not need a lawyer. The statute does not require one. A provider can file directly, and so can an authorised representative — an in house billing team or a billing company acting on the practice's behalf.

**Section: `The deadlines that matter.`**

> There is a defined federal pathway between a payer's underpayment and a binding arbitrated amount: an open negotiation window, an eligibility determination, a batching decision, then arbitration. Each step has a hard deadline, and missing one forfeits the claim.
>
> The open negotiation period runs 30 business days. Once it closes, you have 4 business days to initiate IDR. There is no cure for missing either one. That is the entire reason this work goes undone. Not that it is legally difficult, but that it is deadline driven, document heavy, and unforgiving of administrative error.

Retain the existing link: `See the full deadline breakdown` → `/idr-filing-deadline`

**Section: `What changed in 2026.`**

> The CMS final rule of May 28, 2026, effective June 11, 2026, cut the administrative fee from $115 to $15 per party, per dispute. It also moved open negotiation into the federal IDR portal rather than leaving it as a direct exchange with the payer, and set batching at up to 50 qualified items per dispute.
>
> The practical effect is on which claims are worth filing. At $115 a side, small dollar disputes were not worth the administrative cost. At $15 they are. Confirm the current per dispute administrative fee when you initiate, because CMS can update fee guidance, and plan around the certified IDRE fee separately.

Retain the existing link: `Read the CMS 2026 final rule update` → `/resources/updates/cms-2026-idr-final-rule`

**Section: `How often properly filed disputes win.`**

> 88 percent of properly filed federal IDR disputes result in a provider win, according to Georgetown University CHIR, March 2026. Across 3.4 million disputes through June 2025, 87 percent of awards exceeded the qualifying payment amount, and the median award ran roughly 4.5 times the in network rate.
>
> Two numbers explain why the opportunity persists. Roughly 10 percent of eligible claims are estimated to reach arbitration at all. And 44 percent of 2024 IDR cases were challenged as ineligible — usually on administrative grounds that correct preparation prevents.

**FAQ — replace all four answers, keep the questions:**

**`What does IDR stand for?`**

> Independent dispute resolution. It is the federal arbitration process under the No Surprises Act for settling out of network payment disputes between a provider and a health plan.

**`What is the No Surprises Act?`**

> A federal law in effect since 2022 that removes the patient from out of network billing disputes. The patient pays the in network cost share, and the provider and plan resolve the balance — through IDR when they cannot agree.

**`Do I need a lawyer to file IDR?`**

> No. The No Surprises Act does not require one. A trained billing team can complete every step. Some practices hand the work to a contingency firm that takes 20 percent or more of whatever comes back. Others run the process on software and keep the award.

**`How much does it cost to file in 2026?`**

> The CMS final rule of May 28, 2026, effective June 11, 2026, set the administrative fee at $15 per party, per dispute, down from $115. The certified IDRE fee is separate and is paid by the losing party. Confirm both when you initiate, because CMS can update fee guidance.

**Closing CTA block:**

> `See what one denied claim is worth` → `/case-review`
>
> Send us one denied out of network EOB. You'll get a written IDR eligibility check and a dollar estimate back within one business day. No call required.
>
> Secondary: `Request a 15-minute demo` → `/demo`

---

# 2. `/how-it-works`

**Meta title:** `How Sydra Prepares a Federal IDR Submission | Sydra`

**H1:** `What a federal IDR submission requires, and what Sydra does with each part.`

**Opening:**

> Federal IDR is final offer arbitration. The entity picks one offer — yours or the plan's — based on which is better supported. Six elements decide that, and every one of them has to be built.
>
> Building them by hand takes 25 to 40 minutes per claim. That number, not the law, is what limits how many disputes a practice files. This page describes what each element requires and what Sydra does with it.

**Section: `What a complete federal IDR submission requires.`** — keep the existing six-item numbered list; replace its intro with:

> Six elements. A submission missing any one of them is weaker on the axis the entity actually scores.

**Element 1 — `Payment offer`**

> The offer must be a specific dollar figure per CPT code, not a range. Claude, the AI built by Anthropic and run via Amazon Bedrock, identifies the correct CPT code from the EOB, and Sydra prepares the formal offer statement against it.

**Element 2 — `Market rate justification`**

> This is the element that most often decides the outcome, and the one that takes longest by hand. Sydra pulls prior IDR determinations from a library of 213+ ingested cases, filtered to your CPT code and your state, and cites them in the submission.

**Element 3 — `Clinical necessity narrative`**

> Upload the operative note as a PDF. Claude via Amazon Bedrock reads the document directly through its multimodal layer, with no OCR and no copy and paste, and drafts the clinical narrative from what the note actually says.

**Element 4 — `Provider credentials`**

> Training, board certifications, and procedure volume for the CPT in dispute. Sydra maintains a provider profile built from the surgeon's CV. Upload it once as a DOCX and it populates every subsequent submission.

**Element 5 — `Open negotiation documentation`**

> Proof that the 30 business day period elapsed. If you have sent an Open Negotiation Notice, upload it, and Sydra attaches it with the required proof of delivery fields populated.

**Element 6 — `Eligibility verification`**

> 44 percent of 2024 IDR cases were challenged as ineligible. At EOB upload, Sydra runs a real time eligibility check through the Stedi clearinghouse using a 270/271 transaction, so a claim that will not survive challenge is flagged before anyone drafts against it.

**Section: `The export and the submission checklist.`**

> Sydra produces a DOCX and PDF packet and a guided checklist for the IDRE portal. Nothing files itself. Your billing team reviews every decision and submits.

**Section: `One claim per CPT by default, and why that still matters.`**

> Federal IDR is final offer arbitration. The entity picks one offer. There are no splits: it picks the offer better supported by evidence, and a submission covering one procedure is easier to support than one covering four.
>
> Sydra defaults to one claim per CPT code because that setting generally protects win rate. Batching is CMS sanctioned as of the final rule of May 28, 2026, effective June 11, 2026, at up to 50 qualified items per dispute, and is available when your team wants it.

**FAQ — replace all five answers, keep the questions:**

**`How does Sydra work?`**

> You upload an EOB and the supporting documents. Sydra runs the eligibility check, identifies the eligible CPT, pulls comparable prior determinations, drafts the clinical narrative from the operative note, assembles the six required elements, and exports a submission ready packet. Your team reviews and files.

**`Why does filing matter so much to the outcome?`**

> Because the entity picks one offer and does not split. The dispute is decided on which side documented its number better. Preparation is not administrative overhead in this process; it is the argument.

**`How long does the IDR process take from start to finish?`**

> The open negotiation period runs 30 business days, and IDR must be initiated within 4 business days after it closes. Determination timelines after that vary with entity workload.

**`Do I need to do anything manually?`**

> Yes, deliberately. Nothing files itself. Sydra prepares the submission; your billing team reviews every decision and submits through the IDRE portal.

**`Can Sydra handle claims across multiple payers and states?`**

> Yes. Determination comparables are filtered by CPT code and state, so a submission is built against the market the dispute actually sits in.

**CTAs on this page:** primary `See what one denied claim is worth` → `/case-review`. Secondary `Request a 15-minute demo` → `/demo`. Replace every `Schedule a demo` instance.

---

# 3. `/in-house-idr`

**Meta title:** `In House IDR Without Added Headcount | Sydra`

**H1:** `Your team can already file IDR. Time is the constraint.`

**Opening:**

> Building one federal IDR submission by hand takes 25 to 40 minutes. That is the ceiling on how many disputes a practice pursues — not the law, not eligibility, not the win rate. Sydra moves the ceiling, not the team.

**Section: `The real cost is time, not fees.`**

> The administrative fee is $15 per party, per dispute. Set against a claim worth thousands, the fee was never the reason claims went unfiled. The reason is that a biller has a finite number of hours and each submission consumes half of one. The calculator above puts your own numbers on it. The output that matters is the last one: hours returned to your billing team each month.

Keep the three-slider calculator and its ranges exactly as they are.

**Section: `Capacity, not replacement.`**

> Sydra is not about doing the same work with fewer people. It is about the team you already have filing far more disputes in the same hours. A standard single CPT claim with documents on file is prepared in about five minutes, against 25 to 40 by hand.

**Section: `Your team stays in control.`**

> Nothing files itself. Sydra prepares the submission, your billing team reviews every decision, and your team submits through the IDRE portal with a guided checklist. Nothing changes in how you practice or how you bill. The work happens downstream of what your office already does.

**FAQ — replace all three answers, keep the questions:**

**`Does Sydra replace my billing staff?`**

> No. The same biller prepares, reviews and submits each dispute — in a fraction of the time. What changes is how many disputes that biller can get through.

**`How long does a submission take with Sydra?`**

> About five minutes for a standard single CPT claim with documents on file, against 25 to 40 minutes by hand.

**`Do we still control what gets filed?`**

> Yes. Sydra never submits automatically. Your billing team reviews every draft and files it through the IDRE portal.

**CTAs:** primary `See what one denied claim is worth` → `/case-review`. Secondary `Request a 15-minute demo` → `/demo`. Replace all three `Schedule a demo` instances.

---

# 4. `/compare/sydra-vs-in-house-manual`

**Meta title:** `Sydra vs Filing Federal IDR by Hand | Sydra`

**H1:** `Sydra against filing by hand.`

**Opening:**

> Filing federal IDR by hand takes 25 to 40 minutes per claim, so most teams file far fewer claims than they are entitled to. Sydra prepares the submission in under 5 minutes. The comparison is below, and the only row that changes anything is the last one.

Keep the comparison table exactly as it is — all five rows and both columns are accurate and stay.

**Add below the table:**

> Throughput is the row that matters. The other four are how it happens.

**FAQ — replace the answer, keep the question:**

**`How much time does Sydra actually save?`**

> Preparation drops from 25 to 40 minutes per claim to under 5. That returns hours to the billing team each month, and it lets a practice file the claims it was skipping — which is where the recovery actually sits.

**CTAs:** primary `See what one denied claim is worth` → `/case-review`. Secondary `Request a 15-minute demo` → `/demo`.

---

# 5. `/case-review`

Already rewritten and live. **Two changes only.**

**Replace the H1** `Get your free claim review.` with:

> `See what one denied claim is worth.`

**Keep everything else** — the subheadline, the Abrahams pull quote and attribution, the sample link, the form, and the reassurance line — exactly as it stands.

**One fix:** the meta description promises the form collects out of network volume. It does not; the form takes work email, practice name, and a hidden honeypot. Replace the meta description with:

> `Send us one denied out of network EOB. We'll tell you whether it qualifies for federal IDR and what it's worth, in writing, within one business day. No call required.`

---

# 6. `/case-review/sample`

**Framing prose only. The claim figures, CPT code, dates, verdict and every dollar amount stay exactly as they are — this is a worked example and altering it breaks the illustration.**

**Replace the label line under the title** with:

> Sample document · Prepared for illustration · Figures are representative, not a specific practice

**Replace the closing `What happens next` block** with:

> **See it run on your own claim.** Fifteen minutes on Zoom, using your claim and your CPT codes. You will see the real output and get a price. Nothing to sign on the call.
>
> **Or we file it for you.** We prepare and submit, you keep the recovery.

Leave the existing footnote and disclaimer untouched.

---

# 7. `/resources/idr-attorney-vs-software`

The current page is already fair to attorneys and concedes their legitimate uses. Keep that posture. What changes is the frame and the economics section.

**Meta title:** `Do You Need a Lawyer to File Federal IDR? | Sydra`

**H1:** `Do you need an attorney to file federal IDR?`

**Subline:** `Who can file, when legal help is worth paying for, and how the economics compare.`

**Opening — replace:**

> Many practices assume federal IDR requires a lawyer. It does not. The No Surprises Act lets a provider or its authorised representative run the entire process. What follows is who can file, when legal help genuinely earns its cost, and how a contingency compares to operating software in house.

**Section `Do you need a lawyer to file IDR?` — keep the existing four sentences verbatim.** They are accurate, fair, and already in the right voice.

**Section `The economics: contingency fee vs software.` — replace:**

> A contingency typically keeps 10 to 20 percent of every recovery. On a single claim that is a reasonable price for someone else carrying the risk and the work.
>
> On a steady stream of out of network claims it compounds: 20 percent of every award, on every claim, indefinitely. The work per claim does not grow with the size of the award, but the fee does.
>
> Sydra is priced on per claim and subscription models rather than a percentage of recovery, so the cost of the service stops scaling against you at exactly the point your volume makes it most expensive. That is the whole of the economic argument. It is about the pricing model, not about the firms that use it.

**Section `What good IDR support looks like.` — replace:**

> An attorney, a billing company, or your own team can all do this well. What separates good from bad is whether the six required elements get built properly and whether the deadlines get met. Both are process questions.

**Add a new closing section, headed `If you run a contingency firm`:**

> Same engine, aimed at a different number: recoveries per FTE. Automating the mechanical steps makes smaller dollar claims economical to pursue that currently are not worth a reviewer's time, and it lets your experienced people spend their hours on the disputes where judgment actually changes the outcome.

**FAQ — replace answers, keep questions:**

**`Do I need an attorney for the No Surprises Act IDR process?`**

> No. The statute does not require one to initiate or pursue federal IDR.

**`Can I file IDR without a lawyer?`**

> Yes. A provider can file directly, and so can an authorised representative — an in house billing team or a billing company acting on the practice's behalf.

**`How do typical contingency fees compare to software?`**

> A contingency typically keeps 10 to 20 percent of every recovery, and that share grows with your volume. Sydra is priced on per claim and subscription models rather than a percentage of recovery.

**`Can a billing company file IDR on my behalf?`**

> Yes, as your authorised representative. Many do, and Sydra can run white label under their brand.

**CTAs:** primary `See what one denied claim is worth` → `/case-review`. Secondary `Request a 15-minute demo` → `/demo`.

---

# 8. `/faq` — bonus, since the research covered it

**H1:** `Questions about Sydra.` **Subline:** `Answered specifically.` Both stay.

**Replace all eight answers. Keep all eight questions.**

**`How long does it actually take to prepare an IDR submission in Sydra?`**

> Under 5 minutes for a standard single CPT claim, against roughly 30 minutes by hand. Upload and eligibility check runs 30 to 60 seconds, review 60 to 90 seconds, approve and export about 30 seconds. Past the first five to ten submissions most teams settle around three minutes.

**`Does Sydra batch CPT codes?`**

> It defaults to one claim per CPT code, because federal IDR is final offer arbitration and a submission covering one procedure is easier to support than one covering four. Batching is CMS sanctioned as of the final rule of May 28, 2026, effective June 11, 2026, at up to 50 qualified items per dispute, and is available per submission when your team wants it.

**`What CPT codes does Sydra's determination library cover?`**

> 213+ ingested IDR determinations, weighted toward surgical specialties — spine, orthopedic, neurosurgery, and plastics and hand. Comparables are filtered to your CPT code and your state.

**`What does Sydra cost?`**

> Sydra is priced on per claim and subscription models rather than a percentage of recovery, so the cost of the service stops scaling against you at exactly the point your volume makes it most expensive. The right number depends on specialty, state, and monthly out of network volume, so it is quoted on a 15 minute call.

**`How does Sydra handle HIPAA and patient data security?`**

> PHI is processed on Claude Sonnet 4 via AWS Bedrock, encrypted at rest with AES-256 in S3 and in transit with TLS 1.2 or above, with per practice isolation at the data layer. SOC 2 aligned. A BAA is available on request.

**`What happens if an IDR dispute loses?`**

> The plan's offer is selected and the losing party pays the certified IDRE fee, currently $50. The same item cannot be re filed against the same party for a 90 calendar day cooling period. For properly filed disputes the base rate is 88 percent in the provider's favour, which is why preparation is the whole game.

**`How long does it take to get set up on Sydra?`**

> Most practices are live within one week. Days 1 to 2, tenant provisioning. Days 2 to 3, CV upload and provider profile. Days 3 to 4, integration. Days 4 to 5, first claim run with us. Days 5 to 7, independent runs.

**`What if my practice doesn't want to run software at all?`**

> Then we run it. Sydra Full Service handles federal IDR end to end. You forward the EOBs and nothing else changes in how you practice or how you bill.

**CTAs:** replace every `Schedule a demo`, `Schedule a demo for pricing`, and `Schedule a free five minute demo` with `Request a 15-minute demo` → `/demo`. Keep `Get a free IDR review` but relabel it `See what one denied claim is worth` → `/case-review` and make it the primary.

---

# Implementation notes for the agent

1. **Write nothing.** If a section of a page is not covered above, leave it as it is and report it as a gap.
2. **Do not touch** any figure, citation, reference block, clinical review byline, structured data, canonical tag, or URL.
3. **Retain every existing internal link** unless this deck explicitly relabels it.
4. The 11-item `Sourced references` block appears on most of these pages. **Leave it untouched.**
5. Every page's primary CTA becomes `See what one denied claim is worth` → `/case-review`. Every secondary becomes `Request a 15-minute demo` → `/demo`. No page carries a third.
6. Report any instance where the copy above references a section you cannot find in the page's markup.
