import type { ReactNode } from "react";

/**
 * Previously highlighted SEO or inferred copy for pre-launch review. Copy is now
 * approved, so this renders its children plainly with no highlight.
 */
export function ReviewHighlight({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
