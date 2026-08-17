# Sydra em dash sweep

Do not deploy. Do not merge.

## 1. Corrected sentences from Part 1

| Sentence (applied) | File |
|---|---|
| Deadlines pathway, colon instead of dash | `src/lib/content/what-is-idr-page.ts` |
| Deadlines “work goes undone. Not that it is legally difficult…” | `src/lib/content/what-is-idr-page.ts` |
| FAQ lawyer answer, two sentences instead of semicolon | `src/lib/content/what-is-idr-page.ts` |
| Element 3, “with no OCR and no copy and paste” | `src/lib/content/how-it-works-page.ts` |
| Batching, “There are no splits:” | `src/lib/content/how-it-works-page.ts` |
| Cost section, “calculator above” / last output is hours | `src/lib/content/in-house-idr-page.ts` |
| Control section: already dash-free, left as pasted | `src/lib/content/in-house-idr-page.ts` |
| FAQ full-service answer, split after “end to end.” | `src/lib/content/faq-page.ts` |
| Economics, “it compounds:” | `src/lib/content/resources/articles.ts` |
| Contingency closing, “are not worth” | `src/lib/content/resources/articles.ts` |
| Unclaimed revenue section (two paragraphs) | `src/lib/content/resources/articles.ts` |
| Sample “What happens next”: already dash-free, left as pasted | `src/lib/content/claim-review-sample.ts` |
| `/idr` EntityHero lead | `src/app/idr/page.tsx` |
| `/idr/guide` page lead | `src/app/idr/guide/page.tsx` |
| `/idr-filing-deadline` two opening paragraphs | `src/lib/content/idr-filing-deadline-page.ts`, rendered in `src/app/idr-filing-deadline/page.tsx` |
| Security opening | `src/lib/content/security-page.ts` (`SECURITY_HERO.intro`) |
| SOC 2 section | `src/lib/content/security-page.ts` (`SOC2_SECTION`) |
| `/sydra-vs-idr-attorney` hero lead | `src/lib/content/sydra-vs-attorney-page.ts` |
| Regulatory open-negotiation closer | `src/components/landing/regulatory-currency.tsx` |
| Why this origin (new section, supplied copy) | `src/app/about/page.tsx` |
| Same recasts in the Group A deck | `docs/sydra-copy-deck-group-a.md` |

### Part 1 targets with no matching homepage section

Not applied. The live homepage is the postcard landing (`src/components/landing/postcard-landing.tsx`). These modules do not exist:

- “Very few practices use it.”
- Segment card 3 (RCM)
- Segment card 4 (contingency firms)

Hero subheadline in `src/components/landing/hero.tsx` still has an em dash. Spec said the deck hero stays and contains no dash. Treated as pre-existing. Not recast.

## 2. Supplied-copy dashes not covered by Part 1

Not recast.

