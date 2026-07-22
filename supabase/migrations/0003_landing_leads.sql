-- Redundant lead capture for postcard and demo forms.
-- Service role writes only. No public read or write policies.

create table landing_leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('partial', 'full')),
  source text not null check (source in ('postcard', 'demo')),
  subject text not null,
  email text,
  state text,
  fields jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index landing_leads_submitted_at_idx on landing_leads (submitted_at desc);
create index landing_leads_email_idx on landing_leads (email);
create index landing_leads_kind_idx on landing_leads (kind);

alter table landing_leads enable row level security;
-- Intentionally no policies: only the service role (bypasses RLS) can read/write.
