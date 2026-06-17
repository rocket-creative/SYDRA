# SEO indexation runbook

Operational runbook for the Sydra Health SEO indexation rollout. Site: https://www.sydrahealth.com. Stack: Next.js 16.2.5. Read this top to bottom and execute the steps in order.

## 1. Purpose and current state

The fresh homepage is live, yet Google still serves a stale copy in the results, so searchers see old positioning and never reach the new hub. This runbook breaks that logjam: it forces a recrawl, submits a grouped sitemap index, phases the programmatic surface so Google never judges the site as thin, thickens every leaf page with real data before it ships, and earns the early inbound links that make Google crawl and index a large new domain aggressively.

## 2. Step 1 - Stand up Google Search Console today

This is the single unlock. Everything else compounds on top of it. Do it first, today.

### Why this is the unlock

- Requesting indexing on the homepage forces Google to recrawl it now instead of waiting for the next natural pass.
- The fresh crawl replaces the stale copy that currently ranks.
- Once Googlebot fetches the homepage again, it follows the internal links from there into the hub, the state pages, the specialty pages, and the guides, so the recrawl spreads outward from one fetch.

### Verify by DNS (preferred)

A DNS property covers every host and protocol at once: the www host, the bare domain, http, and https, plus any subdomain. That is why DNS verification beats the per URL prefix property for a launch like this.

- [ ] Sign in to Google Search Console and choose **Add property**, then the **Domain** property type.
- [ ] Enter `sydrahealth.com` (the bare domain, no scheme and no www).
- [ ] Copy the TXT record value Google provides.
- [ ] Open the DNS zone at the registrar or DNS host and add a TXT record on the root (`@`) with that value.
- [ ] Save, wait for propagation (often minutes, sometimes up to a few hours), then click **Verify** in Search Console.
- [ ] Confirm the property now reports both `https://www.sydrahealth.com` and `https://sydrahealth.com` traffic, since the Domain property rolls up all hosts.

### HTML tag fallback

If you cannot reach the DNS zone quickly, verify a URL prefix property with the HTML tag method instead. The app already wires this through an env var:

- [ ] Set `NEXT_PUBLIC_GSC_VERIFICATION` to the content value from the Google site tag (the token only, not the full meta tag).
- [ ] Redeploy. `src/app/layout.tsx` reads the var and emits `verification.google` into the document head only when it is set.
- [ ] In Search Console, add a **URL prefix** property for `https://www.sydrahealth.com` and verify with the HTML tag method.
- [ ] Treat this as a stopgap and move to the DNS property when you can, so the bare domain is covered too.

### Request indexing on the homepage

- [ ] Open **URL Inspection** in Search Console.
- [ ] Inspect `https://www.sydrahealth.com/`.
- [ ] Click **Request Indexing** and wait for the live test to pass.
- [ ] Repeat for the top hub entry points so the recrawl has clear seeds: `/idr`, `/idr/guide`, `/demo`, and `/pricing`.

## 3. Step 2 - Submit the XML sitemap index

The app emits a sitemap index at `/sitemap.xml`, not a single flat file. Next builds the index from `generateSitemaps()` in `src/app/sitemap.ts`, and each child resolves to `/sitemap/<id>.xml`. The `robots.ts` file already advertises `/sitemap.xml`, so Google can discover it, but submit it by hand to start the clock.

- [ ] In Search Console, open **Sitemaps** and submit `sitemap.xml`.
- [ ] Confirm Search Console reads it as a sitemap index and discovers the children.

### Child groups in the index

- `core` - marketing pages, the homepage, resources, comparisons, and the `/idr` and `/idr/guide` hub entries.
- `states` - every state hub at `/idr/state/<state>`.
- `specialties` - the six specialty hubs at `/idr/specialty/<slug>`.
- `guides` - the canonical guides at `/idr/guide/<slug>` (non canonical guides are excluded so only canonical URLs ship).
- `cpt-<state>` - one child per released CPT wave, for example `cpt-texas` or `cpt-new-york`. An unreleased state produces no child at all rather than an empty file.

### Watch indexation per group

Because the surface is split by group, you can read acceptance group by group:

- Use the **Sitemaps** report to confirm each child is read and to see discovered URL counts per child.
- Use the **Pages** report (indexing coverage), filtered by sitemap or by URL path, to see which sets Google accepts and which it rejects, and why.
- This per group visibility is the point: if Google balks at one set, you see it in isolation instead of guessing across the whole site.

## 4. Step 3 - Phase the release

Do not release the full CPT matrix at once. A large programmatic set that lands all at once invites a thin site judgment, and that judgment is hard to reverse. Phase it.

### Phase 1 (release now)

- [ ] Core pages (the `core` group).
- [ ] The six launch states: TX, CA, NY, NJ, FL, and AZ (the `states` group carries all states, and these six are the proof slice).
- [ ] The six specialty hubs (the `specialties` group).
- [ ] The twelve guides (the `guides` group).

Let Phase 1 index reliably and accumulate impressions before you add programmatic CPT geos.

### Add CPT waves by state

The released CPT waves are controlled by the `SEO_CPT_WAVE_STATES` env var, read in `src/lib/seo/phasing.ts`. It takes comma separated UPPERCASE two letter state codes. When it is unset or empty, it defaults to the launch states (TX, CA, NY, NJ, FL, AZ).

