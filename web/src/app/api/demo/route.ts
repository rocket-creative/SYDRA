import { NextResponse } from "next/server";
import { z } from "zod";

const demoRequestSchema = z.object({
  name: z.string().trim().min(1).max(200),
  practiceName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  phone: z.union([z.string().trim().max(50), z.literal("")]).optional(),
  message: z.union([z.string().trim().max(5000), z.literal("")]).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Integrate CRM or email relay here; acknowledgement only for now.
  return NextResponse.json({ ok: true });
}
