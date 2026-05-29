import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import {
  DEMO_CTA_LEAD,
  DOCX_SECTION,
  HOW_IT_WORKS_HERO,
  ONE_PER_CPT_SECTION,
  SUBMISSION_FOOTNOTE,
  SUBMISSION_REQUIREMENTS,
  SYDRA_ELEMENTS,
} from "@/lib/content/how-it-works-page";
import { serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

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
        <header>
          <h1 className={textStyles.pageTitle}>
            {HOW_IT_WORKS_HERO.title}
            <span className={textStyles.pageSubtitle}>{HOW_IT_WORKS_HERO.subtitle}</span>
          </h1>
          <p className={textStyles.pageLead}>{HOW_IT_WORKS_HERO.lead}</p>
        </header>

        <section aria-labelledby={SUBMISSION_REQUIREMENTS.id} className="mt-14">
          <h2 className={textStyles.sectionTitle} id={SUBMISSION_REQUIREMENTS.id}>
            {SUBMISSION_REQUIREMENTS.title}
          </h2>
          {SUBMISSION_REQUIREMENTS.list ? (
            <ol className={textStyles.list}>
              {SUBMISSION_REQUIREMENTS.list.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ol>
          ) : null}
          <p className={`${textStyles.bodyMeasure} mt-6`}>{SUBMISSION_FOOTNOTE}</p>
        </section>

        <section aria-labelledby="heading-sydra-elements" className="mt-14">
          <h2 className={textStyles.sectionTitle} id="heading-sydra-elements">
            What Sydra does on each element.
          </h2>
          <div className="mt-8 space-y-10 prose-measure">
            {SYDRA_ELEMENTS.map((section) => (
              <div key={section.id}>
                <h3 className={textStyles.subsectionTitle}>{section.title}</h3>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className={`${textStyles.body} mt-3`}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {[DOCX_SECTION, ONE_PER_CPT_SECTION].map((section) => (
          <section key={section.id} aria-labelledby={section.id} className="mt-14">
            <h2 className={textStyles.sectionTitle} id={section.id}>
              {section.title}
            </h2>
            <div className={textStyles.bodyStack}>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <div className="prose-measure mt-14">
          <p className={`${textStyles.body} mb-6`}>{DEMO_CTA_LEAD}</p>
          <Button href="/demo" showArrow>
            Schedule a demo
          </Button>
          <CtaTrustSignals className="mt-4" />
        </div>

        <ServiceCrossLinks current="/how-it-works" />
        <SourcesReferences className="mt-12" />
      </SydraPageShell>
    </>
  );
}
