/**
 * Google Ads (gtag.js) configuration and conversion tracking.
 *
 * The global site tag is loaded once in the root layout. On a successful full
 * lead submit the form fires Submit lead form (Google's event_callback snippet)
 * then navigates to a thank-you page. The thank-you page is a backup fire with
 * the same transaction_id so Ads dedupes. Paths: /demo/thank-you,
 * /recover/thank-you, /case-review/thank-you.
 */

const GTAG_READY_TIMEOUT_MS = 2000;

/** Google Ads account / conversion ID. */
export const GOOGLE_ADS_ID = "AW-18244375722";

/**
 * Full `send_to` for the Primary "Submit lead form" conversion action
 * (Google Ads Goals → Conversions → Tag setup event snippet).
 * Fires after successful demo / homepage / recover / case-review lead submits.
 */
export const GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO =
  "AW-18244375722/MhI6CKKQz8scEKqpzPtD";

/** @deprecated Use GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO */
export const GOOGLE_ADS_FREE_DEMO_SEND_TO = GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO;

/**
 * @deprecated Secondary "IDR Claim Review Submitted" is Inactive in Ads and
 * must not be fired. Kept only as a historical reference for the old label
 * `s5ZYCOuEq9ocEKqpzPtD`. All lead forms use Submit lead form instead.
 */
export const GOOGLE_ADS_IDR_CLAIM_REVIEW_SEND_TO =
  GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO;

/** @deprecated Use GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO */
export const GOOGLE_ADS_CONVERSION_SEND_TO = GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO;

/**
 * Internal thank-you action key. Both values resolve to Submit lead form;
 * `idr_claim_review` remains only so legacy sessionStorage payloads still fire.
 */
export type AdsConversionAction = "free_demo" | "idr_claim_review";

export function sendToForAction(_action: AdsConversionAction): string {
  return GOOGLE_ADS_SUBMIT_LEAD_FORM_SEND_TO;
}

/**
 * sessionStorage key holding a one-time payload set by a lead form on a
 * successful (200) submit. The thank-you page consumes it for a backup fire
 * with the same transaction_id. Refreshes, back-navigation, and direct visits
 * never fire.
 */
export const LEAD_CONVERSION_FLAG_KEY = "sydra_pending_lead_conversion";

export type PendingLeadConversion = {
  token: string;
  /** Dedupes Ads conversions if the same submit is retried. */
  transactionId: string;
  /** Which thank-you page expected this hand-off (both map to Submit lead form). */
  action: AdsConversionAction;
  /** Optional email for enhanced conversions (cleared after fire). */
  email?: string;
  /** Landing surface that generated the lead, e.g. recover | demo | home | case-review. */
  landingPage?: string;
};

type ReportConversionOptions = {
  url?: string;
  transactionId?: string;
  email?: string;
  action?: AdsConversionAction;
};

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

function newToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return String(Date.now());
}

/**
 * Resolve when `window.gtag` is a function, or after `timeoutMs`.
 * The form page has usually already loaded the tag; thank-you is a fresh load.
 */
export function whenGtagReady(timeoutMs = GTAG_READY_TIMEOUT_MS): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }
  if (typeof window.gtag === "function") {
    return Promise.resolve(true);
  }
  return new Promise((resolve) => {
    const started = Date.now();
    const id = window.setInterval(() => {
      if (typeof window.gtag === "function") {
        window.clearInterval(id);
        resolve(true);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        window.clearInterval(id);
        resolve(false);
      }
    }, 50);
  });
}

/**
 * Fire a Google Ads conversion. Matches the Ads snippet:
 * `gtag('event', 'conversion', { send_to, value, currency, event_callback, event_timeout })`.
 *
 * Pass `url` so the form navigates after the hit (Google's event_callback
 * pattern). Thank-you mount is a backup with the same transaction_id.
 *
 * Returns false (Ads snippet convention). Includes a 2s navigation fallback when
 * `url` is set so a blocked gtag still reaches the thank you page.
 */
