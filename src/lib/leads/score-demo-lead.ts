import {
  DISPUTES_LABELS,
  IDR_APPROACH_LABELS,
  ROLE_LABELS,
  SPECIALTY_LABELS,
  SUPPORTED_STATES,
  TIMELINE_LABELS,
  TIER_LABELS,
  type DemoRequest,
} from "@/lib/schemas/demo-request";

export type LeadPriority = "HIGH" | "MEDIUM" | "LOW";

export type LeadScoreResult = {
  score: number;
  priority: LeadPriority;
  breakdown: string[];
  subjectSummary: string;
};

const SURGICAL_SPECIALTIES = new Set([
  "orthopedic_surgery",
  "neurosurgery",
  "spine_surgery",
  "plastic_surgery",
  "general_surgery",
]);

function priorityFromScore(score: number): LeadPriority {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

export function scoreDemoLead(data: DemoRequest): LeadScoreResult {
  let score = 0;
  const breakdown: string[] = [];

  if (SURGICAL_SPECIALTIES.has(data.specialty)) {
    score += 25;
    breakdown.push(`Specialty (${SPECIALTY_LABELS[data.specialty]}): +25`);
  } else if (data.specialty === "multiple_specialties") {
    score += 15;
    breakdown.push("Specialty (multiple): +15");
  }

  if ((SUPPORTED_STATES as readonly string[]).includes(data.state)) {
    score += 20;
    breakdown.push(`State (${data.state}): +20`);
  }

  if (data.disputesPerMonth === "15_to_30" || data.disputesPerMonth === "more_than_30") {
    score += 25;
    breakdown.push(`Volume (${DISPUTES_LABELS[data.disputesPerMonth]}/mo): +25`);
  } else if (data.disputesPerMonth === "5_to_15") {
    score += 15;
    breakdown.push(`Volume (${DISPUTES_LABELS[data.disputesPerMonth]}/mo): +15`);
  }

  if (data.idrApproach === "contingency_attorney" || data.idrApproach === "in_house_manual") {
    score += 15;
    breakdown.push(`IDR approach (${IDR_APPROACH_LABELS[data.idrApproach]}): +15`);
  }

  if (data.role === "physician_owner" || data.role === "billing_lead") {
    score += 20;
    breakdown.push(`Role (${ROLE_LABELS[data.role]}): +20`);
  }

  if (data.timeline === "ready_now" || data.timeline === "within_30_days") {
    score += 15;
    breakdown.push(`Timeline (${TIMELINE_LABELS[data.timeline]}): +15`);
  }

  if (data.tierInterest === "plus" || data.tierInterest === "pro") {
    score += 10;
    breakdown.push(`Tier (${TIER_LABELS[data.tierInterest]}): +10`);
  }

  const priority = priorityFromScore(score);
  const subjectSummary = [
    SPECIALTY_LABELS[data.specialty],
    data.state,
    `${DISPUTES_LABELS[data.disputesPerMonth]}/mo`,
    IDR_APPROACH_LABELS[data.idrApproach],
  ].join(" | ");

  return { score, priority, breakdown, subjectSummary };
}
