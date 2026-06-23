import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { GoogleAdsTag } from "@/components/analytics/google-ads";
import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";
import { GA4_ID } from "@/lib/analytics/ga4";
import { HOME_METADATA } from "@/lib/seo/metadata";
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
        <PageTransition>{children}</PageTransition>
        <WebVitalsReporter />
        <GoogleAdsTag />
        {GA4_ID ? <GoogleAnalytics gaId={GA4_ID} /> : null}
      </body>
    </html>
  );
}
