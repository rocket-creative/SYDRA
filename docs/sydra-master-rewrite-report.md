# Sydra master rewrite report

Branch `master-rewrite`. Nothing was deployed. Nothing was merged.

Commits: `095_fix_us-spelling-and-group-a-recasts` → `096_feat_homepage-rebuild` → `097_feat_group-bcd-copy` → `098_feat_programmatic-boilerplate` → `099_fix_cta-placement-type` → this file.

---

## 1. Files changed, by part

### Part 1 (`095_fix_us-spelling-and-group-a-recasts`)

- `src/components/landing/hero.tsx`
- `src/components/sydra/sticky-conversion-bar.tsx`
- `src/lib/content/faq-page.ts`
- `src/lib/content/idr-for-billing-companies-page.ts`
- `src/lib/content/resources/articles.ts`
- `src/lib/content/what-is-idr-page.ts`
- `src/lib/landing/metadata.ts`
- `src/lib/seo/metadata.ts`

### Part 2 (`096_feat_homepage-rebuild`)

- `src/app/globals.css`
- `src/components/landing/audience-segments.tsx` (new)
- `src/components/landing/hero-ctas.tsx`
- `src/components/landing/hero-proof-stack.tsx`
- `src/components/landing/hero.tsx`
- `src/components/landing/homepage-band.tsx` (new)
- `src/components/landing/homepage-statements.tsx` (new)
- `src/components/landing/postcard-landing.tsx`
- `src/components/landing/recovery-section.tsx`
- `src/components/landing/regulatory-currency.tsx`
- `src/components/motion/homepage-reveal.tsx` (new)

### Part 3 (`097_feat_group-bcd-copy`)

- `src/app/about/page.tsx`
- `src/app/glossary/page.tsx`
- `src/app/idr-filing-deadline/page.tsx`
- `src/app/idr/guide/page.tsx`
- `src/app/idr/page.tsx`
- `src/app/resources/[slug]/page.tsx`
- `src/app/resources/page.tsx`
- `src/app/resources/updates/[slug]/page.tsx`
- `src/app/resources/updates/page.tsx`
- `src/app/roadmap/page.tsx`
- `src/app/security/page.tsx`
- `src/components/idr/entity-hero.tsx`
- `src/lib/content/glossary.ts`
- `src/lib/content/idr-filing-deadline-page.ts`
- `src/lib/content/resources/articles.ts`
- `src/lib/content/resources/updates.ts`
- `src/lib/content/roadmap-page.ts`
- `src/lib/content/security-page.ts`
- `src/lib/idr/pain-content.ts`

### Part 4 (`098_feat_programmatic-boilerplate`)

- `src/lib/idr/copy.ts`
- `src/components/idr/pain-sections.tsx`
- `src/app/idr/cpt/[code]/page.tsx`
- `src/app/idr/cpt/[code]/[state]/page.tsx`
- `src/app/idr/cpt/[code]/[state]/[payer]/page.tsx`
- `src/app/idr/specialty/[specialty]/page.tsx`
- `src/app/idr/state/[state]/page.tsx`
- `src/app/idr/state/[state]/[specialty]/page.tsx`
- `src/app/idr/payer/[payer]/page.tsx` (same shared modules; spec did not list this template)

### Part 5 (`099_fix_cta-placement-type`)

- `src/components/landing/conversion-cta-pair.tsx` (`homepage-segments` added to `CtaPlacement`)
- `src/app/idr/guide/page.tsx` (JSX `&apos;` encoding of the supplied `payer's`; rendered text unchanged)

### Part 6 (this file)

- `docs/sydra-master-rewrite-report.md`

---

## 2. Part 5 sweeps

Patterns run across `src/**`. Hits we were authorized to zero (CTA Book/Schedule, Part 1 spelling, Part 2 H1, contact title colon) are gone. Remaining hits were not recast.

