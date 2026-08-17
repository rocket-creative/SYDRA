import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Arrow } from "@/components/ui/arrow";

type CtaLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  direction?: "right" | "left";
};

export function CtaLink({ children, className = "", direction = "right", ...props }: CtaLinkProps) {
  return (
    <Link
      className={`cta-link group inline-flex max-w-full min-h-12 items-center gap-2 text-[13px] font-normal uppercase tracking-[0.08em] whitespace-normal text-balance text-[var(--color-hero)] transition-colors hover:text-[var(--color-accent)] ${className}`}
      {...props}
    >
      <span className="min-w-0">{children}</span>
      <Arrow
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        direction={direction}
      />
    </Link>
  );
}