- [ ] Confirm the target state clears the leaf quality bar in Step 4 before you release its wave.
- [ ] Append the state code to `SEO_CPT_WAVE_STATES`, for example `TX,CA,NY,NJ,FL,AZ,GA`.
- [ ] Redeploy. The new `cpt-<state>` child appears in the sitemap index automatically.
- [ ] Resubmit `sitemap.xml` (or let Google read it again) and watch the new child in the Sitemaps and Pages reports.

Phasing protects against a thin site judgment on the programmatic sets. You only expand the URL count once the existing pages prove they index and hold, so Google always sees a site that is growing into demand rather than spraying templates.

## 5. Step 4 - Thicken every leaf before releasing it

A CPT by state page earns indexation only when it carries real, distinct data: the actual qualifying payment amount and award figures for that code in that state, pulled from the CMS public use file, not a template with swapped numbers. A page that reads like a fill in the blank across geos is exactly what triggers a scaled content penalty.

### The passing example

The New York state surface is the quality bar for a thick page:

- 81 percent provider win rate.
- The FAIR Health 80th percentile benchmark.
- A three year lookback on commercial claims, which revives claims a practice had written off.

If a leaf page reads as specific and useful as the New York surface, it passes. If it reads like New York with the numbers swapped, it fails.

### How the data_source gate enforces this

Index gating lives in `src/lib/idr/seo.ts`. A page with `data_source` of `seed` returns `noindex,follow` and stays out of the sitemap; only real CMS PUF or MRF data pages return `index,follow` and enter the sitemap. The page still exists for internal linking and AI crawlers while it is seed, it just does not compete. So a leaf stays seed and invisible to Google until it clears the bar, by design.

The CPT wave allowlist sits on top of that gate. A CPT page ships only when it is both data backed (not seed) and in a released wave (its state is in `SEO_CPT_WAVE_STATES`). The two controls intersect, so data landing for a state does not auto publish that geo.

### Go or no go checklist for promoting a state wave

Before you add a state code to `SEO_CPT_WAVE_STATES`:

- [ ] Every CPT by state leaf for that state resolves to real CMS PUF or MRF data, with no `seed` pages left in the wave.
- [ ] QPA and award figures are real and distinct per code, not copied across codes or geos.
- [ ] The state hub reads as specific as the New York surface (pathway, state law, and win rate are accurate for that state).
- [ ] Spot check three or four leaf pages by hand: each says something true and useful that the others do not.
- [ ] Phase 1 has already indexed reliably with no thin or duplicate flags in the Pages report.
- [ ] JSON-LD (Breadcrumb and FAQ) renders on the programmatic pages for that state.

If any box is unchecked, it is a no go. Leave the state out of the env var and fix the data first.

## 6. Step 5 - Earn a handful of inbound links

A new domain carrying thousands of pages needs early trust signals, or Google crawls it slowly and indexes it conservatively. Even five or six solid, relevant links change how aggressively Google crawls and indexes the site. Get these in place around the Phase 1 release.

- [ ] Link to sydrahealth.com from kronosrevenue.health.
- [ ] Link to sydrahealth.com from sydra.health.
- [ ] Link to sydrahealth.com from the New York Brain and Spine site.
- [ ] Link to sydrahealth.com from a Sydra LinkedIn company page.
- [ ] Link to sydrahealth.com from Dr. Abrahams' profile.

Favor contextual links from the body of a real page over footer or sidebar links, and use descriptive anchor text that names what Sydra does rather than a bare URL.

## 7. Step 6 - Verification before you push

Run this checklist before every deploy that touches indexable surface.

- [ ] `robots.txt` blocks nothing indexable. The current `src/app/robots.ts` allows `/` and disallows only `/api/` and query string facets (`/*?*`), which is correct. Confirm no new broad disallow slipped in.
- [ ] No leaked editorial lines in templates: no placeholder copy, no internal notes, and no "swap the numbers" text left in any rendered page.
- [ ] JSON-LD is present and valid: Organization and SoftwareApplication on the marketing surface, FAQPage where an FAQ renders, and BreadcrumbList on the deeper pages. Breadcrumb and FAQ schema appear on the programmatic CPT and state pages.
- [ ] Validate a sample of pages in the Rich Results test before pushing.

Sequencing note: JSON-LD compounds after indexation, not before it. Structured data helps Google understand and enrich a page it has already crawled and indexed; it does not get a page indexed. So the schema work follows the indexation fixes in Steps 1 through 4, it does not precede them. Ship the indexation unlocks first, then let JSON-LD compound on the pages Google is already crawling.

## 8. Ongoing monitoring

Check Search Console weekly and act on what it shows.

- [ ] **Pages report by group.** Filter by sitemap child and by path. Watch indexed counts climb for `core`, `states`, `specialties`, `guides`, and each released `cpt-<state>` child. A flat or falling count on a group is a signal to investigate before you release more.
- [ ] **Coverage errors and exclusions.** Read the "Why pages are not indexed" reasons. Treat "Crawled, currently not indexed" and "Discovered, currently not indexed" on programmatic sets as thin or duplicate warnings, and pause new waves until they clear.
- [ ] **Sitemap read status.** Confirm `sitemap.xml` and every child still read as success, with discovered URL counts that match what you expect for the released waves.
- [ ] **Queries gaining impressions.** Watch the Performance report for new queries and rising impressions, especially on the launch states and specialty hubs, as the leading sign that indexation is converting into visibility.
- [ ] **Manual actions and security issues.** Confirm both are clean every week. A manual action against scaled content is the failure this runbook exists to prevent.
