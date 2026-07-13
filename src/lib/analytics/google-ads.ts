/**
 * Google Ads (gtag.js) configuration and conversion tracking.
 *
 * The global site tag is loaded once in the root layout. Conversion events are
 * fired from the client after a successful lead form submit.
 */

/** Google Ads account / conversion ID (Submit lead form action). */
export const GOOGLE_ADS_ID = "AW-18244375722";

/**
 * Full `send_to` for the "Submit lead form" conversion action in Google Ads.
 * Pulled from the Ads event snippet (AW ID + conversion label).
 */
export const GOOGLE_ADS_CONVERSION_SEND_TO =
  "AW-18244375722/MhI6CKKQz8scEKqpzPtD";

type GtagCommand = "js" | "config" | "event" | "set";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
    /** Google Ads snippet helper; navigates to `url` after the conversion fires. */
    gtag_report_conversion?: (url?: string) => boolean;
    /** @deprecated Prefer gtag_report_conversion / reportLeadFormConversion */
    gtagSendEvent?: (url: string) => boolean;
  }
}

/**
 * Fire the Google Ads "Submit lead form" conversion. Matches the Ads snippet:
 * `gtag('event', 'conversion', { send_to, value, currency, event_callback })`.
 *
 * Pass `url` when the form should redirect after the hit (e.g. /demo/thank-you).
 * Omit `url` for inline success UIs (homepage postcard lead).
 *
 * Returns false (Ads snippet convention). Includes a 2s navigation fallback when
 * `url` is set so a blocked gtag still reaches the thank you page.
 */
export function reportLeadFormConversion(url?: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  let settled = false;
  const callback = () => {
    if (settled) return;
    settled = true;
    if (typeof url === "string" && url.length > 0) {
      window.location.assign(url);
    }
  };

  if (typeof window.gtag !== "function") {
    callback();
    return false;
  }

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
    value: 1.0,
    currency: "USD",
    event_callback: callback,
  });

  if (typeof url === "string" && url.length > 0) {
    window.setTimeout(callback, 2000);
  }

  return false;
}

/** @deprecated Use reportLeadFormConversion */
export function trackDemoConversion(): void {
  reportLeadFormConversion();
}
