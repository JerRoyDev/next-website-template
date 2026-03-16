import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/kontakt" />}>
            {t("cta")}
          </Button>
          <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/tjanster" />}>
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
