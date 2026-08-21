import type { FormTracking } from "@/lib/schemas/tracking";

function formatOptional(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "n/a";
}

/** Only the ops copy carries attribution. The sales notification omits it. */
export function attributionLines(tracking: FormTracking, include: boolean): string[] {
  if (!include) return [];
  return [
    "",
    "Attribution",
    `Route state: ${formatOptional(tracking.route_state)}`,
    `UTM source: ${formatOptional(tracking.utm_source)}`,
    `UTM medium: ${formatOptional(tracking.utm_medium)}`,
    `UTM campaign: ${formatOptional(tracking.utm_campaign)}`,
    `UTM content: ${formatOptional(tracking.utm_content)}`,
    `Landed at: ${formatOptional(tracking.landed_at)}`,
  ];
}

export function trackingFallbackFields(
  tracking: FormTracking,
): Record<string, string | undefined> {
  return {
    route_state: tracking.route_state,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_content: tracking.utm_content,
    landed_at: tracking.landed_at,
  };
}