| Pattern | Before this rewrite | After |
|---|---|---|
| `operationalised\|authorised\|favour\|summarise\|recognise` | `operationalised`, `authorised` in what-is-idr and articles; `favour` in faq-page | Zero |
| `book a (free )?demo\|schedule (a\|your) demo` | Billing-company and landing `Book a free demo` labels | Zero |
| `stop writing off` | Homepage JSON-LD / leftover closing module | Homepage WebPage `name` is now `That payment is an opening offer.` Unused `src/components/landing/closing-cta.tsx` still has `Ready to stop writing off out of network claims?` |
| `no 20% cut\|no attorney cut` | `No 20% cut` in cost-savings tiles | Unchanged. `src/components/sydra/cost-savings.tsx` line 20. No supplied recast |
| `platform fee` | Pricing, service FAQs, billing-company FAQ, economics | Unchanged. See leftover list below |
| `flat (subscription\|fee)` | Options-compared table and tiers | Unchanged. `/sydra-vs-idr-attorney` still uses `Flat subscription` / `Flat fee` as table cells. `src/lib/content/tiers.ts` still has `A flat fee alternative to a typical 20% contingency` |
| `five minute demo\|5 minute demo\|10 minute demo\|30 minute demo` | No wrong-length demo CTAs | Zero real hits. `15 minute demo` substrings are not this pattern |
| `keep 100% of the recovery` | None | Zero |
| `kronosrevenue\|support@sydrahealth` | None | Zero |
| `unlock\|supercharge\|transform your\|revolutioni\|empower\|streamline\|effortless\|seamless\|game.chang\|cutting.edge\|best.in.class` | None | Zero |
| `—\|–\|&mdash;\|&ndash;` | Many customer-facing leftovers | 59 `check:copy` violations remain. None of the leftover sentences had supplied replacement copy. See section 3 |

### `attorney\|lawyer\|law firm`

Every hit is either segment-targeting (the comparison surface, or a link to it) or neutral-factual (the statute does not require a lawyer). None attack attorneys.

**Segment-targeting** (comparison page, nav into it, calculator contingency column, dedicated guide/article):

- `src/app/sydra-vs-idr-attorney/page.tsx` and `src/lib/content/sydra-vs-attorney-page.ts` (page copy, including “run by lawyers” in the “when a firm is the better choice” section)
- `src/lib/seo/metadata.ts` path `/sydra-vs-idr-attorney`
- `src/components/sydra/page-shell.tsx`, `footer.tsx`, `service-cross-links.tsx`
- `src/components/landing/audience-segments.tsx` (two `Compare your IDR options` links)
- `src/components/landing/audience-paths.tsx` (module removed from homepage composition, file kept)
- `src/app/idr/page.tsx`, `src/app/idr-for-billing-companies/page.tsx`, `src/app/idr-recovery-calculator/page.tsx` (links)
- `src/app/llms.txt/route.ts`
- `src/app/sitemap.ts` (`/sydra-vs-idr-attorney`)
- `src/lib/idr/comparisons.ts` (canonical note that `/compare/sydra-vs-idr-attorney` 301s)
- `src/lib/content/glossary.ts` (`Contingency fee` relatedHref)
- `src/lib/content/resources/articles.ts` (`idr-attorney-vs-software` article: title, lead, sections, FAQs, related slugs)
- `src/lib/idr/guides.ts` (`do-you-need-an-attorney` guide)
- `src/components/sydra/recovery-calculator.tsx` (`estimate.attorneyFees`)
- `src/lib/landing/recovery-estimate.ts` (`ATTORNEY_CONTINGENCY`, `attorneyFees`)
- `src/lib/schemas/demo-request.ts` (`contingency_attorney`)
- `src/lib/leads/score-demo-lead.ts` (same enum)

**Neutral-factual** (statute / who may file):

