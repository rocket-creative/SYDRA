-- Track when a lead email was copied or downloaded for ads/list export.
-- Rows stay in place; exported_at greys them out in the admin lists.

alter table landing_leads
  add column if not exists exported_at timestamptz;

create index if not exists landing_leads_exported_at_idx
  on landing_leads (exported_at nulls first);
