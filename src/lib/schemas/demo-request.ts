import { z } from "zod";

export const SPECIALTY_OPTIONS = [
  "orthopedic_surgery",
  "neurosurgery",
  "spine_surgery",
  "plastic_surgery",
  "anesthesiology",
  "general_surgery",
  "multiple_specialties",
  "other",
] as const;

export const DISPUTES_PER_MONTH_OPTIONS = [
  "fewer_than_5",
  "5_to_15",
  "15_to_30",
  "more_than_30",
] as const;

export const IDR_APPROACH_OPTIONS = [
  "not_filing",
  "contingency_attorney",
  "in_house_manual",
  "in_house_other_software",
] as const;

export const ROLE_OPTIONS = [
  "physician_owner",
  "billing_lead",
  "practice_admin",
  "other",
] as const;

export const TIMELINE_OPTIONS = [
  "ready_now",
  "within_30_days",
  "within_90_days",
  "researching",
] as const;

export const TIER_INTEREST_OPTIONS = ["basic", "plus", "pro", "not_sure"] as const;

export const BEST_TIME_OPTIONS = [
  "morning_9_12",
  "midday_12_3",
  "afternoon_3_5",
  "flexible",
  "email_only",
] as const;

export const SPECIALTY_LABELS: Record<(typeof SPECIALTY_OPTIONS)[number], string> = {
  orthopedic_surgery: "Orthopedic Surgery",
  neurosurgery: "Neurosurgery",
  spine_surgery: "Spine Surgery",
  plastic_surgery: "Plastic Surgery",
  anesthesiology: "Anesthesiology",
  general_surgery: "General Surgery",
  multiple_specialties: "Multiple specialties",
  other: "Other",
};

export const DISPUTES_LABELS: Record<(typeof DISPUTES_PER_MONTH_OPTIONS)[number], string> = {
  fewer_than_5: "Fewer than 5",
  "5_to_15": "5 to 15",
  "15_to_30": "15 to 30",
  more_than_30: "More than 30",
};

export const IDR_APPROACH_LABELS: Record<(typeof IDR_APPROACH_OPTIONS)[number], string> = {
  not_filing: "Not filing IDR currently",
  contingency_attorney: "Through a contingency attorney",
  in_house_manual: "In house manually",
  in_house_other_software: "In house with other software",
};

export const ROLE_LABELS: Record<(typeof ROLE_OPTIONS)[number], string> = {
  physician_owner: "Physician owner",
  billing_lead: "Billing lead",
  practice_admin: "Practice admin",
  other: "Other",
};

export const TIMELINE_LABELS: Record<(typeof TIMELINE_OPTIONS)[number], string> = {
  ready_now: "Ready now",
  within_30_days: "Within 30 days",
  within_90_days: "Within 90 days",
  researching: "Researching",
};

export const TIER_LABELS: Record<(typeof TIER_INTEREST_OPTIONS)[number], string> = {
  basic: "Self Serve",
  plus: "Kronos Support",
  pro: "Full Service",
  not_sure: "Not sure",
};

export const BEST_TIME_LABELS: Record<(typeof BEST_TIME_OPTIONS)[number], string> = {
  morning_9_12: "Morning, 9 to 12 ET",
  midday_12_3: "Midday, 12 to 3 ET",
  afternoon_3_5: "Afternoon, 3 to 5 ET",
  flexible: "Flexible during business hours",
  email_only: "Email only, no call needed",
};

export const SUPPORTED_STATES = ["NY", "TX", "CA", "NJ", "FL", "AZ"] as const;

export const demoRequestSchema = z.object({
  name: z.string().trim().min(1).max(200),
  practiceName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  specialty: z.enum(SPECIALTY_OPTIONS),
  state: z.string().trim().length(2).toUpperCase(),
  disputesPerMonth: z.enum(DISPUTES_PER_MONTH_OPTIONS),
  idrApproach: z.enum(IDR_APPROACH_OPTIONS),
  role: z.enum(ROLE_OPTIONS).optional().default("other"),
  timeline: z.enum(TIMELINE_OPTIONS).optional().default("researching"),
  tierInterest: z.enum(TIER_INTEREST_OPTIONS).optional(),
  bestTimeToReach: z.enum(BEST_TIME_OPTIONS).optional().default("flexible"),
  phone: z.union([z.string().trim().max(50), z.literal("")]).optional(),
  message: z.union([z.string().trim().max(5000), z.literal("")]).optional(),
  eobFileName: z.union([z.string().trim().max(500), z.literal("")]).optional(),
  utmSource: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  utmCampaign: z.union([z.string().trim().max(200), z.literal("")]).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

export const legacyDemoRequestSchema = z.object({
  name: z.string().trim().min(1).max(200),
  practiceName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  phone: z.union([z.string().trim().max(50), z.literal("")]).optional(),
  message: z.union([z.string().trim().max(5000), z.literal("")]).optional(),
  website: z.union([z.string().trim().max(200), z.literal("")]).optional(),
});

export type LegacyDemoRequest = z.infer<typeof legacyDemoRequestSchema>;

export function isFullDemoRequest(
  data: DemoRequest | LegacyDemoRequest,
): data is DemoRequest {
  return "specialty" in data && data.specialty !== undefined;
}
