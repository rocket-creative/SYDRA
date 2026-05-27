import Link from "next/link";

import { ReviewHighlight } from "@/components/sydra/review-highlight";

type ClinicalReferencesProps = {
  id?: string;
};

const REFERENCES = [
  {
    label: "CMS No Surprises Act overview",
    href: "https://www.cms.gov/nosurprises",
  },
  {
    label: "Federal independent dispute resolution process",
    href: "https://www.cms.gov/nosurprises/consumers/faqs-independent-dispute-resolution",
  },
  {
    label: "HHS HIPAA for professionals",
    href: "https://www.hhs.gov/hipaa/for-professionals/index.html",
  },
] as const;

export function ClinicalReferences({ id = "heading-references" }: ClinicalReferencesProps) {
  return (
    <section aria-labelledby={id} className="mx-auto mt-16 max-w-3xl">
      <h2 className="text-lg font-semibold text-[#1A2B48]" id={id}>
        <ReviewHighlight>Where can I verify NSA IDR and HIPAA requirements?</ReviewHighlight>
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[#4A5568]">
        {REFERENCES.map((ref) => (
          <li key={ref.href}>
            <a
              className="font-medium text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href={ref.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ReviewHighlight>{ref.label}</ReviewHighlight>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

type MedicalReviewBlockProps = {
  id?: string;
};

export function MedicalReviewBlock({ id = "heading-medical-review" }: MedicalReviewBlockProps) {
  return (
    <aside
      aria-labelledby={id}
      className="mx-auto mt-12 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 px-6 py-5 md:px-8"
    >
      <h2 className="text-sm font-semibold text-[#1A2B48]" id={id}>
        Clinical review
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-[#4A5568]">
        <ReviewHighlight>
          Medically reviewed by{" "}
          <Link
            className="font-medium text-[#1A2B48] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/about"
          >
            Dr. John Abrahams, MD, FAANS
          </Link>
          . Last reviewed: May 27, 2026.
        </ReviewHighlight>
      </p>
    </aside>
  );
}
