import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.blog" });
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";
  const { canonical, languages } = getAlternates("/blogg", locale);

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

function BlogContent() {
  const t = useTranslations("Blog");
  const posts = [0, 1] as const;

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          {posts.map((i) => (
            <Card key={i}>
              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  {t("publishedAt")}: {t(`posts.${i}.date`)}
                </p>
                <CardTitle className="mt-2">{t(`posts.${i}.title`)}</CardTitle>
                <CardDescription>{t(`posts.${i}.excerpt`)}</CardDescription>
                <Button
                  variant="link"
                  className="mt-2 p-0"
                  nativeButton={false}
                  render={
                    <Link
                      href={{
                        pathname: "/blogg/[slug]",
                        params: { slug: t(`posts.${i}.slug`) },
                      }}
                    />
                  }
                >
                  {t("readMore")} →
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogContent />;
}
