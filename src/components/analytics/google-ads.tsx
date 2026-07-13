import Script from "next/script";

import {
  GOOGLE_ADS_CONVERSION_SEND_TO,
  GOOGLE_ADS_ID,
} from "@/lib/analytics/google-ads";

/**
 * Global Google Ads site tag (gtag.js) plus the Ads conversion helper.
 * Rendered once in the root layout so it is present on every page and not
 * duplicated. Uses afterInteractive so the tag is available by the time a
 * lead form can submit.
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
