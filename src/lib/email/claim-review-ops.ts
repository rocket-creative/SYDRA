/**
 * Claim-review fulfillment copy.
 *
 * Funnel: form → auto-reply (sample + EOB ask) → they send a claim → writeup
 * → delivery email (reply with a time in the named windows). No booking link.
 *
 * SLA: personal follow-up within one business day of the form. Claim review
 * within one business day of the EOB (or the five details).
 * If an unredacted EOB arrives, extract what is needed, delete the original,
 * and say so in the reply. Ineligible: say no plainly and still offer the call.
 * Nudge: day 3, one send only.
 * Log specialty, state, payer, CPT, estimate, and later the award.
 */
import { CASE_REVIEW_SAMPLE_PATH } from "@/lib/case-review";
import { FOUNDER_MARKETING_BYLINE } from "@/lib/content/founder-lines";
import { getContactPhoneDisplay } from "@/lib/contact";
import {
  claimReviewDeliverySchedulingBlock,
  claimReviewWriteupSchedulingBlock,
} from "@/lib/email/demo-windows";
import { siteUrl } from "@/lib/site";

const DEFAULT_PHONE = "(914) 705 6830";
const FOUNDER_NAME = FOUNDER_MARKETING_BYLINE;

export const CLAIM_REVIEW_AUTO_REPLY_SUBJECT =
  "Your Sydra claim review — a sample, and what to send";

function phoneLine(): string {
  return getContactPhoneDisplay() ?? DEFAULT_PHONE;
}

function sampleUrl(): string {
  return `${siteUrl()}${CASE_REVIEW_SAMPLE_PATH}`;
}

/**
 * Immediate auto-reply after form submit. Sample now, EOB by reply, personal
 * follow-up promised. No booking link.
 */
export function buildClaimReviewAutoReplyPlain(practiceName: string): string {
  const practice = practiceName.trim();
  const thanks = practice
    ? `Thanks for asking for a claim review for ${practice}.`
    : "Thanks for asking for a claim review.";

  return [
    "Hi,",
    "",
    thanks,
    "",
    "I built Sydra because I file these claims myself and I got tired of watching surgical practices write off money the No Surprises Act says they can recover.",
    "",
    "Here is a sample review so you can see exactly what you get back:",
    sampleUrl(),
    "Eligibility, the dollar range, the filing deadline, and what we would submit.",
    "",
    "To have me run it on one of your own claims, reply to this email with one denied or underpaid out of network EOB attached. You will have the answer within one business day. If it qualifies, you will see the dollar figure on that claim. If it does not, I will tell you straight.",
    "",
    "Before you send it, black out three things: patient name, date of birth, and member ID. I do not need any of them. What I need is the CPT codes, the billed amount, the allowed amount, the payer, and the state. If you would rather not send a document at all, reply with those five details and I will work from that.",
    "",
    "One thing worth knowing: on June 11, 2026 the federal IDR administrative fee dropped from $115 to $15 per party. Claims in the $1,500 to $5,000 range that were not worth disputing a few months ago are now worth filing.",
    "",
    "You will hear from me or my team within one business day. It will come from (914) 705 6830, so you know it is us.",
    "",
    "Talk soon,",
    "",
    FOUNDER_NAME,
    "Board certified neurosurgeon",
    "Founder, Sydra",
    "",
    "Sydra, 244 Westchester Ave, Ste 209, West Harrison, NY 10604",
  ].join("\n");
}

export function claimReviewDeliverySubject(practiceName: string, estimate: string): string {
  const practice = practiceName.trim() || "your practice";
  return `Your claim review — ${practice} — est. ${estimate} recoverable`;
}

/**
 * Sent after the review is done, attached to their number. They reply with a
 * time in the named windows. No booking URL.
 */
export function buildClaimReviewDeliveryPlain(input: {
  firstName: string;
  estimate: string;
  highlight: string;
  eligible: boolean;
}): string {
  const first = input.firstName.trim() || "there";
  const short = input.eligible
    ? `Your review is attached. Short version: the claim is eligible, and we estimate ${input.estimate} recoverable above what the plan paid.`
    : `Your review is attached. Short version: this claim is not eligible. We still estimate the picture below, and the call is open if you have others.`;

  return [
    `Hi ${first},`,
    "",
    short,
    "",
    input.highlight.trim(),
    "",
    "Two ways to go from here:",
    "",
    "See us prepare this exact submission. 15 minutes on Zoom, using your claim and your CPT codes — not a canned demo. You will see the actual output and get a price. Nothing to sign on the call.",
    "",
    claimReviewDeliverySchedulingBlock(),
    "",
    "Or I just file it. Reply and I will take it from here. You keep the recovery.",
    "",
    "Happy to do neither, too — the review is yours either way.",
    "",
    FOUNDER_NAME,
    phoneLine(),
  ].join("\n");
}

