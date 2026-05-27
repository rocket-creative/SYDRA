import { NextResponse } from "next/server";

import { sendDemoLeadEmail } from "@/lib/email/send-demo-lead";
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
    specialty: "other_surgical",
    state: "NY",
    disputesPerMonth: "0-2",
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

  const sendResult = await sendDemoLeadEmail(lead, score);

  if (!sendResult.ok) {
    console.error("Demo lead email failed:", sendResult.error);
    return NextResponse.json(
      { error: "Unable to submit request. Please try again or contact us by email." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    redirect: "/demo/thank-you",
    priority: score.priority,
  });
}
