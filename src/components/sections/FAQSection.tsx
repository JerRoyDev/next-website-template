import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection({ showTitle = true }: { showTitle?: boolean }) {
  const t = useTranslations("FAQ");

  const items = [0, 1, 2, 3] as const;

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-3xl px-4">
        {showTitle && (
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
          </div>
        )}
        <Accordion className="mt-12">
          {items.map((i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{t(`items.${i}.question`)}</AccordionTrigger>
              <AccordionContent>{t(`items.${i}.answer`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
