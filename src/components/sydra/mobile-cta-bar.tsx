import Link from "next/link";

/** Sticky primary CTA on small screens (mobile-first CRO). Hidden on lg+. */
export function MobileCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 backdrop-blur-md lg:hidden">
      <div
        className="mx-auto flex max-w-6xl px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6"
      >
        <Link
          className="flex min-h-12 w-full items-center justify-center rounded-md bg-[#1A2B48] text-center text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-200 [font-size:16px] active:opacity-90"
          href="/demo"
        >
          Schedule a demo
        </Link>
      </div>
    </div>
  );
}
