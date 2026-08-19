import { CALENDLY_EMBED_URL } from "@/lib/calendly";

type CalendlyEmbedProps = {
  className?: string;
};

export function CalendlyEmbed({ className = "" }: CalendlyEmbedProps) {
  return (
    <div
      className={`w-full overflow-hidden bg-stone-100 ${className}`.trim()}
      id="schedule"
    >
      <iframe
        className="min-h-[700px] w-full border-0"
        loading="lazy"
        src={CALENDLY_EMBED_URL}
        title="Schedule a Sydra demo"
      />
    </div>
  );
}
