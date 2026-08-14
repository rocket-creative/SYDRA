"use client";

import { useEffect } from "react";

import {
  consumeLeadConversionPending,
  reportAdsConversion,
  whenGtagReady,
  type AdsConversionAction,
} from "@/lib/analytics/google-ads";

type LeadConversionOnMountProps = {
  /**
   * Fallback action if a legacy payload omitted one. Both values resolve to
   * Submit lead form; do not drop the hit on a mismatch.
   */
  action?: AdsConversionAction;
};

/**
 * Backup Google Ads "Submit lead form" fire after a real lead submit redirects
 * here. Waits for gtag before consuming the one-time sessionStorage payload so
 * a late script load cannot drop the hit. Same transaction_id as the form-page
 * fire so Ads dedupes. Refreshes, back-button, and direct visits never fire.
 * Renders nothing.
 */
export function LeadConversionOnMount({
  action = "free_demo",
}: LeadConversionOnMountProps) {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await whenGtagReady();
      if (cancelled) return;

      const pending = consumeLeadConversionPending();
      if (!pending) return;

      reportAdsConversion({
        action: pending.action ?? action,
        transactionId: pending.transactionId,
        email: pending.email,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [action]);

  return null;
}
