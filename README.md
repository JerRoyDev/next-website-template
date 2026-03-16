# Next.js Website Template

Produktionsfärdig Next.js 16-mall för flerspråkiga webbplatser. Bygger rent utan varningar, klarar Lighthouse SEO-audit, och inkluderar allt som behövs för att deploya en riktig sajt — i18n, kontaktformulär, analytics, GDPR-samtycke, säkerhetshuvuden och strukturerad data.

## Redo för produktion

- **Lighthouse SEO** — Canonical, hreflang, OG, Twitter Card, robots, JSON-LD
- **Flerspråkig (sv/en)** — Lokaliserade URLs, hreflang-alternates, x-default
- **GDPR** — Cookie-banner med samtycke, GTM laddas först efter godkännande
- **Säkerhet** — HSTS, X-Frame-Options, CSP-headers via `vercel.json`, `poweredByHeader: false`
- **Kontaktformulär** — Server Action + Nodemailer + Zod-validering + rate limiting
- **Analytics** — Umami (cookie-fri) + GA4 direkt + Meta Pixel direkt (båda samtyckesbaserade, inga GTM-beroenden)
- **Felhantering** — `error.tsx`, `global-error.tsx`, `not-found.tsx`
- **Sitemap & robots.txt** — Dynamiskt genererade med hreflang-alternates per sida
- **Google Search Console** — Verifieringsmeta via env-variabel

## Tech Stack

| Kategori | Teknik |
|---|---|
| Framework | Next.js 16.1.6, React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (base-nova) |
| i18n | next-intl 4.8.3 (sv + en, lokaliserade pathnames) |
| Formulär | react-hook-form + zod 4 + @hookform/resolvers |
| E-post | Nodemailer 8 (SMTP) |
| Animationer | Motion (framer-motion) |
| Ikoner | lucide-react |
| Tema | next-themes (dark mode förberett) |
| Deployment | Vercel |
| Pakethanterare | pnpm |

## Komma igång

```bash
pnpm install
cp .env.example .env.local   # fyll i dina värden
pnpm dev
```

### shadcn/ui-komponenter

shadcn CLI finns som dev-dependency:

```bash
pnpm shadcn add dialog
pnpm shadcn add table tabs
```

Installerade: Button, Input, Textarea, Label, Form, Card, Accordion, Sheet, NavigationMenu, Separator.

## Miljövariabler

Kopiera `.env.example` → `.env.local` och fyll i. Alla variabler:

| Variabel | Beskrivning | Obligatorisk |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Webbplatsens URL (t.ex. `https://example.com`) | Ja |
| `NEXT_PUBLIC_SITE_NAME` | Företagsnamn (visas i metadata, mail, footer) | Ja |
| `SMTP_HOST` | SMTP-server (t.ex. `smtp.gmail.com`) | Ja |
| `SMTP_PORT` | SMTP-port (default: `587`) | Ja |
| `SMTP_USER` | SMTP-användarnamn | Ja |
| `SMTP_PASS` | SMTP-lösenord / app-lösenord | Ja |
| `CONTACT_EMAIL` | Mottagare av kontaktformulär | Ja |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami webbplats-ID | Nej |
| `NEXT_PUBLIC_UMAMI_URL` | Umami-instansens URL | Nej |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (direkt, utan GTM) | Nej |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (Facebook/Instagram Ads, utan GTM) | Nej |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID (alternativ till direkt GA4/Meta Pixel) | Nej |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console-verifiering | Nej |

## Projektstruktur

