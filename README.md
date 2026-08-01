# ARVIT AI — Marketing Website

The public marketing site for **ARVIT AI**, an AI-powered pediatric therapy and AAC
(Augmentative & Alternative Communication) platform. Built with Next.js 16 (App
Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP, React Three Fiber, and
Lenis smooth scrolling.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first theme in `src/app/globals.css`) |
| UI primitives | Hand-built (`src/components/ui`), styled with `class-variance-authority` |
| Animation | Framer Motion (scroll reveals, layout transitions, gestures) + GSAP (`SplitText`, `ScrollTrigger`, `DrawSVGPlugin`) via `@gsap/react`'s `useGSAP` |
| 3D | React Three Fiber + drei (hero visualization only, code-split, idle-loaded) |
| Smooth scroll | Lenis, bridged to GSAP's `ScrollTrigger` |
| Theme | `next-themes` (light/dark, system-aware) |
| Carousel | Embla (+ autoplay plugin) |
| Icons | `lucide-react`, plus hand-drawn stroke icons for social brands (`src/components/icons/social-icons.tsx`) since lucide no longer ships brand marks |

## Project structure

```
src/
  app/                 Routes (App Router). One folder per page, plus
                        icon.tsx / apple-icon.tsx / opengraph-image.tsx
                        (generated via next/og), sitemap.ts, robots.ts,
                        api/contact/route.ts.
  components/
    ui/                Low-level primitives: Button, Card, Input, Accordion, Dialog...
    motion/             Reusable animation wrappers: Reveal, StaggerGroup/Item,
                        TiltCard, Magnetic, AnimatedCounter, SplitHeading, Typewriter.
    layout/             Navbar, Footer, MobileMenu, ScrollProgressBar, BackToTop.
    providers/          ThemeProvider, SmoothScrollProvider (Lenis + GSAP bridge),
                        PageTransition.
    effects/            Preloader, CursorGlow.
    three/              R3F hero scene (code-split, error-boundaried, reduced-motion aware).
    backgrounds/        AuroraBackground.
    illustrations/      Hand-built SVG/DOM illustrations (dashboard mockup, AAC board,
                        caseload mockup, map visual) — no stock imagery.
    sections/           Page sections, organized by page (home/, about/, aac/, ...)
                        plus sections/shared/ for cross-page pieces (PageHero, CtaBand,
                        BenefitList, TestimonialsGrid).
  lib/
    constants.ts        Site metadata, nav structure, footer links, social links.
    data/                Typed content arrays (features, testimonials, FAQ, stats, ...).
  hooks/                useMagnetic, useMediaQuery, useMounted.
```

## Known placeholders — replace before launch

This is a design/engineering deliverable, not a finished business. The following are
intentionally stubbed and should be replaced with real content/integrations:

- **Contact info** (`src/lib/constants.ts`): email, phone, and address are placeholders.
- **Testimonials** (`src/lib/data/testimonials.ts`): illustrative quotes, not real
  customers. Replace with verified quotes and consent before publishing.
- **Contact form backend** (`src/app/api/contact/route.ts`): validates and logs
  submissions but does not send email or hit a CRM. Wire up a provider (Resend,
  Postmark, HubSpot, etc.).
- **Map** (`src/components/illustrations/map-visual.tsx`): a stylized decorative map,
  not a geocoded embed — the address is a placeholder, so it isn't pinned to a real
  location.
- **Legal pages** (`/privacy-policy`, `/terms`): flagged in-page as placeholder text
  pending real legal review — this matters given the platform touches children's
  health-adjacent data.
- **Careers**: no fabricated job listings; the page invites direct outreach instead.
- **`SITE.url`** in `src/lib/constants.ts`: update to the real production domain
  (used for canonical URLs, sitemap, and Open Graph metadata).

## Notes

- Scaffolded with the latest `create-next-app`, which resolved to **Next.js 16**
  rather than 15 (15 is no longer what `latest` installs). App Router usage here is
  unaffected; see the version-16 upgrade notes bundled at
  `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` if you need
  the specifics.
- The 3D hero scene is dynamically imported, mounts only after the browser is idle,
  and falls back to a static gradient blob for `prefers-reduced-motion` users or if
  WebGL initialization fails.
- Lighthouse: inner pages (no 3D scene) score ~93-100 across Performance/
  Accessibility/Best Practices/SEO. The home page trades some Performance margin
  (~60s) for the full WebGL + GSAP ScrollTrigger + carousel experience — see the
  final chat summary for the detailed breakdown and options to close that gap further.
