import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-primary-foreground/80">{t("subtitle")}</p>
        <Button size="lg" variant="secondary" className="mt-8" nativeButton={false} render={<Link href="/kontakt" />}>
          {t("button")}
        </Button>
      </div>
    </section>
  );
}
