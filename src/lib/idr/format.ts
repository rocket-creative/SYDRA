/** Shared formatting for entity benchmark figures. */

export function usd(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function percent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function multiple(value: number): string {
  return `${value.toFixed(1)}x`;
}

const PATHWAY_LABELS = {
  federal: "Federal IDR",
  state: "State arbitration",
  mixed: "Federal or state, by plan type",
} as const;

export function pathwayLabel(pathway: "federal" | "state" | "mixed"): string {
  return PATHWAY_LABELS[pathway];
}

export function formatBenchmarkDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}
