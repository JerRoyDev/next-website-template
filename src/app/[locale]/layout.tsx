import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { UmamiAnalytics } from "@/components/shared/UmamiAnalytics";
import { GTMScript } from "@/components/shared/GTMScript";
// Direkt GA4 + Meta Pixel — aktiveras via env-variabler, laddas efter cookie-samtycke.
// Använd ANTINGEN dessa ELLER motsvarande taggar i GTM — aldrig båda med samma ID.
import { GA4Script } from "@/components/shared/GA4Script";
import { MetaPixel } from "@/components/shared/MetaPixel";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/shared/JsonLd";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const localeMap: Record<string, string> = {
  sv: "sv_SE",
  en: "en_US",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  const canonicalPath = `/${locale}`;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${siteUrl}/${l}`;
  }
  languages["x-default"] = languages[routing.defaultLocale];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: t("description", { siteName }),
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages,
    },
    openGraph: {
      type: "website",
      siteName,
      locale: localeMap[locale] ?? "sv_SE",
      url: `${siteUrl}${canonicalPath}`,
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <div className="flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
        <UmamiAnalytics />
        <GTMScript />
        <GA4Script />
        <MetaPixel />
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  );
}
