import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicita regler för AI-crawlers — GEO (Generative Engine Optimization).
      // Dessa bots indexerar innehåll för AI-svar i ChatGPT, Perplexity, Google AI Overviews m.fl.
      // allow: "/" = tillåt indexering och citering (rekommenderat för synlighet).
      // Ändra till disallow: "/" om du vill blockera en specifik bot.
      {
        userAgent: ["GPTBot", "OAI-SearchBot"],       // OpenAI (träning + sökning)
        allow: "/",
      },
      {
        userAgent: "Google-Extended",                  // Google AI Overviews + Gemini
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",                    // Perplexity AI (realtidssökning)
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",                        // Anthropic Claude (träningsdata)
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
