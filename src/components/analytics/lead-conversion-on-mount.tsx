"use client";

import { useEffect } from "react";

import {
  consumeLeadConversionPending,
  reportLeadFormConversion,
} from "@/lib/analytics/google-ads";

/**
 * Fires the Google Ads "Submit lead form" conversion exactly once, after a real
 * lead submit has redirected here. It only fires when a lead form set the
 * one-time sessionStorage flag (consumed on read), so refreshes, back-button
 * navigation, and direct/organic visits to the thank-you page never fire it.
 * Renders nothing.
 */
export function LeadConversionOnMount() {
  useEffect(() => {
    if (consumeLeadConversionPending()) {
      reportLeadFormConversion();
    }
  }, []);

  return null;
}
