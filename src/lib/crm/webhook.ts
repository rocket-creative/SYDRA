import type { PostcardLead } from "@/lib/schemas/postcard-lead";
import { DISPUTES_LABELS } from "@/lib/schemas/demo-request";
import {
  LANDING_PRODUCT_LABELS,
  LANDING_ROLE_LABELS,
} from "@/lib/schemas/postcard-lead";

export type CrmWebhookResult = { ok: true } | { ok: false; error: string };

function getWebhookUrl(): string | null {
  const raw = process.env.CRM_WEBHOOK_URL?.trim();
  return raw && raw.length > 0 ? raw : null;
}

export async function sendCrmWebhook(lead: PostcardLead): Promise<CrmWebhookResult> {
  const url = getWebhookUrl();
  if (!url) {
    return { ok: true };
  }

  const payload = {
    source: "sydra_postcard_landing",
    practice_name: lead.practiceName,
    contact_name: lead.name,
    role: LANDING_ROLE_LABELS[lead.role],
    email: lead.email,
    phone: lead.phone,
    state: lead.state,
    monthly_oon_volume: DISPUTES_LABELS[lead.disputesPerMonth],
    product_interest: LANDING_PRODUCT_LABELS[lead.productInterest],
    tracking: {
      state: lead.state_tracking ?? "",
      utm_source: lead.utm_source ?? "",
      utm_medium: lead.utm_medium ?? "",
      utm_content: lead.utm_content ?? "",
      landed_at: lead.landed_at ?? "",
    },
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false, error: `CRM webhook returned ${res.status}` };
    }

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "CRM webhook failed";
    return { ok: false, error: message };
  }
}