```
src/
├── app/
│   ├── [locale]/                       # Locale-routade sidor
│   │   ├── page.tsx                    # Startsida
│   │   ├── om-oss/page.tsx             # Om oss
│   │   ├── tjanster/page.tsx           # Tjänster
│   │   ├── kontakt/
│   │   │   ├── page.tsx                # Kontaktformulär
│   │   │   └── action.ts              # Server Action (Nodemailer + rate limit)
│   │   ├── blogg/
│   │   │   ├── page.tsx                # Blogglista
│   │   │   └── [slug]/page.tsx         # Blogginlägg (med BlogPosting JSON-LD)
│   │   ├── faq/page.tsx                # FAQ (med FAQPage JSON-LD)
│   │   ├── integritetspolicy/page.tsx  # Integritetspolicy
│   │   ├── layout.tsx                  # Locale layout (metadata, fonts, providers)
│   │   ├── error.tsx                   # Felsida (500)
│   │   └── not-found.tsx               # 404
│   ├── global-error.tsx                # Root-level felsida
│   ├── layout.tsx                      # Root layout
│   ├── sitemap.ts                      # Dynamisk sitemap med hreflang
│   └── robots.ts                       # robots.txt
├── components/
│   ├── layout/                         # Header, Footer
│   ├── sections/                       # Hero, Features, Testimonials, CTA, FAQ, ContactForm
│   ├── shared/                         # JsonLd, ThemeProvider, Analytics, CookieBanner, GTM, GA4Script, MetaPixel
│   └── ui/                             # shadcn/ui-komponenter
├── i18n/
│   ├── routing.ts                      # Locales, pathnames, prefix-konfiguration
│   ├── navigation.ts                   # Locale-aware Link, redirect, usePathname
│   └── request.ts                      # Server-side locale-konfiguration
├── lib/
│   ├── metadata.ts                     # getAlternates() — canonical + hreflang-helper
│   ├── mail.ts                         # Nodemailer SMTP-klient
│   └── utils.ts                        # cn() (clsx + tailwind-merge)
├── proxy.ts                            # i18n-middleware (Next.js 16-format)
messages/
├── sv.json                             # Svenska översättningar
└── en.json                             # Engelska översättningar
```

## Lokaliserade URLs

Alla sidor har lokaliserade pathnames via next-intl:

| Sida | Svenska | Engelska |
|---|---|---|
| Startsida | `/sv` | `/en` |
| Om oss | `/sv/om-oss` | `/en/about` |
| Tjänster | `/sv/tjanster` | `/en/services` |
| Kontakt | `/sv/kontakt` | `/en/contact` |
| Blogg | `/sv/blogg` | `/en/blog` |
| Blogginlägg | `/sv/blogg/[slug]` | `/en/blog/[slug]` |
| FAQ | `/sv/faq` | `/en/faq` |
| Integritetspolicy | `/sv/integritetspolicy` | `/en/privacy-policy` |

## Analytics & Tracking

### Så fungerar det

Mallen har tre analytics-spår:

| Spår | Samtycke krävs? | Env-variabel | Hur det laddas |
|---|---|---|---|
| **Umami** | Nej (cookie-fri) | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Script laddas alltid |
| **GA4 (direkt)** | Ja | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Laddas efter cookie-samtycke |
| **Meta Pixel (direkt)** | Ja | `NEXT_PUBLIC_META_PIXEL_ID` | Laddas efter cookie-samtycke |
| **GTM** | Ja | `NEXT_PUBLIC_GTM_ID` | Laddas efter cookie-samtycke |

**Direkt vs GTM — två strategier, välj en:**

**Direkt (rekommenderat från dag 1):** Sätt `NEXT_PUBLIC_GA_MEASUREMENT_ID` och `NEXT_PUBLIC_META_PIXEL_ID`. Data samlas in direkt utan att kunden behöver konfigurera någonting. Meta bygger upp annonsaudiences i bakgrunden — redo när kunden väl vill köra kampanjer.

**Via GTM:** Sätt `NEXT_PUBLIC_GTM_ID` och konfigurera taggar i GTM-dashboarden. Lämpa sig när kunden själv vill hantera tracking. Datan hör till ID:t, inte till hur det laddas — byt strategi när som helst utan dataförlust.

> **OBS:** Kör aldrig båda med samma ID. Antingen direkt ELLER GTM — det ger dubbelräkning.

### Konfigurera GA4 via GTM

