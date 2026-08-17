/** In-site claim review destination (replaces former off-site case-review CTAs). */
export const CASE_REVIEW_PATH = "/case-review";

export const CASE_REVIEW_SAMPLE_PATH = "/case-review/sample";

export const CASE_REVIEW_THANK_YOU_PATH = "/case-review/thank-you";

/** Demo bookings that originated from a completed claim review. */
export const CLAIM_REVIEW_BOOKING_PATH = "/demo?source=claim-review";

export const CASE_REVIEW_CTA = "Get a free claim review";

/** Primary conversion CTA. Full label on desktop; shortLabel in header and on mobile. */
export const PRIMARY_CTA_LABEL = "See what one denied claim is worth";
export const PRIMARY_CTA_SHORT_LABEL = "What's your claim worth?";

export function caseReviewUrl(): string {
  return CASE_REVIEW_PATH;
}

export function caseReviewLinkLabel(): string {
  return "Get a free IDR claim review";
}
