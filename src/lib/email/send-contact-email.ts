import { Resend } from "resend";

import { SALES_EMAIL_FALLBACK } from "@/lib/contact";
import {
  CONTACT_INTENT_LABELS,
  type ContactRequest,
} from "@/lib/schemas/contact-request";

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

export type SendContactResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string };

export async function sendContactEmail(data: ContactRequest): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const intentLabel = CONTACT_INTENT_LABELS[data.intent];
  const message = data.message?.trim() || "—";

  const text = [
    "Contact form submission",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Practice: ${data.practiceName}`,
    `Intent: ${intentLabel}`,
    "",
    `Message: ${message}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const { data: result, error } = await resend.emails.send({
    from: getFromEmail(),
    to: [getInboxEmail()],
    replyTo: data.email,
    subject: `[SYDRA CONTACT] ${intentLabel} — ${data.practiceName}`,
    text,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  await resend.emails.send({
    from: getFromEmail(),
    to: [data.email],
    subject: "We received your message — Sydra",
    text: [
      data.name.trim() ? `Hi ${data.name.trim()},` : "Hi,",
      "",
      "Thank you for contacting Kronos Health about Sydra. We received your message and will reply within one business day.",
      "",
      "Kronos Health",
    ].join("\n"),
  });

  return { ok: true, id: result?.id };
}
