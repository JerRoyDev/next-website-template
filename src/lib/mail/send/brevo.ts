import type { MailProvider, SendMailOptions } from "../index";

export function createBrevoProvider(): MailProvider {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not set");

  const fromAddress = process.env.MAIL_FROM;
  if (!fromAddress)
    throw new Error("MAIL_FROM is required when using Brevo provider");

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Website";

  return {
    async sendMail({ to, subject, html, text, replyTo }: SendMailOptions) {
      const body: Record<string, unknown> = {
        sender: { name: siteName, email: fromAddress },
        to: [{ email: to }],
        subject,
      };
      if (html) body.htmlContent = html;
      if (text) body.textContent = text;
      if (replyTo) body.replyTo = { email: replyTo };

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          `Brevo API error: ${response.status} ${JSON.stringify(error)}`
        );
      }
    },
  };
}
