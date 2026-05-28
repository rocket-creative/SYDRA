/** Image slot config (grey placeholders until brand photography ships). */
export const IMAGE_SLOTS = {
  hero: { aspect: "3/4" as const },
  determination: { aspect: "16/9" as const },
  howItWorks: { aspect: "4/5" as const },
} as const;

export const CONTENT_MAX = "max-w-[1280px]";
export const SHELL_MAX = "max-w-[1440px]";

/** Comfortable measure for headings and body (~65 characters). */
export const PROSE_MEASURE = "max-w-2xl";
