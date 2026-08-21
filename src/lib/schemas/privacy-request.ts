import { z } from "zod";

import { formTrackingFields } from "@/lib/schemas/tracking";

export const PRIVACY_REQUEST_TYPES = [
  "do_not_sell_or_share",
  "unsubscribe_marketing",
  "delete_data",
] as const;

export const PRIVACY_REQUEST_LABELS: Record<(typeof PRIVACY_REQUEST_TYPES)[number], string> = {
  do_not_sell_or_share: "Do not sell or share my personal information",
  unsubscribe_marketing: "Unsubscribe from marketing emails and ads matching",
  delete_data: "Delete my personal information",
};

export const privacyRequestSchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  requestType: z.enum(PRIVACY_REQUEST_TYPES),
  message: z.union([z.string().trim().max(2000), z.literal("")]).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  ...formTrackingFields,
});

export type PrivacyRequest = z.infer<typeof privacyRequestSchema>;
