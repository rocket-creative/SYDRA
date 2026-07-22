import { Resend } from "resend";

import { getFounderFromEmail, getLeadFromEmail, getLeadInboxRecipients } from "@/lib/email/inbox-recipients";
import { DISPUTES_LABELS } from "@/lib/schemas/demo-request";
import {
  LANDING_PRODUCT_LABELS,
  LANDING_ROLE_LABELS,
  type PostcardLead,
  type PostcardLeadRequest,
  type PostcardPartialLead,
} from "@/lib/schemas/postcard-lead";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatOptional(value: string | number | null | undefined): string {
  if (typeof value === "number") return String(value);
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "n/a";
}

function routeState(data: PostcardLeadRequest): string {
  return formatOptional(data.route_state || data.state_tracking);
}

function calculatorBlock(data: PostcardLeadRequest): string[] {
  if (
    data.calculator_annual_estimate == null &&
    data.calculator_claims_per_month == null &&
    data.calculator_avg_disputed_amount == null
  ) {
    return [];
  }
  return [
    "",
    "Calculator",
    `Claims per month: ${formatOptional(data.calculator_claims_per_month)}`,
    `Average disputed amount: ${formatOptional(data.calculator_avg_disputed_amount)}`,
    `Annual estimate: ${formatOptional(data.calculator_annual_estimate)}`,
  ];
}

function buildPartialPlainBody(data: PostcardPartialLead): string {
  return [
    "Type: Postcard landing partial lead",
    "",
    "Qualifiers",
    `Email: ${data.email}`,
    `State: ${data.state}`,
    `Monthly OON volume: ${DISPUTES_LABELS[data.disputesPerMonth]}`,
    "",
    "Attribution",
    `Route state: ${routeState(data)}`,
    `Route code: ${formatOptional(data.route_code)}`,
    `UTM source: ${formatOptional(data.utm_source)}`,
    `UTM medium: ${formatOptional(data.utm_medium)}`,
    `UTM campaign: ${formatOptional(data.utm_campaign)}`,
    `UTM content: ${formatOptional(data.utm_content)}`,
    `Landed at: ${formatOptional(data.landed_at)}`,
    ...calculatorBlock(data),
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}

function buildFullPlainBody(data: PostcardLead): string {
  return [
    "Type: Postcard landing lead",
    data.partialUpgraded ? "Note: Partial lead upgraded to full in the same session." : "",
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
    `Route state: ${routeState(data)}`,
    `Route code: ${formatOptional(data.route_code)}`,
    `UTM source: ${formatOptional(data.utm_source)}`,
    `UTM medium: ${formatOptional(data.utm_medium)}`,
    `UTM campaign: ${formatOptional(data.utm_campaign)}`,
    `UTM content: ${formatOptional(data.utm_content)}`,
    `Landed at: ${formatOptional(data.landed_at)}`,
    ...calculatorBlock(data),
    "",
    `Submitted: ${new Date().toISOString()}`,
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}

function buildPartialHtmlBody(data: PostcardPartialLead): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong>[SYDRA POSTCARD]</strong> Partial lead</p>
<table style="border-collapse:collapse;width:100%">${row("Email", data.email)}${row("State", data.state)}${row("Monthly OON volume", DISPUTES_LABELS[data.disputesPerMonth])}${row("Route state", routeState(data))}${row("Route code", formatOptional(data.route_code))}${row("UTM source", formatOptional(data.utm_source))}${row("UTM medium", formatOptional(data.utm_medium))}${row("UTM campaign", formatOptional(data.utm_campaign))}${row("UTM content", formatOptional(data.utm_content))}${row("Landed at", formatOptional(data.landed_at))}${row("Calculator claims/mo", formatOptional(data.calculator_claims_per_month))}${row("Calculator avg amount", formatOptional(data.calculator_avg_disputed_amount))}${row("Calculator annual estimate", formatOptional(data.calculator_annual_estimate))}</table>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}.</p>
</body></html>`;
}

function buildFullHtmlBody(data: PostcardLead): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  const upgrade = data.partialUpgraded
    ? `<p style="margin:0 0 12px;font-size:13px;color:#64748b">Partial lead upgraded to full in the same session.</p>`
    : "";

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong>[SYDRA POSTCARD]</strong> New landing page lead · ${escapeHtml(data.practiceName)}</p>
${upgrade}
<table style="border-collapse:collapse;width:100%">${row("Practice", data.practiceName)}${row("Name", data.name)}${row("Role", LANDING_ROLE_LABELS[data.role])}${row("Email", data.email)}${row("Phone", data.phone)}${row("State", data.state)}${row("Monthly OON volume", DISPUTES_LABELS[data.disputesPerMonth])}${row("Product interest", LANDING_PRODUCT_LABELS[data.productInterest])}${row("Route state", routeState(data))}${row("Route code", formatOptional(data.route_code))}${row("UTM source", formatOptional(data.utm_source))}${row("UTM medium", formatOptional(data.utm_medium))}${row("UTM campaign", formatOptional(data.utm_campaign))}${row("UTM content", formatOptional(data.utm_content))}${row("Landed at", formatOptional(data.landed_at))}${row("Calculator claims/mo", formatOptional(data.calculator_claims_per_month))}${row("Calculator avg amount", formatOptional(data.calculator_avg_disputed_amount))}${row("Calculator annual estimate", formatOptional(data.calculator_annual_estimate))}</table>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}.</p>
</body></html>`;
}

