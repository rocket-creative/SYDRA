# Sydra data pipeline

ETL that fills the Sydra entity-SEO surface with real public data. It ingests
the CMS Federal IDR Public Use Files and Transparency-in-Coverage MRFs into
staging tables, then **publishes** real figures into the app's own tables
(`idr_benchmarks`, `idr_state_profiles`), flipping each affected row's
`data_source` from `seed` to `puf`/`mrf` so real-data pages become indexable.

```
CMS IDR PUF ─► idr_disputes_raw ─► idr_outcomes ─┐
                                                  ├─► publish ─► idr_benchmarks
TiC MRFs ───► idr_benchmarks_raw ─────────────────┘            idr_state_profiles
CMS PFS ────► medicare_rates ─────────────────────┘            (data_source: seed → puf/mrf)
                                                                        │
                                                                 app reads these
                                                            (indexable = data_source <> 'seed')
```

The app owns the catalog. Codes, payers, and state profiles come from
`src/lib/idr/taxonomy.ts` + `supabase/seed.ts`; this pipeline never re-defines
them. It only produces the **data atoms** (negotiated rates + dispute outcomes)
that replace the seeded placeholders.

## How it reconciles with the app schema

- **Source of truth:** `supabase/migrations/0001_idr_entity_schema.sql` (the
  tables the site reads). This pipeline does not change them.
- **Staging:** `supabase/migrations/0002_idr_pipeline_staging.sql` adds
  pipeline-only tables (`idr_disputes_raw`, `idr_outcomes`, `idr_benchmarks_raw`,
  `medicare_rates`). The MRF table is suffixed `_raw` to avoid colliding with the
  app's `idr_benchmarks`.
- **Enrich in place:** publish runs `UPDATE`s against the already-seeded
  `idr_benchmarks` / `idr_state_profiles` rows. The app seed must run first so
  those `NOT NULL` rows exist. Re-runs are idempotent.
- **Units:** `code_system` is lowercase to match the app enum (`cpt`/`hcpcs`/
  `icd10`). The app renders the IDR award figure as a multiple of QPA, so publish
  divides the staging percentage by 100.

## Index gate (anti-thin-content)

A benchmark row only flips to a real `data_source` when a **real negotiated rate
(MRF)** backs its dollar figures — placeholder dollars never get indexed. IDR
outcomes then upgrade the win-rate / award figures (and provenance to `puf`) on
rows that are already real. State-profile pages show only outcome stats, so they
flip on a PUF outcome alone.

## Data sources

| Source | What | Cost | Size | Where |
| --- | --- | --- | --- | --- |
| CMS Federal IDR Public Use Files | Dispute outcomes: win rate, prevailing offer vs QPA, by state/service | Free | Large CSV | cms.gov/nosurprises/policies-and-resources/reports |
| Transparency-in-Coverage MRFs | In-network negotiated rates per code per payer | Free | Up to ~1TB JSON/payer | each payer's TiC index |
| CMS Physician Fee Schedule | Medicare benchmark per code (optional) | Free | Moderate | cms.gov PFS look-up / RVU files |

## Prerequisites

- Node 18+ and direct Postgres access to the **same database the app uses**.
- `psql` on PATH (to apply the staging migration), or paste
  `../supabase/migrations/0002_idr_pipeline_staging.sql` into the Supabase SQL editor.
- The app's schema + seed already applied: `0001` migration, then `npm run seed`
  in the app root.

## Setup

```bash
npm install
cp .env.example .env        # set DATABASE_URL + file paths
npm run db:schema           # apply 0002 staging tables (0001 must already exist)
```

## Run order

```bash
# (in the app root, once) apply 0001 + npm run seed  → seeds the rows we enrich

npm run idr:load            # stream a CMS IDR PUF -> idr_disputes_raw -> idr_outcomes
npm run mrf:parse           # stream one payer MRF -> idr_benchmarks_raw (repeat per payer)
npm run publish             # enrich idr_benchmarks + idr_state_profiles from staging

# or, after at least one source is loaded:
npm run pipeline:all        # idr:load + publish
```

`mrf:parse` is per payer: set `MRF_PATH` + `MRF_PAYER_SLUG` (a slug from the
app's `idr_payers`) in `.env` and re-run for each payer file.

## What each script does

- **02_load_idr_outcomes** — streams the PUF, filters to the app's `idr_codes`
  set + valid states, loads line-items to `idr_disputes_raw`, then aggregates to
  `idr_outcomes` (provider win rate + median % of QPA). **Verify the column
  mapping in `config/pipeline.config.mjs` against your PUF's data dictionary —
  headers change between releases.**
- **03_parse_mrf** — streams one payer's in-network-rates MRF (handles `.gz`),
  keeps only target codes, writes national rate stats to `idr_benchmarks_raw`
  keyed by `payer_slug`.
- **04_publish** — enriches the app's `idr_benchmarks` / `idr_state_profiles`
  from staging, applies the index gate, bumps `data_source`, and prints a
  per-source summary.

## Known gaps to close before publishing

1. **State-level benchmarks.** MRFs are national; rates tie to provider groups
   (NPI/TIN), not states. Publish applies national rates to every state as a
   fallback. For true per-state rates, enrich provider NPIs → state via NPPES and
   write state-coded rows into `idr_benchmarks_raw`. IDR **outcomes** are already
   state-level.
2. **No Medicare loader yet.** `medicare_rates` exists and publish uses it when
   present; add a loader from the CMS PFS to populate it, otherwise `medicare_rate`
   keeps its seed value.
3. **CPT license.** Code labels in the app are Sydra-authored on purpose. Don't
   load verbatim AMA CPT descriptors until the distribution license is in place.
4. **Code set.** The pipeline filters to the app's `idr_codes`. The original seed
   CSV carried a few extra codes (`63042`, `23472`, `64635`, `62323`, `64561`,
   `30520`, `42826`) and `pain`/`ent` specialties not in `taxonomy.ts`; add them
   there if you want pages for them.

*Public regulatory data only. Not legal advice. Validate codes, eligibility, and
column mappings against current sources before publishing.*
