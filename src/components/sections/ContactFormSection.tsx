"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { submitContactForm } from "@/app/[locale]/kontakt/action";
import { env } from "@/env";
import { MailPreviewSheet } from "@/components/shared/MailPreviewSheet";

function useContactSchema() {
  const t = useTranslations("Contact.validation");

  return z.object({
    name: z
      .string()
      .min(1, t("nameRequired"))
      .min(2, t("nameMin")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    phone: z.string().optional(),
    message: z
      .string()
      .min(1, t("messageRequired"))
      .min(10, t("messageMin")),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof useContactSchema>>;

export function ContactFormSection() {
  const t = useTranslations("Contact");
  const schema = useContactSchema();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [preview, setPreview] = useState<{
    notification: string;
    confirmation: string;
  } | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("idle");
    const result = await submitContactForm(data);
    if (result.success) {
      setStatus("success");
      if (result.preview) setPreview(result.preview);
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-12 md:grid-cols-2">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form.namePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t("form.phonePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("form.messagePlaceholder")}
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? t("form.submitting")
                  : t("form.submit")}
              </Button>
              {status === "success" && (
                <p className="text-sm text-green-600">{t("form.success")}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive">{t("form.error")}</p>
              )}
            </form>
          </Form>

          {/* Contact Info */}
          <Card>
            <CardContent className="space-y-6 pt-6">
              <h3 className="text-xl font-semibold">{t("info.title")}</h3>
              {env.NEXT_PUBLIC_CONTACT_EMAIL && (
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <a
                    href={`mailto:${env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                    className="hover:underline"
                  >
                    {env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </a>
                </div>
              )}
              {env.NEXT_PUBLIC_CONTACT_PHONE && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <a
                    href={`tel:${env.NEXT_PUBLIC_CONTACT_PHONE}`}
                    className="hover:underline"
                  >
                    {env.NEXT_PUBLIC_CONTACT_PHONE}
                  </a>
                </div>
              )}
              {env.NEXT_PUBLIC_CONTACT_ADDRESS && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <span>{env.NEXT_PUBLIC_CONTACT_ADDRESS}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {preview && (
        <MailPreviewSheet
          preview={preview}
          open={!!preview}
          onOpenChange={(open) => {
            if (!open) setPreview(null);
          }}
        />
      )}
    </section>
  );
}
