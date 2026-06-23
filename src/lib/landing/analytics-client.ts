"use client";

import type { CampaignTracking } from "@/lib/landing/tracking";

type AnalyticsProduct = "sydra" | "kronos";

export type WebVitalName = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
type WebVitalRating = "good" | "needs-improvement" | "poor";

type AnalyticsPayload = {
  event: "page_view" | "cta_click" | "web_vital";
  product?: AnalyticsProduct;
  state?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_content?: string;
  path?: string;
  metric?: WebVitalName;
  value?: number;
  rating?: WebVitalRating;
  metric_id?: string;
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

/**
 * Report a single Core Web Vitals measurement to the analytics beacon. CLS is
 * a unitless ratio, so it is kept to four decimals; all other metrics are
 * milliseconds rounded to whole numbers to keep the payload small.
 */
export function trackWebVital(metric: {
  name: WebVitalName;
  value: number;
  rating: WebVitalRating;
  id: string;
}): void {
  trackEvent({
    event: "web_vital",
    metric: metric.name,
    value:
      metric.name === "CLS"
        ? Math.round(metric.value * 10000) / 10000
        : Math.round(metric.value),
    rating: metric.rating,
    metric_id: metric.id,
  });
}
