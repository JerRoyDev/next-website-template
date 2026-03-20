import type { NewsletterResult } from "./action";

/**
 * Brevo (formerly Sendinblue) newsletter provider.
 *
 * Adds a contact to a Brevo list. Brevo handles double opt-in
 * automatically if configured in your Brevo dashboard.
 *
 * Required env vars:
 * - BREVO_API_KEY: Your Brevo API key (xkeysib-...)
 * - BREVO_LIST_ID: The list ID to add contacts to
 */
export async function subscribeBrevo(
  email: string
): Promise<NewsletterResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey) throw new Error("BREVO_API_KEY is not set");
  if (!listId) throw new Error("BREVO_LIST_ID is not set");

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    // Brevo returns "duplicate_parameter" if contact already exists
    if (body?.code === "duplicate_parameter") {
      return { success: true };
    }

    throw new Error(
      `Brevo API error: ${response.status} ${JSON.stringify(body)}`
    );
  }

  return { success: true };
}
