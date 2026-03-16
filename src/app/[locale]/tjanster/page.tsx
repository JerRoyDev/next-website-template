import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CTASection } from "@/components/sections/CTASection";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.services" });
  const { canonical, languages } = getAlternates("/tjanster", locale);

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
    },
  };
}

function ServicesContent() {
  const t = useTranslations("Services");
  const items = [0, 1, 2, 3] as const;

  return (
    <main>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {items.map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{t(`items.${i}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`items.${i}.description`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesContent />;
}
