import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Arrow } from "@/components/ui/arrow";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] px-6 text-[13px] font-normal uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const variants = {
  solid:
    "border border-transparent bg-[var(--color-hero)] text-white hover:bg-[#0f1c30] active:bg-[#0a1525]",
  ghost:
    "border border-[var(--color-hero)] bg-transparent text-[var(--color-hero)] hover:bg-[var(--color-hero)] hover:text-white",
  solidOnDark:
    "border border-white bg-white text-[var(--color-hero)] hover:bg-[var(--color-neutral)]",
  ghostOnDark:
    "border border-white/80 bg-transparent text-white hover:bg-white hover:text-[var(--color-hero)]",
} as const;

type ButtonVariant = keyof typeof variants;

type ButtonProps = {
  variant?: ButtonVariant;
  showArrow?: boolean;
  children: ReactNode;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

export function Button({
  variant = "solid",
  showArrow = false,
  children,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const linkRest = rest as Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;
  const anchorRest = rest as Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? <Arrow className="shrink-0" /> : null}
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a className={classes} href={href} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...buttonRest}>
      {content}
    </button>
  );
}
