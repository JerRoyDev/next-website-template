# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint
```

No test framework is configured.

## Architecture

**Next.js 16 App Router** with full i18n via `next-intl`. All routes live under `src/app/[locale]/`.

### i18n Routing
- Locales: `sv` (default) and `en`
- Middleware: `src/proxy.ts` (next-intl middleware)
- Routing config + locale-aware pathnames: `src/i18n/routing.ts`
- Translation files: `messages/sv.json`, `messages/en.json`
- Navigation helpers (locale-aware `Link`, `redirect`, `usePathname`): `src/i18n/navigation.ts`
- Swedish/English pathname mapping (e.g. `/sv/om-oss` ↔ `/en/about`) is defined in `routing.ts`

### Key Directories
- `src/app/[locale]/` — Page routes and Server Actions (`kontakt/action.ts`)
- `src/components/layout/` — Header, Footer
- `src/components/sections/` — Page section components
- `src/components/shared/` — ThemeProvider, CookieBanner, analytics scripts, JsonLd
- `src/components/ui/` — shadcn/ui components
- `src/lib/` — `metadata.ts` (getAlternates for hreflang), `mail.ts` (Nodemailer), `utils.ts` (cn)
- `src/env.ts` — Zod-validering av `NEXT_PUBLIC_*`-variabler. Säker att importera i client och server. SMTP-vars valideras inline i `mail.ts`.
- `messages/` — Translation JSON files

### SEO & Metadata
Use `getAlternates()` from `src/lib/metadata.ts` in page metadata exports to generate canonical + hreflang alternates. Structured data (JSON-LD) injected via `src/components/shared/JsonLd.tsx`.

Organization schema (root layout) includes `sameAs` with social media URLs from `NEXT_PUBLIC_SOCIAL_*` env vars when set.

### Analytics
Analytics components load conditionally based on cookie consent (CookieBanner). Umami is always loaded (cookie-free). GA4, Meta Pixel, and GTM load after consent. All analytics components are in `src/components/shared/`.

### Forms
Contact form uses React Hook Form + Zod + Server Action (`src/app/[locale]/kontakt/action.ts`) + Nodemailer SMTP. Rate limiting uses IP from `x-forwarded-for`/`x-real-ip` headers. Note: in-memory rate limiting resets on cold start — for production-critical rate limiting, use Upstash Redis or Vercel KV.

### Styling
Tailwind CSS v4 with `@tailwindcss/postcss` and `@tailwindcss/typography`. shadcn/ui components use CSS variables (base-nova theme, neutral base). Path alias: `@/*` → `src/*`. Dark mode fully configured via `.dark` CSS variables in `globals.css`.

### OG Image & Favicon
- `src/app/opengraph-image.tsx` — Dynamic OG image via `ImageResponse`, auto-wired as fallback for all pages. Per-page override: create `src/app/[locale]/[page]/opengraph-image.tsx`.
- `src/app/icon.svg` — Favicon placeholder, replace with real logo per project.

## Environment Variables

Copy `.env.example` to `.env.local`. Validated at startup by `src/env.ts` (required: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`).

**Contact info** (shown on contact page and footer — configure once here, not in translations):
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_ADDRESS`

**Social media** (footer links hidden automatically if empty):
- `NEXT_PUBLIC_SOCIAL_FACEBOOK`, `NEXT_PUBLIC_SOCIAL_INSTAGRAM`, `NEXT_PUBLIC_SOCIAL_LINKEDIN`

**Required for contact form:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`

**Optional:** Analytics IDs (Umami, GA4, Meta Pixel, GTM), `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
