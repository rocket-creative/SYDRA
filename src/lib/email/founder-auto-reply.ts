import { getContactPhoneDisplay } from "@/lib/contact";

const DEFAULT_CALL_FROM = "(914) 705 6830";

function firstNameFrom(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part && part.length > 0 ? part : "there";
}

function callFromDisplay(): string {
  return getContactPhoneDisplay() ?? DEFAULT_CALL_FROM;
}

/** True when the lead gave a usable phone (not empty, not an email dump). */
export function leadHasPhone(phone: string | null | undefined): boolean {
  const trimmed = phone?.trim() ?? "";
  return trimmed.length > 0 && !trimmed.includes("@");
}

/**
 * Founder confirmation to the lead after a full demo booking.
 * When hasPhone is true, names the callback number so practices pick up.
 */
export function buildFounderAutoReplyPlain(
  name: string,
  options: { hasPhone: boolean },
): string {
  const first = firstNameFrom(name);
  const followUp = options.hasPhone
    ? `You will hear from me or my team within one business day to set up the call. It will come from ${callFromDisplay()}, so you know it is us.`
    : "You will hear from me or my team within one business day.";

  return [
    `Hi ${first},`,
    "",
    "Thanks for booking a demo. I built Sydra because I file these claims myself and I got tired of watching surgical practices write off money the No Surprises Act says they can recover.",
    "",
    "One thing to have ready for the call: a single denied or underpaid out of network EOB. We will run it live. If it qualifies, you will see the dollar figure on that claim before the call ends. If it does not, I will tell you straight and you have lost 15 minutes.",
    "",
    "The demo is free. No contract, no setup fee, nothing installs in your EMR, and we never take a percentage of your recovery.",
    "",
    followUp,
    "",
    "Talk soon,",
    "Dr. John Abrahams, MD",
    "Board certified neurosurgeon",
    "Founder, Sydra",
    "",
    "Sydra, 244 Westchester Ave, Ste 209, West Harrison, NY 10604",
  ].join("\n");
}
