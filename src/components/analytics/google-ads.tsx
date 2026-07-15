import Script from "next/script";

import { GA4_ID } from "@/lib/analytics/ga4";
import {
  GOOGLE_ADS_CONVERSION_SEND_TO,
  GOOGLE_ADS_ID,
} from "@/lib/analytics/google-ads";

/**
 * Single global gtag.js tag configuring BOTH the Google Ads account
 * (AW-…) and the GA4 stream (G-…) from one script load. Rendered once in the
 * root layout so it is present on every page and not duplicated. Loading a
 * single gtag.js configuring both IDs avoids the duplicate/conflicting tag
 * setups that leave Ads conversion actions "not verified".
 *
 * Uses afterInteractive so the tag is available by the time a lead form can
 * submit.
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
${GA4_ID ? `          gtag('config', '${GA4_ID}');\n` : ""}

          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${GOOGLE_ADS_CONVERSION_SEND_TO}',
              'value': 1.0,
              'currency': 'USD',
              'event_callback': callback
            });
            return false;
          }
          window.gtag_report_conversion = gtag_report_conversion;
        `}
      </Script>
    </>
  );
}
