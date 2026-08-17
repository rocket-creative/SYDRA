/** Recurring demo windows. Used in founder emails so copy cannot drift. */
export const DEMO_AVAILABILITY_WINDOWS =
  "Tuesday and Thursday, 7-9am ET and Wednesday, 1-3pm ET";

export const DEMO_PHONE_EXPECT =
  "Anything else comes from (914) 705 6830, so you know it is us.";

/** Founder demo auto-reply: name the windows, they pick a time, we send Zoom. */
export function demoSchedulingBlock(): string {
  return [
    `I hold ${DEMO_AVAILABILITY_WINDOWS} for these.`,
    "Reply with any time in one of those windows and I will send the Zoom link.",
    "If none of those work, send me two that do.",
    DEMO_PHONE_EXPECT,
  ].join(" ");
}

/** Claim-review delivery email. Same windows, no booking URL. */
export function claimReviewDeliverySchedulingBlock(): string {
  return `I hold ${DEMO_AVAILABILITY_WINDOWS} for these. Reply with any time in one of those windows and I will send the Zoom link.`;
}

/** Claim-review writeup. Same windows, no booking URL. */
export function claimReviewWriteupSchedulingBlock(): string {
  return `Reply with a time. Dr. Abrahams holds ${DEMO_AVAILABILITY_WINDOWS} for these calls. Name any time in one of those windows and it is yours.`;
}
