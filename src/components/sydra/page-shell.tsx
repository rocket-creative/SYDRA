import type { ReactNode } from "react";

import { MagazineShell } from "@/components/ui/magazine-shell";
import { BreadcrumbNav } from "@/components/sydra/breadcrumb-nav";

type SydraPageShellProps = {
  children: ReactNode;
  breadcrumb?: { name: string; path: string }[];
  headerVariant?: "default" | "funnel";
  footerExtra?: ReactNode;
  mainClassName?: string;
};

export function SydraPageShell({
  children,
  breadcrumb,
  headerVariant = "default",
  footerExtra,
  mainClassName = "px-6 py-14 md:px-10 md:py-20",
}: SydraPageShellProps) {
  return (
    <MagazineShell footerExtra={footerExtra} headerVariant={headerVariant}>
      <div className={mainClassName}>
        {breadcrumb ? (
          <div className="mx-auto mb-8 max-w-[1280px]">
            <BreadcrumbNav items={breadcrumb} />
          </div>
        ) : null}
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
    </MagazineShell>
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
