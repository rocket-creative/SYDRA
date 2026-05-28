import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Arrow } from "@/components/ui/arrow";

type CtaLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  direction?: "right" | "left";
};

export function CtaLink({ children, className = "", direction = "right", ...props }: CtaLinkProps) {
  return (
    <Link
      className={`cta-link group inline-flex items-center gap-2 text-[13px] font-normal uppercase tracking-[0.08em] text-[var(--color-hero)] transition-colors hover:text-[var(--color-accent)] ${className}`}
      {...props}
    >
      <span>{children}</span>
      <Arrow
        className="transition-transform duration-300 group-hover:translate-x-1"
        direction={direction}
      />
    </Link>
  );
}
