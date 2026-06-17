/**
 * Google Analytics 4 configuration and lead tracking.
 *
 * The GA4 tag is mounted once in the root layout via the GoogleAnalytics
 * component from @next/third-parties. It only renders when NEXT_PUBLIC_GA4_ID is
 * set, so a missing ID never loads a broken tag. Lead events mirror that guard.
 */
import { sendGAEvent } from "@next/third-parties/google";

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

/**
 * Report a demo / lead form submission to GA4 as a `generate_lead` event. Mark
 * this event as a key event in the GA4 UI to count conversions. The `interest`
 * value (the "what are you interested in" selection) is attached so you can
 * segment leads by product intent. No-ops when GA4 is not configured.
 */
export function trackLeadGA4(interest?: string): void {
  if (!GA4_ID) {
    return;
  }
  sendGAEvent("event", "generate_lead", interest ? { interest } : {});
}
