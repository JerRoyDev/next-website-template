"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const contactSchema = z.object({
  name: z.string().min(1).min(2),
  email: z.string().min(1).email(),
  phone: z.string().optional(),
  message: z.string().min(1).min(10),
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

  // Simple in-memory rate limiting (resets on server restart)
  const ip = "unknown"; // In production, extract from headers
  if (isRateLimited(ip)) {
    return { success: false, error: "Too many submissions" };
  }

  const timestamps = submissions.get(ip) ?? [];
  timestamps.push(Date.now());
  submissions.set(ip, timestamps);

  try {
    await sendContactEmail(parsed.data);
    return { success: true };
  } catch {
    console.error("Failed to send contact email");
    return { success: false, error: "Failed to send email" };
  }
}
