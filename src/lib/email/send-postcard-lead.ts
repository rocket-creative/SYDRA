import { Resend } from "resend";

import { getSalesEmail } from "@/lib/contact";
import {
  buildFounderAutoReplyPlain,
  leadHasPhone,
} from "@/lib/email/founder-auto-reply";
import {
  getFounderFromEmail,
  getLeadCopyRecipients,
  getLeadFromEmail,
  getLeadInboxRecipients,
} from "@/lib/email/inbox-recipients";
import {
  LEAD_THANK_YOU_SUBJECT,
  buildLeadThankYouHtml,
  buildLeadThankYouPlain,
} from "@/lib/email/lead-thank-you";
import { DISPUTES_LABELS } from "@/lib/schemas/demo-request";
import {
  LANDING_PRODUCT_LABELS,
  LANDING_ROLE_LABELS,
  LANDING_SEGMENT_LABELS,
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

function formatVolume(
  value: PostcardPartialLead["disputesPerMonth"] | PostcardLead["disputesPerMonth"] | undefined,
): string {
  if (!value) return "n/a";
  return DISPUTES_LABELS[value] ?? String(value);
}

function formatSegment(value: PostcardLead["segment"]): string {
  return LANDING_SEGMENT_LABELS[value] ?? String(value);
}

function consentLines(data: PostcardLeadRequest): string[] {
  return [
    "",
    "Consent",
    `Marketing + Customer Match: ${data.marketingConsent ? "yes" : "no"}`,
    `Consent text version: ${formatOptional(data.consentTextVersion)}`,
  ];
}

/** Only the ops copy carries attribution. The sales notification omits it. */
function attributionLines(data: PostcardLeadRequest, include: boolean): string[] {
  if (!include) return [];
  return [
    "",
    "Attribution",
    `Route state: ${routeState(data)}`,
    `Route code: ${formatOptional(data.route_code)}`,
    `UTM source: ${formatOptional(data.utm_source)}`,
    `UTM medium: ${formatOptional(data.utm_medium)}`,
    `UTM campaign: ${formatOptional(data.utm_campaign)}`,
    `UTM content: ${formatOptional(data.utm_content)}`,
    `Landed at: ${formatOptional(data.landed_at)}`,
  ];
}

function attributionRows(
  data: PostcardLeadRequest,
  include: boolean,
  row: (label: string, value: string) => string,
): string {
  if (!include) return "";
  return [
    row("Route state", routeState(data)),
    row("Route code", formatOptional(data.route_code)),
    row("UTM source", formatOptional(data.utm_source)),
    row("UTM medium", formatOptional(data.utm_medium)),
    row("UTM campaign", formatOptional(data.utm_campaign)),
    row("UTM content", formatOptional(data.utm_content)),
    row("Landed at", formatOptional(data.landed_at)),
  ].join("");
}

function buildPartialPlainBody(data: PostcardPartialLead, includeAttribution: boolean): string {
  return [
    "Type: Postcard landing partial lead",
    "",
    "Qualifiers",
    `Email: ${data.email}`,
    `State: ${formatOptional(data.state)}`,
    `Monthly OON volume: ${formatVolume(data.disputesPerMonth)}`,
    ...consentLines(data),
    ...attributionLines(data, includeAttribution),
    ...calculatorBlock(data),
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}

function buildFullPlainBody(data: PostcardLead, includeAttribution: boolean): string {
  return [
    "Type: Postcard landing lead",
    // Top of the email: which of the four paths they picked is what decides
    // how the call gets run, so it reads before the contact details.
    `Where they sit: ${formatSegment(data.segment)}`,
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
    ...consentLines(data),
    ...attributionLines(data, includeAttribution),
    ...calculatorBlock(data),
    "",
    `Submitted: ${new Date().toISOString()}`,
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}

function buildPartialHtmlBody(data: PostcardPartialLead, includeAttribution: boolean): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong>[SYDRA POSTCARD]</strong> Partial lead</p>
<table style="border-collapse:collapse;width:100%">${row("Email", data.email)}${row("State", formatOptional(data.state))}${row("Monthly OON volume", formatVolume(data.disputesPerMonth))}${row("Marketing + Customer Match", data.marketingConsent ? "yes" : "no")}${row("Consent text version", formatOptional(data.consentTextVersion))}${attributionRows(data, includeAttribution, row)}${row("Calculator claims/mo", formatOptional(data.calculator_claims_per_month))}${row("Calculator avg amount", formatOptional(data.calculator_avg_disputed_amount))}${row("Calculator annual estimate", formatOptional(data.calculator_annual_estimate))}</table>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}.</p>
</body></html>`;
}

function buildFullHtmlBody(data: PostcardLead, includeAttribution: boolean): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#64748b;font-size:14px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:14px;color:#1A2B48">${escapeHtml(value)}</td></tr>`;

  const upgrade = data.partialUpgraded
    ? `<p style="margin:0 0 12px;font-size:13px;color:#64748b">Partial lead upgraded to full in the same session.</p>`
    : "";

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1A2B48;max-width:560px">
<p style="margin:0 0 16px"><strong>[SYDRA POSTCARD]</strong> New landing page lead · ${escapeHtml(data.practiceName)}</p>
${upgrade}
<table style="border-collapse:collapse;width:100%">${row("Where they sit", formatSegment(data.segment))}${row("Practice", data.practiceName)}${row("Name", data.name)}${row("Role", LANDING_ROLE_LABELS[data.role])}${row("Email", data.email)}${row("Phone", data.phone)}${row("State", data.state)}${row("Monthly OON volume", DISPUTES_LABELS[data.disputesPerMonth])}${row("Product interest", LANDING_PRODUCT_LABELS[data.productInterest])}${row("Marketing + Customer Match", data.marketingConsent ? "yes" : "no")}${row("Consent text version", formatOptional(data.consentTextVersion))}${attributionRows(data, includeAttribution, row)}${row("Calculator claims/mo", formatOptional(data.calculator_claims_per_month))}${row("Calculator avg amount", formatOptional(data.calculator_avg_disputed_amount))}${row("Calculator annual estimate", formatOptional(data.calculator_annual_estimate))}</table>
<p style="font-size:12px;color:#94a3b8">Submitted ${escapeHtml(new Date().toISOString())}.</p>
</body></html>`;
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
    ? buildPartialPlainBody(data, false)
    : buildFullPlainBody({ ...data, leadKind: "full" }, false);
  const html = isPartial
    ? buildPartialHtmlBody(data, false)
    : buildFullHtmlBody({ ...data, leadKind: "full" }, false);
  const copyText = isPartial
    ? buildPartialPlainBody(data, true)
    : buildFullPlainBody({ ...data, leadKind: "full" }, true);
  const copyHtml = isPartial
    ? buildPartialHtmlBody(data, true)
    : buildFullHtmlBody({ ...data, leadKind: "full" }, true);

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

  const { error: copyError } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: getLeadCopyRecipients(),
    replyTo: data.email,
    subject,
    text: copyText,
    html: copyHtml,
  });
  if (copyError) {
    console.error("Postcard lead ops copy failed:", copyError.message);
  }

  if (isPartial) {
    const { error: thankYouError } = await resend.emails.send({
      from: getLeadFromEmail(),
      to: [data.email],
      replyTo: getSalesEmail(),
      subject: LEAD_THANK_YOU_SUBJECT,
      text: buildLeadThankYouPlain(),
      html: buildLeadThankYouHtml(),
    });
    if (thankYouError) {
      console.error("Postcard thank you email failed:", thankYouError.message);
    }
  }

  if (!isPartial) {
    const { error: confirmError } = await resend.emails.send({
      from: getFounderFromEmail(),
      to: [data.email],
      replyTo: getSalesEmail(),
      subject: "Your Sydra demo, and the one thing to have ready",
      text: buildFounderAutoReplyPlain(data.name, {
        hasPhone: leadHasPhone(data.phone),
      }),
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
      state: data.state || null,
      disputesPerMonth: data.disputesPerMonth || null,
      marketingConsent: data.marketingConsent,
      consentTextVersion: data.consentTextVersion,
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
    segment: data.segment,
    partialUpgraded: data.partialUpgraded,
    marketingConsent: data.marketingConsent,
    consentTextVersion: data.consentTextVersion,
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
