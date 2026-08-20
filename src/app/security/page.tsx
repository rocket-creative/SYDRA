import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { MedicalReviewBlock } from "@/components/sydra/clinical-trust";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { caseReviewUrl } from "@/lib/case-review";
import { salesMailtoHref } from "@/lib/contact";
import {
  SECURITY_CTA,
  SECURITY_HERO,
  SECURITY_SECTIONS,
  SOC2_SECTION,
} from "@/lib/content/security-page";
import { SECURITY_FAQ } from "@/lib/content/service-faqs";
import { EDITORIAL } from "@/lib/images";
import { faqPageJsonLd, medicallyReviewedWebPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { textStyles } from "@/lib/typography";

export const metadata = PAGE_METADATA.security;

function pageTitle(): string {
  const meta = PAGE_METADATA.security;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Security";
}

function SecurityPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.security]} />
      <PageJsonLd
        data={[
          ...medicallyReviewedWebPageJsonLd({
            path: "/security",
            name: pageTitle(),
            description: PAGE_METADATA.security.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra security and HIPAA safeguards",
            description: PAGE_METADATA.security.description ?? "",
            serviceType: "Healthcare data security",
          }),
          faqPageJsonLd(SECURITY_FAQ),
        ]}
      />
    </>
  );
}

export default function SecurityPage() {
  return (
    <>
      <SecurityPageJsonLd />
      <SydraPageShell
        banded
        breadcrumb={[...BREADCRUMBS.security]}
        stickyCtaHref={caseReviewUrl("security-sticky")}
      >
        <Section ariaLabelledby="heading-security" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-security">
              {SECURITY_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{SECURITY_HERO.intro}</p>
          </header>
          <EditorialImage
            aspect="3/2"
            asset={EDITORIAL.executiveDocumentReview}
            className="mt-10"
            eager
            focus="upper"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </Section>

        <Section sidebarLabel="SOC 2" tone="neutral">
          <section
            aria-labelledby={SOC2_SECTION.id}
            className="prose-measure border-l-2 border-[var(--color-accent)] py-1 pl-6"
          >
            <h2 className={textStyles.subsectionTitle} id={SOC2_SECTION.id}>
              {SOC2_SECTION.title}
            </h2>
            {SOC2_SECTION.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className={`${textStyles.body} mt-3`}>
                {p}
              </p>
            ))}
          </section>
        </Section>

        <Section sidebarLabel="Safeguards" tone="white">
          <div className="space-y-12 prose-measure">
            {SECURITY_SECTIONS.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className={textStyles.subsectionTitle} id={section.id}>
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className={`${textStyles.body} mt-3`}>
                    {p}
                  </p>
                ))}
                {section.list ? (
                  <ul className={`${textStyles.listNone} mt-4`}>
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)} className="flex gap-3">
                        <span aria-hidden className="type-caption text-[var(--color-accent)]">
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Section>

        <Section tone="neutral">
          <ServiceFaqSection
            heading="Security FAQ"
            id="heading-security-faq"
            items={SECURITY_FAQ}
          />
        </Section>

        <Section tone="white">
          <CtaTrustSignals className="prose-measure" />
          <ServiceCrossLinks current="/security" />
          <MedicalReviewBlock />
        </Section>

        <SydraCtaBand
          ctaLabel={SECURITY_CTA.demoLabel}
          ctaHref="/demo"
          secondaryHref={salesMailtoHref()}
          secondaryLabel={SECURITY_CTA.mailtoLabel}
        />
      </SydraPageShell>
    </>
  );
}
