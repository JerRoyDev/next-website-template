import { useTranslations } from "next-intl";
import { Zap, Clock, Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const icons = [Zap, Clock, Heart] as const;

export function FeaturesSection() {
  const t = useTranslations("Features");

  const features = [
    { key: "feature1", Icon: icons[0] },
    { key: "feature2", Icon: icons[1] },
    { key: "feature3", Icon: icons[2] },
  ] as const;

  return (
    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map(({ key, Icon }) => (
            <Card key={key}>
              <CardHeader>
                <Icon className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>{t(`${key}.title`)}</CardTitle>
                <CardDescription>{t(`${key}.description`)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
