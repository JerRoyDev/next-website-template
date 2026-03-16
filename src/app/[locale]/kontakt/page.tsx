import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { getAlternates } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });
  const { canonical, languages } = getAlternates("/kontakt", locale);

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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ContactFormSection />
    </main>
  );
}
