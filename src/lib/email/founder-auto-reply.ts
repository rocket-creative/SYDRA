import { demoSchedulingBlock } from "@/lib/email/demo-windows";
import { FOUNDER_MARKETING_BYLINE } from "@/lib/content/founder-lines";

function firstNameFrom(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part && part.length > 0 ? part : "there";
}

/** True when the lead gave a usable phone (not empty, not an email dump). */
export function leadHasPhone(phone: string | null | undefined): boolean {
  const trimmed = phone?.trim() ?? "";
  return trimmed.length > 0 && !trimmed.includes("@");
}

/**
 * Founder confirmation after a demo request. Scheduling is the branded
 * page at /schedule, with the published number as the call option.
 */
export function buildFounderAutoReplyPlain(
  name: string,
  options: { hasPhone: boolean },
): string {
  void options.hasPhone;
  const first = firstNameFrom(name);

  return [
    `Hi ${first},`,
    "",
    "Thanks for asking for a demo. I built Sydra because I file these claims myself and I got tired of watching surgical practices write off money the No Surprises Act says they can recover.",
    "",
    "One thing to have ready for the call: a single denied or underpaid out of network EOB. We will run it live. If it qualifies, you will see the dollar figure on that claim before the call ends. If it does not, I will tell you straight and you have lost fifteen minutes.",
    "",
    "The demo is free. No contract, no setup fee, nothing installs in your EMR, and we never take a percentage of your recovery.",
    "",
    demoSchedulingBlock(),
    "",
    "Talk soon,",
    FOUNDER_MARKETING_BYLINE,
    "",
    "Sydra, 244 Westchester Ave, Ste 209, West Harrison, NY 10604",
  ].join("\n");
}
