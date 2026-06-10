const DEFAULT_CALENDLY_URL = "https://calendly.com/kronoshealth/sydra-demo";

export function sydraDemoCalendlyUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SYDRA_CALENDLY_URL?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_CALENDLY_URL;
}

export function kronosCaseReviewCalendlyUrl(): string {
  const raw = process.env.NEXT_PUBLIC_KRONOS_CALENDLY_URL?.trim();
  if (raw && raw.length > 0) return raw;
  return "https://calendly.com/kronoshealth/kronos-revenue-case-review";
}
