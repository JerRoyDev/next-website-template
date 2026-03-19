import nodemailer from "nodemailer";

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
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!smtpHost) throw new Error("SMTP_HOST är inte satt i miljövariabler");
  if (!smtpUser) throw new Error("SMTP_USER är inte satt i miljövariabler");
  if (!smtpPass) throw new Error("SMTP_PASS är inte satt i miljövariabler");
  if (!contactEmail) throw new Error("CONTACT_EMAIL är inte satt i miljövariabler");

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Website";

  await transporter.sendMail({
    from: `"${siteName}" <${smtpUser}>`,
    to: contactEmail,
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
