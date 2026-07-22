import { Resend } from "resend";

import { getLeadFromEmail, getLeadInboxRecipients } from "@/lib/email/inbox-recipients";
import {
  CONTACT_INTENT_LABELS,
  type ContactRequest,
} from "@/lib/schemas/contact-request";

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
  const message = data.message?.trim() || "(none)";
  const recipients = getLeadInboxRecipients();

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
    from: getLeadFromEmail(),
    to: recipients,
    replyTo: data.email,
    subject: `[SYDRA CONTACT] ${intentLabel} · ${data.practiceName}`,
    text,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const { error: confirmError } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: [data.email],
    subject: "We received your message, Sydra",
    text: [
      data.name.trim() ? `Hi ${data.name.trim()},` : "Hi,",
      "",
      "Thank you for contacting Kronos Health about Sydra. We received your message and will reply within one business day.",
      "",
      "Kronos Health",
      "244 Westchester Ave, Ste 209, West Harrison, NY 10604",
    ].join("\n"),
  });
  if (confirmError) {
    console.error("Contact auto reply failed:", confirmError.message);
  }

  return { ok: true, id: result?.id };
}
