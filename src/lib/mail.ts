import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailOptions {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  phone,
  message,
}: SendMailOptions) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Website";
  const to = process.env.CONTACT_EMAIL;

  if (!to) {
    throw new Error("CONTACT_EMAIL environment variable is not set");
  }

  await transporter.sendMail({
    from: `"${siteName}" <${process.env.SMTP_USER}>`,
    to,
    replyTo: email,
    subject: `Nytt kontaktformulär: ${name}`,
    text: [
      `Namn: ${name}`,
      `E-post: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      `\nMeddelande:\n${message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
