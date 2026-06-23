"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

import { trackWebVital, type WebVitalName } from "@/lib/landing/analytics-client";

/**
 * Runtime Core Web Vitals (RUM) reporter. Subscribes to the field metrics
 * Google uses for ranking (LCP, INP, CLS) plus FCP and TTFB for diagnosis, and
 * forwards each one to the existing /api/analytics beacon. Renders nothing and
 * registers its listeners once after hydration, so it stays off the critical
 * render path.
 */
export function WebVitalsReporter() {
  useEffect(() => {
    const report = (metric: Metric) => {
      trackWebVital({
        name: metric.name as WebVitalName,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      });
    };

    onLCP(report);
    onINP(report);
    onCLS(report);
    onFCP(report);
    onTTFB(report);
  }, []);

  return null;
}
