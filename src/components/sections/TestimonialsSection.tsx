import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");

  // Access items as raw messages (array)
  const items = [0, 1, 2] as const;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Quote className="mb-4 h-8 w-8 text-muted-foreground/40" />
                <blockquote className="text-muted-foreground">
                  &ldquo;{t(`items.${i}.quote`)}&rdquo;
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold">{t(`items.${i}.author`)}</p>
                  <p className="text-sm text-muted-foreground">
                    {t(`items.${i}.role`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
