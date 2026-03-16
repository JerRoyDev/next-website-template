import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Company Name";
  const { canonical, languages } = getAlternates("/", locale);

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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
    </main>
  );
}
