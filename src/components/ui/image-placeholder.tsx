type Aspect = "3/4" | "4/5" | "16/9" | "fill";

type ImagePlaceholderProps = {
  aspect?: Aspect;
  className?: string;
  /** Shown in dev/visual only; hidden from assistive tech when decorative */
  decorative?: boolean;
};

const aspectClass: Record<Exclude<Aspect, "fill">, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
};

/** Neutral block until brand photography is ready. */
export function ImagePlaceholder({
  aspect = "16/9",
  className = "",
  decorative = true,
}: ImagePlaceholderProps) {
  const base = "w-full bg-surface-muted";

  if (aspect === "fill") {
    return (
      <div
        aria-hidden={decorative}
        className={`${base} size-full min-h-[12rem] ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden={decorative}
      className={`${base} ${aspectClass[aspect]} ${className}`}
    />
  );
}
