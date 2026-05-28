type SplitHeadlineProps = {
  text: string;
  className?: string;
  /** ms delay before first word starts */
  delay?: number;
  /** ms between each word */
  stagger?: number;
};

/**
 * Renders a headline word-by-word with a clipped upward reveal.
 * CSS-only — no JS needed. Words rise from behind a masked line.
 */
export function SplitHeadline({
  text,
  className,
  delay = 120,
  stagger = 60,
}: SplitHeadlineProps) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <span
            className="animate-word-in inline-block"
            style={{
              animationDelay: `${delay + i * stagger}ms`,
              animationFillMode: "both",
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
