import { SALES_EMAIL_FALLBACK } from "@/lib/contact";

/** Silent copy of every form notification. Not shown on the site. */
export const LEAD_COPY_EMAIL = "georgestoff@rocketcreative.net";

/** Every lead, contact, and privacy form notifies this inbox. */
export function getLeadInboxRecipients(): string[] {
  return [SALES_EMAIL_FALLBACK];
}

export function getLeadCopyRecipients(): string[] {
  return [LEAD_COPY_EMAIL];
}

/** BCC on team notifications only. Customer auto replies never copy this inbox. */
export function leadCopyBcc(): { bcc: string[] } {
  return { bcc: getLeadCopyRecipients() };
}

/** Sales To plus ops BCC for team notifications. */
export function leadTeamNotifyAddresses(): { to: string[]; bcc: string[] } {
  return {
    to: getLeadInboxRecipients(),
    ...leadCopyBcc(),
  };
}

export function getLeadFromEmail(): string {
  return SALES_EMAIL_FALLBACK;
}

/** Display name for founder auto reply. Address stays on the configured domain. */
export function getFounderFromEmail(): string {
  const address = getLeadFromEmail();
  return `Dr. John Abrahams <${address}>`;
}
