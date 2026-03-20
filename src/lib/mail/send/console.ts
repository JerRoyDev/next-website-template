import type { MailProvider, SendMailOptions } from "../index";

export function createConsoleProvider(): MailProvider {
  return {
    async sendMail({ to, subject, text, replyTo }: SendMailOptions) {
      console.log("\n📧 [Console Mail Provider] ─────────────────────");
      console.log(`  To:       ${to}`);
      console.log(`  Subject:  ${subject}`);
      if (replyTo) console.log(`  Reply-To: ${replyTo}`);
      console.log(`  Body:     ${text || "(HTML only)"}`);
      console.log("─────────────────────────────────────────────\n");
    },
  };
}
