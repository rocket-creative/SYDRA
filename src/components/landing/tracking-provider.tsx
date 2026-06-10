"use client";

import { useEffect, useRef } from "react";

import { trackPageView } from "@/lib/landing/analytics-client";
import {
  CAMPAIGN_COOKIE_NAME,
  type CampaignTracking,
  parseCampaignCookie,
  serializeCampaignCookie,
} from "@/lib/landing/tracking";

type TrackingProviderProps = {
  tracking: CampaignTracking;
  path: string;
};

function persistCookie(data: CampaignTracking): void {
  const value = encodeURIComponent(serializeCampaignCookie(data));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CAMPAIGN_COOKIE_NAME}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax${secure}`;
}

function readCookie(): CampaignTracking | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CAMPAIGN_COOKIE_NAME}=`));
  if (!match) return null;
  const raw = match.slice(CAMPAIGN_COOKIE_NAME.length + 1);
  return parseCampaignCookie(raw);
}

export function TrackingProvider({ tracking, path }: TrackingProviderProps) {
  const fired = useRef(false);

  useEffect(() => {
    const existing = readCookie();
    const merged: CampaignTracking = {
      state: tracking.state || existing?.state || "",
      utm_source: tracking.utm_source || existing?.utm_source || "",
      utm_medium: tracking.utm_medium || existing?.utm_medium || "",
      utm_content: tracking.utm_content || existing?.utm_content || "",
      landed_at: existing?.landed_at || tracking.landed_at,
    };

    persistCookie(merged);

    if (!fired.current) {
      fired.current = true;
      trackPageView(merged, path);
    }
  }, [tracking, path]);

  return null;
}
