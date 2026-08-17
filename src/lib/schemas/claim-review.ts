import { z } from "zod";

export const claimReviewRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter a work email.")
    .email("Enter a valid work email.")
    .max(254, "Enter a valid work email."),
  practiceName: z
    .string()
    .trim()
    .min(1, "Enter your practice name.")
    .max(200, "Practice name is too long."),
  source: z.string().trim().max(80).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
});

export type ClaimReviewRequest = z.infer<typeof claimReviewRequestSchema>;
