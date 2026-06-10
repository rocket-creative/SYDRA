/** Launch states for postcard QR codes (lowercase route segments). */
export const LAUNCH_STATE_CODES = ["tx", "ca", "ny", "nj", "fl", "az"] as const;

export type LaunchStateCode = (typeof LAUNCH_STATE_CODES)[number];

const STATE_DISPLAY: Record<LaunchStateCode, string> = {
  tx: "TX",
  ca: "CA",
  ny: "NY",
  nj: "NJ",
  fl: "FL",
  az: "AZ",
};

export function isLaunchStateCode(value: string | undefined): value is LaunchStateCode {
  if (!value) return false;
  return (LAUNCH_STATE_CODES as readonly string[]).includes(value.toLowerCase());
}

/** Returns uppercase display code (e.g. "TX") or null when invalid / absent. */
export function resolveStateDisplay(stateParam: string | undefined): string | null {
  if (!stateParam) return null;
  const normalized = stateParam.toLowerCase();
  if (!isLaunchStateCode(normalized)) return null;
  return STATE_DISPLAY[normalized];
}

/** Two letter uppercase code for form prefill, or empty string. */
export function resolveStateCode(stateParam: string | undefined): string {
  return resolveStateDisplay(stateParam) ?? "";
}
