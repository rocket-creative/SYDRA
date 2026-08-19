export const CAMPAIGN_COOKIE_NAME = "sydra_campaign";
export const CAMPAIGN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type CampaignTracking = {
  state: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  landed_at: string;
};

export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

export function parseUtmFromSearchParams(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>,
): UtmParams {
  const get = (key: string): string => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? "";
    }
    const raw = searchParams[key];
    if (Array.isArray(raw)) return raw[0] ?? "";
    return raw ?? "";
  };

  /*
   * Google Ads auto-tagging appends gclid, or gbraid/wbraid when consent mode
   * strips gclid, and it does not add utm parameters unless the campaign sets
   * them by hand. Without this fallback a paid click lands with an empty source
   * and gets filed as untracked, which is how paid leads end up indistinguishable
   * from direct ones.
   */
  const hasPaidClickId = Boolean(get("gclid") || get("gbraid") || get("wbraid"));

  const utm_source = get("utm_source") || get("src") || (hasPaidClickId ? "google" : "");
  const utm_medium = get("utm_medium") || (hasPaidClickId ? "cpc" : "");
  const utm_campaign = get("utm_campaign") || "";
  const utm_content = get("utm_content") || "";

  return { utm_source, utm_medium, utm_campaign, utm_content };
}

const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paidsearch", "paid_search"]);
const PAID_SOURCES = new Set(["google", "googleads", "google-ads", "adwords", "bing", "microsoft"]);

/**
 * Whether this visit arrived from a paid click. Used to label a lead by the
 * channel that produced it on routes that serve more than one, so a page built
 * for one campaign does not claim credit for another.
 */
export function isPaidTraffic(tracking: CampaignTracking): boolean {
  return (
    PAID_MEDIUMS.has(tracking.utm_medium.trim().toLowerCase()) ||
    PAID_SOURCES.has(tracking.utm_source.trim().toLowerCase())
  );
}

export function buildCampaignTracking(
  stateCode: string,
  utm: UtmParams,
  landedAt = new Date().toISOString(),
): CampaignTracking {
  return {
    state: stateCode,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content: utm.utm_content,
    landed_at: landedAt,
  };
}

export function serializeCampaignCookie(data: CampaignTracking): string {
  return JSON.stringify(data);
}

export function parseCampaignCookie(raw: string | undefined): CampaignTracking | null {
  if (!raw) return null;
  try {
    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      decoded = raw;
    }
    const parsed = JSON.parse(decoded) as Partial<CampaignTracking>;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      state: typeof parsed.state === "string" ? parsed.state : "",
      utm_source: typeof parsed.utm_source === "string" ? parsed.utm_source : "",
      utm_medium: typeof parsed.utm_medium === "string" ? parsed.utm_medium : "",
      utm_campaign: typeof parsed.utm_campaign === "string" ? parsed.utm_campaign : "",
      utm_content: typeof parsed.utm_content === "string" ? parsed.utm_content : "",
      landed_at:
        typeof parsed.landed_at === "string" ? parsed.landed_at : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
