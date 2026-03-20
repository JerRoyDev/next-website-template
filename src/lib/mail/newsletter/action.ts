"use server";

import { z } from "zod";

const emailSchema = z.string().min(1).email();

export interface NewsletterResult {
  success: boolean;
  error?: string;
}

type NewsletterProvider = (email: string) => Promise<NewsletterResult>;

async function getNewsletterProvider(): Promise<NewsletterProvider | null> {
  const provider = process.env.NEWSLETTER_PROVIDER;

  switch (provider) {
    case "brevo": {
      const { subscribeBrevo } = await import("./brevo");
      return subscribeBrevo;
    }
    default:
      return null;
  }
}

export async function subscribeToNewsletter(
  email: string
): Promise<NewsletterResult> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return { success: false, error: "Invalid email" };
  }

  const provider = await getNewsletterProvider();
  if (!provider) {
    console.error(
      "No newsletter provider configured. Set NEWSLETTER_PROVIDER in .env"
    );
    return { success: false, error: "Newsletter not configured" };
  }

  try {
    return await provider(parsed.data);
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return { success: false, error: "Subscription failed" };
  }
}
