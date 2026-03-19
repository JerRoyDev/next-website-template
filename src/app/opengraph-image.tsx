import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamisk OG-image — fallback för alla sidor.
 * Wiras automatiskt som og:image via Next.js filkonvention.
 *
 * Per-sida override: skapa src/app/[locale]/[sida]/opengraph-image.tsx
 * med samma export-struktur.
 *
 * Anpassa layouten här för att matcha varumärket:
 * - Byt bakgrundsfärg mot --primary från globals.css
 * - Lägg till logotyp via siteUrl + "/logo.svg" med next/og <img>
 * - Justera typsnitt, layout och storlek
 */
export default function OgImage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          {siteName}
        </div>
      </div>
    ),
    { ...size }
  );
}
