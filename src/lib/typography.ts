/** Shared text styles — left aligned, readable measure, design tokens only. */
export const textStyles = {
  pageTitle: "type-h1 w-full min-w-0 text-brand prose-measure",
  pageSubtitle: "mt-4 block type-h2 font-normal text-body",
  pageLead: "prose-measure mt-6 w-full min-w-0 type-body text-body",
  sectionTitle: "type-h2 w-full min-w-0 text-brand prose-measure",
  subsectionTitle: "text-lg font-medium text-brand",
  body: "type-body text-body",
  bodyMeasure: "prose-measure w-full min-w-0 type-body text-body",
  bodyStack: "prose-measure w-full min-w-0 space-y-4 type-body text-body",
  list: "prose-measure mt-4 w-full min-w-0 list-decimal space-y-3 pl-5 type-body text-body",
  listNone: "prose-measure mt-4 w-full min-w-0 space-y-2 type-body text-body",
  textLink:
    "font-medium text-[var(--color-accent)] underline decoration-rule underline-offset-4 transition-colors hover:text-[var(--color-hero)]",
  meta: "text-sm text-body",
  trustLine: "text-sm leading-relaxed text-body",
} as const;
