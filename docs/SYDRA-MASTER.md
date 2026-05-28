# SYDRA-MASTER.md
# sydrahealth.com — Complete Build + Copy + SEO Instructions for Cursor
# One file. Every page. Every fix. Execute top to bottom.
# Prepared: May 27, 2026

---

# PART 0 — BEFORE YOU TOUCH A SINGLE FILE

## Tech stack
Next.js 15 App Router · TypeScript strict · Tailwind · Supabase · Vercel

## Two audiences on this site. Know both before writing anything.

AUDIENCE 1 — THE BILLING MANAGER OR PRACTICE ADMINISTRATOR
Has been sold software before that promised to save time and created more work.
Is protective of their team. Has limited bandwidth to onboard new tools.
Evaluates Sydra on one question: "Will my billers actually use this, and will it
actually save time or just shift where the time goes?"

AUDIENCE 2 — THE SURGEON OR MANAGING PARTNER who saw the LinkedIn post
Read Dr. Abrahams's post, thought "this might be real," and clicked through.
Is not going to operate the software. Trying to decide whether to hand it to their billing
lead or ignore it. Their question: "Is this real enough to bring to my billing team, or
will I look like I fell for another vendor pitch?"

## Writing rules — apply to every word on every page
No hyphens in copy. No em dashes. No AI telltale phrases.
Banned words: "cutting-edge" "powerful" "robust" "seamless" "intuitive"
"state-of-the-art" "our platform" (used generically) "we help practices"
Never "workers comp" — always "work-related injury" or "workplace injury"
Every stat: number + source name + date, inline, same line or line immediately below
Every CTA: describes exactly what happens next, never a promise about the outcome
Claude Sonnet 4 on AWS Bedrock: name these specifically when referencing the AI
Dr. Abrahams: "Dr. John M. Abrahams, MD" on first reference per page, "Dr. Abrahams" after

## The billing manager's objection loop — every page section resolves one of these

Objection 1: "Another tool I have to learn."
Resolution: Three steps. Upload EOB. Review draft. Export DOCX. Under 5 minutes.
Objection 2: "What if it drafts something wrong and we submit an incorrect IDR?"
Resolution: Sydra produces a draft. Your team reviews and approves. Nothing submits automatically.
Objection 3: "Does this work with ModMed?"
Resolution: Yes. ModMed integration today. Stedi clearinghouse. EOB upload also works manually.
Objection 4: "What happens to patient data?"
Resolution: AWS Bedrock, HIPAA-eligible, BAA available. PHI never leaves AWS HIPAA-eligible boundary.
Objection 5: "Our attorney handles IDR. Why change?"
Resolution: Attorney takes 20% of every recovery permanently. Sydra lets your team run IDR in house
at a platform fee structured below typical contingency. You keep more and keep control.
Objection 6: "What if I need help on a complicated case?"
Resolution: Sydra + Kronos Support adds a live specialist for exactly this. Escalation path built in.
Objection 7: "I need my manager or the doctor to approve this."
Resolution: The recovery calculator generates the economic case. The demo shows the doctor exactly
what the software does before any commitment. Nothing to approve on faith.

---

# PART 1 — GLOBAL TECHNICAL WORK

## 1A — ROOT SCHEMA
File: app/layout.tsx or new app/components/SchemaOrg.tsx
Add via Script strategy="beforeInteractive" in head

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.sydrahealth.com/#software",
      "name": "Sydra",
      "applicationCategory": "HealthcareApplication",
      "operatingSystem": "Web browser",
      "url": "https://www.sydrahealth.com",
      "description": "NSA IDR software for surgical billing teams. File federal independent dispute resolution claims in under 5 minutes. Specialty trained for orthopedic, neurosurgery, spine, and plastic surgery CPT sets. Built on AWS Bedrock with HIPAA controls.",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD",
        "description": "Pricing shared on demo call. Structured below typical 20% attorney contingency fee."
      },
      "featureList": [
        "AI-drafted federal IDR submissions using Claude Sonnet 4 on AWS Bedrock",
        "State IDR pathway support: TX live, NY CA NJ FL AZ rolling out 2026",
        "Real-time eligibility verification 270/271",
        "Prior authorization drafting",
        "CPT code assessment from operative notes",
        "213+ ingested IDR determinations with 90%+ provider win rate in reference library",
        "HIPAA controls AWS BAA SOC 2 in progress",
        "ModMed EMR integration Stedi clearinghouse"
      ],
      "creator": {
        "@type": "MedicalOrganization",
        "@id": "https://www.kronosrevenue.health/#organization",
        "name": "Kronos Health"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.sydrahealth.com/#organization",
      "name": "Sydra",
      "legalName": "Kronos Health",
      "url": "https://www.sydrahealth.com",
      "logo": "https://www.sydrahealth.com/sydra-logo-nav.svg",
      "description": "AI software for federal IDR and NSA disputes. Built by surgeons for surgical billing teams.",
      "email": "sales@kronosrevenue.health",
      "parentOrganization": {
        "@id": "https://www.kronosrevenue.health/#organization"
      },
      "sameAs": ["https://linkedin.com/company/kronos-health","https://www.kronosrevenue.health"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sydrahealth.com/#website",
      "url": "https://www.sydrahealth.com",
      "name": "Sydra",
      "publisher": { "@id": "https://www.sydrahealth.com/#organization" }
    }
  ]
}
```

## 1B — BREADCRUMB SCHEMA
Add to every inner page. Pattern:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.sydrahealth.com" },
    { "@type": "ListItem", "position": 2, "name": "PAGE NAME", "item": "https://www.sydrahealth.com/PAGE-SLUG" }
  ]
}
```

