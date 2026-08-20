import { demoScheduleUrl } from "@/lib/calendly";
import { SALES_PHONE_DISPLAY } from "@/lib/contact";

export const DEMO_PHONE_EXPECT =
  "Anything else comes from (914) 705 6830, so you know it is us.";

/** Founder demo auto-reply: book on /schedule, or call. */
export function demoSchedulingBlock(): string {
  return [
    `Set up a demo: ${demoScheduleUrl()}`,
    `Set up a call: ${SALES_PHONE_DISPLAY}.`,
    DEMO_PHONE_EXPECT,
  ].join(" ");
}

/** Claim-review delivery email. Same booking URL as the demo auto-reply. */
export function claimReviewDeliverySchedulingBlock(): string {
  return `Set up a demo: ${demoScheduleUrl()} Pick a time there and we will send the Zoom link.`;
}

/** Claim-review writeup. Same booking URL as the demo auto-reply. */
export function claimReviewWriteupSchedulingBlock(): string {
  return `Set up a demo: ${demoScheduleUrl()} Pick a time and it is yours.`;
}
