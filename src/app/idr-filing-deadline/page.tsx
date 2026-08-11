import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import {
  IDR_FILING_DEADLINE_CMS_HREF,
  IDR_FILING_DEADLINE_CMS_LABEL,
  IDR_FILING_DEADLINE_CTA_LEAD,
  IDR_FILING_DEADLINE_FAQS,
  IDR_FILING_DEADLINE_HERO,
  IDR_FILING_DEADLINE_SECTIONS,
  IDR_FILING_DEADLINE_WINDOWS,
} from "@/lib/content/idr-filing-deadline-page";
import { faqPageJsonLd, medicallyReviewedWebPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.idrFilingDeadline;

function IdrFilingDeadlineJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.idrFilingDeadline]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/idr-filing-deadline",
            name: "Federal IDR filing deadline",
            description: PAGE_METADATA.idrFilingDeadline.description ?? "",
          }),
          faqPageJsonLd(IDR_FILING_DEADLINE_FAQS),
        ]}
      />
    </>
  );
}

function TwoWindowsVisual() {
  const [openNegotiation, initiation] = IDR_FILING_DEADLINE_WINDOWS;

  return (
    <div
      aria-label="Federal IDR filing windows: 30 business days open negotiation, then 4 business days to initiate"
      className="mt-10 border-t border-rule pt-10"
    >
      <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6">
        <div>
          <p className="type-caption text-body/70">Window {openNegotiation.step}</p>
          <p className="mt-3 type-h2 text-brand">{openNegotiation.duration}</p>
          <p className="mt-2 text-lg font-medium text-brand">{openNegotiation.title}</p>
          <p className={`${textStyles.body} mt-3 max-w-md`}>{openNegotiation.detail}</p>
        </div>
        <div aria-hidden className="flex items-center md:justify-center md:pt-10">
          <span className="type-caption text-body/50">then</span>
        </div>
        <div>
          <p className="type-caption text-body/70">Window {initiation.step}</p>
          <p className="mt-3 type-h2 text-brand">{initiation.duration}</p>
          <p className="mt-2 text-lg font-medium text-brand">{initiation.title}</p>
          <p className={`${textStyles.body} mt-3 max-w-md`}>{initiation.detail}</p>
        </div>
      </div>
      <p className={`${textStyles.body} mt-8 border-t border-rule pt-8`}>
        Miss either window and the claim is closed for that cycle.
      </p>
    </div>
  );
}

export default function IdrFilingDeadlinePage() {
  const [twoWindows, ...restSections] = IDR_FILING_DEADLINE_SECTIONS;

  return (
    <>
      <IdrFilingDeadlineJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.idrFilingDeadline]}>
        <Section ariaLabelledby="heading-idr-filing-deadline" tone="white">
          <header className="prose-measure">
            <p className="type-caption mb-4 uppercase tracking-[0.12em] text-body/70">
              {IDR_FILING_DEADLINE_HERO.eyebrow}
            </p>
            <h1 className={textStyles.pageTitle} id="heading-idr-filing-deadline">
              {IDR_FILING_DEADLINE_HERO.title}
              <span className={textStyles.pageSubtitle}>
                {IDR_FILING_DEADLINE_HERO.subtitle}
              </span>
            </h1>
            <p className={textStyles.pageLead}>{IDR_FILING_DEADLINE_HERO.lead}</p>
            <div className="mt-8">
              <Button href="/demo" showArrow>
                Check my filing window
              </Button>
              <CtaTrustSignals className="mt-4" />
            </div>
          </header>
        </Section>

        <Section
          ariaLabelledby={twoWindows.id}
          sidebarLabel="The two windows"
          tone="neutral"
        >
          <h2 className={textStyles.sectionTitle} id={twoWindows.id}>
            {twoWindows.title}
          </h2>
          <div className={`${textStyles.bodyStack} mt-4`}>
            {twoWindows.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <p>
              See{" "}
              <a
                className={textStyles.textLink}
                href={IDR_FILING_DEADLINE_CMS_HREF}
                rel="noopener noreferrer"
                target="_blank"
              >
                {IDR_FILING_DEADLINE_CMS_LABEL}
              </a>{" "}
              for the federal rules behind both clocks.
            </p>
          </div>
          <TwoWindowsVisual />
        </Section>

        <Section tone="white">
          <div className="space-y-14">
            {restSections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.sectionTitle} id={section.id}>
                  {section.title}
                </h2>
                <div className={`${textStyles.bodyStack} mt-4`}>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>

        <Section tone="neutral">
          <div className="prose-measure">
            <p className={`${textStyles.body} mb-6`}>{IDR_FILING_DEADLINE_CTA_LEAD}</p>
            <Button href="/demo" showArrow>
              Check my filing window
            </Button>
            <CtaTrustSignals className="mt-4" />
          </div>
          <ServiceFaqSection
            heading="Questions about the filing deadline"
            id="heading-idr-filing-deadline-faq"
            items={IDR_FILING_DEADLINE_FAQS}
          />
          <ServiceCrossLinks current="/idr-filing-deadline" />
          <MedicalReviewBlock />
          <SourcesReferences className="mt-12" />
        </Section>

        <SydraCtaBand />
      </SydraPageShell>
    </>
  );
}
