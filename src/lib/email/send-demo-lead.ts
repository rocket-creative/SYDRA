import { Resend } from "resend";

import {
  BEST_TIME_LABELS,
  DISPUTES_LABELS,
  ROLE_LABELS,
  SPECIALTY_LABELS,
  TIMELINE_LABELS,
  TIER_LABELS,
  type DemoRequest,
} from "@/lib/schemas/demo-request";
import type { LeadScoreResult } from "@/lib/leads/score-demo-lead";

const DEFAULT_INBOX = "demo@sydrahealth.com";
const DEFAULT_FROM = "notifications@sydrahealth.com";

function getInboxEmail(): string {
  const raw = process.env.LEADS_INBOX_EMAIL?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_INBOX;
}

function getFromEmail(): string {
  const raw = process.env.LEADS_FROM_EMAIL?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_FROM;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatOptional(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "—";
}

function buildPlainBody(data: DemoRequest, score: LeadScoreResult): string {
  const lines = [
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
    `Role: ${ROLE_LABELS[data.role]}`,
    `Timeline: ${TIMELINE_LABELS[data.timeline]}`,
    `Tier interest: ${data.tierInterest ? TIER_LABELS[data.tierInterest] : "—"}`,
    "",
    "Score breakdown",
    ...score.breakdown.map((line) => `  ${line}`),
    "",
    "Attribution",
    `UTM source: ${formatOptional(data.utmSource)}`,
    `UTM campaign: ${formatOptional(data.utmCampaign)}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
    "",
    "Qualified leads are manually forwarded to the clinical team after human screening.",
  ];
  return lines.join("\n");
}

function buildHtmlBody(data: DemoRequest, score: LeadScoreResult): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  const priorityColor =
    score.priority === "HIGH"
      ? "#059669"
      : score.priority === "MEDIUM"
        ? "#D97706"
        : "#64748B";

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong style="color:${priorityColor}">[${score.priority}]</strong> Demo request — ${escapeHtml(score.subjectSummary)}</p>
<table style="border-collapse:collapse;width:100%">${row("Name", data.name)}${row("Email", data.email)}${row("Phone", formatOptional(data.phone))}${row("Best time to reach", BEST_TIME_LABELS[data.bestTimeToReach])}${row("Practice", data.practiceName)}${row("Specialty", SPECIALTY_LABELS[data.specialty])}${row("State", data.state)}${row("Disputes / month", DISPUTES_LABELS[data.disputesPerMonth])}${row("Role", ROLE_LABELS[data.role])}${row("Timeline", TIMELINE_LABELS[data.timeline])}${row("Tier interest", data.tierInterest ? TIER_LABELS[data.tierInterest] : "—")}${row("UTM source", formatOptional(data.utmSource))}${row("UTM campaign", formatOptional(data.utmCampaign))}</table>
<p style="margin:16px 0 8px;font-size:13px;color:#64748b"><strong>Score:</strong> ${score.score} points</p>
<ul style="margin:0 0 16px;padding-left:20px;font-size:13px;color:#64748b">${score.breakdown.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}. Screen before forwarding to clinical team.</p>
</body></html>`;
}

export type SendDemoLeadResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string };

export async function sendDemoLeadEmail(
  data: DemoRequest,
  score: LeadScoreResult,
): Promise<SendDemoLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const subject = `[SYDRA ${score.priority}] Demo request — ${score.subjectSummary}`;

  const { data: result, error } = await resend.emails.send({
    from: getFromEmail(),
    to: [getInboxEmail()],
    replyTo: data.email,
    subject,
    text: buildPlainBody(data, score),
    html: buildHtmlBody(data, score),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, id: result?.id };
}
