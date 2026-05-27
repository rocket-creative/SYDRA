import Link from "next/link";

import { SkipLink } from "@/components/sydra/skip-link";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Page Not Found | Sydra",
  description:
    "The page you requested was not found on the Sydra marketing site. Return to the homepage or schedule a demo to see NSA IDR software for surgical billing teams.",
  path: "/404",
  robots: { index: false, follow: false },
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <SkipLink />
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader />
        <main
          className="flex flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28 xl:px-8"
          id="main-content"
          tabIndex={-1}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,40,184)]">
            404
          </p>
          <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A5568]">
            That URL is not on this site. Head back to the homepage or schedule a demo
            to see Sydra on a real denied claim.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href="/"
            >
              Back to homepage
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#1A2B48] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href="/demo"
            >
              Schedule a demo
            </Link>
          </div>
        </main>
        <SydraFooter />
      </div>
    </div>
  );
}
