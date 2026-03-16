import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.privacy" });
  const { canonical, languages } = getAlternates("/integritetspolicy", locale);

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

function PrivacyContent() {
  const t = useTranslations("Privacy");
  const sections = [0, 1, 2, 3] as const;

  return (
    <main className="py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("lastUpdated", { date: "2026-01-01" })}
        </p>
        <div className="mt-12 space-y-8">
          {sections.map((i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold">
                {t(`sections.${i}.title`)}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t(`sections.${i}.content`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}
