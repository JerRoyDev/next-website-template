import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">{t("title")}</h2>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>
      <Button className="mt-8" nativeButton={false} render={<Link href="/" />}>
        {t("backHome")}
      </Button>
    </main>
  );
}
