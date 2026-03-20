export interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}

export interface MailProvider {
  sendMail(options: SendMailOptions): Promise<void>;
}

type ProviderType = "smtp" | "resend" | "brevo" | "console";

let cachedProvider: MailProvider | null = null;

async function getProvider(): Promise<MailProvider> {
  if (cachedProvider) return cachedProvider;

  const providerType = (process.env.MAIL_PROVIDER || "smtp") as ProviderType;

  switch (providerType) {
    case "resend": {
      const { createResendProvider } = await import("./send/resend");
      cachedProvider = createResendProvider();
      break;
    }
    case "brevo": {
      const { createBrevoProvider } = await import("./send/brevo");
      cachedProvider = createBrevoProvider();
      break;
    }
    case "console": {
      const { createConsoleProvider } = await import("./send/console");
      cachedProvider = createConsoleProvider();
      break;
    }
    case "smtp":
    default: {
      const { createSmtpProvider } = await import("./send/smtp");
      cachedProvider = createSmtpProvider();
      break;
    }
  }

  return cachedProvider!;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  const provider = await getProvider();
  await provider.sendMail(options);
}
