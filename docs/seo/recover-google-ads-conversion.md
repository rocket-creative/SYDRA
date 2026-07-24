# Browser Claude instructions: Google Ads conversion for `/recover`

Paste this entire file into Claude in Chrome (or Claude computer use) while
logged into the Sydra Google Ads account. Goal: make `/recover` leads count as
the primary conversion for the recover campaign.

## What the website already does (do not change Ads tags on the site)

The site fires the existing **Submit lead form** conversion event after a
**full** lead submit (step 2), not after email-only step 1.

Flow:

1. Visitor lands on `https://www.sydrahealth.com/recover?...`
2. Completes the two-step form
3. Redirects to `https://www.sydrahealth.com/recover/thank-you`
4. Thank-you page fires once:

```text
gtag('event', 'conversion', {
  send_to: 'AW-18244375722/MhI6CKKQz8scEKqpzPtD',
  value: 1.0,
  currency: 'USD',
  transaction_id: '<one-time-id>'
});
```

Also sets enhanced conversion `user_data.email` when available.

Account ID: `AW-18244375722`  
Conversion label (already in code): `MhI6CKKQz8scEKqpzPtD`  
Global tag loads on every page via the site layout. Do **not** add a second
gtag snippet to the website.

## Your job in Google Ads UI

### A. Confirm the conversion action exists and is Primary

1. Open Google Ads → **Goals** → **Conversions** → **Summary**.
2. Find **Submit lead form** (or the action whose Event snippet uses  
   `AW-18244375722/MhI6CKKQz8scEKqpzPtD`).
3. Open it and verify:
   - **Category:** Submit lead form / Lead
   - **Counting:** One
   - **Click-through conversion window:** 30 days (or account default)
   - **Attribution:** Data-driven (preferred) or Last click
   - **Status:** Active / Recording, not Removed
4. Set this action to **Primary** for the account (or at least for the
   recover campaign’s goal). Secondary actions must not outrank it for bidding.

If the action is missing, create **Website** → **Event** conversion:

- Name: `Submit lead form`
- Event: use the existing tag / event that matches  
  `send_to = AW-18244375722/MhI6CKKQz8scEKqpzPtD`
- Do **not** create a duplicate page-load conversion on `/recover/thank-you`
  (that would double-count with the event snippet).

### B. Wire the recover campaign to that conversion

1. Open the campaign whose Final URL is `/recover`
   (UTMs: `utm_source=google&utm_medium=cpc&utm_campaign=recover_oon`).
2. **Settings** → **Conversion goals** (or Campaign goals).
3. Use account-default goals **only if** Submit lead form is Primary.
   Otherwise set campaign-specific goals and include **only**:
   - Primary: Submit lead form
4. Bidding: **Maximize conversions** (or Maximize conversion value later).
   Do not optimize to clicks once this conversion is recording.

### C. Final URLs (no ValueTrack inventing)

For each ad, set a real Final URL with a literal `utm_content` label.
Do **not** use `{creative}` — Google will not substitute it.

Examples:

```text
https://www.sydrahealth.com/recover?utm_source=google&utm_medium=cpc&utm_campaign=recover_oon&utm_content=painpoint_deadline

https://www.sydrahealth.com/recover?utm_source=google&utm_medium=cpc&utm_campaign=recover_oon&utm_content=brand_official

https://www.sydrahealth.com/recover?utm_source=google&utm_medium=cpc&utm_campaign=recover_oon&utm_content=software_idr

https://www.sydrahealth.com/recover?utm_source=google&utm_medium=cpc&utm_campaign=recover_oon&utm_content=competitor_compare
```

Auto-tagging (`gclid`) must stay **On** (Account settings → Auto-tagging).

### D. Audiences / exclusions

1. Create (or update) an audience: visited `/recover/thank-you` in last 30/90 days.
2. Exclude that audience from prospecting and retargeting (already converted).
3. Optional remarketing: visited `/recover` but not `/recover/thank-you`.

### E. Live verification checklist (do this after a real test submit)

1. Open an Incognito window.
2. Go to a Final URL above (pick one `utm_content`).
3. Complete **both** form steps with a real inbox you control.
4. Confirm redirect to `/recover/thank-you`.
5. In Ads: **Goals → Conversions → Submit lead form → Recent conversions**
   (can take a few minutes to hours).
6. In browser DevTools → Network, confirm a request to Google that includes
   the conversion (`googleadservices`, `google.com/ccm/collect`, or similar)
   after landing on thank-you. Refreshing thank-you must **not** fire again.
7. Confirm sales inbox / lead email arrived (site-side proof the lead is real).

### F. What NOT to do

- Do not install another Google tag / GTM container for this conversion.
- Do not add a “Thank you page” URL conversion on `/recover/thank-you` while
  the event snippet is already Primary (double counting).
- Do not mark step-1 email capture as the conversion. Only full submit →
  thank-you counts.
- Do not put `{creative}` or other unknown ValueTrack tokens in the Final URL.

## Done when

- [ ] Submit lead form is Primary and Recording
- [ ] Recover campaign optimizes to that conversion
- [ ] Final URLs use literal `utm_content` labels
- [ ] One test full submit from `/recover` shows in Ads (and email arrives)
- [ ] Refreshing `/recover/thank-you` does not add another conversion
