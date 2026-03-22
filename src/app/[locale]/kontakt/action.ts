"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sendMail } from "@/lib/mail";
import { render } from "@react-email/components";
import { ContactNotificationEmail } from "@/lib/mail/templates/contact-notification";
import { ContactConfirmationEmail } from "@/lib/mail/templates/contact-confirmation";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, recent);
  return recent.length >= RATE_LIMIT;
}

export async function submitContactForm(data: unknown) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  // Enkel in-memory rate limiting — nollställs vid omstart/cold start.
  // OBS: Fungerar inte reliabelt i serverless (Vercel). För produktionskritisk
  // rate limiting, byt ut mot Upstash Redis eller Vercel KV.
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return { success: false, error: "Too many submissions" };
  }

  const timestamps = submissions.get(ip) ?? [];
  timestamps.push(Date.now());
  submissions.set(ip, timestamps);

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Mail" });
  const contactEmail = process.env.CONTACT_EMAIL;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Website";

  if (!contactEmail) {
    console.error("CONTACT_EMAIL is not set");
    return { success: false, error: "Failed to send email" };
  }

  try {
    const { name, email, phone, message } = parsed.data;

    // 1. Send notification to site owner
    const notificationSubject = t("contactNotification.subject", { name });
    const notificationHtml = await render(
      ContactNotificationEmail({
        name,
        email,
        phone,
        message,
        subject: notificationSubject,
      })
    );

    await sendMail({
      to: contactEmail,
      replyTo: email,
      subject: notificationSubject,
      html: notificationHtml,
      text: [
        `Namn: ${name}`,
        `E-post: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        `\nMeddelande:\n${message}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // 2. Send confirmation to the person who submitted the form
    const confirmationSubject = t("contactConfirmation.subject");
    const confirmationBody = t("contactConfirmation.body");
    const confirmationHtml = await render(
      ContactConfirmationEmail({
        name,
        subject: confirmationSubject,
        body: confirmationBody,
        siteName,
      })
    );

    await sendMail({
      to: email,
      subject: confirmationSubject,
      html: confirmationHtml,
      text: `${name},\n\n${confirmationBody}\n\n${siteName}`,
    });

    const preview =
      process.env.NEXT_PUBLIC_MAIL_PREVIEW === "true"
        ? { notification: notificationHtml, confirmation: confirmationHtml }
        : undefined;

    return { success: true, preview };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
