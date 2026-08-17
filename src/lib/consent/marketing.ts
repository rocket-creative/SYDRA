/**
 * Marketing + Google Customer Match consent.
 *
 * Customer Match consent lives in the Privacy Policy only. Forms do not collect
 * a marketing checkbox. Keep marketingConsent false on new submissions.
 */

export const CONSENT_TEXT_VERSION = "2026-08-v1";

export const CAN_SPAM_ADDRESS =
  "Sydra, 244 Westchester Ave, Ste 209, West Harrison, NY 10604";

/** Notice shown under the submit button (sales follow up; not marketing). */
export const FORM_SUBMIT_NOTICE =
  "By submitting, you agree Sydra may contact you about this request.";

/** Coerce checkbox / JSON values into a boolean. Missing = false. */
export function parseMarketingConsent(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1";
}
