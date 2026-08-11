import sources from "./sources.json";

export type SiteSource = {
  id: string;
  label: string;
  detail?: string;
  url?: string;
  dateReleased?: string;
  lastVerified: string;
  verificationStatus: "current" | "stale" | "retired";
};

export const SITE_SOURCES: SiteSource[] = sources as SiteSource[];
