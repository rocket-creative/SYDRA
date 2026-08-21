import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { GoogleAdsTag } from "@/components/analytics/google-ads";
import { UtmFirstTouch } from "@/components/analytics/utm-first-touch";
import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";
import { PageJsonLd } from "@/components/sydra/page-json-ld";
import { HOME_METADATA } from "@/lib/seo/metadata";
import { sydraOrganizationJsonLd, sydraWebsiteJsonLd } from "@/lib/seo/json-ld";
import { siteUrl } from "@/lib/site";
import { PageTransition } from "@/components/motion/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  ...HOME_METADATA,
  alternates: {
    ...HOME_METADATA.alternates,
    // Advertise the AI corpus map so assistants can discover citation targets.
    types: {
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
    },
  },
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <PageJsonLd data={[sydraOrganizationJsonLd(), sydraWebsiteJsonLd()]} />
        <PageTransition>{children}</PageTransition>
        <UtmFirstTouch />
        <WebVitalsReporter />
        <GoogleAdsTag />
        <Analytics />
      </body>
    </html>
  );
}
