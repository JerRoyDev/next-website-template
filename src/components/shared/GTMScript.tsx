"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

export function GTMScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const hasConsent = useSyncExternalStore(
    (callback) => {
      window.addEventListener("cookie-consent-updated", callback);
      return () =>
        window.removeEventListener("cookie-consent-updated", callback);
    },
    () => localStorage.getItem("cookie-consent") === "accepted",
    () => false
  );

  if (!gtmId || !hasConsent) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
