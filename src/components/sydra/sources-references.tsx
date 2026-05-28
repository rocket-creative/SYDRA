const REFERENCES = [
  {
    title: "CMS Federal IDR Q1/Q2 2025 Public Use File",
    detail: "Released January 21, 2026",
    url: "https://www.cms.gov/nosurprises/policies-and-resources/reports",
  },
  {
    title: "Georgetown University CHIR · Health Affairs webinar",
    detail: "March 2026 — 3.4 million disputes through June 2025; 88% win rate; median award ~4.5x in network rate",
  },
  {
    title: "Zelis — NSA IDR Eligibility Challenges",
    detail: "March 2026 — 44% of 2024 IDR cases challenged as ineligible by non initiating party",
  },
  {
    title: "ACEP analysis of CMS data",
    detail: "~10% of eligible claims estimated to reach IDR arbitration",
  },
  {
    title: "Brookings Institution NSA Arbitration Databook",
    detail: "April 2026",
    url: "https://www.brookings.edu/articles/no-surprises-act-arbitration-databook",
  },
  {
    title: "ACR — Providers Prevail in Vast Majority of IDR Claims",
    detail: "January 2026 — 88% of disputes found in provider's favor; 87% of awards exceeded QPA",
  },
  {
    title: "No Surprises Act: Public Law 116-260, Division BB, Title I",
  },
  {
    title: "Federal IDR regulations: 45 CFR Part 149",
    url: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-F/part-149",
  },
  {
    title: "CMS No Surprises Act overview",
    url: "https://www.cms.gov/nosurprises",
  },
  {
    title: "HHS HIPAA for professionals",
    url: "https://www.hhs.gov/hipaa/for-professionals",
  },
] as const;

type SourcesReferencesProps = {
  className?: string;
};

export function SourcesReferences({ className = "" }: SourcesReferencesProps) {
  return (
    <section
      aria-labelledby="heading-sources"
      className={`mx-auto max-w-3xl border-t border-slate-200 pt-10 ${className}`}
    >
      <details className="group">
        <summary className="cursor-pointer list-none text-sm font-semibold text-[#1A2B48] marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            Sourced references
            <span
              aria-hidden
              className="text-slate-400 transition group-open:rotate-180"
            >
              ▾
            </span>
          </span>
        </summary>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-[#4A5568]" id="heading-sources">
          {REFERENCES.map((ref, index) => (
            <li key={ref.title}>
              <span className="font-medium text-slate-700">
                {index + 1}. {ref.title}
              </span>
              {"detail" in ref && ref.detail ? (
                <span className="mt-0.5 block text-slate-600">{ref.detail}</span>
              ) : null}
              {"url" in ref && ref.url ? (
                <a
                  className="mt-0.5 block text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-2 hover:decoration-[rgb(0,40,184)]"
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
