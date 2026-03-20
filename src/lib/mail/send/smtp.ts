import nodemailer from "nodemailer";
import type { MailProvider, SendMailOptions } from "../index";

export function createSmtpProvider(): MailProvider {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  if (!smtpHost) throw new Error("SMTP_HOST is not set");
  if (!smtpUser) throw new Error("SMTP_USER is not set");
  if (!smtpPass) throw new Error("SMTP_PASS is not set");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Website";
  const fromAddress = process.env.MAIL_FROM || smtpUser;

  return {
    async sendMail({ to, subject, html, text, replyTo }: SendMailOptions) {
      await transporter.sendMail({
        from: `"${siteName}" <${fromAddress}>`,
        to,
        replyTo,
        subject,
        html,
        text,
      });
    },
  };
}
