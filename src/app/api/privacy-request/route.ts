import { NextResponse } from "next/server";

import { sendPrivacyRequestEmail } from "@/lib/email/send-privacy-request";
import { logLeadFallback } from "@/lib/leads/fallback-log";
import {
  PRIVACY_REQUEST_LABELS,
  privacyRequestSchema,
} from "@/lib/schemas/privacy-request";

function isHoneypotFilled(website: string | undefined): boolean {
  const trimmed = website?.trim();
  return Boolean(trimmed && trimmed.length > 0);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = privacyRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (isHoneypotFilled(parsed.data.website)) {
    return NextResponse.json({ ok: true });
  }

  const data = parsed.data;
  const subject = `[SYDRA PRIVACY] ${PRIVACY_REQUEST_LABELS[data.requestType]} · ${data.email}`;
  const submittedAt = new Date().toISOString();

  await logLeadFallback({
    kind: "full",
    source: "privacy_request",
    subject,
    fields: {
      email: data.email,
      name: data.name ?? "",
      requestType: data.requestType,
      message: data.message ?? "",
      marketingConsent: false,
      consentTextVersion: "",
    },
    submittedAt,
  });

  const sendResult = await sendPrivacyRequestEmail(data);
  if (!sendResult.ok) {
    console.error("Privacy request email failed:", sendResult.error, {
      email: data.email,
      requestType: data.requestType,
    });
    return NextResponse.json({ ok: true, emailDelivered: false });
  }

  return NextResponse.json({ ok: true, emailDelivered: true });
}
