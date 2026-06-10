export const CAMPAIGN_COOKIE_NAME = "sydra_campaign";
export const CAMPAIGN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type CampaignTracking = {
  state: string;
  utm_source: string;
  utm_medium: string;
  utm_content: string;
  landed_at: string;
};

export type UtmParams = {
  utm_source: string;
  utm_medium: string;
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

  const utm_source = get("utm_source") || get("src") || "";
  const utm_medium = get("utm_medium") || "";
  const utm_content = get("utm_content") || "";

  return { utm_source, utm_medium, utm_content };
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
      utm_content: typeof parsed.utm_content === "string" ? parsed.utm_content : "",
      landed_at:
        typeof parsed.landed_at === "string" ? parsed.landed_at : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

