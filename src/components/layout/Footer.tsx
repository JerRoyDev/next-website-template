import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tContact = useTranslations("Contact");

  const currentYear = new Date().getFullYear();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Quick links */}
          <div>
            <h2 className="mb-4 font-semibold">{t("quickLinks")}</h2>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              <Link
                href="/om-oss"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {tNav("about")}
              </Link>
              <Link
                href="/tjanster"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {tNav("services")}
              </Link>
              <Link
                href="/blogg"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {tNav("blog")}
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {tNav("faq")}
              </Link>
              <Link
                href="/kontakt"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {tNav("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="mb-4 font-semibold">{t("contact")}</h2>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>{tContact("info.email")}</p>
              <p>{tContact("info.phone")}</p>
              <p>{tContact("info.address")}</p>
            </div>
          </div>

          {/* Social / Follow */}
          <div>
            <h2 className="mb-4 font-semibold">{t("followUs")}</h2>
            <div className="flex gap-4">
              {/* Replace # with actual social media links */}
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>
            &copy; {currentYear} {siteName}. {t("rights")}
          </p>
          <Link
            href="/integritetspolicy"
            className="hover:text-foreground"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
