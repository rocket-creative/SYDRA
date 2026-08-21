import { Resend } from "resend";

import { getSalesEmail } from "@/lib/contact";
import { attributionLines } from "@/lib/email/attribution";
import {
  getLeadCopyRecipients,
  getLeadFromEmail,
  getLeadInboxRecipients,
} from "@/lib/email/inbox-recipients";
import {
  PRIVACY_REQUEST_LABELS,
  type PrivacyRequest,
} from "@/lib/schemas/privacy-request";

export type SendPrivacyRequestResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string };

export async function sendPrivacyRequestEmail(
  data: PrivacyRequest,
): Promise<SendPrivacyRequestResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured" };
  }

  const resend = new Resend(apiKey);
  const typeLabel = PRIVACY_REQUEST_LABELS[data.requestType];
  const name = data.name?.trim() || "(not provided)";
  const message = data.message?.trim() || "(none)";

  const subject = `[SYDRA PRIVACY] ${typeLabel} · ${data.email}`;
  const submittedAt = new Date().toISOString();
  const buildText = (includeAttribution: boolean) =>
    [
      "Privacy request",
      "",
      `Type: ${typeLabel}`,
      `Email: ${data.email}`,
      `Name: ${name}`,
      "",
      `Message: ${message}`,
      ...attributionLines(data, includeAttribution),
      "",
      `Submitted: ${submittedAt}`,
      "",
      "Action required: remove this contact from marketing lists and Google Customer Match uploads, and honor any deletion request within applicable deadlines.",
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
    console.error("Privacy request ops copy failed:", copyError.message);
  }

  const { error: confirmError } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: [data.email],
    replyTo: getSalesEmail(),
    subject: "We received your privacy request, Sydra",
    text: [
      name !== "(not provided)" ? `Hi ${name},` : "Hi,",
      "",
      "We received your privacy request and will process it promptly. If we need more information, we will reply to this email.",
      "",
      "Sydra",
      "244 Westchester Ave, Ste 209, West Harrison, NY 10604",
    ].join("\n"),
  });
  if (confirmError) {
    console.error("Privacy request auto reply failed:", confirmError.message);
  }

  return { ok: true, id: result?.id };
}
