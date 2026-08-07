/**
 * Marketing + Google Customer Match consent.
 *
 * Only upload contacts to Customer Match when marketingConsent === true.
 * Keep consent_text_version in sync with the live checkbox copy.
 */

export const CONSENT_TEXT_VERSION = "2026-08-v1";

export const CAN_SPAM_ADDRESS =
  "Sydra, 244 Westchester Ave, Ste 209, West Harrison, NY 10604";

/** Checkbox label shown on lead and contact forms. */
export const MARKETING_CONSENT_LABEL =
  "Send me product updates and promos. Sydra may also use my contact info (hashed) with Google for advertising, including Customer Match. I can opt out anytime.";

/** Notice shown under the submit button (sales follow up; not marketing). */
export const FORM_SUBMIT_NOTICE =
  "By submitting, you agree Sydra may contact you about this request.";

/** Coerce checkbox / JSON values into a boolean. Missing = false. */
export function parseMarketingConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}
