import { siteUrl } from "@/lib/site";

/** Inline embed. No month param: that pins the calendar to a stale month. */
export const CALENDLY_EMBED_URL =
  "https://calendly.com/rcm-nybrainspine/30min?hide_gdpr_banner=1";

export const DEMO_SCHEDULE_PATH = "/demo/thank-you#schedule";

export function demoScheduleUrl(): string {
  return `${siteUrl()}${DEMO_SCHEDULE_PATH}`;
}
