import { NextResponse } from "next/server";

import { deliverLead } from "@/lib/email/deliver-lead";
import { checkRateLimit } from "@/lib/landing/rate-limit";
import { logLeadFallback } from "@/lib/leads/fallback-log";
import { claimReviewRequestSchema } from "@/lib/schemas/claim-review";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isHoneypotFilled(website: string | undefined): boolean {
  const trimmed = website?.trim();
  return Boolean(trimmed && trimmed.length > 0);
}

export async function POST(request: Request) {
  const rate = checkRateLimit(`claim-review:${clientIp(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = claimReviewRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Enter a valid work email and practice name.";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const lead = parsed.data;

  if (isHoneypotFilled(lead.website)) {
    return NextResponse.json({ ok: true });
  }

  const submittedAt = new Date().toISOString();
  const subject = `[SYDRA CLAIM REVIEW] ${lead.practiceName}`;

  await logLeadFallback({
    kind: "full",
    source: "claim_review",
    subject,
    fields: {
      email: lead.email,
      practiceName: lead.practiceName,
      source: lead.source ?? "",
    },
    submittedAt,
  });

  // TODO(george): confirm lead destination for deliverLead() — currently LEAD_NOTIFICATION_EMAIL / LEADS_INBOX_EMAIL / sales@sydrahealth.com
  const delivered = await deliverLead({
    email: lead.email,
    practiceName: lead.practiceName,
    source: lead.source,
  });

  if (!delivered.ok) {
    return NextResponse.json(
      { error: "We could not send your request. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
