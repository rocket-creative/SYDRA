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

/** ~158 chars — primary keyword, CTA, within 150–160 SERP guideline */
const description =
  "Sydra drafts stronger No Surprises Act IDR submissions for surgical practices using AI trained on real determinations. Request a demo to recover more revenue.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "Sydra | AI drafted IDR submissions for surgical practices",
    template: "%s · Sydra",
  },
  description,
  alternates: { canonical },
  openGraph: {
    title: "Sydra | AI drafted IDR submissions for surgical practices",
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
        alt: "Sydra — AI drafted IDR submissions for surgical practices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydra | AI drafted IDR submissions for surgical practices",
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
