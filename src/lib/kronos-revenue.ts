const DEFAULT_KRONOS_REVENUE_URL = "https://www.kronosrevenue.health";

export const KRONOS_HEALTH_URL = "https://www.kronosgroup.health";

export const KRONOS_HEALTH_ID = `${KRONOS_HEALTH_URL}/#organization`;

export const KRONOS_PARENT_TAGLINE =
  "Kronos Health builds Sydra (software) and runs Kronos Revenue (full service RCM).";

export const KRONOS_FULL_SERVICE_CTA = "Get a free NSA IDR review";

/** Sister site for fully managed NSA / lawyer-replacement tier. */
export function kronosRevenueUrl(): string {
  const raw = process.env.NEXT_PUBLIC_KRONOS_REVENUE_URL;
  const trimmed = raw?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_KRONOS_REVENUE_URL;
}

export function kronosCaseReviewUrl(): string {
  return `${kronosRevenueUrl()}/case-review`;
}
