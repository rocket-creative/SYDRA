import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const base = siteUrl();
const canonical = `${base}/`;

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "Sydra — AI drafted IDR submissions for surgical practices",
    template: "%s · Sydra",
  },
  description:
    "Sydra drafts No Surprises Act IDR submissions using AI trained on real determinations and an extensive reference library.",
  alternates: { canonical },
  openGraph: {
    title: "Sydra — AI drafted IDR submissions for surgical practices",
    description:
      "Recover more from out of network disputes with drafting support built for surgical groups.",
    url: canonical,
    siteName: "Sydra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sydra — AI drafted IDR submissions for surgical practices",
    description:
      "Recover more from out of network disputes with drafting support built for surgical groups.",
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
