/**
 * Google Analytics 4 configuration and lead tracking.
 *
 * The GA4 stream is configured from the single global gtag.js tag in
 * GoogleAdsTag (which configures both the Ads AW id and this GA4 id). Lead
 * events fire through the shared `window.gtag`, so no separate GA4 script or
 * @next/third-parties component is required.
 */

/** GA4 measurement ID for the "Sydra Web" data stream (www.sydrahealth.com). */
const DEFAULT_GA4_ID = "G-7KPTH8W6N3";

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() || DEFAULT_GA4_ID;

/**
 * Report a demo / lead form submission to GA4 as a `generate_lead` event. Mark
 * this event as a key event in the GA4 UI to count conversions. The `interest`
 * value (the "what are you interested in" selection) is attached so you can
 * segment leads by product intent. No-ops when GA4 is not configured or gtag
 * is unavailable.
 */
export function trackLeadGA4(interest?: string): void {
  if (!GA4_ID || typeof window === "undefined") {
    return;
  }
  if (typeof window.gtag !== "function") {
    return;
  }
  const params = interest ? { interest } : {};
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics] GA4 generate_lead", params);
  }
  window.gtag("event", "generate_lead", params);
}
