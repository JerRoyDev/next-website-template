import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");

  const currentYear = new Date().getFullYear();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS;

  const socialFacebook = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK;
  const socialInstagram = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM;
  const socialLinkedIn = process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN;
  const hasSocial = socialFacebook || socialInstagram || socialLinkedIn;

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
              {contactEmail && <p>{contactEmail}</p>}
              {contactPhone && <p>{contactPhone}</p>}
              {contactAddress && <p>{contactAddress}</p>}
            </div>
          </div>

          {/* Social / Follow */}
          {hasSocial && (
            <div>
              <h2 className="mb-4 font-semibold">{t("followUs")}</h2>
              <div className="flex gap-4">
                {socialFacebook && (
                  <a
                    href={socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                )}
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                )}
                {socialLinkedIn && (
                  <a
                    href={socialLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>
            &copy; {currentYear} {siteName}. {t("rights")}
          </p>
          <Link href="/integritetspolicy" className="hover:text-foreground">
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
