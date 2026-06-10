import { NextResponse } from "next/server";
import { z } from "zod";

const analyticsSchema = z.object({
  event: z.enum(["page_view", "cta_click"]),
  product: z.enum(["sydra", "kronos"]).optional(),
  state: z.string().max(10).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  path: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = analyticsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const payload = {
    ...parsed.data,
    received_at: new Date().toISOString(),
    user_agent: request.headers.get("user-agent") ?? "",
  };

  const webhookUrl = process.env.ANALYTICS_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Analytics webhook failed:", error);
    }
  } else if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", payload);
  }

  return NextResponse.json({ ok: true });
}
