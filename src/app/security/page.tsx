import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { salesMailtoHref } from "@/lib/contact";
import {
  SECURITY_CTA,
  SECURITY_HERO,
  SECURITY_SECTIONS,
  SOC2_SECTION,
} from "@/lib/content/security-page";
import { serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
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
          webPageJsonLd({
            path: "/security",
            name: pageTitle(),
            description: PAGE_METADATA.security.description ?? "",
          }),
          serviceJsonLd({
            name: "Sydra security and HIPAA safeguards",
            description: PAGE_METADATA.security.description ?? "",
            serviceType: "Healthcare data security",
          }),
        ]}
      />
    </>
  );
}

export default function SecurityPage() {
  return (
    <>
      <SecurityPageJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.security]}>
        <Section ariaLabelledby="heading-security" tone="white">
          <header className="prose-measure">
            <h1 className={textStyles.pageTitle} id="heading-security">
              {SECURITY_HERO.title}
            </h1>
            <p className={textStyles.pageLead}>{SECURITY_HERO.intro}</p>
          </header>
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
          <div className="prose-measure flex flex-col gap-4 sm:flex-row">
            <Button href="/demo" showArrow>
              {SECURITY_CTA.demoLabel}
            </Button>
            <Button href={salesMailtoHref()} variant="ghost">
              {SECURITY_CTA.mailtoLabel}
            </Button>
          </div>
          <CtaTrustSignals className="prose-measure mt-6" />
          <ServiceCrossLinks current="/security" />
          <SourcesReferences className="mt-12" />
        </Section>
      </SydraPageShell>
    </>
  );
}
