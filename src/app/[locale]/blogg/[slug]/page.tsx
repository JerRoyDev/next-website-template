import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getAlternates } from "@/lib/metadata";
import { JsonLd } from "@/components/shared/JsonLd";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  for (let i = 0; i < 20; i++) {
    if (!t.has(`posts.${i}.slug`)) break;
    if (t.raw(`posts.${i}.slug`) === slug) {
      const title = t(`posts.${i}.title`);
      const description = t(`posts.${i}.excerpt`);
      const { canonical, languages } = getAlternates("/blogg/[slug]", locale, { slug });

      return {
        title,
        description,
        alternates: { canonical, languages },
        openGraph: { title, description, url: canonical },
      };
    }
  }

  return { title: "Post not found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });

  let postIndex: number | null = null;
  for (let i = 0; i < 20; i++) {
    if (!t.has(`posts.${i}.slug`)) break;
    if (t.raw(`posts.${i}.slug`) === slug) {
      postIndex = i;
      break;
    }
  }

  if (postIndex === null) {
    notFound();
  }

  const i = postIndex;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";
  const { canonical } = getAlternates("/blogg/[slug]", locale, { slug });

  return (
    <main className="py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: t(`posts.${i}.title`),
          description: t(`posts.${i}.excerpt`),
          datePublished: t(`posts.${i}.date`),
          url: canonical,
          publisher: {
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
          },
        }}
      />
      <div className="container mx-auto max-w-3xl px-4">
        <Button variant="ghost" className="mb-8" nativeButton={false} render={<Link href="/blogg" />}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToBlog")}
        </Button>
        <article>
          <p className="text-sm text-muted-foreground">
            {t("publishedAt")}: {t(`posts.${i}.date`)}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {t(`posts.${i}.title`)}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t(`posts.${i}.excerpt`)}
          </p>
          <div className="prose dark:prose-invert mt-8 max-w-none">
            <p>{t(`posts.${i}.content`)}</p>
          </div>
        </article>
      </div>
    </main>
  );
}
