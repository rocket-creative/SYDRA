import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { siteUrl } from "@/lib/site";

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

const base = siteUrl();
const canonical = `${base}/`;

/** ~157 chars — NSA IDR first; supporting RCM tools secondary */
const description =
  "NSA / federal IDR software for surgical billing teams. File disputes in under 5 minutes. Also includes eligibility, prior auth, CPT, and compliance tools.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "Sydra | NSA IDR software for surgical groups",
    template: "%s · Sydra",
  },
  description,
  alternates: { canonical },
  openGraph: {
    title: "Sydra | NSA IDR software for surgical groups",
    description,
    url: canonical,
    siteName: "Sydra",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sydra — NSA IDR software for surgical groups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydra | NSA IDR software for surgical groups",
    description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