- `src/lib/content/what-is-idr-page.ts` (“You do not need a lawyer…”, FAQ `Do I need a lawyer to file IDR?`)
- `src/lib/content/resources/articles.ts` federal-idr-process FAQ “Can my billing team run the IDR process in house?” (“does not require an attorney”)

---

## 3. Leftover dashes (not recast)

`check:copy` reports 59 customer-facing violations. Grouped by page. Full sentence, file, line.

### `/case-review`

- `src/app/case-review/page.tsx:61` `{" — "}` (attribution separator under the founder quote)
- `src/lib/case-review.ts:15` Send us one denied out-of-network EOB. We'll tell you whether it qualifies for federal IDR and what it's worth — in writing, within one business day. No call, no software to install.

### `/case-review/sample`

- `src/lib/content/claim-review-sample.ts:4` Claim Review — Sample
- `src/lib/content/claim-review-sample.ts:12` No valid notice-and-consent waiver was obtained. Had one been signed correctly, the claim would fall outside the process — this is the single most common reason a claim we review turns out ineligible.
- `src/lib/content/claim-review-sample.ts:16` 64721 — open carpal tunnel release
- `src/lib/content/claim-review-sample.ts:21` $3,100 – $4,900
- `src/lib/content/claim-review-sample.ts:24` $2,400 – $3,500 above what was paid
- `src/lib/content/claim-review-sample.ts:29` Confidence is moderate. A copy of the plan's QPA disclosure would tighten this — payers frequently understate QPA, and a challenge to the calculation itself is often worth more than the offer.
- `src/lib/content/claim-review-sample.ts:51` …The QPA is a floor in this dispute, not a ceiling — and the gap between $1,410 and the comparable award range is the argument.
- `src/lib/content/claim-review-sample.ts:57` Against a claim worth $2,400–$3,500, the arithmetic is not close.

### `/demo`

- `src/app/demo/page.tsx:119` Under 5 minutes on your claim, 10 minutes on the walkthrough — 15 minutes

### `/resources` hub

- `src/app/resources/page.tsx:25` Resources — Federal IDR and No Surprises Act guides (JSON-LD `name`)
- `src/lib/seo/metadata.ts:194` Resources — Federal IDR and No Surprises Act Guides \| Sydra

### `/how-it-works`

- `src/lib/content/how-it-works-page.ts:12` Federal IDR is final offer arbitration. The entity picks one offer — yours or the plan's — based on which is better supported. Six elements decide that, and every one of them has to be built.
- `src/lib/content/how-it-works-page.ts:39` Element 1 — Payment offer
- `src/lib/content/how-it-works-page.ts:46` Element 2 — Market rate justification
- `src/lib/content/how-it-works-page.ts:53` Element 3 — Clinical necessity narrative
- `src/lib/content/how-it-works-page.ts:60` Element 4 — Provider credentials
- `src/lib/content/how-it-works-page.ts:67` Element 5 — Open negotiation documentation
- `src/lib/content/how-it-works-page.ts:74` Element 6 — Eligibility verification

### `/faq`

- `src/lib/content/faq-page.ts:19` 213+ ingested IDR determinations, weighted toward surgical specialties — spine, orthopedic, neurosurgery, and plastics and hand. Comparables are filtered to your CPT code and your state.
- `src/lib/seo/metadata.ts:179` Sydra FAQ — NSA IDR Software Questions Answered \| Sydra

### `/in-house-idr`

- `src/lib/content/in-house-idr-page.ts:6` Building one federal IDR submission by hand takes 25 to 40 minutes. That is the ceiling on how many disputes a practice pursues — not the law, not eligibility, not the win rate. Sydra moves the ceiling, not the team.
- `src/lib/content/in-house-idr-page.ts:36` No. The same biller prepares, reviews and submits each dispute — in a fraction of the time. What changes is how many disputes that biller can get through.

### `/what-is-idr`

