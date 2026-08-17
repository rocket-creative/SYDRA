import type { ReactNode } from "react";

type HomepageBandProps = {
  id?: string;
  ariaLabelledby?: string;
  children: ReactNode;
  tone: "white" | "alt";
  statement?: boolean;
};

const toneClass = {
  white: "bg-white",
  alt: "bg-neutral-section",
} as const;

/** Homepage-only section chrome: 1200px, 2.7 gutters and padding. */
export function HomepageBand({
  id,
  ariaLabelledby,
  children,
  tone,
  statement = false,
}: HomepageBandProps) {
  const padding = statement
    ? "py-16 md:py-24 lg:py-32"
    : "py-12 md:py-16 lg:py-24";

  return (
    <section
      aria-labelledby={ariaLabelledby}
      className={`${toneClass[tone]} ${padding} text-brand`}
      id={id}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">{children}</div>
    </section>
  );
}
