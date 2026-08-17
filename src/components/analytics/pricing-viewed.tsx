"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/** Fires `pricing_viewed` once when /pricing mounts. */
export function PricingViewed() {
  useEffect(() => {
    track("pricing_viewed");
  }, []);

  return null;
}
