import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.terms;

function pageTitle(): string {
  const meta = PAGE_METADATA.terms;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title) {
    return String(meta.title.absolute);
  }
  return "Sydra Terms of Use";
}

function TermsPageJsonLd() {
  return (
    <>
      <BreadcrumbJsonLd items={[...BREADCRUMBS.terms]} />
      <PageJsonLd
        data={[
          webPageJsonLd({
            path: "/terms",
            name: pageTitle(),
            description: PAGE_METADATA.terms.description ?? "",
          }),
        ]}
      />
    </>
  );
}

export default function TermsPage() {
  return (
    <>
      <TermsPageJsonLd />
      <SydraPageShell breadcrumb={[...BREADCRUMBS.terms]} headerVariant="funnel">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold text-[#1A2B48] sm:text-3xl">Terms of use</h1>
          <p className="mt-6 text-[15px] leading-relaxed text-[#4A5568]">
            By using this website you agree to these terms. This site is for
            informational and lead capture purposes. Use of the Sydra software is
            governed by separate customer agreements and BAAs.
          </p>
          <h2 className="mt-10 text-lg font-semibold text-[#1A2B48]">No medical or legal advice</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
            Content on this site is not medical, legal, or billing advice. Outcomes
            depend on payer behavior, IDRE decisions, and your documentation.
          </p>
          <h2 className="mt-10 text-lg font-semibold text-[#1A2B48]">Accuracy</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
            We strive to keep product descriptions current but do not guarantee
            every statement reflects the latest release. Demo calls confirm fit and
            capabilities for your practice.
          </p>
          <p className="mt-10 text-sm text-slate-500">
            Questions?{" "}
            <Link
              className="font-medium text-[#1A2B48] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href="/contact"
            >
              Contact us
            </Link>
            .
          </p>
        </article>
      </SydraPageShell>
    </>
  );
}
