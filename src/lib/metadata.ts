import { routing, type Pathnames } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Build alternates (canonical + hreflang) for a given internal pathname.
 * getPathname returns paths with locale prefix for all locales.
 */
export function getAlternates(
  pathname: Pathnames,
  locale: string,
  params?: Record<string, string>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const href: any = params ? { pathname, params } : pathname;
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    const localizedPath = getPathname({ locale: l, href });
    languages[l] = `${siteUrl}${localizedPath}`;
  }

  const canonicalPath = getPathname({ locale, href });
  const canonical = `${siteUrl}${canonicalPath}`;

  languages["x-default"] = languages[routing.defaultLocale];

  return { canonical, languages };
}
