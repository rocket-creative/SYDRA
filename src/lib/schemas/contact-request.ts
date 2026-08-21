import { z } from "zod";

import { CONSENT_TEXT_VERSION, parseMarketingConsent } from "@/lib/consent/marketing";
import { formTrackingFields } from "@/lib/schemas/tracking";

export const CONTACT_INTENT_OPTIONS = [
  "schedule_demo",
  "pricing_question",
  "security_documentation",
  "partnership_inquiry",
  "other",
] as const;

export const CONTACT_INTENT_LABELS: Record<(typeof CONTACT_INTENT_OPTIONS)[number], string> = {
  schedule_demo: "Set up a demo",
  pricing_question: "Pricing question",
  security_documentation: "Security and compliance documentation",
  partnership_inquiry: "Partnership inquiry",
  other: "Other",
};

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(50),
  practiceName: z.string().trim().min(1).max(200),
  intent: z.enum(CONTACT_INTENT_OPTIONS),
  message: z.union([z.string().trim().max(5000), z.literal("")]).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  marketingConsent: z.preprocess(
    (value) => (value === undefined || value === null ? false : parseMarketingConsent(value)),
    z.boolean(),
  ),
  consentTextVersion: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : CONSENT_TEXT_VERSION)),
  ...formTrackingFields,
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
