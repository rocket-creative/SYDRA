import type { ReactNode } from "react";

import { BreadcrumbNav } from "@/components/sydra/breadcrumb-nav";
import { SkipLink } from "@/components/sydra/skip-link";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";

type SydraPageShellProps = {
  children: ReactNode;
  breadcrumb?: { name: string; path: string }[];
  headerVariant?: "default" | "funnel";
  footerExtra?: ReactNode;
  mainClassName?: string;
  showMobileCta?: boolean;
};

export function SydraPageShell({
  children,
  breadcrumb,
  headerVariant = "default",
  footerExtra,
  mainClassName = "px-4 py-14 sm:px-6 md:py-20 xl:px-8",
}: SydraPageShellProps) {
  return (
    <div className="min-h-screen bg-stone-100 font-sans text-slate-900">
      <SkipLink />
      <div className="mx-auto min-h-screen max-w-6xl bg-white shadow-sm xl:max-w-[1200px]">
        <SydraHeader variant={headerVariant} />
        <main className={mainClassName} id="main-content" tabIndex={-1}>
          {breadcrumb ? (
            <div className="mx-auto mb-8 max-w-6xl xl:max-w-[1200px]">
              <BreadcrumbNav items={breadcrumb} />
            </div>
          ) : null}
          {children}
        </main>
        {footerExtra}
        <SydraFooter />
      </div>
    </div>
  );
}

export const BREADCRUMBS = {
  about: [
    { name: "Home", path: "" },
    { name: "About", path: "/about" },
  ],
  pricing: [
    { name: "Home", path: "" },
    { name: "Pricing", path: "/pricing" },
  ],
  demo: [
    { name: "Home", path: "" },
    { name: "Schedule a demo", path: "/demo" },
  ],
  howItWorks: [
    { name: "Home", path: "" },
    { name: "How it works", path: "/how-it-works" },
  ],
  security: [
    { name: "Home", path: "" },
    { name: "Security", path: "/security" },
  ],
  faq: [
    { name: "Home", path: "" },
    { name: "FAQ", path: "/faq" },
  ],
  contact: [
    { name: "Home", path: "" },
    { name: "Contact", path: "/contact" },
  ],
  privacy: [
    { name: "Home", path: "" },
    { name: "Privacy", path: "/privacy" },
  ],
  terms: [
    { name: "Home", path: "" },
    { name: "Terms", path: "/terms" },
  ],
} as const;
