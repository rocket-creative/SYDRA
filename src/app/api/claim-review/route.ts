import { NextResponse } from "next/server";

/**
 * Legacy endpoint. Every form on the site now posts to /api/postcard-lead via
 * SharedLeadForm; nothing in this codebase calls this route. It stays because a
 * browser holding a cached copy of the old two-field form would otherwise lose
 * the lead on submit. Delivery is identical either way: Supabase first, then
 * sales@ with the ops address on BCC. Safe to delete once the CDN cache window
 * for the pages that carried the old form has passed.
 */

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
