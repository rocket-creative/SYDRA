-- Marketing / Customer Match consent columns + privacy request source.

alter table landing_leads
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists consent_text_version text;

create index if not exists landing_leads_marketing_consent_idx
  on landing_leads (marketing_consent)
  where marketing_consent = true;

alter table landing_leads drop constraint if exists landing_leads_source_check;

alter table landing_leads
  add constraint landing_leads_source_check
  check (source in ('postcard', 'demo', 'contact', 'privacy_request'));
