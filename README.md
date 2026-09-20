# Forest Road Vault — Community Site

An educational community site for **Forest Road Vault**, the real-world credit
protocol on Ethereum L1. Visitors learn how the protocol works, read the FAQ,
take a 15-question quiz, earn a tree-level certificate, and share it on X —
with the certificate itself rendered as the card image.

**Live:** https://forest-road-vault-cyan.vercel.app
**Source:** https://github.com/kenil1710/forest-road-vault

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
| Fonts | `next/font/google` — Playfair Display, DM Sans, JetBrains Mono |
| Icons | Lucide React |
| Theming | `next-themes` (class strategy, light default) |
| Certificate (client) | Canvas 2D |
| Certificate (share card) | `next/og` (Satori) at `/api/og-certificate` |
| Quiz persistence | `localStorage` |

No database and no backend service. Everything is statically prerendered except
the certificate image route and the share page, which are rendered on demand.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals)
```

---

## Configuration

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL where **this** site is deployed. |

`NEXT_PUBLIC_SITE_URL` is already set on the Production environment to
`https://forest-road-vault-cyan.vercel.app`. Update it and redeploy whenever the
public hostname changes, otherwise share cards will point at the old host.

Note the per-deployment URLs (`*-kenils-projects-*.vercel.app`) sit behind
Vercel Authentication and redirect to a login page. That is why the site URL is
pinned to the public production alias rather than left to Vercel's
`NEXT_PUBLIC_VERCEL_URL`, which resolves to the protected deployment host and
would make Open Graph images unreachable to crawlers.

Pushes to `main` auto-deploy — the GitHub repo is connected to the Vercel
project.

---

## Design system

Brand direction: **luxury finance meets nature** — private-bank marketing, not
crypto Twitter. Cream ground, navy type, gold accents, sharp corners.

```
cream       #F5F1EA   cream-dark  #EDE8DF
navy        #1B2A4A   navy-deep   #0F1A2E   navy-light  #243656
forest      #1E3D2F   forest-light #2D6A4F  forest-pale #B7E4C7
gold        #C4A44E   gold-light  #D4B96A   gold-muted  #B8972F
muted       #5A6A80   warmline    #D6D0C4
```

Type: Playfair Display (700–900) for headings, DM Sans for body and UI,
JetBrains Mono for technical detail. The tagline treatment — uppercase, 0.2em
tracking, gold — is the `.tagline` / `.tagline-on-dark` utility.

Radii are deliberately tight (cards 2px, controls 4px). Sections run 120px of
vertical padding on desktop, 64px on mobile. Content caps at 1100px.

Sections alternate cream → navy → cream for contrast. The quiz, the share page
and the footer are always navy; everything else leads with cream.

### The tree emblem

`lib/tree.ts` holds a single path traced from the brand mark
(`public/images/logo-navy.png`), so the SVG logo, the canvas certificate and the
Satori share card all render the identical oak. It has one interior gap, so it
must be filled with the **evenodd** rule.

---

## The quiz

Questions live in `lib/questions.ts` as
`{ question, options, correctIndex, explanation }`. Answering reveals the
correct option and its explanation before you can advance.

| Score | Level |
| --- | --- |
| 0–5 | 🌱 Seedling |
| 6–9 | 🌿 Sapling |
| 10–15 | 🌳 Elder Tree |

### Persistence

`lib/quiz-storage.ts` writes progress to `localStorage` after every answer.
On mount, `components/quiz/Quiz.tsx` decides what to show:

- **completed** → results and certificate, restored directly
- **in-progress with answers** → a resume dialog offering Resume or Start Over
- **in-progress with no answers**, or nothing saved → the start screen

Two details worth preserving if you touch this:

- Every read is wrapped in `try`/`catch` and validated. Storage throws in
  Safari private mode, and a stale entry from an older build must not crash the
  page — an invalid record is treated as no record.
- A session saved *between* answering and pressing Next already holds an answer
  for the current question. `Quiz.tsx` restores that selection on resume and
  refuses a second answer for the same index. Without both guards the question
  is answerable twice and the score double-counts.

---

## Sharing the certificate on X

X cannot attach an image from a URL in the tweet composer, so there are two
paths:

1. **Web Share API** (mobile and some desktop browsers) — the canvas is
   converted to a PNG `File` and passed to `navigator.share`, which attaches the
   real image. Guarded by `navigator.canShare({ files })`.
2. **Intent fallback** (desktop) — opens the X composer pointing at
   `/quiz/share?name=…&score=…&level=…`. That page's `generateMetadata` sets
   `og:image` to `/api/og-certificate` with the same parameters, so X fetches
   the generated certificate and renders it as the card.

A cancelled share sheet throws `AbortError`; that is treated as a no-op rather
than falling through to the intent.

### `/api/og-certificate`

Runs on the edge runtime and renders the certificate at 1200×675 (16:9, the
ratio `summary_large_image` expects). Fonts are bundled beside the route and
loaded with `fetch(new URL('./fonts/…', import.meta.url))`, so there is no
runtime dependency on Google Fonts.

Two constraints to respect when editing it:

- **Satori is not a browser.** Any `<div>` with more than one child needs an
  explicit `display: flex`. Interpolating two values into one element (for
  example `Score: {a} / {b}`) counts as multiple children — build the string
  first.
- **Satori has no `<path>` support.** The tree is passed in as an inline SVG
  data URI on an `<img>`.

Both the query params and the share page's `searchParams` are untrusted input:
the name is length-capped, the score is parsed and range-checked, and an unknown
level slug falls back to the band implied by the score.

---

## Accessibility & responsiveness

- Semantic landmarks, tabs with `role`/`aria-selected`/`aria-controls`,
  accordion `aria-expanded`, a labelled quiz progress bar, and a resume dialog
  with `role="dialog"`/`aria-modal`.
- Visible `:focus-visible` rings throughout.
- Every animation is disabled under `prefers-reduced-motion: reduce`, via
  Framer Motion's `useReducedMotion()` plus a CSS fallback.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.
- `.container-content` combines the page gutter with `env(safe-area-inset-*)`
  using `max()`, so notched phones gain inset without losing the gutter. A
  separate safe-area class would override the padding and zero it out.

---

## Deployment

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Or just push to `main`.