| File | Line | Sentence |
|---|---|---|
| `src/lib/content/what-is-idr-page.ts` | 43 | Out of network claims that fall under the No Surprises Act qualify — emergency services, and non emergency services delivered by out of network providers at in network facilities where no valid notice and consent was obtained. |
| `src/lib/content/what-is-idr-page.ts` | 44 | You do not need a lawyer. The statute does not require one. A provider can file directly, and so can an authorised representative — an in house billing team or a billing company acting on the practice's behalf. |
| `src/lib/content/what-is-idr-page.ts` | 68 | Two numbers explain why the opportunity persists. Roughly 10 percent of eligible claims are estimated to reach arbitration at all. And 44 percent of 2024 IDR cases were challenged as ineligible — usually on administrative grounds that correct preparation prevents. |
| `src/lib/content/what-is-idr-page.ts` | 80 | A federal law in effect since 2022 that removes the patient from out of network billing disputes. The patient pays the in network cost share, and the provider and plan resolve the balance — through IDR when they cannot agree. |
| `src/lib/content/how-it-works-page.ts` | 12 | Federal IDR is final offer arbitration. The entity picks one offer — yours or the plan's — based on which is better supported. Six elements decide that, and every one of them has to be built. |
| `src/lib/content/how-it-works-page.ts` | 39 | Element 1 — Payment offer |
| `src/lib/content/how-it-works-page.ts` | 46 | Element 2 — Market rate justification |
| `src/lib/content/how-it-works-page.ts` | 53 | Element 3 — Clinical necessity narrative |
| `src/lib/content/how-it-works-page.ts` | 60 | Element 4 — Provider credentials |
| `src/lib/content/how-it-works-page.ts` | 67 | Element 5 — Open negotiation documentation |
| `src/lib/content/how-it-works-page.ts` | 74 | Element 6 — Eligibility verification |
| `src/lib/content/in-house-idr-page.ts` | 6 | Building one federal IDR submission by hand takes 25 to 40 minutes. That is the ceiling on how many disputes a practice pursues — not the law, not eligibility, not the win rate. Sydra moves the ceiling, not the team. |
| `src/lib/content/in-house-idr-page.ts` | 36 | No. The same biller prepares, reviews and submits each dispute — in a fraction of the time. What changes is how many disputes that biller can get through. |
| `src/lib/content/faq-page.ts` | 19 | 213+ ingested IDR determinations, weighted toward surgical specialties — spine, orthopedic, neurosurgery, and plastics and hand. Comparables are filtered to your CPT code and your state. |
| `src/lib/content/resources/articles.ts` | 392 | Yes. A provider can file directly, and so can an authorised representative — an in house billing team or a billing company acting on the practice's behalf. |
| `src/lib/idr/comparisons.ts` | 43 | Preparation drops from 25 to 40 minutes per claim to under 5. That returns hours to the billing team each month, and it lets a practice file the claims it was skipping — which is where the recovery actually sits. |

## 3. Pre-existing copy dashes

Not recast. Grouped by page / surface.

### Homepage / landing

| File | Line | Sentence |
|---|---|---|
| `src/components/landing/hero.tsx` | 34 | 88% of properly filed federal IDR disputes get paid. Sydra prepares each submission in about five minutes — or our team files them for you, for a fraction of what recovery normally costs. |
| `src/components/landing/hero.tsx` | 44 | `{" — "}` (attribution separator under the Abrahams quote) |
| `src/components/landing/ad-landing.tsx` | 89 | your recovery — you keep all of it. |
| `src/components/landing/claim-review-form.tsx` | 87 | Got it — check your inbox. We've sent you a sample review so you can see exactly what you'll get back. |
| `src/components/landing/claim-review-form.tsx` | 163 | Takes about a minute. No patient data needed — we'll show you exactly what to redact. |
| `src/lib/landing/metadata.ts` | 38 | Sydra — surgeon built NSA IDR software for surgical practices. Five minutes per claim. |
| `src/lib/content/founder-lines.ts` | 11 | Dr. John Abrahams, MD — board certified neurosurgeon, founder |

### /case-review and sample

| File | Line | Sentence |
|---|---|---|
| `src/app/case-review/page.tsx` | 61 | `{" — "}` (attribution separator) |
| `src/lib/case-review.ts` | 15 | Send us one denied out-of-network EOB. We'll tell you whether it qualifies for federal IDR and what it's worth — in writing, within one business day. No call, no software to install. |
| `src/lib/content/claim-review-sample.ts` | 4 | Claim Review — Sample |
| `src/lib/content/claim-review-sample.ts` | 12 | …the claim would fall outside the process — this is the single most common reason a claim we review turns out ineligible. |
| `src/lib/content/claim-review-sample.ts` | 16 | 64721 — open carpal tunnel release |
| `src/lib/content/claim-review-sample.ts` | 21 | $3,100 – $4,900 (en dash; worked-example figure, not altered) |
| `src/lib/content/claim-review-sample.ts` | 24 | $2,400 – $3,500 above what was paid (en dash) |
| `src/lib/content/claim-review-sample.ts` | 29 | …would tighten this — payers frequently understate QPA… |
| `src/lib/content/claim-review-sample.ts` | 51 | …not a ceiling — and the gap between $1,410 and the comparable award range is the argument. |
| `src/lib/content/claim-review-sample.ts` | 57 | Against a claim worth $2,400–$3,500, the arithmetic is not close. (en dash) |

