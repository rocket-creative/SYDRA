import { SALES_EMAIL_FALLBACK } from "@/lib/contact";

const DEFAULT_INBOX = SALES_EMAIL_FALLBACK;

/** Comma separated LEADS_INBOX_EMAIL → unique recipient list. */
export function getLeadInboxRecipients(): string[] {
  const raw = process.env.LEADS_INBOX_EMAIL?.trim();
  if (!raw) return [DEFAULT_INBOX];
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (list.length === 0) return [DEFAULT_INBOX];
  return [...new Set(list)];
}

export function getLeadFromEmail(): string {
  const raw = process.env.LEADS_FROM_EMAIL?.trim();
  return raw && raw.length > 0 ? raw : "notifications@sydrahealth.com";
}

/** Display name for founder auto reply. Address stays on the configured domain. */
export function getFounderFromEmail(): string {
  const address = getLeadFromEmail();
  return `Dr. John Abrahams <${address}>`;
}
