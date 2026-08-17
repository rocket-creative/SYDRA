"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

/** Fires `demo_booked` once on the demo thank-you page. */
export function DemoBookedOnMount() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tier = searchParams.get("tier")?.trim();
    if (tier) {
      track("demo_booked", { tier });
      return;
    }
    track("demo_booked");
  }, [searchParams]);

  return null;
}
