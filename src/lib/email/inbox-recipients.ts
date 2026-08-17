import { SALES_EMAIL_FALLBACK } from "@/lib/contact";

/** Every lead, contact, and privacy form notifies this inbox. */
export function getLeadInboxRecipients(): string[] {
  return [SALES_EMAIL_FALLBACK];
}

export function getLeadFromEmail(): string {
  return SALES_EMAIL_FALLBACK;
}

/** Display name for founder auto reply. Address stays on the configured domain. */
export function getFounderFromEmail(): string {
  const address = getLeadFromEmail();
  return `Dr. John Abrahams <${address}>`;
}
