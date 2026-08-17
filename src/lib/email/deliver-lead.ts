import { Resend } from "resend";

import { SALES_EMAIL_FALLBACK } from "@/lib/contact";
import { getLeadFromEmail, getLeadInboxRecipients } from "@/lib/email/inbox-recipients";

export type DeliverLeadInput = {
  email: string;
  practiceName: string;
  source?: string;
};

export type DeliverLeadResult =
  | { ok: true; channel: "resend" | "console" }
  | { ok: false; error: string };

function notificationRecipients(): string[] {
  const raw = process.env.LEAD_NOTIFICATION_EMAIL?.trim();
  if (raw) {
    const list = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (list.length > 0) return [...new Set(list)];
  }
  const inbox = getLeadInboxRecipients();
  return inbox.length > 0 ? inbox : [SALES_EMAIL_FALLBACK];
}

/**
 * Claim-review lead delivery. Resend when RESEND_API_KEY is set; otherwise a
 * structured console.info. This function is the only place the submitter email
 * may be logged.
 */
export async function deliverLead(lead: DeliverLeadInput): Promise<DeliverLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipients = notificationRecipients();
  const source = lead.source?.trim() || "unspecified";
  const payload = {
    type: "claim_review",
    email: lead.email,
    practiceName: lead.practiceName,
    source,
    to: recipients,
  };

  if (!apiKey) {
    console.info("[deliverLead] RESEND_API_KEY absent; logging lead", payload);
    return { ok: true, channel: "console" };
  }

  const resend = new Resend(apiKey);
  const text = [
    "Type: Claim review lead",
    "",
    `Email: ${lead.email}`,
    `Practice name: ${lead.practiceName}`,
    `Source: ${source}`,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: getLeadFromEmail(),
    to: recipients,
    replyTo: lead.email,
    subject: `[SYDRA CLAIM REVIEW] ${lead.practiceName}`,
    text,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, channel: "resend" };
}
