import type { Metadata } from "next";
import Link from "next/link";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing use of the Sydra marketing website operated by Kronos Health.",
  alternates: { canonical: `${siteUrl()}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader variant="funnel" />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
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
              <Link className="font-medium text-[#1A2B48] underline" href="/contact">
                Contact us
              </Link>
              .
            </p>
          </article>
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
