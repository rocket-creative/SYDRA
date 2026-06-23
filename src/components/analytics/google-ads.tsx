import Script from "next/script";

import { GOOGLE_ADS_ID } from "@/lib/analytics/google-ads";

/**
 * Global Google Ads site tag (gtag.js). Rendered once in the root layout so it
 * is present on every page. Loads with the lazyOnload strategy so the tag is
 * fetched during browser idle time after the page is interactive, keeping it
 * off the critical path that influences INP and total blocking time. Conversion
 * tracking does not need to run before the user can interact.
 */
export function GoogleAdsTag() {
  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
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
