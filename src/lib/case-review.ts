/** In-site claim review destination (replaces former off-site case-review CTAs). */
export const CASE_REVIEW_PATH = "/case-review";

export const CASE_REVIEW_THANK_YOU_PATH = "/case-review/thank-you";

export const CASE_REVIEW_CTA = "Get a free claim review";

export function caseReviewUrl(): string {
  return CASE_REVIEW_PATH;
}

export function caseReviewLinkLabel(): string {
  return "Get a free IDR claim review";
}
