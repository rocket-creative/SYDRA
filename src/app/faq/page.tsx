import type { Metadata } from "next";
import Link from "next/link";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { FAQ_CATEGORIES, FAQ_PAGE_ITEMS } from "@/lib/content/faq-page";
import { siteUrl } from "@/lib/site";

const description =
  "Answers about onboarding, pricing, workflow, claims, support, and when to choose Kronos Full-Service instead of Sydra software.";

export const metadata: Metadata = {
  title: "FAQ",
  description,
  alternates: { canonical: `${siteUrl()}/faq` },
  openGraph: {
    title: "FAQ · Sydra",
    description,
    url: `${siteUrl()}/faq`,
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#4A5568]">
              Objections handled in writing. Still have questions?{" "}
              <Link className="font-medium text-[rgb(0,40,184)] underline" href="/demo">
                Schedule a demo
              </Link>
              .
            </p>

            {FAQ_CATEGORIES.map((category) => {
              const items = FAQ_PAGE_ITEMS.filter((item) => item.category === category);
              if (items.length === 0) return null;

              return (
                <section key={category} className="mt-12">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {category}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {items.map((item) => (
                      <details
                        key={item.q}
                        className="group rounded-xl border border-slate-200 bg-white px-4 py-1 shadow-sm open:border-slate-300 md:px-5"
                      >
                        <summary className="cursor-pointer list-none py-4 text-left text-base font-semibold text-[#1A2B48] [&::-webkit-details-marker]:hidden">
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
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