- `src/lib/content/what-is-idr-page.ts:80` A federal law in effect since 2022 that removes the patient from out of network billing disputes. The patient pays the in network cost share, and the provider and plan resolve the balance — through IDR when they cannot agree.

### `/sydra-vs-idr-attorney` and `/compare/*`

- `src/lib/content/sydra-vs-attorney-page.ts:53` …a firm that takes a percentage carries all of the risk — that is what the percentage buys.
- `src/lib/content/sydra-vs-attorney-page.ts:61` Your fee structure does not change — your capacity does.
- `src/lib/idr/comparisons.ts:43` …it lets a practice file the claims it was skipping — which is where the recovery actually sits.

### `/idr-recovery-calculator`

- `src/lib/content/idr-recovery-calculator-page.ts:5` …Award multiples versus QPA are not applied — this estimate is deliberately conservative. Not a Sydra performance claim.
- `src/lib/content/idr-recovery-calculator-page.ts:23` We leave that out of the estimate on purpose — a number you can defend to your CFO is worth more than a bigger one you cannot.
- `src/lib/content/idr-recovery-calculator-page.ts:25` Source: CMS, Federal IDR Supplemental Background, July–December 2025.

### `/resources/idr-attorney-vs-software`

- `src/lib/content/resources/articles.ts:391` Yes. A provider can file directly, and so can an authorized representative — an in house billing team or a billing company acting on the practice's behalf.

### `/security`

- `src/lib/seo/metadata.ts:172` Sydra Security — HIPAA Controls, BAA, AWS Bedrock, PHI Handling \| Sydra
- `src/lib/seo/og-image.tsx:81` Sydra security — HIPAA controls, AWS Bedrock, BAA available.

### `/pricing`

- `src/components/sydra/pricing-tiers.tsx:38` — (empty-cell placeholder)
- `src/components/sydra/pricing-tiers.tsx:73` — (empty-cell placeholder)
- `src/lib/seo/metadata.ts:113` Sydra pricing — NSA IDR software plans for surgical billing teams.
- `src/lib/seo/og-image.tsx:77` Sydra pricing — NSA IDR software plans for surgical billing teams.
- `src/lib/content/tiers.ts:126` Live 9–5 ET, 24 hr email

### Homepage / landing (unused or shared, not the 2.7 hero)

- `src/components/landing/ad-landing.tsx:89` your recovery — you keep all of it.
- `src/components/landing/claim-review-form.tsx:87` Got it — check your inbox. We've sent you a sample review so you can see exactly what you'll get back.
- `src/components/landing/claim-review-form.tsx:163` Takes about a minute. No patient data needed — we'll show you exactly what to redact.
- `src/lib/landing/metadata.ts:38` Sydra — surgeon built NSA IDR software for surgical practices. Five minutes per claim.
- `src/lib/content/founder-lines.ts:11` Dr. John Abrahams, MD — board certified neurosurgeon, founder (`FOUNDER_MARKETING_BYLINE`; homepage figcaption is the dash-free Part 1 string)
- `src/lib/seo/metadata.ts:8` Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim.
- `src/lib/seo/og-image.tsx:76` Sydra — NSA IDR software for surgical billing teams. Under 5 minutes per claim.
- `src/lib/seo/og-image.tsx:80` About Sydra — built by Sydra and Dr. John Abrahams, MD.

### Product screens (how-it-works visual)

- `src/components/sydra/product-screens.tsx:134` CPT 27447 — market rate justification

### Email / mailto subjects

