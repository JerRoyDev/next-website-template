"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { subscribeToNewsletter } from "@/lib/mail/newsletter/action";

function useNewsletterSchema() {
  const t = useTranslations("Newsletter.validation");

  return z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
  });
}

type NewsletterFormValues = z.infer<ReturnType<typeof useNewsletterSchema>>;

interface NewsletterSectionProps {
  variant?: "section" | "inline";
}

export function NewsletterSection({
  variant = "section",
}: NewsletterSectionProps) {
  const t = useTranslations("Newsletter");
  const schema = useNewsletterSchema();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: NewsletterFormValues) {
    setStatus("idle");
    const result = await subscribeToNewsletter(data.email);
    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (variant === "inline") {
    return (
      <div>
        <h2 className="mb-2 font-semibold">{t("title")}</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          {t("description")}
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="sm"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? t("subscribing")
                : t("subscribe")}
            </Button>
          </form>
          {status === "success" && (
            <p className="mt-2 text-sm text-green-600">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="mt-2 text-sm text-destructive">{t("error")}</p>
          )}
        </Form>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 flex gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? t("subscribing")
                  : t("subscribe")}
              </Button>
            </form>
            {status === "success" && (
              <p className="mt-4 text-sm text-green-600">{t("success")}</p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-destructive">{t("error")}</p>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
}
