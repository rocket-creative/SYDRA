"use client";

import { useEffect } from "react";

import {
  consumeLeadConversionPending,
  reportAdsConversion,
  type AdsConversionAction,
} from "@/lib/analytics/google-ads";

type LeadConversionOnMountProps = {
  /**
   * Expected conversion for this thank-you page. Guards against firing the
   * wrong label if a stale session flag somehow lands on the wrong page.
   */
  action?: AdsConversionAction;
};

/**
 * Fires the matching Google Ads conversion exactly once after a real lead
 * submit redirects here. Only fires when a lead form set the one-time
 * sessionStorage payload (consumed on read), so refreshes, back-button
 * navigation, and direct/organic visits never fire it. Renders nothing.
 */
export function LeadConversionOnMount({
  action = "free_demo",
}: LeadConversionOnMountProps) {
  useEffect(() => {
    const pending = consumeLeadConversionPending();
    if (!pending) return;
    if (pending.action !== action) return;

    reportAdsConversion({
      action: pending.action,
      transactionId: pending.transactionId,
      email: pending.email,
    });
  }, [action]);

  return null;
}