### /demo

| File | Line | Sentence |
|---|---|---|
| `src/app/demo/page.tsx` | 119 | Under 5 minutes on your claim, 10 minutes on the walkthrough — 15 minutes |

### /resources hub

| File | Line | Sentence |
|---|---|---|
| `src/app/resources/page.tsx` | 25 | Resources — Federal IDR and No Surprises Act guides |

### /sydra-vs-idr-attorney (body, not the replaced lead)

| File | Line | Sentence |
|---|---|---|
| `src/lib/content/sydra-vs-attorney-page.ts` | 53 | …a firm that takes a percentage carries all of the risk — that is what the percentage buys. |
| `src/lib/content/sydra-vs-attorney-page.ts` | 61 | Your fee structure does not change — your capacity does. |

### /idr-recovery-calculator

| File | Line | Sentence |
|---|---|---|
| `src/lib/content/idr-recovery-calculator-page.ts` | 5 | Award multiples versus QPA are not applied — this estimate is deliberately conservative. |
| `src/lib/content/idr-recovery-calculator-page.ts` | 23 | We leave that out of the estimate on purpose — a number you can defend to your CFO is worth more than a bigger one you cannot. |
| `src/lib/content/idr-recovery-calculator-page.ts` | 25 | Source: CMS, Federal IDR Supplemental Background, July–December 2025. (en dash) |

### Pricing

| File | Line | Sentence |
|---|---|---|
| `src/lib/content/tiers.ts` | 126 | Live 9–5 ET, 24 hr email (en dash) |
| `src/components/sydra/pricing-tiers.tsx` | 38, 73 | lone `—` used as “not included” in the comparison table |

### Product screens (homepage how-it-works visual)

| File | Line | Sentence |
|---|---|---|
| `src/components/sydra/product-screens.tsx` | 134 | CPT 27447 — market rate justification |

### Metadata / OG

| File | Line | Sentence |
|---|---|---|
| `src/lib/seo/metadata.ts` | 8 | Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim. |
| `src/lib/seo/metadata.ts` | 113 | Sydra pricing — NSA IDR software plans for surgical billing teams. |
| `src/lib/seo/metadata.ts` | 172 | Sydra Security — HIPAA Controls, BAA, AWS Bedrock, PHI Handling \| Sydra |
| `src/lib/seo/metadata.ts` | 179 | Sydra FAQ — NSA IDR Software Questions Answered \| Sydra |
| `src/lib/seo/metadata.ts` | 194 | Resources — Federal IDR and No Surprises Act Guides \| Sydra |
| `src/lib/seo/metadata.ts` | 223 | Contact Sydra — Sales, Demos, and Support \| Sydra |
| `src/lib/seo/og-image.tsx` | 76 | Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim. |
| `src/lib/seo/og-image.tsx` | 77 | Sydra pricing — NSA IDR software plans for surgical billing teams. |
| `src/lib/seo/og-image.tsx` | 80 | About Sydra — built by Sydra and Dr. John Abrahams, MD. |
| `src/lib/seo/og-image.tsx` | 81 | Sydra security — HIPAA controls, AWS Bedrock, BAA available. |

### Email

