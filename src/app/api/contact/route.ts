import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/email/send-contact-email";
import { contactRequestSchema } from "@/lib/schemas/contact-request";

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

  const sendResult = await sendContactEmail(parsed.data);
  if (!sendResult.ok) {
    console.error("Contact email failed:", sendResult.error);
    return NextResponse.json(
      { error: "Unable to submit request. Please try again or contact us by email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
