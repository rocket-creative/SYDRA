const DEFAULT_CONTACT_EMAIL = "demo@sydrahealth.com";

const MAILTO_SUBJECT = "FROM SYDRA";

/** Public inbox for all site contact. Override with NEXT_PUBLIC_CONTACT_EMAIL. */
export function getContactEmail(): string {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const trimmed = raw?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_CONTACT_EMAIL;
}

/** Display-only masked form (not a literal address; reduces trivial scraping). */
export function formatContactEmailMasked(email: string = getContactEmail()): string {
  const at = email.indexOf("@");
  if (at === -1) {
    return "contact us";
  }
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return `${local} [at] ${domain.replace(/\./g, " [dot] ")}`;
}

/** mailto: link with fixed subject line for filtering in the inbox. */
export function contactMailtoHref(): string {
  const subject = encodeURIComponent(MAILTO_SUBJECT);
  return `mailto:${getContactEmail()}?subject=${subject}`;
}