export const CLAIM_REVIEW_NUDGE_SUBJECT = "Still happy to run that claim";

/** Day 3, if no EOB arrives. One send only. */
export function buildClaimReviewNudgePlain(): string {
  return [
    "Hi,",
    "",
    "You asked for a claim review a few days ago and I haven't seen a claim come through — no problem at all, I know how the week goes.",
    "",
    "If you want the review, reply with one denied out-of-network EOB (patient name, DOB and member ID blacked out) and I'll have it back to you within a business day.",
    "",
    "If it's easier, just send me these five things in a reply and I'll work from that:",
    "",
    "- CPT code(s)",
    "- Billed amount",
    "- Allowed amount",
    "- Payer",
    "- State",
    "",
    "Either way, no obligation.",
    "",
    `— ${FOUNDER_NAME}`,
  ].join("\n");
}

const FEES_PAGE = "https://www.sydrahealth.com/resources/idr-eligibility-deadlines-fees";

/** Fill-in writeup sent as the one-page deliverable. No booking URL. */
export function buildClaimReviewWriteupPlain(input: {
  practiceName: string;
  date: string;
  ref: string;
  reviewer: string;
  verdict: "Eligible for federal IDR" | "Not eligible" | "Eligible, one fact needed";
  verdictSentence: string;
  why: [string, string, string];
  billed: string;
  allowed: string;
  paid: string;
  qpa: string;
  range: string;
  estimate: string;
  moneyNote: string;
  dos: string;
  openNegotiationBy: string;
  idrDeadline: string;
  daysLeft: string;
  clockNote: string;
  offerAmount: string;
  fileNote: string;
  idreFeeRange: string;
}): string {
  const practice = input.practiceName.trim() || "your practice";
  return [
    `Claim Review — ${practice}`,
    "",
    `Prepared ${input.date} · Reference ${input.ref} · Prepared by ${input.reviewer}, Sydra`,
    "",
    "Verdict",
    input.verdict,
    input.verdictSentence,
    "",
    "Why",
    `- ${input.why[0]}`,
    `- ${input.why[1]}`,
    `- ${input.why[2]}`,
    "",
    "The money",
    `Billed: ${input.billed}`,
    `Plan allowed: ${input.allowed}`,
    `Plan paid: ${input.paid}`,
    `Payer's stated QPA: ${input.qpa}`,
    `Comparable resolved disputes: ${input.range}`,
    `Estimated recovery on this claim: ${input.estimate}`,
    input.moneyNote,
    "",
    "The clock",
    `Date of service: ${input.dos}`,
    "Open negotiation window: 30 business days, initiated through the federal IDR portal",
    `Open negotiation must start by: ${input.openNegotiationBy}`,
    `Estimated IDR filing deadline: ${input.idrDeadline}`,
    input.daysLeft,
    input.clockNote,
    "Deadlines are strict and there is no cure for missing one. Confirm current windows against the eligibility, deadlines and fees page before filing:",
    FEES_PAGE,
    "",
    "What we'd file",
    `Offer: ${input.offerAmount}`,
    input.fileNote,
    "",
    "What it costs to pursue",
    "- Administrative fee: $15 per party, per dispute (dropped from $115 on June 11, 2026)",
    `- Certified IDRE fee: ${input.idreFeeRange}. The losing party pays it.`,
    "- Batching: up to 50 qualified items per dispute where codes are identical or comparable, which spreads the fee across claims",
    `88% of properly filed federal IDR disputes get paid. Against a ${input.estimate} claim, the downside is small and capped.`,
    "",
    "What happens next",
    "See us prepare this exact submission. 15 minutes on Zoom, using this claim and your CPT codes. You will see the real output and get a price. Nothing to sign on the call.",
    "",
    claimReviewWriteupSchedulingBlock(),
    "",
    "Or we file it for you. We prepare and submit, you keep the recovery. Materially less than a typical 20% attorney contingency. Reply to this email.",
    "",
    "No pressure either way. If this claim isn't worth pursuing, this document says so.",
    "",
    "Georgetown University Center on Health Insurance Reforms, March 2026.",
    "Estimates are based on the information provided and publicly reported IDR outcomes for comparable services. Not a guarantee of recovery, and not legal advice.",
  ].join("\n");
}
