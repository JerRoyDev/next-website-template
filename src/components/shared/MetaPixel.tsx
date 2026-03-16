"use client";

// Direkt Meta Pixel-integration utan GTM.
// Aktiveras genom att sätta NEXT_PUBLIC_META_PIXEL_ID i .env.local.
//
// OBS: Använd ANTINGEN denna komponent ELLER Meta Pixel-taggen i GTM — aldrig båda
// samtidigt med samma Pixel ID (ger dubbelräkning).
// Byt mellan dem genom att:
//   - Direkt: sätt NEXT_PUBLIC_META_PIXEL_ID, lämna NEXT_PUBLIC_GTM_ID tomt
//   - Via GTM: sätt NEXT_PUBLIC_GTM_ID, ta bort NEXT_PUBLIC_META_PIXEL_ID

import Script from "next/script";
import { useSyncExternalStore } from "react";

export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const hasConsent = useSyncExternalStore(
    (callback) => {
      window.addEventListener("cookie-consent-updated", callback);
      return () =>
        window.removeEventListener("cookie-consent-updated", callback);
    },
    () => localStorage.getItem("cookie-consent") === "accepted",
    () => false
  );

  if (!pixelId || !hasConsent) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
