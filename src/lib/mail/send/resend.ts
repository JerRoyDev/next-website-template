import { Resend } from "resend";
import type { MailProvider, SendMailOptions } from "../index";

export function createResendProvider(): MailProvider {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const fromAddress = process.env.MAIL_FROM;
  if (!fromAddress)
    throw new Error("MAIL_FROM is required when using Resend provider");

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Website";
  const resend = new Resend(apiKey);

  return {
    async sendMail({ to, subject, html, text, replyTo }: SendMailOptions) {
      const { error } = await resend.emails.send({
        from: `${siteName} <${fromAddress}>`,
        to,
        subject,
        html: html ?? "",
        ...(text && { text }),
        ...(replyTo && { replyTo }),
      });
      if (error) throw new Error(error.message);
    },
  };
}
