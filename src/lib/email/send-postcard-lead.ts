import { Resend } from "resend";

import { SALES_EMAIL_FALLBACK } from "@/lib/contact";
import { DISPUTES_LABELS } from "@/lib/schemas/demo-request";
import {
  LANDING_PRODUCT_LABELS,
  LANDING_ROLE_LABELS,
  type PostcardLead,
} from "@/lib/schemas/postcard-lead";

const DEFAULT_INBOX = SALES_EMAIL_FALLBACK;
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

function buildPlainBody(data: PostcardLead): string {
  return [
    "Type: Postcard landing lead",
    "",
    "Contact",
    `Practice: ${data.practiceName}`,
    `Name: ${data.name}`,
    `Role: ${LANDING_ROLE_LABELS[data.role]}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `State: ${data.state}`,
    `Monthly OON volume: ${DISPUTES_LABELS[data.disputesPerMonth]}`,
    `Product interest: ${LANDING_PRODUCT_LABELS[data.productInterest]}`,
    "",
    "Attribution",
    `Route state: ${formatOptional(data.state_tracking)}`,
    `UTM source: ${formatOptional(data.utm_source)}`,
    `UTM medium: ${formatOptional(data.utm_medium)}`,
    `UTM content: ${formatOptional(data.utm_content)}`,
    `Landed at: ${formatOptional(data.landed_at)}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}

function buildHtmlBody(data: PostcardLead): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong>[SYDRA POSTCARD]</strong> New landing page lead — ${escapeHtml(data.practiceName)}</p>
<table style="border-collapse:collapse;width:100%">${row("Practice", data.practiceName)}${row("Name", data.name)}${row("Role", LANDING_ROLE_LABELS[data.role])}${row("Email", data.email)}${row("Phone", data.phone)}${row("State", data.state)}${row("Monthly OON volume", DISPUTES_LABELS[data.disputesPerMonth])}${row("Product interest", LANDING_PRODUCT_LABELS[data.productInterest])}${row("Route state", formatOptional(data.state_tracking))}${row("UTM source", formatOptional(data.utm_source))}${row("UTM medium", formatOptional(data.utm_medium))}${row("UTM content", formatOptional(data.utm_content))}${row("Landed at", formatOptional(data.landed_at))}</table>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}.</p>
</body></html>`;
}

export type SendPostcardLeadResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string };

export async function sendPostcardLeadEmail(data: PostcardLead): Promise<SendPostcardLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const subject = `[SYDRA POSTCARD] ${data.practiceName} — ${LANDING_PRODUCT_LABELS[data.productInterest]}`;

  const { data: result, error } = await resend.emails.send({
    from: getFromEmail(),
    to: [getInboxEmail()],
    replyTo: data.email,
    subject,
    text: buildPlainBody(data),
    html: buildHtmlBody(data),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, id: result?.id };
}