function firstNameFrom(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part && part.length > 0 ? part : "there";
}

function buildAutoReplyPlain(name: string): string {
  const first = firstNameFrom(name);
  return [
    `Hi ${first},`,
    "",
    "Thanks for booking a demo. I built Sydra because I file these claims myself and I got tired of watching surgical practices write off money the No Surprises Act says they can recover.",
    "",
    "One thing to have ready for the call: a single denied or underpaid out of network EOB. We will run it live. If it qualifies, you will see the dollar figure on that claim before the call ends. If it does not, I will tell you straight and you have lost five minutes.",
    "",
    "The demo is free. No contract, no setup fee, nothing installs in your EMR, and we never take a percentage of your recovery.",
    "",
    "Talk soon,",
    "Dr. John Abrahams, MD",
    "Board certified neurosurgeon",
    "Founder, Kronos Health",
    "",
    "Kronos Health, 244 Westchester Ave, Ste 209, West Harrison, NY 10604",
  ].join("\n");
}

export type SendPostcardLeadResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string };

export function postcardLeadSubject(data: PostcardLeadRequest): string {
  if (data.leadKind === "partial") {
    return "[SYDRA POSTCARD] Partial lead";
  }
  return "[SYDRA POSTCARD] New landing page lead";
}

export async function sendPostcardLeadEmail(
  data: PostcardLeadRequest,
): Promise<SendPostcardLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const subject = postcardLeadSubject(data);
  const isPartial = data.leadKind === "partial";
  const text = isPartial
    ? buildPartialPlainBody(data)
    : buildFullPlainBody({ ...data, leadKind: "full" });
  const html = isPartial
    ? buildPartialHtmlBody(data)
    : buildFullHtmlBody({ ...data, leadKind: "full" });

  const { data: result, error } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: getLeadInboxRecipients(),
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  if (!isPartial) {
    const { error: confirmError } = await resend.emails.send({
      from: getFounderFromEmail(),
      to: [data.email],
      subject: "Your Sydra demo, and the one thing to have ready",
      text: buildAutoReplyPlain(data.name),
    });
    if (confirmError) {
      console.error("Postcard auto reply failed:", confirmError.message);
    }
  }

  return { ok: true, id: result?.id };
}

export function postcardLeadToFallbackFields(
  data: PostcardLeadRequest,
): Record<string, string | number | boolean | null | undefined> {
  if (data.leadKind === "partial") {
    return {
      email: data.email,
      state: data.state,
      disputesPerMonth: data.disputesPerMonth,
      route_state: routeState(data),
      route_code: data.route_code,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      calculator_claims_per_month: data.calculator_claims_per_month,
      calculator_avg_disputed_amount: data.calculator_avg_disputed_amount,
      calculator_annual_estimate: data.calculator_annual_estimate,
    };
  }
  return {
    practiceName: data.practiceName,
    name: data.name,
    role: data.role,
    email: data.email,
    phone: data.phone,
    state: data.state,
    disputesPerMonth: data.disputesPerMonth,
    productInterest: data.productInterest,
    partialUpgraded: data.partialUpgraded,
    route_state: routeState(data),
    route_code: data.route_code,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
    calculator_claims_per_month: data.calculator_claims_per_month,
    calculator_avg_disputed_amount: data.calculator_avg_disputed_amount,
    calculator_annual_estimate: data.calculator_annual_estimate,
  };
}
