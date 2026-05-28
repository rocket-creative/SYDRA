import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { CtaTrustSignals } from "@/components/sydra/cta-trust-signals";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { ServiceCrossLinks } from "@/components/sydra/service-cross-links";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { salesMailtoHref } from "@/lib/contact";
import {
  SECURITY_CTA,
  SECURITY_HERO,
  SECURITY_SECTIONS,
  SOC2_SECTION,
} from "@/lib/content/security-page";
import { serviceJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
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
      <SydraPageShell breadcrumb={[...BREADCRUMBS.security]}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            {SECURITY_HERO.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            {SECURITY_HERO.intro}
          </p>

          <section aria-labelledby={SOC2_SECTION.id} className="mt-10 rounded-xl border-2 border-amber-200 bg-amber-50 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#1A2B48]" id={SOC2_SECTION.id}>
              {SOC2_SECTION.title}
            </h2>
            {SOC2_SECTION.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                {p}
              </p>
            ))}
          </section>

          <div className="mt-12 space-y-12">
            {SECURITY_SECTIONS.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 className="text-lg font-semibold text-[#1A2B48]" id={section.id}>
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
                    {p}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#4A5568]">
                    {section.list.map((item) => (
                      <li key={item.slice(0, 40)} className="flex gap-2">
                        <span aria-hidden className="text-[rgb(0,40,184)]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/demo"
            >
              {SECURITY_CTA.demoLabel}
            </Link>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50"
              href={salesMailtoHref()}
            >
              {SECURITY_CTA.mailtoLabel}
            </a>
          </div>
          <CtaTrustSignals className="mt-6 text-center" />

          <ServiceCrossLinks current="/security" />
          <SourcesReferences className="mt-12" />
        </div>
      </SydraPageShell>
    </>
  );
}
