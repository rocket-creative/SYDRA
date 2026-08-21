import { Resend } from "resend";

import { getSalesEmail } from "@/lib/contact";
import { attributionLines } from "@/lib/email/attribution";
import {
  getLeadCopyRecipients,
  getLeadFromEmail,
  getLeadInboxRecipients,
} from "@/lib/email/inbox-recipients";
import { nextStepOptionsPlain } from "@/lib/email/lead-thank-you";
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
  const subject = `[SYDRA CONTACT] ${intentLabel} · ${data.practiceName}`;
  const submittedAt = new Date().toISOString();
  const buildText = (includeAttribution: boolean) =>
    [
      "Contact form submission",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Practice: ${data.practiceName}`,
      `Intent: ${intentLabel}`,
      "",
      `Message: ${message}`,
      "",
      `Marketing + Customer Match: ${data.marketingConsent ? "yes" : "no"}`,
      `Consent text version: ${data.consentTextVersion || "n/a"}`,
      ...attributionLines(data, includeAttribution),
      "",
      `Submitted: ${submittedAt}`,
    ].join("\n");

  const { data: result, error } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: getLeadInboxRecipients(),
    replyTo: data.email,
    subject,
    text: buildText(false),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const { error: copyError } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: getLeadCopyRecipients(),
    replyTo: data.email,
    subject,
    text: buildText(true),
  });
  if (copyError) {
    console.error("Contact ops copy failed:", copyError.message);
  }

  const { error: confirmError } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: [data.email],
    replyTo: getSalesEmail(),
    subject: "We received your message, Sydra",
    text: [
      data.name.trim() ? `Hi ${data.name.trim()},` : "Hi,",
      "",
      "Thank you for contacting Sydra about Sydra. We received your message and will reply within one business day.",
      "",
      "If interested, would you like to:",
      "",
      ...nextStepOptionsPlain(),
      "",
      "Sydra",
      "244 Westchester Ave, Ste 209, West Harrison, NY 10604",
    ].join("\n"),
  });
  if (confirmError) {
    console.error("Contact auto reply failed:", confirmError.message);
  }

  return { ok: true, id: result?.id };
}
