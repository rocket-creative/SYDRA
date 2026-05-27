import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/sydra/breadcrumb-json-ld";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { FAQ_CATEGORIES, FAQ_PAGE_ITEMS } from "@/lib/content/faq-page";
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
      <SydraPageShell breadcrumb={[...BREADCRUMBS.faq]}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#4A5568]">
            Objections handled in writing. Still have questions?{" "}
            <Link
              className="font-medium text-[rgb(0,40,184)] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href="/demo"
            >
              Schedule a demo
            </Link>
            .
          </p>

          {FAQ_CATEGORIES.map((category) => {
            const items = FAQ_PAGE_ITEMS.filter((item) => item.category === category);
            if (items.length === 0) return null;

            return (
              <section key={category} className="mt-12" aria-labelledby={`faq-cat-${category}`}>
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  id={`faq-cat-${category}`}
                >
                  {category}
                </h2>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl border border-slate-200 bg-white px-4 py-1 shadow-sm open:border-slate-300 md:px-5"
                    >
                      <summary className="cursor-pointer list-none py-4 text-left text-base font-semibold text-[#1A2B48] outline-none ring-offset-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-600 md:text-[17px] [&::-webkit-details-marker]:hidden">
                        {item.q}
                      </summary>
                      <div className="border-t border-slate-100 pb-4 pt-2 text-[15px] leading-relaxed text-[#4A5568]">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </SydraPageShell>
    </>
  );
}
