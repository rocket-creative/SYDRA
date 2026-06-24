/**
 * Google Ads (gtag.js) configuration and conversion tracking.
 *
 * The global site tag is loaded once in the root layout. Conversion events are
 * fired from the client after a successful form submit.
 */

export const GOOGLE_ADS_ID = "AW-17987595919";

/**
 * Conversion label for the demo request goal, set in Google Ads
 * (looks like "AbCdEfGhIjKlMnOp"). Combined with GOOGLE_ADS_ID it forms the
 * full `send_to` value, e.g. "AW-17987595919/AbCdEfGhIjKlMnOp".
 *
 * Provided via env so it can be added without a code change. The conversion is
 * only reported when this is set, so a missing label never fires a broken event.
 */
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "";

type GtagCommand = "js" | "config" | "event" | "set";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
    gtagSendEvent?: (url: string) => boolean;
  }
}

/**
 * Report the demo request conversion to Google Ads. Safe to call from any
 * client handler: it no-ops when gtag has not loaded or the label is unset.
 */
export function trackDemoConversion(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  if (!GOOGLE_ADS_CONVERSION_LABEL) {
    return;
  }
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
  });
}