1. Skapa ett GTM-konto på [tagmanager.google.com](https://tagmanager.google.com)
2. Kopiera Container-ID:t (format: `GTM-XXXXXXX`) → sätt som `NEXT_PUBLIC_GTM_ID` i `.env.local`
3. I GTM: **Tags → New → Google Analytics: GA4 Configuration**
4. Klistra in ditt GA4 Measurement ID (`G-XXXXXXXXXX`)
5. Trigger: **All Pages**
6. Publicera containern

### Konfigurera Meta Pixel (Facebook/Instagram Ads) via GTM

1. Hämta ditt Pixel-ID från [Meta Events Manager](https://business.facebook.com/events_manager)
2. I GTM: **Tags → New → Custom HTML**
3. Klistra in Meta Pixel-baskodens `<script>`-tagg
4. Trigger: **All Pages**
5. Publicera containern

### Konfigurera Google Ads via GTM

**Remarketing** (visa annonser för tidigare besökare):

1. I GTM: **Tags → New → Google Ads: Remarketing**
2. Klistra in ditt Conversion ID (finns i Google Ads → Verktyg → Konverteringar)
3. Trigger: **All Pages**

**Conversion Tracking** (t.ex. spåra kontaktformulär):

1. I GTM: **Tags → New → Google Ads: Conversion Tracking**
2. Fyll i Conversion ID + Conversion Label (från Google Ads → Konverteringar)
3. Trigger: Skapa ett anpassat event-trigger, t.ex. `form_submit_success`
4. Skicka eventet från kontaktformulärets bekräftelse: `window.dataLayer.push({ event: 'form_submit_success' })`

Samma princip fungerar för LinkedIn Insight Tag, TikTok Pixel, etc.

### Var ser jag att det fungerar?

| Verktyg | URL | Vad du ser |
|---|---|---|
| **GTM Preview** | [tagmanager.google.com](https://tagmanager.google.com) → Preview-knappen | Realtidsvy av vilka taggar som fyrar på din sajt |
| **GA4 Realtime** | [analytics.google.com](https://analytics.google.com) → Rapporter → Realtid | Aktiva användare, sidvisningar, events i realtid |
| **GA4 DebugView** | [analytics.google.com](https://analytics.google.com) → Admin → DebugView | Detaljerad event-för-event-vy (kräver GA Debug-tillägget i Chrome) |
| **Meta Events Manager** | [business.facebook.com/events_manager](https://business.facebook.com/events_manager) | Pixel-events, testevents, diagnostik |
| **Meta Pixel Helper** | Chrome-tillägg | Visar vilka Pixel-events som fyrar på sidan |
| **Umami Dashboard** | Din Umami-instans (t.ex. `cloud.umami.is`) | Besökare, sidvisningar, källor — utan cookies |

> **Tips:** Använd GTM:s Preview-läge + GA4 DebugView tillsammans för att verifiera att allt triggas korrekt innan du publicerar.

## SEO

Varje sida har individuell `generateMetadata` med:

- **Canonical URL** — Matchar den URL som faktiskt serveras
- **hreflang** — Alla locale-varianter + `x-default`
- **Open Graph** — Type, siteName, locale (`sv_SE`/`en_US`), URL
- **Twitter Card** — `summary_large_image`
- **Robots** — `index: true, follow: true`
- **JSON-LD** — `BlogPosting` på blogginlägg, `FAQPage` på FAQ-sidan

Sitemap genereras dynamiskt med hreflang-alternates för alla sidor och blogginlägg.

## Säkerhet

Konfigurerat via `vercel.json` och `next.config.ts`:

- `Strict-Transport-Security` (HSTS 2 år + preload)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `poweredByHeader: false`
- Statiska assets cachas med `immutable, max-age=31536000`

## Anpassa för en kund

1. **`.env.local`** — Domän, SMTP, analytics-ID:n
2. **`messages/sv.json` + `en.json`** — Alla texter och blogginnehåll
3. **`globals.css`** — Färgtema (shadcn/ui CSS-variabler i Oklch-format)
4. **`FeaturesSection.tsx`** — Byt lucide-react-ikoner
5. **`Header.tsx`** — Lägg till logotyp
6. **`public/`** — Bilder, favicon, OG-bild

## Utöka mallen

### Lägga till en ny sida

1. Skapa mapp `src/app/[locale]/min-sida/page.tsx`
2. Lägg till `generateMetadata` med `getAlternates()` från `@/lib/metadata`
3. Anropa `setRequestLocale(locale)` i sidkomponenten
4. Lägg till pathname-mappning i `src/i18n/routing.ts`
5. Lägg till översättningar i `messages/sv.json` + `en.json`
6. Lägg till navigeringslänk i `Header.tsx`

### Lägga till ett nytt språk

1. Lägg till locale i `src/i18n/routing.ts` (`locales: ["sv", "en", "fi"]`)
2. Skapa `messages/fi.json` med alla nycklar
3. Lägg till pathname-mappningar i `routing.ts`
4. Lägg till locale-mapping i `layout.tsx` (`fi → fi_FI`)

### CMS-integration

Mallen har inga CMS-beroenden — allt innehåll lever i `messages/*.json`.

För att integrera ett CMS (Sanity, Strapi, etc.):

1. Installera CMS-klienten
2. Skapa datahämtning i `src/lib/`
3. Ersätt JSON-data med CMS-data i sidkomponenterna
4. Konfigurera `revalidate` för ISR vid behov
5. Lägg till CMS-domäner i `next.config.ts` → `images.remotePatterns`

## Deploy

```bash
pnpm build
vercel --prod
```

Sätt `NEXT_PUBLIC_SITE_URL` till den riktiga domänen i Vercel → Environment Variables.
Säkerhetshuvuden appliceras automatiskt via `vercel.json`.
