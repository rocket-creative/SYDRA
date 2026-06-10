"use client";

import type { CampaignTracking } from "@/lib/landing/tracking";

type AnalyticsProduct = "sydra" | "kronos";

type AnalyticsPayload = {
  event: "page_view" | "cta_click";
  product?: AnalyticsProduct;
  state?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_content?: string;
  path?: string;
};

export function trackEvent(payload: AnalyticsPayload): void {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    ...payload,
    path: payload.path ?? window.location.pathname,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics", blob);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function trackPageView(tracking: CampaignTracking, path?: string): void {
  trackEvent({
    event: "page_view",
    state: tracking.state,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_content: tracking.utm_content,
    path,
  });
}

export function trackCtaClick(
  product: AnalyticsProduct,
  tracking: CampaignTracking,
): void {
  trackEvent({
    event: "cta_click",
    product,
    state: tracking.state,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_content: tracking.utm_content,
  });
}
