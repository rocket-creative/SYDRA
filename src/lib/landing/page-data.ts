import { cookies } from "next/headers";

import { resolveStateCode, resolveStateDisplay } from "@/lib/landing/states";
import {
  buildCampaignTracking,
  parseCampaignCookie,
  parseUtmFromSearchParams,
  type CampaignTracking,
} from "@/lib/landing/tracking";

type SearchParams = Record<string, string | string[] | undefined>;

export type LandingPageData = {
  stateDisplay: string | null;
  stateCode: string;
  tracking: CampaignTracking;
};

export async function getLandingPageData(
  stateParam: string | undefined,
  searchParams: SearchParams,
): Promise<LandingPageData> {
  const stateCode = resolveStateCode(stateParam);
  const stateDisplay = resolveStateDisplay(stateParam);
  const utm = parseUtmFromSearchParams(searchParams);

  const cookieStore = await cookies();
  const existing = parseCampaignCookie(cookieStore.get("sydra_campaign")?.value);

  const tracking = buildCampaignTracking(
    stateCode || existing?.state || "",
    {
      utm_source: utm.utm_source || existing?.utm_source || "",
      utm_medium: utm.utm_medium || existing?.utm_medium || "",
      utm_content: utm.utm_content || existing?.utm_content || "",
    },
    existing?.landed_at,
  );

  return {
    stateDisplay,
    stateCode,
    tracking,
  };
}
