import { Resend } from "resend";

import { getSalesEmail } from "@/lib/contact";
import {
  buildClaimReviewAutoReplyPlain,
  CLAIM_REVIEW_AUTO_REPLY_SUBJECT,
} from "@/lib/email/claim-review-ops";
import {
  getFounderFromEmail,
  getLeadFromEmail,
  leadTeamNotifyAddresses,
} from "@/lib/email/inbox-recipients";

export type DeliverLeadInput = {
  email: string;
  practiceName: string;
  source?: string;
};

export type DeliverLeadResult =
  | { ok: true; channel: "resend" | "console" }
  | { ok: false; error: string };

/**
 * Claim-review lead delivery. Resend when RESEND_API_KEY is set; otherwise a
 * structured console.info. This function is the only place the submitter email
 * may be logged.
 */
export async function deliverLead(lead: DeliverLeadInput): Promise<DeliverLeadResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const team = leadTeamNotifyAddresses();
  const source = lead.source?.trim() || "unspecified";
  const payload = {
    type: "claim_review",
    email: lead.email,
    practiceName: lead.practiceName,
    source,
    to: team.to,
    bcc: team.bcc,
  };

  if (!apiKey) {
    console.info("[deliverLead] RESEND_API_KEY absent; logging lead", payload);
    console.info("[deliverLead] auto-reply did NOT send (RESEND_API_KEY absent)", {
      email: lead.email,
    });
    return { ok: true, channel: "console" };
  }

  const resend = new Resend(apiKey);
  const salesAddress = getSalesEmail();
  const text = [
    "Type: Claim review lead",
    "",
    `Email: ${lead.email}`,
    `Practice name: ${lead.practiceName}`,
    `Source: ${source}`,
    "",
    "Auto-reply: sample review plus EOB instructions (Reply-To is sales).",
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: getLeadFromEmail(),
    ...team,
    replyTo: lead.email,
    subject: `[SYDRA CLAIM REVIEW] ${lead.practiceName}`,
    text,
  });

  if (error) {
    console.info("[deliverLead] auto-reply did NOT send (sales notification failed first)", {
      email: lead.email,
    });
    return { ok: false, error: error.message };
  }

  const { error: confirmError } = await resend.emails.send({
    from: getFounderFromEmail(),
    to: [lead.email],
    replyTo: salesAddress,
    subject: CLAIM_REVIEW_AUTO_REPLY_SUBJECT,
    text: buildClaimReviewAutoReplyPlain(lead.practiceName),
  });

  if (confirmError) {
    console.info("[deliverLead] auto-reply did NOT send", {
      email: lead.email,
      error: confirmError.message,
    });
    return { ok: false, error: confirmError.message };
  }

  return { ok: true, channel: "resend" };
}
