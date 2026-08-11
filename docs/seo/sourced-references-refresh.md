# Sourced references refresh runbook

Single source of truth: `src/lib/content/sources.json` (re-exported as `SITE_SOURCES` from `src/lib/content/sources.ts`). The `SourcesReferences` component renders that list on every page that includes it.

## Cadence

Verify quarterly (about every 90 days; CI fails after 120 days via `npm run check:sources`).

## Steps

1. Open each source URL (or publication) listed in `sources.json`.
2. Check for a newer release (CMS Public Use Files update periodically; Georgetown CHIR, Brookings, Zelis, and ACR publish on their own schedules).
3. Update `lastVerified` to today's date (`YYYY-MM-DD`) for every source you checked, even when the underlying figures did not change.
4. If a release has new figures, update `dateReleased` and `detail` (and `url` if the landing page moved). Do not invent numbers. Keep statistic values tied to the primary source.
5. If a win rate, award multiple, or dispute volume figure used in site copy changed, update those content modules and add a dated post under `/resources/updates` that names the source and reporting period, then links back to the evergreen guide or hub page.
6. Run `npm run check:sources` and fix any failures before merge.
7. **Fee / deadline / batching consistency:** Spot check that live pages stating the administrative fee, filing deadlines, or batching rules agree with each other and with the most recent `/resources/updates` post (especially `cms-2026-idr-final-rule`). If a page still says Sydra never batches or omits the $15 fee after a rule change, fix the copy in the same PR as any source bump.
8. Run `npm run check:batching` to catch banned absolute batching phrases (`never batch`, `no batching`, etc.) before merge.

## Fields

| Field | Purpose |
|-------|---------|
| `id` | Stable key for the source |
| `label` | Display title in the references list |
| `detail` | Optional dated note or figure summary (no em dashes) |
| `url` | Optional primary link |
| `dateReleased` | Optional publication or release date |
| `lastVerified` | Date we last confirmed the source is still current |
| `verificationStatus` | `current`, `stale`, or `retired` |

## Stale check

```bash
npm run check:sources
```

Exits `1` if any `lastVerified` is missing, invalid, or older than 120 days from today.
