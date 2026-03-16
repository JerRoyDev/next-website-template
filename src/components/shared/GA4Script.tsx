"use client";

// Direkt GA4-integration utan GTM.
// Aktiveras genom att sätta NEXT_PUBLIC_GA_MEASUREMENT_ID i .env.local.
//
// OBS: Använd ANTINGEN denna komponent ELLER GA4-taggen i GTM — aldrig båda
// samtidigt med samma Measurement ID (ger dubbelräkning).
// Byt mellan dem genom att:
//   - Direkt: sätt NEXT_PUBLIC_GA_MEASUREMENT_ID, lämna NEXT_PUBLIC_GTM_ID tomt
//   - Via GTM: sätt NEXT_PUBLIC_GTM_ID, ta bort NEXT_PUBLIC_GA_MEASUREMENT_ID

import { GoogleAnalytics } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";

export function GA4Script() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const hasConsent = useSyncExternalStore(
    (callback) => {
      window.addEventListener("cookie-consent-updated", callback);
      return () =>
        window.removeEventListener("cookie-consent-updated", callback);
    },
    () => localStorage.getItem("cookie-consent") === "accepted",
    () => false
  );

  if (!gaId || !hasConsent) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
