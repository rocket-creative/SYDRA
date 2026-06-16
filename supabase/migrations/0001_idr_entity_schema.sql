-- Sydra entity-space SEO schema.
-- The code is the catalog (stable spine); the dollar figures are the data atoms.
-- See 01_Sydra_Entity-SEO_Playbook.md sections 1-3 and 9.

create type code_system as enum ('cpt', 'hcpcs', 'icd10');
create type descriptor_source as enum ('hcpcs', 'icd10', 'sydra_authored', 'ama_licensed');
create type data_source as enum ('seed', 'puf', 'mrf');
create type nsa_pathway as enum ('federal', 'state', 'mixed');

-- The page spine: one canonical entity per code.
create table idr_codes (
  code text primary key,
  code_system code_system not null,
  short_label text not null,
  descriptor text not null,
  descriptor_source descriptor_source not null default 'sydra_authored',
  specialty text not null,
  is_relevant boolean not null default true
);

create index idr_codes_specialty_idx on idr_codes (specialty) where is_relevant;

-- Payer dimension. has_mrf gates whether code x state x payer pages may exist.
create table idr_payers (
  slug text primary key,
  name text not null,
  has_mrf boolean not null default false
);

-- State-level NSA eligibility + outcome profile (reviewed legal content).
create table idr_state_profiles (
  state text primary key,
  nsa_pathway nsa_pathway not null,
  state_law_summary text not null,
  idr_win_rate numeric(4, 3) not null,
  idr_median_pct_qpa numeric(4, 1) not null,
  data_source data_source not null default 'seed'
);

-- The benchmark cell: code x state aggregate (payer_slug null) or code x state x payer.
create table idr_benchmarks (
  code text not null references idr_codes (code) on delete cascade,
  state text not null,
  payer_slug text references idr_payers (slug) on delete cascade,
  in_network_median numeric(12, 2) not null,
  oon_allowed numeric(12, 2) not null,
  medicare_rate numeric(12, 2) not null,
  idr_win_rate numeric(4, 3) not null,
  idr_median_pct_qpa numeric(4, 1) not null,
  data_source data_source not null default 'seed',
  updated_at timestamptz not null default now()
);

-- One aggregate row and one row per payer per code x state. A null payer_slug is
-- treated as a distinct key via the partial unique indexes below.
create unique index idr_benchmarks_aggregate_uidx
  on idr_benchmarks (code, state)
  where payer_slug is null;

create unique index idr_benchmarks_payer_uidx
  on idr_benchmarks (code, state, payer_slug)
  where payer_slug is not null;

create index idr_benchmarks_code_idx on idr_benchmarks (code);
create index idr_benchmarks_state_idx on idr_benchmarks (state);
create index idr_benchmarks_payer_idx on idr_benchmarks (payer_slug);
-- Fast lookups for "which pages are indexable" (real data only).
create index idr_benchmarks_indexable_idx
  on idr_benchmarks (code, state)
  where payer_slug is null and data_source <> 'seed';

-- Benchmark and profile data is public (it powers public marketing pages), so
-- enable RLS with read-only public policies. Writes go through the service role,
-- which bypasses RLS.
alter table idr_codes enable row level security;
alter table idr_payers enable row level security;
alter table idr_state_profiles enable row level security;
alter table idr_benchmarks enable row level security;

create policy "public read idr_codes" on idr_codes for select using (true);
create policy "public read idr_payers" on idr_payers for select using (true);
create policy "public read idr_state_profiles" on idr_state_profiles for select using (true);
create policy "public read idr_benchmarks" on idr_benchmarks for select using (true);
