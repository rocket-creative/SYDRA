-- Sydra data-pipeline staging schema.
-- These tables are NOT read by the site. They hold raw + aggregated public data
-- (CMS Federal IDR PUF, Transparency-in-Coverage MRFs, Medicare PFS) that the
-- pipeline's publish step transforms into the app's published tables from
-- 0001_idr_entity_schema.sql (idr_benchmarks, idr_state_profiles), flipping
-- data_source from 'seed' to 'puf'/'mrf' so real-data pages become indexable.
--
-- Naming: app-owned tables keep their names (idr_codes, idr_payers,
-- idr_benchmarks, idr_state_profiles). Pipeline tables that would collide are
-- suffixed _raw. code_system here is lowercase text to match the app's enum
-- values ('cpt' | 'hcpcs' | 'icd10').

-- ---------------------------------------------------------------------------
-- Data atom A staging: dispute line-items + per code x state outcome aggregate
-- (CMS Federal IDR Public Use Files; outcomes are genuinely state-level)
-- ---------------------------------------------------------------------------

create table if not exists idr_disputes_raw (
  id               bigserial primary key,
  code             text,
  code_system      text not null default 'cpt',
  state            text,
  payer_name       text,
  qpa              numeric,
  prevailing_party text,                 -- normalized: 'provider' | 'plan'
  prevailing_offer numeric,
  pct_of_qpa       numeric,              -- prevailing_offer / qpa * 100
  period           text,                 -- e.g. '2025H1'
  source_file      text
);
create index if not exists idr_disputes_raw_code_state_idx
  on idr_disputes_raw (code, state);
create index if not exists idr_disputes_raw_period_idx
  on idr_disputes_raw (period);

create table if not exists idr_outcomes (
  code              text not null,
  code_system       text not null default 'cpt',
  state             text not null,
  dispute_count     integer not null default 0,
  provider_win_rate numeric,             -- 0..1
  median_pct_qpa    numeric,             -- median prevailing offer as % of QPA
  period            text not null,
  source_file       text,
  updated_at        timestamptz not null default now(),
  primary key (code, code_system, state, period)
);
create index if not exists idr_outcomes_code_state_idx
  on idr_outcomes (code, state);

-- ---------------------------------------------------------------------------
-- Data atom B staging: national negotiated-rate stats per code x payer
-- (Transparency-in-Coverage in-network-rates MRFs). MRFs are national, so
-- state defaults to 'US'; the publish step applies these to every state until
-- NPI/TIN -> state enrichment produces state-coded rows.
-- ---------------------------------------------------------------------------

create table if not exists idr_benchmarks_raw (
  code               text not null,
  code_system        text not null default 'cpt',
  state              text not null default 'US',
  payer_slug         text not null,        -- matches idr_payers.slug
  in_network_median  numeric,
  in_network_min     numeric,
  in_network_max     numeric,
  oon_allowed_median numeric,              -- from allowed-amounts MRF (optional)
  sample_size        integer not null default 0,
  source_file        text,
  updated_at         timestamptz not null default now(),
  primary key (code, code_system, state, payer_slug)
);
create index if not exists idr_benchmarks_raw_code_idx
  on idr_benchmarks_raw (code, code_system, state);

-- ---------------------------------------------------------------------------
-- Reference staging: Medicare benchmark per code (CMS Physician Fee Schedule).
-- Optional; the publish step uses it for medicare_rate when present.
-- ---------------------------------------------------------------------------

create table if not exists medicare_rates (
  code        text not null,
  code_system text not null default 'cpt',
  locality    text not null default 'NATIONAL',
  rate        numeric,
  year        integer,
  primary key (code, code_system, locality)
);
