import { z } from "zod";

import { DISPUTES_PER_MONTH_OPTIONS } from "@/lib/schemas/demo-request";

export const LANDING_ROLE_OPTIONS = ["admin", "billing", "owner", "physician"] as const;

export const LANDING_PRODUCT_OPTIONS = ["sydra_software", "done_for_you", "not_sure"] as const;

export const LANDING_ROLE_LABELS: Record<(typeof LANDING_ROLE_OPTIONS)[number], string> = {
  admin: "Practice admin",
  billing: "Billing lead",
  owner: "Owner",
  physician: "Physician",
};

export const LANDING_PRODUCT_LABELS: Record<(typeof LANDING_PRODUCT_OPTIONS)[number], string> = {
  sydra_software: "Sydra software",
  done_for_you: "Done for you",
  not_sure: "Not sure",
};

const optionalTracking = {
  state_tracking: z.union([z.string().trim().max(10), z.literal("")]).optional(),
  route_state: z.union([z.string().trim().max(10), z.literal("")]).optional(),
  route_code: z.union([z.string().trim().max(20), z.literal("")]).optional(),
  utm_source: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_medium: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_campaign: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_content: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  landed_at: z.union([z.string().trim().max(50), z.literal("")]).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  calculator_claims_per_month: z.union([z.number().int().min(0).max(1000), z.null()]).optional(),
  calculator_avg_disputed_amount: z
    .union([z.number().int().min(0).max(10_000_000), z.null()])
    .optional(),
  calculator_annual_estimate: z
    .union([z.number().int().min(0).max(1_000_000_000), z.null()])
    .optional(),
};

export const postcardPartialLeadSchema = z.object({
  leadKind: z.literal("partial"),
  email: z.string().trim().email().max(254),
  state: z.string().trim().length(2).toUpperCase(),
  disputesPerMonth: z.enum(DISPUTES_PER_MONTH_OPTIONS),
  ...optionalTracking,
});

export const postcardFullLeadSchema = z.object({
  leadKind: z.literal("full"),
  practiceName: z.string().trim().min(1).max(200),
  name: z.string().trim().min(1).max(200),
  role: z.enum(LANDING_ROLE_OPTIONS),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(50),
  state: z.string().trim().length(2).toUpperCase(),
  disputesPerMonth: z.enum(DISPUTES_PER_MONTH_OPTIONS),
  productInterest: z.enum(LANDING_PRODUCT_OPTIONS),
  partialUpgraded: z.boolean().optional(),
  ...optionalTracking,
});

/** Legacy full lead without leadKind (treated as full). */
export const postcardLeadSchema = postcardFullLeadSchema.omit({ leadKind: true }).extend({
  leadKind: z.literal("full").optional(),
});

export const postcardLeadRequestSchema = z.union([
  postcardPartialLeadSchema,
  postcardFullLeadSchema,
  postcardLeadSchema,
]);

export type PostcardPartialLead = z.infer<typeof postcardPartialLeadSchema>;
export type PostcardLead = z.infer<typeof postcardFullLeadSchema>;
export type PostcardLeadRequest = PostcardPartialLead | PostcardLead;

export function normalizePostcardLead(
  data: z.infer<typeof postcardLeadRequestSchema>,
): PostcardLeadRequest {
  if ("leadKind" in data && data.leadKind === "partial") {
    return data;
  }
  const { leadKind: _ignored, ...rest } = data as z.infer<typeof postcardLeadSchema>;
  return { ...rest, leadKind: "full" };
}
