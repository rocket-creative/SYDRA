import Script from "next/script";

import { GOOGLE_ADS_ID } from "@/lib/analytics/google-ads";

/**
 * Global Google Ads site tag (gtag.js). Rendered once in the root layout so it
 * is present on every page. Uses the afterInteractive strategy recommended for
 * tag managers and analytics.
 */
export function GoogleAdsTag() {
  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
