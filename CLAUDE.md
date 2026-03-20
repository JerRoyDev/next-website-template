# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint
pnpm email:dev    # React Email preview server (localhost:3000)
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
- `src/lib/mail/` — Mail system: `send/` (SMTP/Resend/Brevo/Console providers), `templates/` (React Email), `newsletter/` (Brevo subscription)
- `src/lib/` — `metadata.ts` (getAlternates for hreflang), `utils.ts` (cn)
- `src/env.ts` — Zod-validering av `NEXT_PUBLIC_*`-variabler. Säker att importera i client och server. Server-only mail-vars valideras inline i respektive provider.
- `messages/` — Translation JSON files

### SEO & Metadata
Use `getAlternates()` from `src/lib/metadata.ts` in page metadata exports to generate canonical + hreflang alternates. Structured data (JSON-LD) injected via `src/components/shared/JsonLd.tsx`.

Organization schema (root layout) includes `sameAs` with social media URLs from `NEXT_PUBLIC_SOCIAL_*` env vars when set.

### Analytics
Analytics components load conditionally based on cookie consent (CookieBanner). Umami is always loaded (cookie-free). GA4, Meta Pixel, and GTM load after consent. All analytics components are in `src/components/shared/`.

### Mail System
Provider-based mail abstraction in `src/lib/mail/`. Configured via `MAIL_PROVIDER` env var:
- `smtp` (default) — Nodemailer, zero external dependencies
- `resend` — Resend SDK, better deliverability, requires `MAIL_FROM` with verified domain
- `brevo` — Brevo transactional API, uses same `BREVO_API_KEY` as newsletter, requires `MAIL_FROM`
- `console` — Logs to terminal, for development without SMTP credentials

HTML email templates built with React Email (`src/lib/mail/templates/`). Contact form sends both a notification to site owner and a confirmation email to the submitter, with i18n subjects via `Mail.*` translation keys.

### Newsletter
Optional newsletter signup (`NEXT_PUBLIC_NEWSLETTER_ENABLED=true`). UI component `NewsletterSection` renders in footer (inline variant) or as standalone section. Backend uses pluggable provider pattern (`NEWSLETTER_PROVIDER` env var). Brevo example integration included — handles double opt-in via Brevo's built-in flow.

### Forms
Contact form uses React Hook Form + Zod + Server Action (`src/app/[locale]/kontakt/action.ts`). Rate limiting uses IP from `x-forwarded-for`/`x-real-ip` headers. Note: in-memory rate limiting resets on cold start — for production-critical rate limiting, use Upstash Redis or Vercel KV.

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

**Mail provider:** `MAIL_PROVIDER` (`smtp`/`resend`/`console`), `MAIL_FROM` (required for Resend), `CONTACT_EMAIL`

**Required for SMTP:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

**Required for Resend:** `RESEND_API_KEY`, `MAIL_FROM`

**Newsletter:** `NEXT_PUBLIC_NEWSLETTER_ENABLED`, `NEWSLETTER_PROVIDER`, `BREVO_API_KEY`, `BREVO_LIST_ID`

**Mail preview:** `NEXT_PUBLIC_MAIL_PREVIEW=true` — shows rendered emails in a Sheet popup after contact form submission. For dev/preview only, never production.

**Optional:** Analytics IDs (Umami, GA4, Meta Pixel, GTM), `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