| File | Line | Sentence |
|---|---|---|
| `src/lib/email/claim-review-ops.ts` | 27 | Your Sydra claim review — a sample, and what to send |
| `src/lib/email/claim-review-ops.ts` | 78 | Your claim review — {practice} — est. {estimate} recoverable |
| `src/lib/email/claim-review-ops.ts` | 105 | 15 minutes on Zoom, using your claim and your CPT codes — not a canned demo. |
| `src/lib/email/claim-review-ops.ts` | 111 | Happy to do neither, too — the review is yours either way. |
| `src/lib/email/claim-review-ops.ts` | 125 | …I haven't seen a claim come through — no problem at all, I know how the week goes. |
| `src/lib/email/claim-review-ops.ts` | 139 | — {FOUNDER_NAME} |
| `src/lib/email/claim-review-ops.ts` | 172 | Claim Review — {practice} |

### Mailto subjects

| File | Line | Sentence |
|---|---|---|
| `src/lib/contact.ts` | 49 | FROM SYDRA — Sales inquiry |
| `src/lib/contact.ts` | 54 | FROM SYDRA — Security one pager |
| `src/lib/contact.ts` | 59 | FROM SYDRA — Support request |
| `src/lib/contact.ts` | 71 | FROM SYDRA — Plans ({label}) |

## 4. Excluded hits

Code comments, CSS comments, not rewritten. The linter strips comments, so these do not fail `check:copy`.

| File | Line | Note |
|---|---|---|
| `src/components/sydra/claim-review-sample-document.tsx` | 37 | comment |
| `src/lib/seo/json-ld.ts` | 472 | comment |
| `src/lib/typography.ts` | 1 | comment |
| `src/lib/seo/phasing.ts` | 10–11 | comments |
| `src/lib/idr/seo.ts` | 12 | comment |
| `src/components/sydra/product-screens.tsx` | 46, 81, 123, 159 | comments |
| `src/components/motion/split-headline.tsx` | 12 | comment |
| `src/components/motion/reveal.tsx` | 15 | comment |
| `src/components/motion/page-transition.tsx` | 8 | comment |
| `src/app/globals.css` | 91, 193, 403, 438, 459, 480 | CSS comments (en dash on 91) |

No `&mdash;` / `&ndash;` / `&#8212;` / `&#8211;` hits in `src/`.

## 5. Linter scope and build

[`scripts/check-copy-hyphens.mjs`](scripts/check-copy-hyphens.mjs) now flags **em dash and en dash only** (plus HTML dash entities). ASCII hyphens are allowed.

Walks:

- `src/app/**/*.tsx`
- `src/components/**/*.tsx`
- `src/lib/content/**/*.ts`
- `src/lib/**/*copy*.ts`
- `src/lib/email/**/*.ts`
- plus `src/lib/seo/metadata.ts`, `og-image.tsx`, `json-ld.ts`, `src/lib/case-review.ts`, `src/lib/contact.ts`, `src/lib/landing/metadata.ts`, `src/lib/idr/comparisons.ts`

Comments are stripped. No allowlist for leftover prose.

| Command | Result |
|---|---|
| `npx tsc --noEmit` | pass |
| `npx next build` / `npm run build` | pass (`next build` only) |
| `npm run check:copy` | **fail, 65 violations** (remaining prose/UI dashes) |

`check:copy` stays in the repo and still fails on leftover dashes. It is not wired into `npm run build` so production can ship while the remaining recasts are open. Run `npm run check:copy` for the remaining work list. Do not treat a green production build as a clean dash sweep.

## 6. Dash counts

Counted as character occurrences of U+2014 and U+2013 under `src/`.

| | Em dash | En dash | Total |
|---|---|---|---|
| Before this pass | 89 | 6 | 95 |
| After this pass | 80 | 6 | 86 |
| Removed by Part 1 recasts | 9 | 0 | 9 |
| Linter violations after comment stripping | 65 lines | (included in the 65) | 65 |

Nine em dashes left the copy: two in `/what-is-idr` deadlines, two in how-it-works Element 3, one in batching, one in in-house cost, one in the FAQ full-service answer, one in attorney economics, one in the homepage regulatory paragraph.
