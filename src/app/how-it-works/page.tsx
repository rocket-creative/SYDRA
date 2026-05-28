import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import {
  DOCX_SECTION,
  HOW_IT_WORKS_HERO,
  ONE_PER_CPT_SECTION,
  SUBMISSION_FOOTNOTE,
  SUBMISSION_REQUIREMENTS,
  SYDRA_ELEMENTS,
} from "@/lib/content/how-it-works-page";
import { serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.howItWorks;

function pageTitle(): string {
  const meta = PAGE_METADATA.howItWorks;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "How Sydra Works";
}

function HowItWorksJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.howItWorks]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/how-it-works",
            name: pageTitle(),
            description: PAGE_METADATA.howItWorks.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR Workflow",
            description:
              "Upload an EOB, draft a specialty coded IDR in under 5 minutes, and submit with your billing team in control.",
            serviceType: "Healthcare billing software",
          }),
        ]}
      />
    </>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.howItWorks]}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2.25rem]">
            {HOW_IT_WORKS_HERO.title}
            <span className="mt-2 block text-xl font-medium text-[#4A5568] md:text-2xl">
              {HOW_IT_WORKS_HERO.subtitle}
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            {HOW_IT_WORKS_HERO.lead}
          </p>

          <section aria-labelledby={SUBMISSION_REQUIREMENTS.id} className="mt-14">
            <h2 className="text-xl font-semibold text-[#1A2B48]" id={SUBMISSION_REQUIREMENTS.id}>
              {SUBMISSION_REQUIREMENTS.title}
            </h2>
            {SUBMISSION_REQUIREMENTS.list ? (
              <ol className="mt-6 list-decimal space-y-4 pl-5 text-[15px] leading-relaxed text-[#4A5568]">
                {SUBMISSION_REQUIREMENTS.list.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ol>
            ) : null}
            <p className="mt-6 text-[15px] leading-relaxed text-[#4A5568]">{SUBMISSION_FOOTNOTE}</p>
          </section>

          <section aria-labelledby="heading-sydra-elements" className="mt-14">
            <h2 className="text-xl font-semibold text-[#1A2B48]" id="heading-sydra-elements">
              What Sydra does on each element.
            </h2>
            <div className="mt-8 space-y-10">
              {SYDRA_ELEMENTS.map((section) => (
                <div key={section.id}>
                  <h3 className="text-lg font-semibold text-[#1A2B48]">{section.title}</h3>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {[DOCX_SECTION, ONE_PER_CPT_SECTION].map((section) => (
            <section key={section.id} aria-labelledby={section.id} className="mt-14">
              <h2 className="text-xl font-semibold text-[#1A2B48]" id={section.id}>
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-[#4A5568]">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-14 text-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/demo"
            >
              Schedule a demo
            </Link>
            <CtaTrustSignals className="mt-4" />
          </div>

          <ServiceCrossLinks current="/how-it-works" />
          <SourcesReferences className="mt-12" />
        </div>
      </SydraPageShell>
    </>
  );
}
