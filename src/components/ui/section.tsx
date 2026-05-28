import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  ariaLabelledby?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "neutral" | "hero";
  topRule?: boolean;
  /** Inline eyebrow above section content */
  sidebarLabel?: string;
  as?: "section" | "div";
};

const toneClasses = {
  white: "bg-white text-brand",
  neutral: "bg-neutral-section text-brand",
  hero: "bg-hero-gradient text-white",
} as const;

export function Section({
  id,
  ariaLabelledby,
  children,
  className = "",
  tone = "white",
  topRule = false,
  sidebarLabel,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      aria-labelledby={ariaLabelledby}
      className={`relative border-b border-rule py-[var(--space-section)] ${toneClasses[tone]} ${className}`}
      id={id}
    >
      {topRule ? (
        <div aria-hidden className="absolute inset-x-0 top-0 border-t border-rule" />
      ) : null}
      <div className="relative mx-auto w-full min-w-0 max-w-[1280px] px-6 md:px-10">
        {sidebarLabel ? (
          <p
            className={`type-caption mb-6 ${tone === "hero" ? "text-white/60" : "text-body/70"}`}
          >
            {sidebarLabel}
          </p>
        ) : null}
        {children}
      </div>
    </Tag>
  );
}
