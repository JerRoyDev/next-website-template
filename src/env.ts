import { z } from "zod";

/**
 * Validerar NEXT_PUBLIC_*-variabler vid startup.
 * Säker att importera i både server- och client-komponenter.
 *
 * Server-only mail-variabler (SMTP_*, RESEND_*, BREVO_*) valideras
 * inline i respektive provider vid första användning.
 */
const envSchema = z.object({
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
  NEXT_PUBLIC_NEWSLETTER_ENABLED: z.string().optional(),
  NEXT_PUBLIC_MAIL_PREVIEW: z.string().optional(),
});

// Explicit property access required — Next.js only inlines individual
// process.env.NEXT_PUBLIC_* references; the full process.env object
// is not available in client bundles.
export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE,
  NEXT_PUBLIC_CONTACT_ADDRESS: process.env.NEXT_PUBLIC_CONTACT_ADDRESS,
  NEXT_PUBLIC_SOCIAL_FACEBOOK: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
  NEXT_PUBLIC_SOCIAL_INSTAGRAM: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  NEXT_PUBLIC_SOCIAL_LINKEDIN: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
  NEXT_PUBLIC_NEWSLETTER_ENABLED: process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED,
  NEXT_PUBLIC_MAIL_PREVIEW: process.env.NEXT_PUBLIC_MAIL_PREVIEW,
});
