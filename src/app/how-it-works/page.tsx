import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { DualPageCta } from "@/components/sydra/dual-page-cta";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { RegulatoryAsOf } from "@/components/sydra/regulatory-as-of";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import {
  DOCX_SECTION,
  HOW_IT_WORKS_HERO,
  HOW_IT_WORKS_HOW_TO_STEPS,
  ONE_PER_CPT_SECTION,
  SUBMISSION_FOOTNOTE,
  SUBMISSION_REQUIREMENTS,
  SYDRA_ELEMENTS,
} from "@/lib/content/how-it-works-page";
import { HOW_IT_WORKS_FAQ } from "@/lib/content/service-faqs";
import {
  faqPageJsonLd,
  howToJsonLd,
  medicallyReviewedWebPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";
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
  const description = PAGE_METADATA.howItWorks.description ?? "";
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.howItWorks]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/how-it-works",
            name: pageTitle(),
            description,
          }),
          serviceJsonLd({
            name: "Sydra NSA IDR Workflow",
            description:
              "Upload an EOB, draft a specialty coded IDR in under 5 minutes, and submit with your billing team in control.",
            serviceType: "Healthcare billing software",
          }),
          howToJsonLd({
            path: "/how-it-works",
            name: pageTitle(),
            description,
            steps: HOW_IT_WORKS_HOW_TO_STEPS,
          }),
          faqPageJsonLd(HOW_IT_WORKS_FAQ),
        ]}
      />
    </>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksJsonLd />
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.howItWorks]}
        stickyCtaHref={caseReviewUrl("how-it-works-sticky")}
      >
        <Section ariaLabelledby="heading-how-it-works" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-how-it-works">
              {HOW_IT_WORKS_HERO.title}
              <span className={textStyles.pageSubtitle}>{HOW_IT_WORKS_HERO.subtitle}</span>
            </h1>
            {HOW_IT_WORKS_HERO.paragraphs.map((p, index) => (
              <p className={index === 0 ? textStyles.pageLead : `${textStyles.body} mt-4`} key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
          </header>
          <EditorialImage
            alt="Close view of a clinician signing a completed IDR submission"
            aspect="16/9"
            className="mt-10"
            eager
            sizes="(max-width: 1024px) 100vw, 1200px"
            src="/images/editorial/claim-signature-detail.png"
          />
        </Section>

        <Section sidebarLabel="Requirements" tone="neutral">
          <section aria-labelledby={SUBMISSION_REQUIREMENTS.id}>
            <h2 className={textStyles.sectionTitle} id={SUBMISSION_REQUIREMENTS.id}>
              {SUBMISSION_REQUIREMENTS.title}
            </h2>
            {SUBMISSION_REQUIREMENTS.paragraphs.map((p) => (
              <p className={`${textStyles.bodyMeasure} mt-4`} key={p.slice(0, 40)}>
                {p}
              </p>
            ))}
            {SUBMISSION_REQUIREMENTS.list ? (
              <ol className={textStyles.list}>
                {SUBMISSION_REQUIREMENTS.list.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ol>
            ) : null}
            <p className={`${textStyles.bodyMeasure} mt-6`}>{SUBMISSION_FOOTNOTE}</p>
          </section>
        </Section>

        <Section sidebarLabel="Elements" tone="white">
          <section aria-labelledby="heading-sydra-elements">
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
        </Section>

        <Section tone="neutral">
          <div className="space-y-14">
            {[DOCX_SECTION, ONE_PER_CPT_SECTION].map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.title}
                </h2>
                <div className={textStyles.bodyStack}>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {section.id === "heading-one-per-cpt" ? (
                  <RegulatoryAsOf className="mt-6" />
                ) : null}
              </section>
            ))}
          </div>
        </Section>

        <Section tone="white">
          <ServiceFaqSection
            heading="How it works FAQ"
            id="heading-how-it-works-faq"
            items={HOW_IT_WORKS_FAQ}
          />
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <DualPageCta />
            <CtaTrustSignals className="mt-4" />
          </div>
          <ServiceCrossLinks current="/how-it-works" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
