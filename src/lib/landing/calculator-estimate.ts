/** Session storage for recovery calculator → lead form handoff. */

export const CALCULATOR_STORAGE_KEY = "sydra_calculator_estimate";

export type CalculatorEstimate = {
  claimsPerMonth: number;
  avgDisputedAmount: number;
  annualRecovery: number;
  touched: true;
};

export function readCalculatorEstimate(): CalculatorEstimate | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CALCULATOR_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CalculatorEstimate>;
    if (
      typeof parsed.claimsPerMonth !== "number" ||
      typeof parsed.avgDisputedAmount !== "number" ||
      typeof parsed.annualRecovery !== "number" ||
      parsed.touched !== true
    ) {
      return null;
    }
    return {
      claimsPerMonth: parsed.claimsPerMonth,
      avgDisputedAmount: parsed.avgDisputedAmount,
      annualRecovery: parsed.annualRecovery,
      touched: true,
    };
  } catch {
    return null;
  }
}

export const CALCULATOR_UPDATE_EVENT = "sydra:calculator-update";

export function writeCalculatorEstimate(data: Omit<CalculatorEstimate, "touched">): void {
  if (typeof window === "undefined") return;
  try {
    const payload: CalculatorEstimate = { ...data, touched: true };
    sessionStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event(CALCULATOR_UPDATE_EVENT));
  } catch {
    // sessionStorage may be unavailable; handoff is best effort
  }
}

export function formatAnnualEstimate(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}
