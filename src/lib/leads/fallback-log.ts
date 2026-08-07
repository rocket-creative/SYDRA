/**
 * Redundant lead capture. Writes before email send so a mailbox failure
 * cannot silently hide a lead. Prefers Supabase landing_leads, then optional
 * Slack webhook, then structured console.error.
 */

import { getSupabaseService } from "@/lib/leads/supabase-admin";

export type LeadFallbackPayload = {
  kind: "partial" | "full";
  source: "postcard" | "demo" | "contact" | "privacy_request";
  subject: string;
  fields: Record<string, string | number | boolean | null | undefined>;
  submittedAt: string;
};

export type FallbackLogResult = { ok: true; channel: string } | { ok: false; error: string };

function fieldString(
  fields: LeadFallbackPayload["fields"],
  key: string,
): string | null {
  const value = fields[key];
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function writeSupabase(payload: LeadFallbackPayload): Promise<FallbackLogResult> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return { ok: false, error: "Supabase service role not configured" };
  }

  const marketingConsent = payload.fields.marketingConsent === true;
  const consentTextVersion = fieldString(payload.fields, "consentTextVersion");

  const { error } = await supabase.from("landing_leads").insert({
    kind: payload.kind,
    source: payload.source,
    subject: payload.subject,
    email: fieldString(payload.fields, "email"),
    state: fieldString(payload.fields, "state") || fieldString(payload.fields, "route_state"),
    fields: payload.fields,
    marketing_consent: marketingConsent,
    consent_text_version: consentTextVersion,
    submitted_at: payload.submittedAt,
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, channel: "supabase" };
}

function getSlackWebhook(): string | null {
  const raw =
    process.env.LEADS_FALLBACK_WEBHOOK_URL?.trim() ||
    process.env.SLACK_LEADS_WEBHOOK_URL?.trim();
  return raw && raw.length > 0 ? raw : null;
}

function formatSlackText(payload: LeadFallbackPayload): string {
  const lines = [
    `*${payload.subject}*`,
    `Kind: ${payload.kind} · Source: ${payload.source}`,
    `Submitted: ${payload.submittedAt}`,
    "",
    ...Object.entries(payload.fields)
      .filter(([, v]) => v !== undefined && v !== null && String(v).length > 0)
      .map(([k, v]) => `• ${k}: ${String(v)}`),
  ];
  return lines.join("\n");
}

async function postSlack(payload: LeadFallbackPayload): Promise<FallbackLogResult> {
  const url = getSlackWebhook();
  if (!url) {
    return { ok: false, error: "No fallback webhook configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: formatSlackText(payload) }),
    });
    if (!res.ok) {
      return { ok: false, error: `Slack webhook returned ${res.status}` };
    }
    return { ok: true, channel: "slack" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Slack webhook failed";
    return { ok: false, error: message };
  }
}

/**
 * Always attempts a durable side channel. On total failure, still emits a
 * structured console.error so Vercel runtime logs retain the payload.
 */
export async function logLeadFallback(payload: LeadFallbackPayload): Promise<FallbackLogResult> {
  const supabase = await writeSupabase(payload);
  if (supabase.ok) return supabase;

  const slack = await postSlack(payload);
  if (slack.ok) return slack;

  console.error("[LEADS FALLBACK LOG]", JSON.stringify(payload));
  if (supabase.error !== "Supabase service role not configured") {
    console.error("[LEADS FALLBACK] Supabase failed:", supabase.error);
  }
  if (slack.error !== "No fallback webhook configured") {
    console.error("[LEADS FALLBACK] Slack failed:", slack.error);
  }
  return { ok: true, channel: "console" };
}
