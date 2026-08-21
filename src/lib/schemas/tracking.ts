import { z } from "zod";

/**
 * Attribution every form reports. All optional: a direct visit carries none of
 * it, and a missing UTM must never block a submission.
 */
export const formTrackingFields = {
  route_state: z.union([z.string().trim().max(10), z.literal("")]).optional(),
  utm_source: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_medium: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_campaign: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utm_content: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  landed_at: z.union([z.string().trim().max(50), z.literal("")]).optional(),
};

export const formTrackingSchema = z.object(formTrackingFields);

export type FormTracking = z.infer<typeof formTrackingSchema>;
