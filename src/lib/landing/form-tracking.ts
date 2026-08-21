import { parseUtmFromSearchParams, readCampaignCookie } from "@/lib/landing/tracking";
import { readUtmSession } from "@/lib/landing/utm-session";
import type { FormTracking } from "@/lib/schemas/tracking";

const EMPTY: Required<FormTracking> = {
  route_state: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  landed_at: "",
};

/**
 * Attribution for the forms that sit off the campaign routes. A visitor who
 * lands on an ad page and then navigates to /contact has no UTM left in the
 * URL, so the 30 day cookie and the session first touch are what keep the lead
 * from being filed as direct. Precedence matches TrackingProvider: current URL,
 * then cookie, then session.
 */
export function collectFormTracking(): Required<FormTracking> {
  if (typeof window === "undefined") return { ...EMPTY };

  const url = parseUtmFromSearchParams(new URLSearchParams(window.location.search));
  const cookie = readCampaignCookie();
  const session = readUtmSession();

  return {
    route_state: cookie?.state ?? "",
    utm_source: url.utm_source || cookie?.utm_source || session.utm_source,
    utm_medium: url.utm_medium || cookie?.utm_medium || session.utm_medium,
    utm_campaign: url.utm_campaign || cookie?.utm_campaign || session.utm_campaign,
    utm_content: url.utm_content || cookie?.utm_content || session.utm_content,
    landed_at: cookie?.landed_at ?? "",
  };
}
