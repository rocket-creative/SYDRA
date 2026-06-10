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

export const postcardLeadSchema = z.object({
  practiceName: z.string().trim().min(1).max(200),
  name: z.string().trim().min(1).max(200),
  role: z.enum(LANDING_ROLE_OPTIONS),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(50),
  state: z.string().trim().length(2).toUpperCase(),
  disputesPerMonth: z.enum(DISPUTES_PER_MONTH_OPTIONS),
  productInterest: z.enum(LANDING_PRODUCT_OPTIONS),
  state_tracking: z.union([z.string().trim().max(10), z.literal("")]).optional(),
  utm_source: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_medium: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_content: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  landed_at: z.union([z.string().trim().max(50), z.literal("")]).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
});

export type PostcardLead = z.infer<typeof postcardLeadSchema>;
