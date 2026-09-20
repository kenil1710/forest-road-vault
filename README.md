# Forest Road Vault — Community Site

An educational community site for **Forest Road Vault**, the real-world credit
protocol on Ethereum L1. Visitors learn how the protocol works, read the FAQ,
take a 15-question quiz, earn a tree-level certificate based on their score,
and download or share it on X.

> This page is an educational community contribution. It is not affiliated with
> Forest Road Asset Management. It does not constitute investment advice or an
> offer of securities.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Fonts | `next/font/google` — DM Serif Display + DM Sans |
| Icons | Lucide React |
| Theming | `next-themes` (class strategy) |
| Certificate | Canvas 2D, rendered client-side |

There is no backend. Every page is statically prerendered and the quiz,
certificate and share flow run entirely in the browser.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals)
```

---

## Configuration

One optional environment variable, used for Open Graph / Twitter card image
resolution and the "Share on X" link:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL where **this** site is deployed. |

On Vercel this falls back to `NEXT_PUBLIC_VERCEL_URL`, and to
`http://localhost:3000` in development. Set it explicitly once you have a
custom domain, otherwise preview and production share cards will point at the
wrong host.

Note this is deliberately separate from `links.website` in
`lib/constants.ts`, which points at the official protocol site
(`forestroadvault.com`) — that domain does not host this page's OG image.

---

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, theme provider, nav, footer
  page.tsx            Home — hero, stats, about
  how-it-works/       Three-step flow + loss-cascade diagram
  learn/              Deep dive (tabbed: architecture, tokens, security, credit, governance)
  faq/                Accordion FAQ
  quiz/               Quiz, results, certificate, share
  icon.png            Favicon source (App Router convention)
  globals.css         Tailwind layers, design tokens, safe-area handling
components/           UI components (see below)
lib/
  constants.ts        Links, site metadata, tree levels, stats
  questions.ts        The 15 quiz questions
  certificate.ts      Canvas drawing logic for the certificate
  tree.ts             Oak silhouette path, shared by SVG and canvas
public/
  logo.png            Navy tree mark
  logo-light.png      Light-background variant
  banner.png          X / social banner
  og-image.png        Open Graph image
  favicon.ico
```

### Components

| Component | Role |
| --- | --- |
| `Navbar` | Fixed glass nav, active route, mobile sheet |
| `Footer` | Link columns + disclaimer |
| `Hero` | Full-height hero with the animated tree emblem |
| `StatsBar` | Five key metrics, staggered reveal |
| `AboutSection` | Explanation + four highlight cards |
| `HowItWorks` | Three steps + the three-layer loss cascade |
| `DeepDive` | Five-tab panel with a sliding indicator |
| `FAQ` | Accordion with animated height |
| `Quiz` | Start → play → results state machine |
| `Certificate` | Canvas certificate, redrawn as the name is typed |
| `ShareButton` | X intent link |
| `TreeLogo` | Brand oak silhouette (SVG) |
| `SectionHeader` | Reusable eyebrow / title / subtitle |
| `AnimateIn` | Scroll-reveal wrapper |
| `PageTransition` | Route fade |
| `ThemeToggle` / `ThemeProvider` | Dark / light mode |

---

## Design system

Defined in `tailwind.config.ts`:

```
navy        #1a2744   navy-deep  #0f1a2e   navy-light  #243656
forest      #2d6a4f   forest-light #40916c forest-pale #b7e4c7
gold        #d4a843   cream      #f5f3ee
```

Radii: cards `12px`, buttons/inputs `8px`, badges `6px`. Sections use 64px of
vertical padding on mobile and 96px from `lg` up. Content is capped at 1100px.

**Direction:** institutional finance meets nature — serif headings, quiet
forest accents, generous whitespace. No neon, no particle backgrounds.

### The tree emblem

`lib/tree.ts` holds a single path traced from `public/logo.png`, so the SVG
logo and the canvas certificate render the identical oak. It has one interior
gap, so it must be filled with the **evenodd** rule.

### Dark / light mode

Follows the system preference by default, with a navbar toggle. The hero,
how-it-works and quiz sections are always dark — they carry their own
backgrounds regardless of theme.

---

## Accessibility & responsiveness

- Semantic landmarks (`nav`, `main`, `section`, `article`, `footer`), tabs with
  proper `role`/`aria-selected`/`aria-controls`, accordion `aria-expanded`, and
  a labelled progress bar on the quiz.
- Visible `:focus-visible` rings throughout.
- Every animation is disabled when `prefers-reduced-motion: reduce` is set, via
  Framer Motion's `useReducedMotion()` plus a CSS fallback.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.
- Breakpoints: single column below 640px, two columns to 1024px, full layout
  above. `.container-content` combines the page gutter with
  `env(safe-area-inset-*)` using `max()`, so notched phones get extra inset
  without losing the normal gutter.

---

## The quiz & certificate

Questions live in `lib/questions.ts` as
`{ question, options, correctIndex, explanation }`. Answering reveals the
correct option and its explanation before you can advance.

Score bands are in `lib/constants.ts`:

| Score | Level |
| --- | --- |
| 0–5 | 🌱 Seedling |
| 6–9 | 🌿 Sapling |
| 10–15 | 🌳 Elder Tree |

The certificate is drawn at 1080×720 and downloaded via `canvas.toDataURL`.
Two details worth knowing before editing `lib/certificate.ts`:

- `next/font` hashes font family names, so the canvas reads the generated stack
  out of the `--font-display` / `--font-sans` CSS variables at draw time, and
  redraws on `document.fonts.ready`.
- The deepest tree colour is close to the navy background, so text and the
  emblem are lifted toward forest-pale until they clear a luminance threshold.

---

## Deployment

### Vercel

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables once a custom
domain is attached, then redeploy so the share card points at the right host.

### Anywhere else

`npm run build` emits a standard Next.js server build; run it with
`npm run start` behind any Node host.