- `src/lib/contact.ts:49` FROM SYDRA — Sales inquiry
- `src/lib/contact.ts:54` FROM SYDRA — Security one pager
- `src/lib/contact.ts:59` FROM SYDRA — Support request
- `src/lib/contact.ts:71` FROM SYDRA — Plans (${label})
- `src/lib/email/claim-review-ops.ts:27` Your Sydra claim review — a sample, and what to send
- `src/lib/email/claim-review-ops.ts:78` Your claim review — ${practice} — est. ${estimate} recoverable
- `src/lib/email/claim-review-ops.ts:105` See us prepare this exact submission. 15 minutes on Zoom, using your claim and your CPT codes — not a canned demo. …
- `src/lib/email/claim-review-ops.ts:111` Happy to do neither, too — the review is yours either way.
- `src/lib/email/claim-review-ops.ts:125` You asked for a claim review a few days ago and I haven't seen a claim come through — no problem at all, I know how the week goes.
- `src/lib/email/claim-review-ops.ts:139` — ${FOUNDER_NAME}
- `src/lib/email/claim-review-ops.ts:172` Claim Review — ${practice}

`src/app/globals.css` still has em dashes in comments. `check:copy` strips comments, so those are not in the 59.

---

## 4. Templates and URL counts

Shared modules edited: `src/lib/idr/copy.ts`, `src/components/idr/pain-sections.tsx`.

`PROMISE` / `PromiseAndDisclaimer` → supplied “what Sydra is” paragraph. Heading kept: `We do this for you.`

`WAIT_HOOK` / `WaitHookBlock` → supplied pathway paragraph. Heading kept: `The window does not wait.` Heading/body mismatch is a gap (section 6).

`DenialCta` → `DualPageCta` with primary `See what one denied claim is worth` → `/case-review`, supporting line, secondary `Request a 15-minute demo` → `/demo`. No longer uses `demoDeepLink`.

`SydraCtaBand` on specialty, state, payer, and guide templates left as the third CTA. `ProgrammaticStickyCta` (`Send us this denial`) left.

Guides (`src/lib/idr/guides.ts`): unique bodies do not contain the three shared boilerplate paragraphs. Not rewritten.

**Renderable catalog (all states have a pathway):**

| Surface | Count |
|---|---|
| `SOURCE_CODES` | 187 |
| Hand-only codes | 3 |
| `IDR_CODES` (CPT hubs) | 190 |
| Specialty hubs | 6 |
| State hubs (pathway-gated) | 51 |
| CPT × state | 190 × 51 = 9,690 |
| Specialty × state | 6 × 51 = 306 |
| Named payers | 12 |
| CPT × state × payer | 190 × 51 × 12 = 116,280 |
| Guides | 13 |

Spec guessed `IDR_CODES` = 103. Live catalog is 190.

**Sitemap URL set:** `generateSitemaps` + `sitemap()` dumped 1,742 indexable URLs. Part 4 did not touch `src/app/sitemap.ts`, `src/lib/idr/taxonomy.ts`, `src/lib/idr/indexable.ts`, `src/lib/idr/seo.ts`, `src/lib/idr/source-codes.ts`, `src/lib/idr/state-pathways.ts`, or `src/lib/idr/denial-reasons.ts`. Before and after dumps are identical (1,742 URLs). Payer triples are mostly wave 4 / noindex, so they are not in the sitemap listing.

---

## 5. Contrast: Body on Surface alt

Tokens used (existing, not spec hex): Body `--color-body` `#4A5568` on Surface alt `bg-neutral-section` `#e8eaef`.

Relative luminance contrast is about **6.2:1**, above WCAG AA 4.5:1. Homepage captions use full `text-body`, not `/70`. No homepage-only caption darkening was required.

---

## 6. Missing sections / gaps

Left as specified. No invented copy.

