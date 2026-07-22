"use client";

import { useEffect } from "react";

import { persistUtmFirstTouch } from "@/lib/landing/utm-session";

/** Captures first-touch UTMs from the URL into sessionStorage on every page. */
export function UtmFirstTouch() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    persistUtmFirstTouch({
      utm_source: params.get("utm_source") || params.get("src") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
    });
  }, []);

  return null;
}
