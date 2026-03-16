import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sv", "en"],
  defaultLocale: "sv",
  pathnames: {
    "/": "/",
    "/om-oss": {
      sv: "/om-oss",
      en: "/about",
    },
    "/tjanster": {
      sv: "/tjanster",
      en: "/services",
    },
    "/kontakt": {
      sv: "/kontakt",
      en: "/contact",
    },
    "/blogg": {
      sv: "/blogg",
      en: "/blog",
    },
    "/blogg/[slug]": {
      sv: "/blogg/[slug]",
      en: "/blog/[slug]",
    },
    "/integritetspolicy": {
      sv: "/integritetspolicy",
      en: "/privacy-policy",
    },
    "/faq": "/faq",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
