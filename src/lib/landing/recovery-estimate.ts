/** Published provider win rate for properly filed federal IDR. Not a Sydra claim. */
export const IDR_WIN_RATE = 0.88;

export const ATTORNEY_CONTINGENCY = 0.2;

export type RecoveryEstimate = {
  monthlyDisputed: number;
  annualDisputed: number;
  monthlyRecovery: number;
  annualRecovery: number;
  attorneyFees: number;
};

/**
 * Recovery from the amount already in dispute.
 *
 * annualDisputed = claimsPerMonth × avgDisputedAmount × 12
 * annualRecovery = min(annualDisputed × 0.88, annualDisputed)
 *
 * The CMS/Georgetown award multiple versus QPA is not applied here.
 * The disputed amount is already the gap. Recovery never exceeds it.
 */
export function estimateRecovery(
  claimsPerMonth: number,
  avgDisputedAmount: number,
): RecoveryEstimate {
  const monthlyDisputed = Math.max(0, claimsPerMonth) * Math.max(0, avgDisputedAmount);
  const annualDisputed = monthlyDisputed * 12;
  const monthlyRecovery = Math.min(monthlyDisputed * IDR_WIN_RATE, monthlyDisputed);
  const annualRecovery = Math.min(monthlyRecovery * 12, annualDisputed);
  return {
    monthlyDisputed: Math.round(monthlyDisputed),
    annualDisputed: Math.round(annualDisputed),
    monthlyRecovery: Math.round(monthlyRecovery),
    annualRecovery: Math.round(annualRecovery),
    attorneyFees: Math.round(annualRecovery * ATTORNEY_CONTINGENCY),
  };
}
