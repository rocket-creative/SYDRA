import { SITE_SOURCES } from "@/lib/content/sources";
import { textStyles } from "@/lib/typography";

type SourcesReferencesProps = {
  className?: string;
};

export function SourcesReferences({ className = "" }: SourcesReferencesProps) {
  return (
    <section
      aria-labelledby="heading-sources"
      className={`prose-measure border-t border-rule pt-10 ${className}`}
    >
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-brand marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            Sourced references
            <span aria-hidden className="text-body/50 transition group-open:rotate-180">
              ▾
            </span>
          </span>
        </summary>
        <ol className={`${textStyles.listNone} mt-4 text-sm`} id="heading-sources">
          {SITE_SOURCES.map((ref, index) => (
            <li key={ref.id}>
              <span className="font-medium text-brand">
                {index + 1}. {ref.label}
              </span>
              {ref.detail ? (
                <span className={`${textStyles.meta} mt-0.5 block`}>{ref.detail}</span>
              ) : null}
              {ref.url ? (
                <a
                  className={`${textStyles.textLink} mt-0.5 block break-all text-sm`}
                  href={ref.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {ref.url.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
