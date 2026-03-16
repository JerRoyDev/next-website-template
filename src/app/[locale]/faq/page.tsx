import { setRequestLocale, getTranslations } from "next-intl/server";
import { FAQSection } from "@/components/sections/FAQSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.faq" });
  const { canonical, languages } = getAlternates("/faq", locale);

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

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "FAQ" });

  // Build FAQ schema
  const faqItems: { question: string; answer: string }[] = [];
  for (let i = 0; i < 20; i++) {
    if (!t.has(`items.${i}.question`)) break;
    faqItems.push({
      question: t(`items.${i}.question`),
      answer: t(`items.${i}.answer`),
    });
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <JsonLd data={faqSchema} />
      <FAQSection />
    </main>
  );
}
