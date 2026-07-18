# Track 4 — Paid ads (launch today)

No repo access required. This doc gives the ads owner zero ambiguity: exact keywords, match types, negatives, ad copy, LinkedIn targeting, and retargeting setup.

Audience reality: this is a B2B buyer (practice administrators, billing managers, revenue cycle leads at surgical practices), not a consumer search audience. Keep spend on high intent, low competition long tail. Exclude broad head terms.

---

## 1. Google Search campaign — "IDR high intent long tail"

One campaign, one ad group per theme, tight match types. Goal is demo bookings, not traffic.

### Settings
- Campaign type: Search only. No Display expansion, no Search Partners at launch.
- Networks: Google Search only.
- Bidding: start Maximize conversions with a target CPA once 15+ conversions exist; until then, Maximize clicks with a max CPC cap so a single term cannot run away.
- Conversion action: demo form submission on `/demo/thank-you` (primary). Secondary: contact form submit.
- Locations: United States. Target "people in" the US, not "interested in."
- Ad schedule: all week; bias toward business hours in ET and CT after 2 weeks of data.
- Landing page: `/demo` for booking intent; `/what-is-idr` only for the top-of-funnel education terms below.

### Keywords (phrase and exact, all pulled from Search Console long tail)
Use `[exact]` for the proven terms and `"phrase"` for close variants.

| Keyword | Match | Landing page |
|---|---|---|
| `[idr help for surgeons no upfront cost]` | exact | /demo |
| `"idr help for surgeons"` | phrase | /demo |
| `[arbitration support for underpaid claims no upfront cost]` | exact | /demo |
| `"arbitration support for underpaid claims"` | phrase | /demo |
| `[idr help for hospitals]` | exact | /demo |
| `[federal idr representation for providers]` | exact | /demo |
| `"federal idr representation"` | phrase | /demo |
| `[no surprises act for surgeons]` | exact | /what-is-idr |
| `"no surprises act idr for providers"` | phrase | /what-is-idr |

### Negative keywords (campaign level)
Block the expensive, unqualified, and wrong-audience traffic.

```
idr
"no surprises act"
idr blocks
idr dance
idr full form
idr meaning
idr login
identity resolution
integrated data repository
what does idr mean
patient
consumer
jobs
salary
free
attorney near me
lawyer near me
```

Note: because `idr` and `no surprises act` are added as broad negatives, they will not accidentally match; that is intentional per the brief.

### Responsive Search Ad copy
Provide 12-15 headlines and 4 descriptions. Pin the primary keyword theme to Headline position 1.

Headlines
- Federal IDR Help for Surgeons
- No Upfront Cost to File IDR
- Underpaid Out of Network Claims
- Recover the Gap on Denied Claims
- IDR Support for Surgical Practices
- File Federal IDR in 5 Minutes
- Keep the Recovery, Not 20 Percent
- Built by Surgeons for Billing Teams
- Arbitration Support for Providers
- No Surprises Act Dispute Help
- IDR Help for Hospitals and Groups
- Federal IDR Representation
- Specialty Trained for Surgery
- See It on a Real Denied Claim

Descriptions
- Sydra prepares federal IDR submissions in under 5 minutes per claim. Your billing team keeps the recovery.
- Providers win the large majority of properly filed disputes. See the sourced benchmark, then book a demo.
- Out of network surgical claims get underpaid. Recover the gap through federal IDR without a contingency fee.
- Specialty trained for spine, ortho, neuro, and plastics. HIPAA controls. BAA available. Book a 15 minute demo.

Assets
- Sitelinks: How it works (/how-it-works), Pricing (/pricing), IDR benchmark (/resources/sydra-idr-win-rate-award-benchmark), What is IDR (/what-is-idr).
- Callouts: No upfront cost, Under 5 minutes per claim, Keep the recovery, HIPAA controls.
- Structured snippet (Services): Eligibility check, Draft generation, DOCX export, Deadline tracking.

---

## 2. LinkedIn campaign — B2B by job title

Objective: Lead generation (native Lead Gen Form) or Website conversions to `/demo`.

Audience
- Locations: United States.
- Job titles: Practice Administrator, Practice Manager, Billing Manager, Revenue Cycle Manager, Director of Revenue Cycle, Medical Billing Manager, Reimbursement Manager, Office Manager (surgical).
- Job functions: Operations, Healthcare Services, Finance (as a broadening layer, not primary).
- Industry: Hospital & Health Care, Medical Practice.
- Company headcount: 11-200 (independent and mid size groups).
- Exclusions: students, interns, and consumer/patient titles.

Creative
- Single image and document/carousel ad leading with the benchmark asset (`/resources/sydra-idr-win-rate-award-benchmark`) as the hook.
- Headline: "The federal IDR record for surgical practices, in one place."
- CTA: Download / Learn more to the benchmark; retarget engagers to `/demo`.

Budget
- Start at a small daily cap; LinkedIn CPCs run high. Optimize to cost per lead, not clicks.

---

## 3. Retargeting pool (stand up immediately)

Build audiences now so they are populated before any prospecting scales.

Google Ads (via Google tag / GA4 audiences)
- Audience A: visited `/what-is-idr` OR `/idr` (and any subpath) in last 30/60/90 days.
- Audience B: exclude anyone who reached `/demo/thank-you` (already converted).
- Retarget A minus B with RSAs pointing to `/demo`, message: "Ready to see it on a real denied claim?"

LinkedIn
- Website retargeting audience for visitors of `/what-is-idr` and `/idr`, excluding demo converters.

Meta (optional, if a pixel exists)
- Same visited-not-booked logic; keep creative B2B, benchmark led.

Suppression
- Exclude `/demo/thank-you` converters from all prospecting and retargeting.
- Exclude existing customers list if available.

---

## 4. Measurement
- Primary KPI: cost per demo booked.
- Secondary: demo-to-qualified rate by keyword theme and by channel.
- Kill any exact term with spend above 2x target CPA and zero conversions after a meaningful click volume.
- Review search terms report weekly for the first month; move winners to exact, add new negatives.
