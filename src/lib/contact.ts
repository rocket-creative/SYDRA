/** The only Sydra mailbox. All forms, From, To, Reply-To, and public copy use this. */
export const SALES_EMAIL_FALLBACK = "sales@sydrahealth.com";

/**
 * The published Sydra number. Display form carries no hyphens, per brand style.
 * Single source of truth for the footer, /contact, and the homepage call CTA.
 */
export const SALES_PHONE_DISPLAY = "(914) 705 6830";
export const SALES_PHONE_TEL = "tel:+19147056830";

const MAILTO_SUBJECT = "FROM SYDRA";

/** Primary public contact and form routing. Always sales@. */
export function getContactEmail(): string {
  return SALES_EMAIL_FALLBACK;
}

export function getSalesEmail(): string {
  return SALES_EMAIL_FALLBACK;
}

export function getSupportEmail(): string {
  return SALES_EMAIL_FALLBACK;
}

/** Optional display phone, e.g. (555) 123 4567 */
export function getContactPhoneDisplay(): string | null {
  const raw = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
  return raw && raw.length > 0 ? raw : null;
}

/** E.164 or tel:-safe href from display phone. Strips non-digits except leading +. */
export function getContactPhoneTel(): string | null {
  const display = getContactPhoneDisplay();
  if (!display) return null;
  const digits = display.replace(/[^\d+]/g, "");
  return digits.length > 0 ? `tel:${digits}` : null;
}

export function formatContactEmailMasked(email: string = getContactEmail()): string {
  const at = email.indexOf("@");
  if (at === -1) {
    return "contact us";
  }
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return `${local} [at] ${domain.replace(/\./g, " [dot] ")}`;
}

export function contactMailtoHref(email: string = getContactEmail()): string {
  const subject = encodeURIComponent(MAILTO_SUBJECT);
  return `mailto:${email}?subject=${subject}`;
}

export function salesMailtoHref(): string {
  const subject = encodeURIComponent("FROM SYDRA — Sales inquiry");
  return `mailto:${getSalesEmail()}?subject=${subject}`;
}

export function securityMailtoHref(): string {
  const subject = encodeURIComponent("FROM SYDRA — Security one pager");
  return `mailto:${getSalesEmail()}?subject=${subject}`;
}

export function supportMailtoHref(): string {
  const subject = encodeURIComponent("FROM SYDRA — Support request");
  return `mailto:${getSupportEmail()}?subject=${subject}`;
}

const TIER_PRICING_LABELS = {
  basic: "Self Serve",
  plus: "Support",
  pro: "Full Service",
} as const;

export function pricingMailtoHref(tier: keyof typeof TIER_PRICING_LABELS): string {
  const label = TIER_PRICING_LABELS[tier];
  const subject = encodeURIComponent(`FROM SYDRA — Plans (${label})`);
  return `mailto:${getSalesEmail()}?subject=${subject}`;
}