## 1C — FAQ SCHEMA
Add to homepage and /faq:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Sydra and who is it for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sydra is AI software for federal IDR and NSA dispute resolution, built for surgical billing teams at orthopedic, neurosurgery, spine, and plastic surgery practices. Your billing team operates the software in house, reducing IDR claim preparation from 30 minutes to under 5 minutes per claim. Sydra is built by Kronos Health and runs on AWS Bedrock with HIPAA controls and BAA available."
      }
    },
    {
      "@type": "Question",
      "name": "How does Sydra reduce IDR prep time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sydra uses Claude Sonnet 4 on AWS Bedrock to generate a complete federal IDR submission packet from an uploaded EOB. The system drafts the executive summary, market-rate justification citing prior IDR determinations, and clinical-necessity narrative from your operative note. Your billing team reviews, approves, and exports a submission-ready DOCX file with a guided checklist for the federal IDRE portal."
      }
    },
    {
      "@type": "Question",
      "name": "How does Sydra compare to using an IDR attorney?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Attorneys typically charge 20% of every IDR recovery as a contingency fee. Sydra is software your billing team operates, priced below typical attorney contingency fees with an exact quote on the demo call. You keep the recovery in house instead of losing 20% per award. Sydra also files one claim per CPT, which produces better IDR outcomes than the batching approach attorneys frequently use."
      }
    },
    {
      "@type": "Question",
      "name": "Is Sydra HIPAA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sydra runs on AWS healthcare workloads with HIPAA-eligible Claude Sonnet 4 on AWS Bedrock. A Business Associate Agreement is available for covered entities. Documents are encrypted in transit and at rest. Strict per-practice tenant isolation is enforced at every database table. PHI never leaves the AWS HIPAA-eligible service boundary during AI generation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Sydra Self-Serve, Sydra plus Kronos Support, and Kronos Full-Service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sydra Self-Serve is software your billing team operates independently. Sydra plus Kronos Support adds live specialist support, monthly account reviews, and escalation on edge cases. Kronos Full-Service, available at kronosrevenue.health, is fully outsourced: the Kronos Revenue team handles every claim end to end. The right fit depends on who operates the workflow, not claim volume alone."
      }
    }
  ]
}
```

## 1D — SITEMAP
File: app/sitemap.ts
```ts
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.sydrahealth.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://www.sydrahealth.com/how-it-works', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.sydrahealth.com/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.sydrahealth.com/demo', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.sydrahealth.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.sydrahealth.com/security', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.sydrahealth.com/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.sydrahealth.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: 'https://www.sydrahealth.com/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://www.sydrahealth.com/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
```

## 1E — DYNAMIC OG IMAGES
File: app/opengraph-image.tsx
Current og:image:alt is just "Sydra" — too vague. Update to:
"Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim."
Create unique OG images for: homepage, /pricing, /how-it-works, /demo, /about, /security.

## 1F — INTERNAL LINKING RULES
Every mention of "Kronos Full-Service" or "fully outsourced" in body copy links to
https://www.kronosrevenue.health/case-review
Every mention of "Kronos Revenue" in body copy (not nav) links to https://www.kronosrevenue.health
/pricing links to /demo: "Schedule a 15-minute demo"
/security links to /demo: "Schedule a demo to see the security controls in action"
/faq links to /demo after any pricing-related answer
/about links to /how-it-works and to kronosrevenue.health/team for the full team story

## 1G — CRITICAL: BUILD /pricing AS A STANDALONE URL
The current /#plans anchor is not a rankable URL. A sales rep cannot send a warm prospect
a pricing link. Google cannot rank "NSA IDR software pricing" on an anchor.
Build /pricing as a real page (see Part 5 below). This is the highest-priority new page.

---

# PART 2 — PAGE: / (HOMEPAGE)
File: app/page.tsx

## Meta
```ts
export const metadata = {
  title: "NSA IDR Software for Surgical Billing Teams | Sydra",
  description: "Sydra prepares federal IDR submissions in under 5 minutes per claim. Specialty trained for orthopedic, neurosurgery, spine, and plastics. HIPAA controls. BAA available. Free demo.",
  alternates: { canonical: "https://www.sydrahealth.com" },
  openGraph: { images: [{ url: '/opengraph-image', alt: 'Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim.' }] },
}
```

## H1
Your billing team is spending 30 minutes per NSA IDR claim.
That's not a workflow problem. That's a software problem.

## Hero subhead
Sydra prepares a complete federal IDR submission packet in under 5 minutes per claim.
Clinical narrative drafted from your operative note. Market-rate comparisons from 213+
ingested prior determinations. One claim per CPT, never batched.

Your team reviews. Your team submits. You keep the recovery.

## Hero CTAs
PRIMARY: "See Sydra on a real denied claim" → /demo
Sub-label: "15 minutes. Your specialty. No commitment."
SECONDARY: "How it works" → /how-it-works

## Trust badges (below CTAs)
HIPAA controls in place · BAA on request
AWS Bedrock · Claude Sonnet 4 · PHI stays inside AWS HIPAA-eligible boundary
ModMed integration today · Stedi clearinghouse
Built by Kronos Health · Dr. John M. Abrahams, MD, neurosurgeon founder

## Section: The time problem
H2: What 30 minutes per claim actually costs at scale.

A single federal IDR submission requires:
pulling and parsing the EOB, verifying eligibility and cooling-off period status, building
a CPT-specific payment offer, drafting a clinical-necessity narrative from the operative note,
identifying market-rate comparisons from prior determinations, preparing provider credentials,
and formatting everything for the IDRE portal.

At 30 minutes per claim:
10 claims per month = 5 hours of biller time monthly on IDR prep alone.
20 claims per month = 10 hours.
30 claims per month = 15 hours.

Most billing teams do not have 15 hours per month for a single workflow. So they file fewer
claims than they should. Or none at all. CMS data shows only about 10% of eligible claims
reach IDR. ACEP analysis.

The other 90% are either not filed or not reaching arbitration.
The insurer keeps the underpayment. Every month.

Sydra reduces the prep step to under 5 minutes per claim.
The same 30 claims per month becomes under 2.5 hours of billing team time.
The claims that were not being filed start getting filed.

## Section: Three-step workflow
H2: What your billing team actually does in Sydra.

STEP 1 — UPLOAD THE EOB
Paste or drag the EOB into Sydra. If your practice uses ModMed, the EOB data flows
directly from your EMR through the Stedi clearinghouse integration. No copy-paste.

Sydra immediately runs an eligibility check: Is this claim NSA-eligible? Is the plan type
covered? Is there an active cooling-off period for this CPT and payer combination?
Has open negotiation been properly initiated?

44% of 2024 IDR disputes were challenged as ineligible by payers. CMS data, Zelis analysis,
March 2026. Eligibility errors are the leading cause of IDR processing delays.
Sydra surfaces these before the submission, not after.

STEP 2 — REVIEW THE DRAFT
Sydra generates a complete IDR submission packet using Claude Sonnet 4 on AWS Bedrock:

Executive summary: the provider's payment offer, basis for the amount, key arguments.
Market-rate justification: prior IDR determinations on your exact CPT code in your state,
from Sydra's library of 213+ ingested determinations weighted toward surgical specialties.
Clinical-necessity narrative: drafted from your uploaded operative note. Bedrock multimodal
reads the PDF directly. No OCR. No copy-paste. The document is the source.
Provider credentials: pulled from your provider profile, built once from your CV.

Your billing team reads the draft. Makes edits. Signs off.
Nothing leaves the practice until a human has reviewed and approved it.

STEP 3 — EXPORT AND SUBMIT
One-click DOCX export. The guided submission checklist walks your biller through the IDRE portal
field by field. Track status in the Sydra dashboard.

Total time on a standard single-CPT claim with documents on file: under 5 minutes.

## Section: The economics
H2: Two ways Sydra changes the financial picture.

TIME SAVINGS:
30 minutes per claim becomes under 5.
At 20 claims per month: roughly 8 hours of biller time returned monthly.
That time goes back to denial follow-up, prior authorization, AR aging.

RECOVERY ECONOMICS:
If your practice files IDR through an attorney at 20% contingency:
Sydra lets your billing team run the workflow in house.
Platform fee is structured below typical 20% contingency.
Exact quote on your demo call after we understand your specialty and volume.

If your practice is not filing IDR at all:
Providers win 88% of properly filed IDR disputes. CMS Q1/Q2 2025 Public Use File.
Median awards come in at approximately 4.5 times the insurer's qualifying payment amount.
Georgetown CHIR, March 2026. Run your numbers below.

[RECOVERY CALCULATOR renders here]
Header: "Uses CMS published win rates (88%) and Georgetown CHIR median award benchmarks.
Not a Sydra performance claim."

## Section: The determination library
H2: Why prior determinations are what actually win IDR cases.

The federal IDR arbitrator reviews two competing payment offers. Yours and the insurer's.
The insurer's offer is anchored to the qualifying payment amount and argues QPA is the
correct benchmark for your procedure.

Your offer wins when it does two things well:
First, establishes your fee is consistent with what providers actually win on this specific CPT.
Not a general market-rate claim. Prior cases where an IDRE decided the same code at similar
amounts in the same region.
Second, demonstrates the clinical circumstances of your specific case justify that fee.
The operative note, the procedure complexity, the surgeon's volume on that code.

Sydra's library contains 213+ ingested IDR determinations, over 90% provider wins, weighted
toward spine and orthopedic CPT codes. When Sydra drafts a submission for CPT 22612
(posterior lumbar fusion), it does not generate a generic argument. It cites the specific
prior determinations that match your code, your state, and your procedure complexity.

## Section: Three tiers
H2: Three ways to handle NSA IDR. Same specialty depth. Different operator.

THE DECISION IS ABOUT WHO OPERATES THE WORKFLOW. NOT HOW MANY CLAIMS YOU FILE.

SYDRA SELF-SERVE
Your billing team runs the software independently.
Right for: teams that want to own the IDR workflow, keep all recoveries in house,
operate consistently without specialist backup.
Pricing: quoted on your demo call.
CTA: "Schedule a demo" → /demo

SYDRA + KRONOS SUPPORT
Your team runs the software. A Kronos specialist is one click away.
Right for: lean billing teams with turnover, complex CPT combinations, high-value disputes
where a specialist review adds value.
Includes: live support 9 to 5 ET, 24-hour email response, monthly account review, training
for new billers, escalation to Heisha Rivera on high-value cases.
Pricing: quoted on your demo call.
CTA: "Schedule a demo" → /demo

KRONOS FULL-SERVICE
You forward EOBs. Kronos Revenue handles every claim. Zero software to operate.
Right for: billing teams with no bandwidth, or practices that want IDR fully outsourced.
Lives at: kronosrevenue.health — not on this site.
CTA: "Get a free IDR review at Kronos Revenue" → https://www.kronosrevenue.health/case-review

## Section: Security above the fold
H2: PHI in an IDR submission. How Sydra handles it.

An IDR submission contains your patient's name, date of service, diagnosis, procedure codes,
operative note excerpts, and claim amounts. Every document that enters Sydra is protected
health information under HIPAA.

HIPAA-eligible processing: All AI generation runs on Claude Sonnet 4 on AWS Bedrock.
AWS Bedrock with Claude is HIPAA-eligible. PHI stays inside AWS's HIPAA-eligible service
boundary during generation. No PHI is transmitted to Anthropic's infrastructure.
No data used to train any model.

Encryption: AES-256 at rest in Amazon S3. TLS 1.2 or higher in transit.
Signed URLs with short expiry windows for all document retrieval.

Isolation: Strict per-practice tenant isolation enforced at the database row level.
No user account at one practice can access data from any other practice.

BAA: Available for covered entities on request. Contact support@sydrahealth.com.

SOC 2: In progress. Not yet complete. We will tell you the timeline when you ask.
We are not going to claim a certification we have not finished.

---

# PART 3 — PAGE: /how-it-works
File: app/how-it-works/page.tsx

## Meta
```ts
export const metadata = {
  title: "How Sydra Prepares an NSA IDR Submission | Step by Step | Sydra",
  description: "From EOB upload to IDRE portal submission. Eligibility check, AI draft generation, clinical narrative from op note, prior determination citations, DOCX export. Under 5 minutes.",
  alternates: { canonical: "https://www.sydrahealth.com/how-it-works" },
}
```

## H1
How Sydra prepares a federal IDR submission.
Step by step, element by element.

## Lead
This page describes what Sydra does from the moment you upload an EOB to the moment your
billing team exports a submission-ready packet for the IDRE portal. The federal IDR submission
requirements are specific. This page covers them specifically.

## H2: What a complete federal IDR submission requires.

A single federal IDR submission requires:

1. The provider's payment offer: a specific dollar amount per CPT code. Not a range. One number
   with the basis for that number documented.

2. Market-rate justification: evidence that the provider's offer is consistent with what other
   providers receive for the same service in the same geographic market. Prior determination
   citations do the work a generic "usual and customary" argument cannot.

3. Clinical-necessity documentation: tied to the operative note, specific to the patient's
   clinical circumstances. The arbitrator needs to understand why this procedure, at this
   complexity, at this fee, is reasonable.

4. Provider credentials: training, board certifications, procedure volume on the specific CPT.
   An arbitrator deciding between a $14,000 and an $8,500 offer on a complex spinal fusion
   benefits from knowing the surgeon has performed 500 of that exact procedure.

5. Open negotiation documentation: proof that a Notice of Open Negotiation was sent and that
   the 30-business-day period elapsed without agreement.

6. Eligibility confirmation: evidence the claim meets federal IDR requirements.
   44% of 2024 IDR disputes were challenged as ineligible. CMS data, Zelis analysis, March 2026.

Building all six from scratch on a single claim: 25 to 40 minutes.
Sydra handles elements 1 through 4. Your team provides the EOB and operative note.
Your team reviews and submits.

## H2: What Sydra does on each element.

ELEMENT 1 — PAYMENT OFFER
Sydra identifies the correct CPT code from the EOB and prepares the formal offer statement.
One claim per CPT. If the EOB contains multiple CPT codes, Sydra generates a separate
submission packet for each. Never batched.

The one-CPT-per-claim structure is not configurable. It is how federal IDR was designed,
and it is what the data shows produces the best outcomes for providers.

ELEMENT 2 — MARKET-RATE JUSTIFICATION
Sydra pulls prior IDR determinations from its library of 213+ ingested cases, filtered to
your specific CPT code and your state. The market-rate section cites those determinations
directly with case identifiers and determination amounts.

ELEMENT 3 — CLINICAL-NECESSITY NARRATIVE
Upload the operative note as a PDF. Sydra's Bedrock multimodal layer reads the document
using Claude Sonnet 4. No OCR. No copy-paste. The PDF is processed directly.

Sydra extracts: the procedure performed, surgical approach, clinical indication, surgeon's
documentation of complexity, intraoperative findings relevant to clinical justification,
and technique-specific details that distinguish this case from a templated submission.

The narrative draft is built from those extracted elements, not from a template.
Your billing team reviews. If something in the operative note strengthens the clinical
argument, Sydra surfaces it. If the biller sees something that needs adjustment, they edit it.
The draft is a starting point. The human is still the reviewer.

ELEMENT 4 — PROVIDER CREDENTIALS
Sydra maintains a provider profile built from the surgeon's CV. Upload the CV once as a DOCX.
Sydra extracts: board certifications, fellowship training, procedure volume by CPT category,
publications, and practice affiliations.

Each submission automatically includes the credential block relevant to the CPT being filed.
A craniotomy submission includes the surgeon's neurosurgical training and cranial procedure volume.
A total knee submission includes orthopedic training and arthroplasty volume.

ELEMENT 5 — OPEN NEGOTIATION DOCUMENTATION
If you have sent an Open Negotiation Notice, upload it. Sydra attaches it with the required
proof-of-delivery fields populated. If you have not yet sent it, Sydra flags this before
generating the submission. IDR cannot be initiated without completing the open negotiation step.

ELEMENT 6 — ELIGIBILITY VERIFICATION
At EOB upload, Sydra runs a real-time eligibility check through the Stedi clearinghouse
(270/271 transaction) if the practice is connected to ModMed. For manual uploads, Sydra
reviews the claim data against federal eligibility criteria and flags any concerns.

Any eligibility flag is surfaced before the draft is generated. You resolve the flag or
you do not file the claim. The system prevents ineligible submissions from being prepared.

## H2: The DOCX export and submission checklist.

When your billing team approves the draft, one-click export generates a submission-ready DOCX.

The DOCX contains: the formal payment offer letter, market-rate justification with prior
determination citations, clinical-necessity narrative, provider credential block, and an
appendix with all supporting documents.

The guided checklist walks your biller through the IDRE portal step by step: what goes where,
what attachments are required, what the confirmation looks like.

Nothing is submitted automatically. Your billing team controls the submission.

## H2: The one-per-CPT rule and why it matters.

Federal IDR is final-offer arbitration. The IDRE picks one offer. No splits.
The IDRE picks the offer better supported by evidence.

When multiple CPT codes are batched into one submission, the composite offer cannot map
cleanly to any single prior determination. The submission performs worse.

Sydra files one claim per CPT. If your case involves CPT 22612, 22632, 22840, and 63030,
that is four submissions. Each takes under 5 minutes in Sydra. Total: under 20 minutes for
four procedure-specific, prior-determination-cited IDR packets.

The alternative: one batched submission in 30 to 40 minutes that performs materially worse
at arbitration. The math is not complicated.

CTA: "Schedule a demo" → /demo

---

# PART 4 — PAGE: /about
File: app/about/page.tsx

## Meta
```ts
export const metadata = {
  title: "About Sydra — Built by Kronos Health | Dr. John M. Abrahams, MD | Sydra",
  description: "Sydra is built by Kronos Health, founded by Dr. John M. Abrahams, a practicing board certified neurosurgeon. The software was built from a working RCM operation, not a technology startup.",
  alternates: { canonical: "https://www.sydrahealth.com/about" },
}
```

## H1
Built by a surgeon who ran the workflow.
Not a technology startup that discovered healthcare.

## Lead
Sydra is the software arm of Kronos Health. Kronos Health is a working revenue cycle
management operation founded by Dr. John M. Abrahams, MD, a board certified practicing
neurosurgeon in New York.

The software was not built first. The billing operation was built first. Dr. Abrahams built
the IDR process for his own neurosurgical practice, trained an RCM team on it, and then built
Sydra to make the documentation step faster for billing teams who wanted to run the same
workflow in house.

That is a specific origin story. It matters for two reasons.

First: the determination library that powers Sydra's market-rate citations was built from a
working IDR practice, not scraped generically from CMS data. The cases in the library reflect
the CPT codes that surgical practices actually file — spine, ortho, neuro, plastics — not a
broad distribution across all provider types.

Second: the clinical narrative framework that drives Sydra's AI generation was built by a
surgeon who writes operative notes, not by a prompt engineer who read about them.
When you see a Sydra-generated IDR draft on your CPT code in your state, you are looking at
a document that reflects what the system has learned to produce from actual arbitration
outcomes, not what a product team thought an IDR submission should look like.

## H2: Dr. John M. Abrahams, MD — Founder

[PHOTO: Real headshot. Required. Not placeholder.]

Dr. John M. Abrahams, MD
Board Certified Neurosurgeon · Fellow, American Association of Neurological Surgeons (FAANS)
Past President, Brain and Spine Surgeons of New York · Founder, Kronos Health

Dr. Abrahams is a practicing neurosurgeon in New York. He built the original NSA IDR
submission process for his own neurosurgical practice after the No Surprises Act took effect
in 2022. The process produced consistently better outcomes than the contingency attorney model
the practice had used previously.

His role in Sydra: the clinical coding framework, the determination library curation criteria,
and the clinical-necessity narrative structure are all built from his experience as a practicing
surgeon. He reviews all medical content published by Kronos Health.

Add Person schema for Dr. Abrahams on this page:
```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. John M. Abrahams, MD",
  "jobTitle": "Founder, Board Certified Neurosurgeon",
  "medicalSpecialty": "Neurosurgery",
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Kronos Health",
    "url": "https://www.sydrahealth.com"
  },
  "url": "https://www.kronosrevenue.health/team#person-john-abrahams"
}
```

## H2: Heisha Rivera — Director of Revenue Cycle

[PHOTO: available on kronosrevenue.health — use same image]
Heisha Rivera · Director of Revenue Cycle Operations · Kronos Health

Heisha leads the RCM operation at Kronos Revenue and the Sydra + Kronos Support team.
She manages the specialists who handle Tier 2 Sydra escalations, monthly account reviews,
and the Kronos Full-Service client relationships.

## H2: Chelsea — Software and Integrations Lead

Chelsea leads Sydra's software development and integration architecture. She handles ModMed,
Stedi, and EMR integration questions on demo calls and manages the product roadmap.
EMR integration questions go to Chelsea.

## H2: Why this origin matters for your practice.

Sydra is not the first software platform to claim it can prepare IDR submissions.
It is the first one built by a practicing neurosurgeon whose team files IDR claims every
day on the same platform.

That is the reason we ask you to run the demo on a real denied claim, not a sample claim.
The output on your actual CPT code in your state is the only meaningful evaluation.

CTA: "Schedule a demo" → /demo
Link "full team story" text → https://www.kronosrevenue.health/team

---

# PART 5 — NEW PAGE: /pricing
File: app/pricing/page.tsx (new — does not currently exist as a URL)
The /#plans anchor is not rankable. Build this as a real page.

## Meta
```ts
export const metadata = {
  title: "Sydra Pricing — NSA IDR Software Plans | Sydra",
  description: "Sydra pricing is quoted on your demo call based on specialty and monthly OON volume. Structured below typical 20% attorney contingency. Three tiers: Self-Serve, Support, Full-Service.",
  alternates: { canonical: "https://www.sydrahealth.com/pricing" },
}
```

## H1
Sydra pricing.
Quoted to your volume. Not a percentage of every recovery.

## Lead
We do not publish a list price because the right number depends on your specialty, state,
and monthly out-of-network claim volume. Every tier is structured below the typical 20%
attorney contingency fee. You keep more of every recovery.

Schedule a 15-minute demo and we quote on the call. No commitment to proceed.

## H2: The comparison that matters.

IF YOU USE A CONTINGENCY ATTORNEY:
20% of every IDR recovery, indefinitely.
On $300,000 in annual IDR recoveries: $60,000 in attorney fees annually.
Plus: disputes lost from batched CPT filings never appear in the recovery total.
A practice winning 60% of disputes at 20% contingency recovers 60% x 80% = 48% of its IDR potential.

IF YOU ARE NOT FILING IDR:
Zero attorney fees. Zero IDR recovery.
The gap between the insurer's initial payment and what IDR would award stays with the insurer.

WHAT SYDRA CHANGES:
Your billing team runs IDR in house. Platform fee quoted to your volume.
Structured below typical 20% contingency. You keep more per dollar won.

## H2: Three tiers. Which one fits your practice.

THE DECISION IS ABOUT WHO OPERATES THE WORKFLOW. NOT CLAIM VOLUME.

SYDRA SELF-SERVE
Your billing team runs the software independently.
Right for: teams that want to own the workflow, keep all recoveries in house, consistent
monthly OON volume.
Included: full Sydra platform, unlimited claims, specialty trained CPT coding, prior
determination library, federal and state IDR submission drafting, ModMed integration,
HIPAA controls, BAA available, onboarding walkthrough.
Not included: live specialist support on individual claims, monthly account reviews.
Pricing: quoted on demo call.
CTA: "Schedule a demo" → /demo

SYDRA + KRONOS SUPPORT
Your team runs the software. A Kronos specialist is on call.
Right for: lean billing teams, turnover risk, complex CPT combinations, high-value disputes
where specialist review adds value.
Included: everything in Self-Serve plus live support 9 to 5 ET Monday through Friday,
24-hour email response on escalations, monthly account review, specialist training for new
billers, escalation to Heisha Rivera on high-value cases.
Pricing: quoted on demo call.
CTA: "Schedule a demo" → /demo

KRONOS FULL-SERVICE
You forward EOBs. Kronos Revenue handles every claim. Zero software to operate.
Right for: billing teams with no bandwidth, or practices that want IDR fully outsourced.
Where it lives: kronosrevenue.health — not on this site.
CTA: "Get a free IDR review at Kronos Revenue" → https://www.kronosrevenue.health/case-review

## Plan comparison table

                          | Self-Serve      | Plus Support         | Full-Service
--------------------------+-----------------+----------------------+------------------------
Who operates claims       | Your team       | Your team plus       | Kronos Revenue team
                          |                 | Kronos on call       |
Software access           | Full            | Full                 | Managed for you
Support                   | Docs, KB        | Live 9 to 5 ET,      | Dedicated specialist
                          |                 | 24hr email           |
Monthly review            | None            | Yes, 30 minutes      | Quarterly review call
Claim escalation path     | None            | Yes, Heisha Rivera   | Built in
New biller training       | Self-serve docs | Included             | Not applicable
Biller time per claim     | Under 5 minutes | Under 5 minutes      | Zero
Where to start            | Demo            | Demo                 | Free IDR review at
                          |                 |                      | kronosrevenue.health

## H2: What happens on the demo.

15 minutes on a real denied claim from your specialty.
We walk through Sydra live: EOB upload, eligibility check, draft generation, DOCX export.
You see the output before we discuss any numbers.

Then: we ask about your specialty, monthly OON volume, and current IDR arrangement.
We quote a fee for your specific situation.
You leave with the quote, a sandbox account if you want one, and no obligation.

If your practice volume is low enough that the platform economics do not work, we tell you
and direct you to Kronos Revenue Full-Service as a better fit.

## H2: Pricing FAQ

Q: Are there setup fees?
No setup fees on Self-Serve or Sydra + Kronos Support.

Q: Is there a minimum contract term?
No. Month-to-month available on all Sydra tiers.

Q: Can we switch tiers?
Yes. Many practices start Self-Serve and add Kronos Support or move to Full-Service.
Tier switches do not require a new onboarding process.

Q: How does Sydra pricing compare to an attorney at 20%?
For a practice with 20 claims per month, $15,000 average disputed amount, 88% win rate:
Attorney at 20%: $31,680 in annual fees on recoveries.
Sydra platform fee: quoted to your volume, structured below that figure.
The exact comparison is part of what we show you on the demo call.

CTAs: "Schedule my demo" → /demo
Secondary: "Not ready to run software? Get a free IDR review" → https://www.kronosrevenue.health/case-review

---

# PART 6 — PAGE: /faq
File: app/faq/page.tsx

## Meta
```ts
export const metadata = {
  title: "Sydra FAQ — NSA IDR Software Questions Answered | Sydra",
  description: "Detailed answers to billing team and practice administrator questions about Sydra's NSA IDR software. Eligibility, CPT coding, HIPAA, integration, pricing, and more.",
  alternates: { canonical: "https://www.sydrahealth.com/faq" },
}
```

## H1
Questions about Sydra.
Answered specifically.

---
Q: How long does it actually take to prepare an IDR submission in Sydra?

Under 5 minutes for a standard single-CPT claim where the operative note is already uploaded
and the provider profile is built.

The time breaks down: 30 to 60 seconds to upload the EOB and run the eligibility check.
60 to 90 seconds to review the automatically generated draft. 30 seconds to approve and
export the DOCX. The guided checklist for the IDRE portal adds time for billers still learning
the portal flow — typically under 2 minutes after the first few submissions.

After the first five to ten submissions, experienced billers report the process taking closer
to 3 minutes per claim. The operative note upload is the variable.

The 30-minute comparison is based on the manual process: pulling the EOB, looking up QPA,
drafting a market-rate argument from scratch, writing a clinical narrative, gathering
credentials, and formatting for the portal. Sydra automates the documentation step.
The review is still human. The drafting is not.

---
Q: Does Sydra batch CPT codes?

No. Sydra files one claim per eligible CPT code.

If your EOB contains three CPT codes, Sydra generates three separate submission packets.
Each with a procedure-specific payment offer, CPT-specific market-rate justification, clinical
narrative specific to that procedure, and the provider credentials relevant to that code.

The one-CPT-per-claim structure is not configurable. It is not a default that can be turned off.

Federal IDR is final-offer arbitration. A batched offer covering three CPT codes cannot be
matched cleanly to any single prior determination. The arbitrator's ability to find comparable
prior cases is compromised. The submission performs worse.

CMS data shows providers win 88% of IDR disputes industry-wide (H1 2025). The practices
reaching that win rate are filing correctly. Batched filings underperform it.

---
Q: What CPT codes does Sydra's determination library cover?

Sydra has ingested 213+ IDR determinations. The library is weighted toward surgical specialties:

Spine: 22612, 22630, 22633, 22840, 22842, 63030, 63047, 63055, and related add-ons.
Deepest coverage in the library. Texas, New York, California, New Jersey, Florida, Arizona.

Orthopedic: 27447, 27130, 29881, 29882, 23412, 29806, 29827, 27570, and related codes.
Strong coverage on knee arthroplasty and rotator cuff codes.

Neurosurgery: 61510, 61512, 61520, 63047, 63055, and selected cranial procedure codes.

Anesthesia: Category I CPT bundles under current batching rules.

Plastics and hand: 25447, 26356, 26115, 19364, and selected reconstructive codes.
Coverage is sparser than spine — growing as the library is updated quarterly.

For codes not in the library at a state-specific level: Sydra uses national comparison
data and flags lower library confidence on the market-rate section of the submission.
Complete current coverage available to review on your demo call.

---
Q: What does Sydra cost?

Pricing is shared on your demo call after we understand your specialty, state, and monthly
OON claim volume.

What we can tell you: Sydra's platform fee is structured below typical 20% attorney contingency
fees for most practices at most claim volumes.

If you are paying 20% of every recovery to an attorney, that is the benchmark.
If you are not filing IDR at all, the benchmark is the recovery you are not getting.
In both cases, the Sydra platform fee is a smaller number than what you are currently losing.

Exact quote on your demo call. No obligation.

---
Q: How does Sydra handle HIPAA and patient data security?

IDR submissions contain PHI. Sydra handles PHI under these controls:

AI processing: All generation runs on Claude Sonnet 4 on AWS Bedrock. AWS Bedrock with Claude
is HIPAA-eligible. PHI stays inside the AWS HIPAA-eligible service boundary during generation.
No data is sent to Anthropic's infrastructure. No third-party API calls.

Storage: Amazon S3, AES-256 encryption at rest. TLS 1.2 or higher for all data in transit.
Signed URLs with short expiry for retrieval.

Isolation: Strict per-practice tenant isolation at the database row level. Your data cannot be
accessed by any other practice on the platform.

Access control: Role-based permissions for billing, clinical, and administrative staff.
Each role is granted only the permissions appropriate to that role.

Logging: Every action on every submission is logged with timestamp and user ID.

BAA: Standard BAA available for covered entities. Email support@sydrahealth.com.

SOC 2: In progress. Not yet complete. If a completed SOC 2 Type II report is a hard
requirement, we will tell you our timeline and let you decide whether to proceed now or wait.

---
Q: What happens if an IDR dispute loses?

A determination against the provider's offer means the insurer's offer was selected.
Both parties pay the IDRE administrative fee (currently $50 per dispute — confirm before filing).

Sydra tracks adverse determinations in your dashboard. After the 90-calendar-day cooling-off
period, the same code and payer combination is eligible for re-filing. Sydra can generate
a new submission incorporating any new documentation that would strengthen the argument.

If you have Sydra + Kronos Support, your Kronos specialist reviews adverse determinations
with you at the monthly account review and advises on re-filing strategy.

CMS data shows 88% of properly filed disputes result in provider wins. The 12% that do not
usually fall into: eligibility issues (Sydra prevents these), batched submissions (Sydra
prevents these), or cases where the insurer's QPA is genuinely close to market rate for that
code in that geography. Sydra flags low market-rate confidence before submission.

---
Q: How long does it take to get set up on Sydra?

Most practices are operational within one week of signing the BAA.

Day 1 to 2: We provision your practice tenant and send login credentials.
Day 2 to 3: Your billing lead uploads the first provider CV and we build the provider profile.
Day 3 to 4: ModMed integration configured if applicable. EOB upload flow tested.
Day 4 to 5: First claim run in the platform with your billing lead watching. We are on the
call for the first submission. You submit it. You see the output.
Day 5 to 7: Second and third claims run independently. Any questions resolved.

---
Q: What if my practice does not want to run software at all?

Kronos Full-Service on our sister site handles every IDR claim end to end. Your practice
forwards EOBs. The Kronos Revenue team handles eligibility, documentation, submission, and
tracking. Zero software for your billing team to operate.

Get a free IDR review at kronosrevenue.health/case-review.

---

# PART 7 — PAGE: /security
File: app/security/page.tsx

## Meta
```ts
export const metadata = {
  title: "Sydra Security — HIPAA Controls, BAA, AWS Bedrock, PHI Handling | Sydra",
  description: "Sydra handles PHI under HIPAA controls. AWS Bedrock with HIPAA-eligible Claude Sonnet 4. Encryption at rest and in transit. BAA available. SOC 2 in progress, not yet certified.",
  alternates: { canonical: "https://www.sydrahealth.com/security" },
}
```

## H1
How Sydra handles protected health information.
Specific answers for billing managers and compliance reviewers.

## Lead
An NSA IDR submission contains your patient's name, date of service, diagnosis, procedure codes,
operative note excerpts, and disputed claim amounts. Every document uploaded to Sydra is
protected health information under HIPAA. This page describes how we handle PHI specifically.

## CRITICAL SECTION — put this first, not buried in a footnote

H2: SOC 2 status — read this first.

Sydra is SOC 2 aligned. We have not completed a formal SOC 2 Type II audit.

We are in the process of completing the audit. We will not tell you we have a certification
we do not have, and we will not bury this information in a footnote.

"SOC 2 aligned" means: our controls are designed to meet SOC 2 requirements. We have
documented policies, access controls, audit logging, incident response procedures, and vendor
management processes that a SOC 2 auditor would review. We have not yet had a third-party
auditor certify those controls as operating effectively over a defined period.

If a completed SOC 2 Type II report is a hard requirement for your procurement process,
tell us. We will give you the current timeline and let you decide.

## H2: How Sydra's AI generation handles PHI.

Sydra uses Claude Sonnet 4, accessed through AWS Bedrock, for IDR submission drafting.

AWS Bedrock is a HIPAA-eligible service. AWS's HIPAA BAA covers Amazon Bedrock when used
in the context of a covered healthcare workload. Sydra operates within that BAA scope.

When Sydra generates an IDR draft from your operative note:
The operative note is processed by Claude Sonnet 4 on AWS Bedrock.
PHI in that document stays inside the AWS HIPAA-eligible service boundary.
No PHI is transmitted to Anthropic's systems or any other third-party during generation.
No data is used to train the Claude model or any other model.

The model processes the document. The output is the IDR draft. The document and the draft
are stored in Sydra's AWS infrastructure under the controls described below.

## H2: Infrastructure and encryption.

HOSTING
Sydra production workloads run on AWS infrastructure in US regions.

ENCRYPTION AT REST
Documents are stored in Amazon S3 with AES-256 server-side encryption.
Keys managed through AWS Key Management Service (KMS).

ENCRYPTION IN TRANSIT
All data between your browser and Sydra's servers is transmitted over TLS 1.2 or higher.
No unencrypted HTTP paths to PHI.

DOCUMENT ACCESS
Documents are not accessible through persistent public URLs.
Retrieval uses signed URLs with short expiry windows (minutes, not days).

DATABASE
PHI is stored with row-level security. Each practice has a unique tenant identifier.
Queries are scoped to the authenticated practice's tenant by default.
A query without the correct tenant scope returns zero results.
Enforced at the application and database layers.

## H2: Access control and isolation.

WITHIN YOUR PRACTICE
Role-based access control. You define which staff members can view, draft, approve, or export.
A billing specialist who uploads an EOB does not automatically have permission to export the
final DOCX. Permissions are granted explicitly, not inherited by default.

BETWEEN PRACTICES
Strict tenant isolation enforced at multiple layers: application logic, API authorization,
database row-level security, and audit logging. It is not possible to accidentally query
across tenants. It is not possible to deliberately query across tenants without breaking
authentication.

WITHIN KRONOS HEALTH
Software engineering team (Chelsea's team): access to infrastructure for operational purposes,
governed by internal HIPAA training and access policies.
Kronos Revenue RCM team: access to PHI only for practices using Sydra + Kronos Support.
Not applicable to Sydra Self-Serve practices.
Leadership (Dr. Abrahams, Heisha Rivera): access for quality review and escalated cases.
No PHI is accessible to sales, marketing, or any staff without an operational need.

## H2: Audit logging.

Every log entry captures: user name, email, user ID, timestamp (UTC to the second),
action performed, record affected (submission ID, document ID), IP address, session identifier.

Logs are available to your account administrator on request.
Reviewed internally for anomalous activity.

## H2: Business Associate Agreement.

A BAA is available for all covered entities and business associates using Sydra to process PHI.

The BAA is executed during contracting. We send you a BAA template during evaluation.
You can redline it. We will discuss reasonable modifications.

What the BAA covers: permitted uses and disclosures of PHI, our obligation to safeguard PHI,
breach notification timelines (60-day notification per HIPAA), your right to audit our
compliance, data return or destruction on termination, subprocessor obligations.

If you want to review the BAA template before booking a demo, email sales@kronosrevenue.health.
We send it the same business day.

## H2: Incident response.

Documented incident response procedures covering detection, escalation, containment, recovery,
and customer notification. If an incident involves your PHI:
We notify you per the timeline in your BAA. We tell you what happened, what data was involved,
and what we did to contain it. We do not send a generic "we take security seriously" email.

We have not had a reportable incident involving customer PHI.

## H2: Requesting security documentation.

Available to qualified prospects during evaluation:
BAA template: sent same business day on request
Security one-pager: 1 to 2 pages for your compliance team
Subprocessor list: AWS, Stedi, ModMed, and others in scope
AWS Bedrock HIPAA eligibility documentation
SOC 2 status update: current timeline and controls in scope

Request: email sales@kronosrevenue.health with your compliance contact copied.
Response within one business day.

CTAs: "Schedule a demo" → /demo
"Email the security package request" → mailto:sales@kronosrevenue.health

---

# PART 8 — PAGE: /demo
File: app/demo/page.tsx

## Meta
```ts
export const metadata = {
  title: "Schedule a Sydra Demo — 15 Minutes on a Real Denied Claim | Sydra",
  description: "We walk through Sydra on an actual denied claim from your specialty. Eligibility check, draft generation, DOCX export in real time. You see the output before you commit to anything.",
  alternates: { canonical: "https://www.sydrahealth.com/demo" },
}
```

## H1
See Sydra prepare a real NSA IDR submission.
15 minutes. Your specialty. Your actual CPT codes if you send one.

## Section: What happens on the call

This is not a slide deck.

A Kronos specialist opens Sydra in a shared screen and runs a real denied claim from your
specialty through the full workflow.

If you send us an EOB before the call, we use that claim.
If not, we use a representative claim from your specialty and state.

WHAT YOU WATCH IN REAL TIME:

Step 1: EOB uploaded to Sydra. Eligibility check runs.
Step 2: Sydra generates the IDR draft. Executive summary, market-rate justification from prior
determinations on that CPT code, clinical narrative from the operative note, provider credentials.
Step 3: Draft reviewed. We walk through each section: what Sydra wrote, where each element came
from, what a billing team would verify or edit before approving.
Step 4: DOCX export. You see the final submission-ready document and the guided IDRE portal checklist.

Total: under 5 minutes for the claim, 10 minutes for the walkthrough and questions.

WHAT YOU LEAVE WITH:
The actual Sydra output on a real claim. You evaluate the document quality yourself.
A pricing quote for your specialty and monthly volume.
A sandbox account to run additional claims before committing, if you want one.
No pressure to sign anything on the call.

If Sydra is not the right fit, we will tell you and direct you to Kronos Revenue Full-Service.

## Product preview section

[EMBED: 90-second product walkthrough video — Loom or Wistia]
Caption: "What your billing team sees on a CPT 22612 (posterior lumbar fusion) claim.
Eligibility check to DOCX export. Under 5 minutes."

If video not yet available: render four static screenshots in sequence:
1. EOB upload interface with eligibility check result
2. Draft generation in progress
3. Completed draft with market-rate section showing prior determination citations
4. DOCX export screen with guided checklist

Caption under screenshots:
"Actual Sydra screenshots from a spine surgery claim. Not a mockup."

## Form

H2: Schedule your 15-minute demo.
Sub: "Send us an EOB before the call and we will run the demo on your actual claim."

Fields:
Full name (required) · Work email (required) · Practice name (required)
Specialty (required, dropdown): Orthopedic Surgery / Neurosurgery / Spine Surgery /
Plastic Surgery / Anesthesiology / General Surgery / Multiple specialties / Other
State (required)
Monthly OON claim estimate (required, dropdown):
Fewer than 5 / 5 to 15 / 15 to 30 / More than 30
Current IDR approach (required, dropdown):
Not filing IDR currently / Through a contingency attorney / In house manually /
In house with other software
Upload an EOB for the demo (optional, PDF or image)
"Or describe your situation" (textarea, optional)

Submit: "Schedule my demo"

After submission:
"A Kronos specialist will send a calendar link to [email] within one business day.
If you uploaded an EOB, we will review it before the call so the demo runs on your actual claim."

## Pre-booking FAQ

Q: Do I have to buy anything to get the demo?
No. Free with no commitment.

Q: Should my billing team attend?
Yes, ideally. The demo is most useful when the billing lead who would operate the software
is on the call. We can accommodate up to three attendees.

Q: Can I see Sydra on a claim type my practice actually files?
Yes. Send us an EOB before the call. We run the demo on your actual CPT code in your state.

Q: What if I just want pricing without a demo?
Email sales@kronosrevenue.health with your specialty and estimated monthly OON volume.
We will send a pricing range.

Q: How long does setup take after we decide to proceed?
Most practices are operational within one week of signing the BAA. See the full onboarding
timeline at sydrahealth.com/faq.

---

# PART 9 — PAGE: /contact
File: app/contact/page.tsx

## Meta
```ts
export const metadata = {
  title: "Contact Sydra — Sales, Demos, and Support | Sydra",
  description: "Schedule a demo, ask a pricing question, or reach customer support. Sales: sales@kronosrevenue.health. Support: support@sydrahealth.com. Responses within one business day.",
  alternates: { canonical: "https://www.sydrahealth.com/contact" },
}
```

## H1
Contact Sydra.

## Lead
Different questions go to different places. Use the guide below.

## Contact routing

NEW TO SYDRA — WANT A DEMO OR PRICING
Use the form below or email sales@kronosrevenue.health.
Subject line: your practice name and specialty.
Response within one business day.

If you want pricing information without a demo first, include your specialty and estimated
monthly OON claim volume. We will send a pricing range based on that.

EVALUATING FOR PROCUREMENT — NEED SECURITY DOCS
Email sales@kronosrevenue.health with your compliance contact copied.
Subject line: "Security package request"
We send the BAA template, security one-pager, and subprocessor list the same business day.

EXISTING CUSTOMERS — SUPPORT
Email support@sydrahealth.com for platform questions, submission issues, or account help.
Hours: 9 to 5 ET, Monday through Friday. Email response: within 24 business hours.
Sydra + Kronos Support customers: your Kronos specialist is your first call on claim-level
questions.

WANT EVERY CLAIM HANDLED WITHOUT RUNNING SOFTWARE
That is Kronos Revenue Full-Service on our sister site.
Get a free IDR review: kronosrevenue.health/case-review
Phone: (914) 705-6830 | intake@kronosrevenue.com

## Form

H2: Schedule a demo or ask a question.

Fields:
Full name (required) · Work email (required) · Practice name (required)
What can we help with? (dropdown):
Schedule a demo / Pricing question / Security and compliance documentation /
Partnership inquiry / Other
Message (textarea, optional)

Submit: "Send message"
Confirmation: "We will reply to [email] within one business day."

## Direct contacts

Sales and demos: sales@kronosrevenue.health
Customer support: support@sydrahealth.com
Kronos Revenue full-service IDR: intake@kronosrevenue.com
Phone (Kronos Revenue): (914) 705-6830
Hours: 9 to 5 ET, Monday through Friday
Mailing: Kronos Health · 244 Westchester Ave, Suite 209 · West Harrison, NY 10604

---

# PART 10 — CAMPAIGN: GOOGLE ADS COPY

Ad set 1 — Intent: "NSA IDR software"
HEADLINE 1: NSA IDR Software for Surgical Groups
HEADLINE 2: File in Under 5 Min — Not 30
HEADLINE 3: 213+ Prior Win Citations Built In
DESCRIPTION 1: Orthopedic, spine, neurosurgery. Sydra drafts the IDR packet — clinical
narrative, market rate, prior wins. Your team reviews and submits. Free demo.
DESCRIPTION 2: CMS data: providers win 88% of IDR disputes filed correctly. Sydra prepares
each submission in under 5 minutes. See it on a real denied claim. 15-minute demo.
FINAL URL: https://www.sydrahealth.com/demo

Ad set 2 — Intent: "reduce IDR prep time billing"
HEADLINE 1: IDR Prep: 30 Minutes to Under 5
HEADLINE 2: Sydra — NSA Dispute Software
HEADLINE 3: Built by a Neurosurgeon. HIPAA BAA.
DESCRIPTION 1: Surgical billing teams spend 30 plus minutes per NSA IDR submission.
Sydra generates the draft in under 5. Your team reviews and submits. See it live.
DESCRIPTION 2: One claim per CPT. Clinical narrative from your op note. Prior winning
determinations on your exact CPT code. HIPAA controls, BAA available. Free demo.
FINAL URL: https://www.sydrahealth.com/demo

Ad set 3 — Intent: "IDR attorney alternative software"
HEADLINE 1: Stop Paying 20% on IDR — Run It In House
HEADLINE 2: Sydra NSA IDR Software
HEADLINE 3: Same Award. No Contingency Fee.
DESCRIPTION 1: Attorneys take 20% of every IDR recovery. Sydra lets your billing team
file in house for less. See the math on your volume. Free 15-minute demo.
DESCRIPTION 2: One CPT per claim. Prior-win citations from 213 plus determinations.
Clinical narrative from your operative note. Structured below 20% contingency.
FINAL URL: https://www.sydrahealth.com/pricing

---

# PART 11 — CAMPAIGN: LINKEDIN COPY (Dr. Abrahams personal account)

POST 1 — For billing managers and practice admins:
I want to explain exactly why most billing teams have stopped filing NSA IDR.

It is not because the process is too hard.

It is because a single submission takes 30 to 40 minutes.

At 20 claims a month, that is 10 to 13 hours of biller time.
On one part of one billing workflow.

Most teams cannot sustain that. So they stop.

The insurer keeps the underpayment. The practice accepts it.
And the legal right the No Surprises Act created goes unused.

We built Sydra because a 30-minute task should take 5 minutes when the documentation
requirements do not change between claims.

[Demo link in first comment: sydrahealth.com/demo]

POST 2 — For the surgeon:
A question I get from surgeons who find Kronos or Sydra:

"Why would I trust this over my attorney?"

The honest answer: you should not trust anything over data you have read yourself.

So here is where to find it:

CMS Federal IDR Q1/Q2 2025 Public Use File:
cms.gov/nosurprises/policies-and-resources/reports

Georgetown CHIR analysis via Health Affairs, March 2026

Brookings NSA Arbitration Databook, April 2026:
brookings.edu/articles/no-surprises-act-arbitration-databook

Read the data. Form your own view. Then decide whether the current arrangement
is producing what those numbers say is possible.

If the math leads to a conversation: sydrahealth.com/demo

POST 3 — For managing partners evaluating in-house IDR:
The question I hear most from managing partners is not "does IDR work."

They have read the CMS data. They know it works.

The question is: "What does it cost my billing team to run it?"

With Sydra: under 5 minutes per claim. Your team reviews a draft and submits.
Without software: 30 to 40 minutes per claim from scratch.

At 15 claims a month:
Without software: 7 to 10 hours of biller time monthly on IDR prep.
With Sydra: under 75 minutes monthly.

That 6 to 9 hours goes back to denial follow-up, prior auth, AR aging.

The ROI on the platform fee is almost never the question after you see the time numbers.

Demo: sydrahealth.com/demo

---

# PART 12 — CAMPAIGN: COLD EMAIL COPY

Subject lines (test all three):
"NSA IDR prep: 30 minutes vs. under 5 — [Practice Name]"
"What your billing team is spending on IDR submissions"
"Sydra — NSA IDR software for [Specialty] practices"

Email body:
[Name],

Our billing team used to spend 30 to 40 minutes preparing each NSA IDR submission.
That is where the idea for Sydra came from.

Sydra is NSA IDR software built by Kronos Health for orthopedic, neurosurgery, spine, and
plastic surgery billing teams. Upload an EOB. Sydra runs eligibility, drafts the IDR packet
(clinical narrative, market-rate comparison from 213 plus prior determinations, your CPT code).
Your team reviews and submits to the IDRE portal. Under 5 minutes per claim.

CMS data for reference: providers won 88% of IDR disputes in the first half of 2025.
Median awards came in at approximately 4.5 times the insurer's qualifying payment amount.

If your practice has out-of-network claims and your billing team is either not filing IDR
or spending significant time on manual submissions, I would like to show you Sydra on a
real denied claim from your specialty.

15-minute demo: sydrahealth.com/demo

[Name]
Kronos Health
sales@kronosrevenue.health

---

# PART 13 — SOURCED REFERENCES (embed as collapsible section on every page)

1. CMS Federal IDR Q1/Q2 2025 Public Use File
   Released January 21, 2026
   cms.gov/nosurprises/policies-and-resources/reports

2. Georgetown University CHIR · Health Affairs webinar, March 2026
   3.4 million disputes through June 2025; 88% win rate; median award ~4.5x in-network rate

3. Zelis — NSA IDR Eligibility Challenges · March 2026
   44% of 2024 IDR cases challenged as ineligible by non-initiating party

4. ACEP analysis of CMS data
   ~10% of eligible claims estimated to reach IDR arbitration

5. Brookings Institution NSA Arbitration Databook · April 2026
   brookings.edu/articles/no-surprises-act-arbitration-databook

6. ACR — Providers Prevail in Vast Majority of IDR Claims · January 2026
   88% of disputes found in provider's favor; 87% of awards exceeded QPA

7. No Surprises Act: Public Law 116-260, Division BB, Title I

8. Federal IDR regulations: 45 CFR Part 149
   ecfr.gov/current/title-45/subtitle-A/subchapter-F/part-149

9. CMS No Surprises Act overview: cms.gov/nosurprises

10. HHS HIPAA for professionals: hhs.gov/hipaa/for-professionals

---

# PART 14 — DEPLOYMENT CHECKLIST

[ ] /pricing page built as standalone URL before campaign launch — highest priority
[ ] All JSON-LD validated at validator.schema.org before production push
[ ] Unique meta title and description confirmed for every page
[ ] Canonical tags on every page including new /pricing
[ ] sitemap.ts updated with /pricing and submitted to Google Search Console after deploy
[ ] robots.txt allows crawling of all routes — verify before deploy
[ ] Product video or screenshot sequence on /demo page before the form — do not launch demo
    page without product preview
[ ] Dr. Abrahams real headshot added to /about — not placeholder
[ ] Real photo of Dr. Abrahams sourced from kronosrevenue.health/team for consistency
[ ] SOC 2 disclosure on /security uses exact language from this file — do not soften it
[ ] og:image:alt updated on all pages from "Sydra" to descriptive text per Part 1E
[ ] Internal links tested — no 404s across all pages
[ ] /pricing → /demo link tested end-to-end
[ ] Kronos Full-Service links (kronosrevenue.health/case-review) open correctly
[ ] Contact form on /contact and /demo tested end-to-end — confirm submissions received
[ ] Recovery calculator on homepage renders correctly on mobile
[ ] Google Search Console property verified for sydrahealth.com
[ ] New URLs submitted via GSC URL Inspection after deploy
[ ] OG images tested at opengraph.xyz
[ ] Mobile layout tested: hero headline and subhead fully readable without scrolling,
    CTA button visible above the fold
