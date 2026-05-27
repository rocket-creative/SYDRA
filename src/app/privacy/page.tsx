import type { Metadata } from "next";
import Link from "next/link";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Kronos Health and Sydra collect, use, and protect information on this website.",
  alternates: { canonical: `${siteUrl()}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader variant="funnel" />
        <main className="px-4 py-14 sm:px-6 md:py-20 xl:px-8">
          <article className="prose-slate mx-auto max-w-3xl">
            <h1 className="text-[1.75rem] font-semibold text-[#1A2B48] sm:text-3xl">Privacy policy</h1>
            <p className="mt-6 text-[15px] leading-relaxed text-[#4A5568]">
              Kronos Health operates the Sydra marketing site. This policy describes
              how we handle information submitted through demo requests, contact
              forms, and email links on this site.
            </p>
            <h2 className="mt-10 text-lg font-semibold text-[#1A2B48]">Information we collect</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              When you schedule a demo or contact us, we collect the information you
              provide: name, work email, practice name, specialty, state, and related
              qualification fields. We do not collect payment information on this site.
            </p>
            <h2 className="mt-10 text-lg font-semibold text-[#1A2B48]">How we use it</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              We use submitted information to respond to inquiries, schedule demos,
              and evaluate whether Sydra is a fit for your practice. We do not sell
              contact information to third parties.
            </p>
            <h2 className="mt-10 text-lg font-semibold text-[#1A2B48]">PHI on this site</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">
              Do not submit protected health information through this marketing site.
              PHI belongs in the Sydra application under a signed BAA.
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
