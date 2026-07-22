import { NextResponse } from "next/server";

import {
  demoLeadFallbackFields,
  sendDemoLeadEmail,
  type LeadRequestType,
} from "@/lib/email/send-demo-lead";
import { logLeadFallback } from "@/lib/leads/fallback-log";
import { scoreDemoLead } from "@/lib/leads/score-demo-lead";
import {
  demoRequestSchema,
  legacyDemoRequestSchema,
  type DemoRequest,
  type LegacyDemoRequest,
} from "@/lib/schemas/demo-request";

function isHoneypotFilled(website: string | undefined): boolean {
  const trimmed = website?.trim();
  return Boolean(trimmed && trimmed.length > 0);
}

function legacyToDemoRequest(data: LegacyDemoRequest): DemoRequest {
  return {
    ...data,
    specialty: "other",
    state: "NY",
    disputesPerMonth: "fewer_than_5",
    idrApproach: "not_filing",
    role: "other",
    timeline: "researching",
    tierInterest: "not_sure",
    bestTimeToReach: "flexible",
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fullParsed = demoRequestSchema.safeParse(body);
  let lead: DemoRequest;

  if (fullParsed.success) {
    lead = fullParsed.data;
  } else {
    const legacyParsed = legacyDemoRequestSchema.safeParse(body);
    if (!legacyParsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: fullParsed.error.flatten() },
        { status: 400 },
      );
    }
    lead = legacyToDemoRequest(legacyParsed.data);
  }

  if (isHoneypotFilled(lead.website)) {
    return NextResponse.json({ ok: true, redirect: "/demo/thank-you" });
  }

  const score = scoreDemoLead(lead);

  const rawType =
    body && typeof body === "object" && "request_type" in body
      ? String((body as { request_type?: string }).request_type)
      : "demo";
  const requestType: LeadRequestType = rawType === "security" ? "security" : "demo";

  const subjectPrefix = requestType === "security" ? "SYDRA SECURITY" : `SYDRA ${score.priority}`;
  const subject = `[${subjectPrefix}] Demo lead`;

  await logLeadFallback({
    kind: "full",
    source: "demo",
    subject,
    fields: demoLeadFallbackFields(lead, requestType),
    submittedAt: new Date().toISOString(),
  });

  const sendResult = await sendDemoLeadEmail(lead, score, requestType);

  if (!sendResult.ok) {
    console.error("Demo lead email failed:", sendResult.error, {
      subject,
      payload: demoLeadFallbackFields(lead, requestType),
    });
    // Lead already logged; do not fail the visitor.
    return NextResponse.json({
      ok: true,
      redirect: "/demo/thank-you",
      priority: score.priority,
      emailDelivered: false,
    });
  }

  return NextResponse.json({
    ok: true,
    redirect: "/demo/thank-you",
    priority: score.priority,
    emailDelivered: true,
  });
}