export function reportAdsConversion(
  urlOrOptions?: string | ReportConversionOptions,
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const options: ReportConversionOptions =
    typeof urlOrOptions === "string" || urlOrOptions === undefined
      ? { url: urlOrOptions }
      : urlOrOptions;

  const { url, transactionId, email } = options;
  const action: AdsConversionAction = options.action ?? "free_demo";
  const sendTo = sendToForAction(action);

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

  if (email && email.includes("@")) {
    window.gtag("set", "user_data", {
      email: email.trim().toLowerCase(),
    });
  }

  const eventParams: Record<string, unknown> = {
    send_to: sendTo,
    value: 1.0,
    currency: "USD",
    event_callback: callback,
    event_timeout: GTAG_READY_TIMEOUT_MS,
  };
  if (transactionId) {
    eventParams.transaction_id = transactionId;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics] Google Ads conversion", {
      action,
      send_to: sendTo,
      url,
      transactionId,
      hasEmail: Boolean(email),
    });
  }

  window.gtag("event", "conversion", eventParams);

  if (typeof url === "string" && url.length > 0) {
    window.setTimeout(callback, GTAG_READY_TIMEOUT_MS);
  }

  return false;
}

/** Fire Submit lead form. Prefer `reportAdsConversion` with an explicit action. */
export function reportLeadFormConversion(
  urlOrOptions?: string | ReportConversionOptions,
): boolean {
  if (typeof urlOrOptions === "string" || urlOrOptions === undefined) {
    return reportAdsConversion({ url: urlOrOptions, action: "free_demo" });
  }
  return reportAdsConversion({ ...urlOrOptions, action: urlOrOptions.action ?? "free_demo" });
}

/**
 * Set the one-time payload that tells the thank-you page a real lead submit
 * just happened, so it can fire a backup conversion after navigation.
 * Call this right before `reportAdsConversion({ url })`.
 *
 * Returns the transaction_id even when sessionStorage is blocked, so the
 * form-page fire can still dedupe.
 */
export function markLeadConversionPending(input?: {
  email?: string;
  landingPage?: string;
  action?: AdsConversionAction;
}): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const token = newToken();
  try {
    const payload: PendingLeadConversion = {
      token,
      transactionId: token,
      action: input?.action ?? "free_demo",
      email: input?.email?.trim() || undefined,
      landingPage: input?.landingPage?.trim() || undefined,
    };
    window.sessionStorage.setItem(LEAD_CONVERSION_FLAG_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage can throw (private mode / disabled). Form-page fire with
    // event_callback still records the conversion without a thank-you flag.
  }
  return token;
}

/**
 * Consume the pending-conversion payload. Returns the payload (and clears the
 * flag) only when a lead submit set it. Removing before firing guards against
 * refresh, back-navigation, and React StrictMode double-invokes.
 *
 * Also accepts a legacy plain-string token from older clients.
 */
export function consumeLeadConversionPending(): PendingLeadConversion | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.sessionStorage.getItem(LEAD_CONVERSION_FLAG_KEY);
    if (!raw) {
      return null;
    }
    window.sessionStorage.removeItem(LEAD_CONVERSION_FLAG_KEY);

    try {
      const parsed = JSON.parse(raw) as Partial<PendingLeadConversion>;
      if (parsed && typeof parsed.token === "string" && parsed.token.length > 0) {
        const action: AdsConversionAction =
          parsed.action === "idr_claim_review" ? "idr_claim_review" : "free_demo";
        return {
          token: parsed.token,
          transactionId:
            typeof parsed.transactionId === "string" && parsed.transactionId.length > 0
              ? parsed.transactionId
              : parsed.token,
          action,
          email: typeof parsed.email === "string" ? parsed.email : undefined,
          landingPage:
            typeof parsed.landingPage === "string" ? parsed.landingPage : undefined,
        };
      }
    } catch {
      // Legacy: plain string token
      if (raw.length > 0) {
        return { token: raw, transactionId: raw, action: "free_demo" };
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** @deprecated Use reportAdsConversion */
export function trackDemoConversion(): void {
  reportAdsConversion({ action: "free_demo" });
}
