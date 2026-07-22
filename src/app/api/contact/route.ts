import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email/send-contact-email";
import { logLeadFallback } from "@/lib/leads/fallback-log";
import { CONTACT_INTENT_LABELS, contactRequestSchema } from "@/lib/schemas/contact-request";

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

  const parsed = contactRequestSchema.safeParse(body);
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
  const subject = `[SYDRA CONTACT] ${CONTACT_INTENT_LABELS[data.intent]} · ${data.practiceName}`;
  const submittedAt = new Date().toISOString();

  await logLeadFallback({
    kind: "full",
    source: "contact",
    subject,
    fields: {
      name: data.name,
      email: data.email,
      practiceName: data.practiceName,
      intent: data.intent,
      message: data.message ?? "",
    },
    submittedAt,
  });

  const sendResult = await sendContactEmail(data);
  if (!sendResult.ok) {
    console.error("Contact email failed:", sendResult.error, {
      email: data.email,
      practiceName: data.practiceName,
      intent: data.intent,
      name: data.name,
      message: data.message ?? "",
    });
    // Lead already logged; do not fail the visitor.
    return NextResponse.json({ ok: true, emailDelivered: false });
  }

  return NextResponse.json({ ok: true, emailDelivered: true });
}
