import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { ClinicalReferences } from "@/components/sydra/clinical-trust";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { DemoFunnelForm } from "@/components/sydra/demo-funnel-form";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ReviewHighlight } from "@/components/sydra/review-highlight";
import { SecurityTrustGrid } from "@/components/sydra/security-trust-grid";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { ServiceFaqSection } from "@/components/sydra/service-faq-section";
import { securityMailtoHref } from "@/lib/contact";
import {
  SECURITY_CTA,
  SECURITY_HERO,
  SECURITY_SECTIONS,
} from "@/lib/content/security-page";
import { SECURITY_FAQ } from "@/lib/content/service-faqs";
import { faqPageJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

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
            description:
              "Built to support HIPAA safeguards, BAA on request, AWS hosting, encryption, tenant isolation, audit logging, and SOC 2 aligned controls for surgical billing teams.",
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
      <SydraPageShell breadcrumb={[...BREADCRUMBS.security]}>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)]">
            {SECURITY_HERO.eyebrow}
          </p>
          <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            <ReviewHighlight>{SECURITY_HERO.title}</ReviewHighlight>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            {SECURITY_HERO.intro}
          </p>

          <SecurityTrustGrid />

          <div className="mt-16 space-y-12">
            {SECURITY_SECTIONS.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className="text-lg font-semibold text-[#1A2B48]" id={section.id}>
                  <ReviewHighlight>{section.title}</ReviewHighlight>
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 text-[15px] leading-relaxed text-[#4A5568]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div
            className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-10"
            id="security-request"
          >
            <h2 className="text-lg font-semibold text-[#1A2B48]" id="heading-security-request">
              <ReviewHighlight>{SECURITY_CTA.formHeading}</ReviewHighlight>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              {SECURITY_CTA.formIntro}
            </p>
            <div className="mt-8">
              <DemoFunnelForm intent="security" />
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">or</p>
            <div className="mt-4 flex justify-center">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                href={securityMailtoHref()}
              >
                {SECURITY_CTA.mailtoLabel}
              </a>
            </div>
            <CtaTrustSignals className="mt-6 text-center" />
          </div>

          <ServiceFaqSection
            heading="What do compliance teams ask about Sydra security?"
            id="heading-security-faq"
            items={SECURITY_FAQ}
          />

          <ClinicalReferences />

          <ServiceCrossLinks current="/security" />
        </div>
      </SydraPageShell>
    </>
  );
}
