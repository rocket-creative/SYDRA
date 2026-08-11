# Proposed regulatory change disclaimer (counsel review required)

**Status:** Do not merge into the live footer or `/terms` until legal counsel signs off.

## Existing footer language (keep)

> Not legal or financial advice. Federal IDR applies to qualifying out of network claims under the No Surprises Act. Recovery amounts vary by claim.

## Proposed addition (for counsel)

> Federal IDR rules, fees, and processes are subject to change by CMS and other federal agencies. Sydra updates this content when we become aware of a change, but the current administrative fee, deadlines, and process details should be confirmed against CMS's own published guidance before you rely on them for a filing decision.

## Intended placement after approval

- [`src/components/sydra/footer.tsx`](../../src/components/sydra/footer.tsx) sitewide footer disclaimer block
- Harmonize with language already in `/terms` if counsel prefers a single source

## Why this is gated

Doc 13 of the content build package requires actual legal review before this sentence goes live. The visible "Page current as of…" line (`RegulatoryAsOf`) and the `/resources/updates` stream already ship without this footer addition.
