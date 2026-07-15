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

/**
 * sessionStorage key holding a one-time token set by a lead form on a
 * successful (200) submit that redirects to a thank-you page. The thank-you
 * page consumes the token to fire the conversion exactly once, so refreshes,
 * back-navigation, and direct/organic visits never fire it.
 */
export const LEAD_CONVERSION_FLAG_KEY = "sydra_pending_lead_conversion";

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

  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics] Google Ads conversion", {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      url,
    });
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

/**
 * Set the one-time flag that tells the thank-you page a real lead submit just
 * happened, so it (and only it) fires the Ads conversion after navigation.
 * Call this right before redirecting to the thank-you page.
 */
export function markLeadConversionPending(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const token =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    window.sessionStorage.setItem(LEAD_CONVERSION_FLAG_KEY, token);
  } catch {
    // sessionStorage can throw (private mode / disabled). The 2s navigation
    // fallback and gtag guards still keep the flow working without a flag.
  }
}

/**
 * Consume the pending-conversion flag. Returns true (and clears the flag) only
 * when a lead submit set it. Removing the flag before firing guards against
 * refresh, back-navigation, and React StrictMode double-invokes.
 */
export function consumeLeadConversionPending(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const token = window.sessionStorage.getItem(LEAD_CONVERSION_FLAG_KEY);
    if (!token) {
      return false;
    }
    window.sessionStorage.removeItem(LEAD_CONVERSION_FLAG_KEY);
    return true;
  } catch {
    return false;
  }
}

/** @deprecated Use reportLeadFormConversion */
export function trackDemoConversion(): void {
  reportLeadFormConversion();
}