- Extra homepage modules removed from composition, files kept: `TwoPaths`, mid-page claim form, `HowItWorks`, `FounderNote`, `BuiltOnClaude`, `FederalIdrExplainer`, `Faq`, `ClosingCta`.
- About: extra unlabeled opening paragraphs dropped because the spec replaced “the opening.” Heisha and Chelsea bios left. Duplicate `Why this origin.` block removed in favor of `Why this origin matters for your practice.`
- `EntityHero` now accepts `string | readonly string[]` for `/idr` two-paragraph lead.
- “Five steps. Six deadlines. Nothing here is difficult; all of it is unforgiving.” has no heading. Inserted as the last paragraph of “What federal IDR is,” immediately before Step one.
- Promise heading `We do this for you.` vs new “what Sydra is” body. Wait-hook heading `The window does not wait.` vs new pathway body.
- `SydraCtaBand` third CTA on programmatic pages; `ProgrammaticStickyCta` still says `Send us this denial`.
- Homepage FAQ JSON-LD removed with the FAQ section. Organization / SoftwareApplication / Person left.
- `DEFAULT_MEDICAL_REVIEW_DATE` remains May 27, 2026. Only `/resources/updates/open-negotiation-and-idr-deadlines` passes `lastReviewed="July 8, 2026"`.
- Spec hex `#2563EB` / `#EDEEF2` / `#D8DBE2` not introduced. Existing tokens used.
- Eligibility “What IDR costs” paragraph pasted without markdown bold (`**administrative fee**` / `**certified IDRE fee**`). Renderer is plain strings.
- `platform fee` remains in `src/lib/content/service-faqs.ts`, billing-company FAQ, `/pricing`, and `economics.tsx`.
- Unused `closing-cta.tsx` still has `stop writing off`.
- `3.4 million` in `src/lib/content/sources.json` left (citation). Same figure remains in Group A `/what-is-idr` with its period.
- `/pricing` and `/idr-for-billing-companies` still say volume-quoted / platform fee, not the exact phrase “per claim and subscription.” `/sydra-vs-idr-attorney` does use that phrase.
- `FOUNDER_MARKETING_BYLINE` still has an em dash. Homepage figcaption does not use it.
- `CtaPlacement` now includes `homepage-segments`. The segments primary CTA tracks in `audience-segments.tsx` itself rather than rendering `ConversionCtaPair`.
- New lint from Part 2: `src/components/motion/homepage-reveal.tsx` `setState` in `useEffect` (required by SSR-opaque-then-arm). Same class of pre-existing errors on `reveal.tsx`, sticky CTA, lead form, mobile nav.
- `/idr/payer/[payer]` uses the same shared blocks; spec did not list it.

---

## 7. `tsc` / `lint` / `build` / `check:copy`

Run at the end of the rewrite:

| Command | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Fail. 8 errors, 3 warnings. Pre-existing: `react-hooks/set-state-in-effect` on programmatic sticky CTA, lead form, `reveal.tsx`, mobile nav; unused-var warnings. Introduced by Part 2: same rule on `homepage-reveal.tsx`. `/idr/guide` apostrophe encoded as `&apos;` so that file is clean |
| `npm run build` | Pass. Next.js 16.2.5, 75 static pages, programmatic IDR routes remain dynamic (`ƒ`) |
| `npm run check:copy` | Fail. 59 leftover dash violations, as required. Checker was not weakened |

`npm run build` does not include `check:copy`.

---

## 8. Deployment

Nothing was deployed. `master-rewrite` was not merged into `main`. No Vercel production promote. Preview verification (homepage order, nowrap, reduced motion, JS-disabled, claim-review 200) is still a human pass on a preview URL.

### Verify notes (code-level, not a production preview)

- Homepage composition in `postcard-landing.tsx` is the eight-section 2.7 order: Hero → proof band (Surface alt) → Very few practices (Surface) → four segments (Surface alt) → Built for the rules (Surface) → recovery calculator (Surface alt) → IDR is a process problem (Surface) → claim review form (Surface alt, `id="lead-form"`).
- Two-paths is not in the homepage composition.
- Statement sections are `max-w-[720px]`, left aligned.
- `prefers-reduced-motion: reduce` keeps HomepageReveal at full opacity. SSR HTML is opaque until JS arms.
- Sitemap URL set identical (1,742 indexable URLs).
- Claim-review form component and `/api/claim-review` were not changed in this rewrite.
