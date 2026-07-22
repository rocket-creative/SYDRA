/** First touch UTM persistence across in site navigation (sessionStorage). */

export const UTM_SESSION_KEY = "sydra_utm_first_touch";

export type PersistedUtm = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

const EMPTY: PersistedUtm = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
};

function hasAny(utm: PersistedUtm): boolean {
  return Boolean(utm.utm_source || utm.utm_medium || utm.utm_campaign || utm.utm_content);
}

export function readUtmSession(): PersistedUtm {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = sessionStorage.getItem(UTM_SESSION_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<PersistedUtm>;
    return {
      utm_source: typeof parsed.utm_source === "string" ? parsed.utm_source : "",
      utm_medium: typeof parsed.utm_medium === "string" ? parsed.utm_medium : "",
      utm_campaign: typeof parsed.utm_campaign === "string" ? parsed.utm_campaign : "",
      utm_content: typeof parsed.utm_content === "string" ? parsed.utm_content : "",
    };
  } catch {
    return { ...EMPTY };
  }
}

/** Store UTMs on first touch only. Later empty navigations do not wipe them. */
export function persistUtmFirstTouch(incoming: PersistedUtm): PersistedUtm {
  if (typeof window === "undefined") return incoming;
  const existing = readUtmSession();
  if (hasAny(existing)) {
    return {
      utm_source: existing.utm_source || incoming.utm_source,
      utm_medium: existing.utm_medium || incoming.utm_medium,
      utm_campaign: existing.utm_campaign || incoming.utm_campaign,
      utm_content: existing.utm_content || incoming.utm_content,
    };
  }
  if (!hasAny(incoming)) return { ...EMPTY };
  try {
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(incoming));
  } catch {
    // best effort
  }
  return incoming;
}

export function mergeUtmForSubmit(
  tracking: {
    utm_source: string;
    utm_medium: string;
    utm_content: string;
    utm_campaign?: string;
  },
): PersistedUtm {
  const session = readUtmSession();
  return {
    utm_source: tracking.utm_source || session.utm_source,
    utm_medium: tracking.utm_medium || session.utm_medium,
    utm_campaign: tracking.utm_campaign || session.utm_campaign,
    utm_content: tracking.utm_content || session.utm_content,
  };
}
