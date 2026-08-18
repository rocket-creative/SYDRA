/** In-site claim review destination (replaces former off-site case-review CTAs). */
export const CASE_REVIEW_PATH = "/case-review";

export const CASE_REVIEW_SAMPLE_PATH = "/case-review/sample";

export const CASE_REVIEW_THANK_YOU_PATH = "/case-review/thank-you";

/** Demo bookings that originated from a completed claim review. */
export const CLAIM_REVIEW_BOOKING_PATH = "/demo?source=claim-review";

export const CASE_REVIEW_CTA = "Get a free claim review";

/**
 * Shared offer line on /recover and /case-review.
 *
 * "No call required" rather than "no call": the homepage closes by asking for a
 * 15-minute call, so a flat "no call" read as a contradiction. What this offer
 * actually promises is that the review needs nothing from you but the EOB.
 */
export const CLAIM_REVIEW_OFFER =
  "Send us one denied out-of-network EOB. We'll tell you whether it qualifies for federal IDR and what it's worth, in writing, within one business day. No call required, and nothing to install.";

/** Primary conversion CTA. Full label on desktop; shortLabel in header and on mobile. */
export const PRIMARY_CTA_LABEL = "See what one denied claim is worth";
export const PRIMARY_CTA_SHORT_LABEL = "What's your claim worth?";

export function caseReviewUrl(source?: string): string {
  if (!source) return CASE_REVIEW_PATH;
  return `${CASE_REVIEW_PATH}?source=${encodeURIComponent(source)}`;
}

export function caseReviewLinkLabel(): string {
  return "Get a free IDR claim review";
}
