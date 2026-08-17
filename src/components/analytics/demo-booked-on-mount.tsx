"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";

function analyticsSource(raw: string | null): string {
  const value = (raw ?? "").trim().slice(0, 40);
  if (/^[a-zA-Z0-9_-]+$/.test(value)) return value;
  return "demo";
}

/** Fires `demo_booked` once on the demo thank-you page. */
export function DemoBookedOnMount() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = analyticsSource(searchParams.get("source"));
    const tier = searchParams.get("tier")?.trim();
    if (tier) {
      track("demo_booked", { source, tier });
      return;
    }
    track("demo_booked", { source });
  }, [searchParams]);

  return null;
}
