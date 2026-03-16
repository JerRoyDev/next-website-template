import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";
  const { canonical, languages } = getAlternates("/om-oss", locale);

  return {
    title: t("title"),
    description: t("description", { siteName }),
    alternates: { canonical, languages },
    openGraph: {
      title: t("title"),
      description: t("description", { siteName }),
      url: canonical,
    },
  };
}

function AboutContent() {
  const t = useTranslations("About");
  const members = [0, 1, 2] as const;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("intro")}</p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold">{t("story.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("story.content")}</p>
        </div>

        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold">{t("team.title")}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {members.map((i) => (
              <Card key={i}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-bold text-muted-foreground">
                    {t(`team.members.${i}.name`).charAt(0)}
                  </div>
                  <h3 className="font-semibold">
                    {t(`team.members.${i}.name`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`team.members.${i}.role`)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`team.members.${i}.bio`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
