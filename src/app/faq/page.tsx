import { CtaLink } from "@/components/ui/cta-link";
import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { SydraCtaBand } from "@/components/sydra/cta-band";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { SourcesReferences } from "@/components/sydra/sources-references";
import { Section } from "@/components/ui/section";
import { FAQ_PAGE_ITEMS } from "@/lib/content/faq-page";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.faq;

function pageTitle(): string {
  const meta = PAGE_METADATA.faq;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra FAQ";
}

function FaqPageJsonLd() {
  const questions = FAQ_PAGE_ITEMS.map(({ q, a }) => ({ q, a: String(a) }));
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.faq]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/faq",
            name: pageTitle(),
            description: PAGE_METADATA.faq.description ?? "",
          }),
          faqPageJsonLd(questions),
        ]}
      />
    </>
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqPageJsonLd />
      <SydraPageShell banded breadcrumb={[...BREADCRUMBS.faq]}>
        <Section ariaLabelledby="heading-faq" tone="white">
          <header className="max-w-2xl">
            <h1 className="type-h1 text-brand" id="heading-faq">
              Questions about Sydra.
              <span className="mt-4 block type-h2 text-body">Answered specifically.</span>
            </h1>
          </header>
        </Section>

        <Section sidebarLabel="FAQ" tone="neutral">
          <div className="max-w-2xl divide-y divide-[var(--color-rule)] border-y border-rule">
            {FAQ_PAGE_ITEMS.map((item) => (
              <details key={item.q} className="group py-0">
                <summary className="cursor-pointer list-none py-6 text-left text-base font-normal text-brand md:text-[17px] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-6">
                    {item.q}
                    <span
                      aria-hidden
                      className="type-caption shrink-0 text-body transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-rule pb-6 pt-2 text-[15px] leading-relaxed text-body">
                  <p>{item.a}</p>
                  {item.q.includes("cost") ? (
                    <p className="mt-4">
                      <CtaLink href="/demo">Schedule a demo for pricing</CtaLink>
                    </p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </Section>

        <SydraCtaBand />

        <Section tone="white">
          <SourcesReferences />
        </Section>
      </SydraPageShell>
    </>
  );
}
