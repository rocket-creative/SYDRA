import type { Metadata } from "next";
import Link from "next/link";

import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your Sydra demo request was received. Our team will review and follow up within one business day.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteUrl()}/demo/thank-you` },
};

export default function DemoThankYouPage() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader variant="funnel" />
        <main className="flex flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24 xl:px-8">
          <div
            className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700"
            aria-hidden
          >
            ✓
          </div>
          <h1 className="mt-8 max-w-lg text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            Request received
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A5568] md:text-[17px]">
            Our team reviews every request. If your practice is a fit, we will
            follow up within one business day at the time you selected to
            schedule your denied claim walkthrough.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/"
            >
              Back to homepage
            </Link>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50"
              href="https://sydra.health/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sign in
            </a>
          </div>
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
