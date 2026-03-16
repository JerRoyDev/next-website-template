import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

function buildUrl(locale: string, localizedPath: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${localizedPath === "/" ? "" : localizedPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "/",
    "/om-oss",
    "/tjanster",
    "/kontakt",
    "/blogg",
    "/faq",
    "/integritetspolicy",
  ] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    const alternates: Record<string, string> = {};
    for (const l of routing.locales) {
      const localizedPath = getPathname({ locale: l, href: page });
      alternates[l] = buildUrl(l, localizedPath);
    }

    for (const locale of routing.locales) {
      const localizedPath = getPathname({ locale, href: page });
      entries.push({
        url: buildUrl(locale, localizedPath),
        lastModified: new Date(),
        changeFrequency: page === "/" ? "weekly" : "monthly",
        priority: page === "/" ? 1 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog posts — read slugs from translation files
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const svMessages = require("../../messages/sv.json") as Record<string, unknown>;
  const blogSv = svMessages.Blog as { posts: Array<{ slug: string; date: string }> } | undefined;
  if (blogSv?.posts) {
    for (const post of blogSv.posts) {
      const alternates: Record<string, string> = {};
      for (const l of routing.locales) {
        const localizedPath = getPathname({
          locale: l,
          href: { pathname: "/blogg/[slug]", params: { slug: post.slug } },
        });
        alternates[l] = buildUrl(l, localizedPath);
      }

      for (const locale of routing.locales) {
        const localizedPath = getPathname({
          locale,
          href: { pathname: "/blogg/[slug]", params: { slug: post.slug } },
        });
        entries.push({
          url: buildUrl(locale, localizedPath),
          lastModified: new Date(post.date),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: { languages: alternates },
        });
      }
    }
  }

  return entries;
}
