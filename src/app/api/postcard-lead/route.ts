import { NextResponse } from "next/server";

import { sendCrmWebhook } from "@/lib/crm/webhook";
import {
  postcardLeadSubject,
  postcardLeadToFallbackFields,
  sendPostcardLeadEmail,
} from "@/lib/email/send-postcard-lead";
import { checkRateLimit } from "@/lib/landing/rate-limit";
import { logLeadFallback } from "@/lib/leads/fallback-log";
import {
  normalizePostcardLead,
  postcardLeadRequestSchema,
} from "@/lib/schemas/postcard-lead";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isHoneypotFilled(website: string | undefined): boolean {
  const trimmed = website?.trim();
  return Boolean(trimmed && trimmed.length > 0);
}

export async function POST(request: Request) {
  const rate = checkRateLimit(`postcard-lead:${clientIp(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = postcardLeadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead = normalizePostcardLead(parsed.data);

  if (isHoneypotFilled(lead.website)) {
    return NextResponse.json({ ok: true });
  }

  const subject = postcardLeadSubject(lead);
  const submittedAt = new Date().toISOString();

  await logLeadFallback({
    kind: lead.leadKind === "partial" ? "partial" : "full",
    source: "postcard",
    subject,
    fields: postcardLeadToFallbackFields(lead),
    submittedAt,
  });

  const emailResult = await sendPostcardLeadEmail(lead);
  if (!emailResult.ok) {
    console.error("Postcard lead email failed:", emailResult.error, {
      subject,
      payload: postcardLeadToFallbackFields(lead),
    });
    // Lead already logged via fallback. Client surfaces emailDelivered:false
    // so the visitor is not silently advanced on a broken mailbox path.
    return NextResponse.json({ ok: true, emailDelivered: false });
  }

  if (lead.leadKind === "full") {
    const crmResult = await sendCrmWebhook(lead);
    if (!crmResult.ok) {
      console.error("CRM webhook failed:", crmResult.error, {
        subject,
        email: lead.email,
      });
      return NextResponse.json({
        ok: true,
        emailDelivered: true,
        crmDelivered: false,
      });
    }
    return NextResponse.json({
      ok: true,
      emailDelivered: true,
      crmDelivered: true,
    });
  }

  return NextResponse.json({ ok: true, emailDelivered: true });
}
