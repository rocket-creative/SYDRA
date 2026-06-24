import Script from "next/script";

/**
 * Google tag delayed navigation helper for the demo lead form. Fires
 * `conversion_event_submit_lead_form` and navigates after the event is sent
 * (or after event_timeout). Loaded only on /demo.
 */
export function GtagSendEventHelper() {
  return (
    <Script id="gtag-send-event" strategy="afterInteractive">
      {`
        function gtagSendEvent(url) {
          var callback = function () {
            if (typeof url === 'string') {
              window.location = url;
            }
          };
          gtag('event', 'conversion_event_submit_lead_form', {
            'event_callback': callback,
            'event_timeout': 2000,
          });
          return false;
        }
      `}
    </Script>
  );
}
