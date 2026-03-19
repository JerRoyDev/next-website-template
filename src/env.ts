import { z } from "zod";

/**
 * Validerar NEXT_PUBLIC_*-variabler vid startup.
 * Säker att importera i både server- och client-komponenter.
 *
 * SMTP-variabler valideras inline i src/lib/mail.ts.
 */
export const env = z
  .object({
    NEXT_PUBLIC_SITE_URL: z.string().url({
      message: "NEXT_PUBLIC_SITE_URL måste vara en giltig URL (t.ex. https://example.com)",
    }),
    NEXT_PUBLIC_SITE_NAME: z.string().min(1, {
      message: "NEXT_PUBLIC_SITE_NAME får inte vara tom",
    }),
    NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().optional(),
    NEXT_PUBLIC_CONTACT_PHONE: z.string().optional(),
    NEXT_PUBLIC_CONTACT_ADDRESS: z.string().optional(),
    NEXT_PUBLIC_SOCIAL_FACEBOOK: z.string().url().optional().or(z.literal("")),
    NEXT_PUBLIC_SOCIAL_INSTAGRAM: z.string().url().optional().or(z.literal("")),
    NEXT_PUBLIC_SOCIAL_LINKEDIN: z.string().url().optional().or(z.literal("")),
  })
  .parse(process.env);
