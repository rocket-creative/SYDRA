const DEFAULT_KRONOS_REVENUE_URL = "https://www.kronosrevenue.com";

/** Sister site for fully managed NSA / lawyer-replacement tier. */
export function kronosRevenueUrl(): string {
  const raw = process.env.NEXT_PUBLIC_KRONOS_REVENUE_URL;
  const trimmed = raw?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_KRONOS_REVENUE_URL;
}
