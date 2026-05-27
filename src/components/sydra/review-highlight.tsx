import type { ReactNode } from "react";

/** Wraps SEO or inferred copy that needs human review before launch. */
export function ReviewHighlight({ children }: { children: ReactNode }) {
  return <span className="bg-yellow-100 dark:bg-yellow-900/40">{children}</span>;
}
