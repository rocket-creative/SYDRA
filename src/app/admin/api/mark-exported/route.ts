import { NextResponse } from "next/server";
import { z } from "zod";

import { markLeadsExported } from "@/lib/leads/list-leads";

const bodySchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(2000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = await markLeadsExported(parsed.data.ids);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Update failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    marked: result.marked,
    exportedAt: new Date().toISOString(),
  });
}
