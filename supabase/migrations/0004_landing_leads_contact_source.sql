-- Allow contact form submissions in the redundant lead log.

alter table landing_leads drop constraint if exists landing_leads_source_check;

alter table landing_leads
  add constraint landing_leads_source_check
  check (source in ('postcard', 'demo', 'contact'));
