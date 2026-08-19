import { Resend } from "resend";

import { getSalesEmail } from "@/lib/contact";
import {
  buildFounderAutoReplyPlain,
  leadHasPhone,
} from "@/lib/email/founder-auto-reply";
import { nextStepOptionsPlain } from "@/lib/email/lead-thank-you";
import {
  getFounderFromEmail,
  getLeadFromEmail,
  leadCopyBcc,
  leadTeamNotifyAddresses,
} from "@/lib/email/inbox-recipients";
import {
  BEST_TIME_LABELS,
  DISPUTES_LABELS,
  IDR_APPROACH_LABELS,
  ROLE_LABELS,
  SPECIALTY_LABELS,
  TIMELINE_LABELS,
  TIER_LABELS,
  type DemoRequest,
} from "@/lib/schemas/demo-request";
import type { LeadScoreResult } from "@/lib/leads/score-demo-lead";

export type LeadRequestType = "demo" | "security";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatOptional(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "n/a";
}

function requestLabel(requestType: LeadRequestType): string {
  return requestType === "security" ? "Security / compliance request" : "Demo request";
}

function buildPlainBody(
  data: DemoRequest,
  score: LeadScoreResult,
  requestType: LeadRequestType,
): string {
  const lines = [
    `Type: ${requestLabel(requestType)}`,
    `Priority: ${score.priority} (${score.score} points)`,
    "",
    "Contact",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${formatOptional(data.phone)}`,
    `Practice: ${data.practiceName}`,
    `Best time to reach: ${BEST_TIME_LABELS[data.bestTimeToReach]}`,
    "",
    "Qualification",
    `Specialty: ${SPECIALTY_LABELS[data.specialty]}`,
    `State: ${data.state}`,
    `OON / IDR disputes per month: ${DISPUTES_LABELS[data.disputesPerMonth]}`,
    `Current IDR approach: ${IDR_APPROACH_LABELS[data.idrApproach]}`,
    `Role: ${ROLE_LABELS[data.role]}`,
    `Timeline: ${TIMELINE_LABELS[data.timeline]}`,
    `Tier interest: ${data.tierInterest ? TIER_LABELS[data.tierInterest] : "n/a"}`,
    "",
    "Notes",
    `Message: ${formatOptional(data.message)}`,
    `EOB file: ${formatOptional(data.eobFileName)}`,
    "",
    "Score breakdown",
    ...score.breakdown.map((line) => `  ${line}`),
    "",
    "Attribution",
    `Route state: ${formatOptional(data.routeState)}`,
    `Route code: ${formatOptional(data.routeCode)}`,
    `UTM source: ${formatOptional(data.utmSource)}`,
    `UTM medium: ${formatOptional(data.utmMedium)}`,
    `UTM campaign: ${formatOptional(data.utmCampaign)}`,
    `UTM content: ${formatOptional(data.utmContent)}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ];
  return lines.join("\n");
}

function buildHtmlBody(
  data: DemoRequest,
  score: LeadScoreResult,
  requestType: LeadRequestType,
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  const priorityColor =
    score.priority === "HIGH"
      ? "#059669"
      : score.priority === "MEDIUM"
        ? "#D97706"
        : "#64748B";

  const typePrefix = requestType === "security" ? "SECURITY" : score.priority;

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong style="color:${priorityColor}">[SYDRA ${typePrefix}]</strong> ${escapeHtml(requestLabel(requestType))} · ${escapeHtml(score.subjectSummary)}</p>
<table style="border-collapse:collapse;width:100%">${row("Name", data.name)}${row("Email", data.email)}${row("Phone", formatOptional(data.phone))}${row("Best time to reach", BEST_TIME_LABELS[data.bestTimeToReach])}${row("Practice", data.practiceName)}${row("Specialty", SPECIALTY_LABELS[data.specialty])}${row("State", data.state)}${row("Disputes / month", DISPUTES_LABELS[data.disputesPerMonth])}${row("IDR approach", IDR_APPROACH_LABELS[data.idrApproach])}${row("Role", ROLE_LABELS[data.role])}${row("Timeline", TIMELINE_LABELS[data.timeline])}${row("Tier interest", data.tierInterest ? TIER_LABELS[data.tierInterest] : "n/a")}${row("Message", formatOptional(data.message))}${row("EOB file", formatOptional(data.eobFileName))}${row("Route state", formatOptional(data.routeState))}${row("Route code", formatOptional(data.routeCode))}${row("UTM source", formatOptional(data.utmSource))}${row("UTM medium", formatOptional(data.utmMedium))}${row("UTM campaign", formatOptional(data.utmCampaign))}${row("UTM content", formatOptional(data.utmContent))}</table>
<p style="margin:16px 0 8px;font-size:13px;color:#64748b"><strong>Score:</strong> ${score.score} points</p>
<ul style="margin:0 0 16px;padding-left:20px;font-size:13px;color:#64748b">${score.breakdown.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}.</p>
</body></html>`;
}

function buildSecurityConfirmPlain(name: string): string {
  const greeting = name.trim() ? `Hi ${name.trim()},` : "Hi,";
  return [
    greeting,
    "",
    "Thank you for contacting Sydra about Sydra. We received your security summary and demo request.",
    "",
    "A member of our sales team will reply within one business day at the email address you provided.",
    "",
    "If interested, would you like to:",
    "",
    ...nextStepOptionsPlain(),
    "",
    "Sydra",
    "Sydra · NSA IDR software",
  ].join("\n");
}

export type SendDemoLeadResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string };

export function demoLeadFallbackFields(
  data: DemoRequest,
  requestType: LeadRequestType,
): Record<string, string | number | boolean | null | undefined> {
  return {
    requestType,
    name: data.name,
    email: data.email,
    phone: data.phone,
    practiceName: data.practiceName,
    state: data.state,
    specialty: data.specialty,
    routeState: data.routeState,
    routeCode: data.routeCode,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
  };
}

export async function sendDemoLeadEmail(
  data: DemoRequest,
  score: LeadScoreResult,
  requestType: LeadRequestType = "demo",
): Promise<SendDemoLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const subjectPrefix = requestType === "security" ? "SYDRA SECURITY" : `SYDRA ${score.priority}`;
  const subject = `[${subjectPrefix}] ${requestLabel(requestType)} · ${score.subjectSummary}`;

  const { data: result, error } = await resend.emails.send({
    from: getLeadFromEmail(),
    ...leadTeamNotifyAddresses(),
    replyTo: data.email,
    subject,
    text: buildPlainBody(data, score, requestType),
    html: buildHtmlBody(data, score, requestType),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  if (requestType === "demo") {
    const { error: confirmError } = await resend.emails.send({
      from: getFounderFromEmail(),
      to: [data.email],
      ...leadCopyBcc(),
      replyTo: getSalesEmail(),
      subject: "Your Sydra demo, and the one thing to have ready",
      text: buildFounderAutoReplyPlain(data.name, {
        hasPhone: leadHasPhone(data.phone),
      }),
    });
    if (confirmError) {
      console.error("Submitter confirmation email failed:", confirmError.message);
    }
  } else {
    const { error: confirmError } = await resend.emails.send({
      from: getLeadFromEmail(),
      to: [data.email],
      ...leadCopyBcc(),
      replyTo: getSalesEmail(),
      subject: "We received your Sydra security request",
      text: buildSecurityConfirmPlain(data.name),
    });
    if (confirmError) {
      console.error("Submitter confirmation email failed:", confirmError.message);
    }
  }

  return { ok: true, id: result?.id };
}
