# Sara's Studio — Project Knowledge Base

> **Last updated:** 6 May 2026  
> **Repository:** `https://github.com/shad0z2132/sarastudio`  
> **Deployment:** Vercel (auto-deploy from `main`)  
> **Language:** Romanian (content), English (code/comments)  

---

## 1. Project Identity

**Sara's Studio** is a premium, cinematic art portfolio website for a Romanian oil painter based in Vienna. The design philosophy is:

- **Museum-quality, not e-commerce.** No carts, no "Buy Now" buttons. Works are presented with wall labels, availability status, and inquiry paths.
- **Dark warm palette** — warm obsidian (`#0C0908`), raw umber accent (`#8B4513`), gesso text (`#E8E6E1`).
- **Editorial typography** — Cormorant Garamond (display/italic headlines), Geist Sans (body), Geist Mono (labels/metadata).
- **Cinematic motion** — every interaction uses Ease-Out-Expo (`cubic-bezier(0.19, 1, 0.22, 1)`) with long durations (800ms–1400ms).
- **Atmospheric depth** — multiple background layers create a living canvas feel (oil paint texture, dust particles, vignette, noise).

---

## 2. Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 16.2.4 | App Router, static export (`output: 'export'`) |
| Language | TypeScript 5.7.3 | Strict mode, all components typed |
| Styling | Tailwind CSS 4.2.0 | Custom theme tokens in `globals.css` |
| Animation | Motion (Framer Motion v12) | `motion/react` — layout animations, scroll, spring physics |
| Smooth Scroll | Lenis 1.3.23 | Wrapped in `components/smooth-scroll.tsx` |
| UI Primitives | Radix UI | Dialog, Select, Tabs, Tooltip, etc. via shadcn/ui |
| Icons | Lucide React | Consistent iconography |
| Package Manager | pnpm 10.x | `pnpm-lock.yaml` is the lockfile of record |
| Hosting | Vercel | Auto-deploy from `main` branch |
| Analytics | Vercel Analytics | Only loads in production |

### Critical Build Settings (`next.config.mjs`)

```js
{
  typescript: { ignoreBuildErrors: true },   // Sanity schema noise
  images: { unoptimized: true },             // Static export
  devIndicators: false,                      // Hides Next.js bottom-left logo
}
```

---

## 3. Design System

### Color Tokens

```css
--background:   #0C0908   /* Warm obsidian */
--foreground:   #E8E6E1   /* Gesso (primary text) */
--accent:       #8B4513   /* Raw Umber (links, highlights, dots) */
--surface:      #141110   /* Elevated panels/cards */
--muted-foreground: #8A8680 /* Secondary text */
--border:       #1F1F1F   /* Dividers, hairlines */
```

### Typography

| Token | Font | Weight | Usage |
|-------|------|--------|-------|
| `font-display` | Cormorant Garamond | 300–600, italic | Headlines, titles, pull quotes |
| `font-sans` | Geist | 400–500 | Body text, nav links |
| `font-mono` | Geist Mono | 400 | Labels, metadata, captions, timestamps |

**Rules:**
- Mono text is always uppercase with aggressive tracking (`tracking-[0.15em]` to `tracking-[0.3em]`).
- Display text is often italic and light (`font-light italic`).
- No border-radius anywhere (`--radius: 0px`). Everything is sharp.

### Motion Tokens

```css
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
--dur-page: 1200ms;
--dur-micro: 800ms;
```

Standard transition class:
```
transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]
```

### Elevation / Shadows

Cards and frames lift on hover with dramatic shadows:
```css
shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)]   /* featured artwork */
shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)]   /* gallery tiles */
```

---

## 4. Component Inventory

### Layout & Atmosphere (always mounted in `app/layout.tsx`)

| Component | File | Purpose |
|-----------|------|---------|
| `PagePreloader` | `components/page-preloader.tsx` | Full-screen cinematic loader. Shows on every visit. Progress counter + wordmark + tagline. Uses `fecc44911e822c609f4c8d2d70a0628b.jpg` as background. |
| `OilPaintTexture` | `components/oil-paint-texture.tsx` | Subtle canvas grain overlay |
| `CinematicVignette` | `components/cinematic-vignette.tsx` | Darkened screen edges |
| `DustParticles` | `components/dust-particles.tsx` | Floating dust motes (20 count) |
| `ShadowCurtain` | `components/shadow-curtain.tsx` | Depth layer |
| `NoiseOverlay` | `components/noise-overlay.tsx` | Film grain |
| `CustomCursor` | `components/custom-cursor.tsx` | **Currently returns `null`** — native cursor is visible |
| `ScrollPercentage` | `components/scroll-percentage.tsx` | Thin progress bar at top |
| `SmoothScroll` | `components/smooth-scroll.tsx` | Lenis wrapper with `lerp: 0.08` |
| `PageTransition` | `components/page-transition.tsx` | Blink/flash route transition (500ms white flash) |
| `SiteNav` | `components/site-nav.tsx` | Transparent → frosted glass on scroll. Mobile hamburger with staggered overlay. |
| `SiteFooter` | `components/site-footer.tsx` | Manifesto quote, animated gradient border, giant "Studio" wordmark at `18vw`, back-to-top |

### Reusable Animation Components

| Component | File | Purpose |
|-----------|------|---------|
| `FadeIn` | `components/fade-in.tsx` | Scroll-triggered fade + translateY. Configurable direction, delay, duration. |
| `ImageReveal` | `components/image-reveal.tsx` | Clip-path wipe (`inset(100% 0 0 0)` → `inset(0)`) + blur(8px)→0 + scale(1.1)→1 |
| `PaintingHover` | `components/painting-hover.tsx` | Mouse-reactive spotlight + varnish sheen + vignette + **magnifying lens** (90px, 2× zoom, inverted colors) |
| `Ticker` | `components/ticker.tsx` | Infinite horizontal scroll strip. Pauses on hover. Two variants: display font (diamond separators) and mono (✦ separators). |

### Page-Specific Components

| Component | File | Used On |
|-----------|------|---------|
| `Hero` | `components/hero.tsx` | Home (`/`) — parallax background, blur-reveal headline, floating artwork frame |
| `FeaturedArtwork` | `components/featured-artwork.tsx` | Home — gallery-wall plate treatment with roman numerals |
| `GalleryGrid` | `components/gallery-grid.tsx` | `/galerie` — masonry grid, sticky filter bar, lightbox integration |
| `GalleryLightbox` | `components/gallery-lightbox.tsx` | Gallery — full-bleed black viewer, `object-contain`, Escape to close |
| `GalleryHero` | `app/galerie/hero.tsx` | Gallery — cinematic hero with scroll indicator |
| `HorizontalArtworkStrip` | `components/horizontal-artwork-strip.tsx` | Home — slow infinite carousel, tripled items for seamless loop |
| `AboutSection` | `components/about-section.tsx` | Home — asymmetric editorial layout, stats row, pull quote |
| `Pillars` | `components/pillars.tsx` | Home — "Practică" section with diamond texture bg, vertical accent lines, roman watermark |
| `ReflectionsList` | `components/reflections-list.tsx` | `/reflectii` — magazine-spread layout, left accent lines on hover, large number watermarks |
| `WorkshopBooking` | `components/workshop-booking.tsx` | `/workshops` — booking form with sessions |
| `WorkshopCTA` | `components/workshop-cta.tsx` | Workshops — call-to-action |
| `Newsletter` | `components/newsletter.tsx` | Footer-adjacent |
| `BackgroundTypography` | `components/background-typography.tsx` | Home — massive ghost words ("UMBRĂ", "SIMBOL") at 2.5% opacity |

### shadcn/ui Components

Full shadcn/ui component library is installed in `components/ui/`. Commonly used:
- `Dialog` (lightbox base)
- `Button` (with `variant="outline"`, `ghost`, etc.)
- `Badge`, `Card`, `Separator`, `Tabs`
- All Radix primitives are available.

---

## 5. Page Structure

```
/                    → Home (Hero + Featured Works + About + Practică + Ticker + Reflecții preview)
/galerie             → Gallery (Hero + Filterable Masonry Grid + Lightbox)
/galerie/[slug]      → Artwork Detail (not yet built — links from grid go here)
/cine-sunt-eu        → Artist bio (magazine-spread layout, image reveal, fade-in)
/reflectii           → Editorial reflections list (magazine layout)
/reflectii/[slug]    → Individual article (not yet built)
/workshops           → Workshop listing + booking form
/contact             → Contact page (basic)
/design              → Design system showcase page
```

---

## 6. Data Layer

### Types (`lib/types.ts`)

All domain types are shaped after Sanity.io documents but are CMS-agnostic:

- `Artwork` — `_id`, `slug`, `title`, `category` (`abstracte` | `simbolice`), `emotionalState[]`, `year`, `medium`, `dimensions`, `description`, `image: CmsImage`, `price?: PriceInfo`, `featured: boolean`
- `Reflection` — `_id`, `slug`, `title`, `excerpt`, `coverImage`, `tags[]`, `author`, `readingTimeMin`, `publishedAt`, `body?: unknown`
- `Workshop` — `_id`, `slug`, `title`, `summary`, `format`, `durationMin`, `priceCents`, `currency`, `intentions[]`, `coverImage`, `sessions: WorkshopSession[]`
- `CmsImage` — `url`, `width`, `height`, `lqip` (base64 placeholder), `alt`

### Mock Data (`lib/mock-data.ts`)

Currently uses deterministic mock data. **9 real paintings** are loaded with Romanian metadata:

1. Copacul vieții
2. Ființa sacră
3. Kundalini
4. Reflecția
5. Meditație
6. Ochiul din negură
7. Ispita
8. Poarta
9. Pomul cunoașterii

**Image paths:** All use `/Screenshot 2026-05-05 21XXXX.png` format. These are real painting screenshots.

**LQIP:** All images share the same inline SVG placeholder (dark gray square).

### Sanity Integration

The codebase is architected for Sanity CMS but currently runs on mock data. When env vars are configured:
- Swap `mock-data.ts` imports for Sanity client fetches
- `CmsImage` shape matches Sanity's image asset projection
- `body?: unknown` on `Reflection` is meant for PortableText

---

## 7. Animation & Motion System

### Ease-Out-Expo is King

Every hover, reveal, and transition uses the same easing:
```
cubic-bezier(0.19, 1, 0.22, 1)
```

This creates a "slow start, fast snap-to-end" feel that reads as luxurious.

### Timing Conventions

| Context | Duration | Token |
|---------|----------|-------|
| Page-level entrance | 1200ms | `--dur-page` |
| Micro-interactions (hover, reveals) | 800–900ms | `--dur-micro` |
| Image scale/saturate | 1400ms | — |
| Preloader exit | 800ms | — |
| Page transition (blink) | 500ms | — |
| Ticker scroll | 40s linear | — |

### Common Patterns

**Scale-x underline reveal:**
```tsx
<span className="origin-left scale-x-0 bg-accent transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
```

**Image hover treatment:**
```tsx
className="saturate-[0.65] brightness-[0.92] transition-all duration-[1400ms] group-hover:scale-[1.04] group-hover:saturate-100 group-hover:brightness-100"
```

**Clip-path image reveal:**
```tsx
// Initial: clipPath: "inset(100% 0 0 0)", filter: "blur(8px)", scale: 1.1
// Animate: clipPath: "inset(0% 0 0 0)", filter: "blur(0px)", scale: 1
```

### Framer Motion Patterns

- `useInView` for scroll-triggered animations
- `LayoutGroup` + `AnimatePresence` for gallery filter transitions
- `useSpring` for scroll progress indicator
- `MotionConfig reducedMotion="user"` respects OS preference

---

## 8. Background & Atmospheric Layers

The body has a fixed multi-layer radial gradient:

```css
background:
  radial-gradient(ellipse 100% 80% at 50% 0%, rgba(139,69,19,0.07) 0%, transparent 60%),
  radial-gradient(ellipse 80% 60% at 0% 100%, rgba(74,48,109,0.05) 0%, transparent 50%),
  radial-gradient(ellipse 90% 70% at 100% 50%, rgba(196,149,106,0.04) 0%, transparent 55%),
  linear-gradient(180deg, #0C0908 0%, #0A0807 100%);
```

Plus these overlay components (in order, bottom to top):
1. `OilPaintTexture` — subtle canvas grain
2. `CinematicVignette` — darkened corners
3. `DustParticles` — 20 floating motes
4. `NoiseOverlay` — film grain
5. `ShadowCurtain` — depth layer

---

## 9. Deployment & Build

### Vercel Settings

- **Framework Preset:** Next.js
- **Build Command:** `vercel build` (or `next build`)
- **Output Directory:** `.next`
- **Node Version:** 20.x

### Common Build Issues & Solutions

| Issue | Cause | Fix |
|-------|-------|-----|
| `ERR_PNPM_OUTDATED_LOCKFILE` | `package-lock.json` exists alongside `pnpm-lock.yaml` | Delete `package-lock.json`, run `pnpm install`, commit `pnpm-lock.yaml` |
| `EPERM: operation not permitted` on Windows | Node modules locked by running process | Delete `node_modules`, reinstall |
| Next.js dev indicator visible | Default Next.js behavior | Set `devIndicators: false` in `next.config.mjs` |
| Image optimization fails on static export | `next/image` tries to optimize | Set `images: { unoptimized: true }` |

### Git Workflow

- **Branch:** `main`
- **Commits:** Conventional commits (`feat:`, `fix:`, `revert:`, `refactor:`)
- **Push triggers Vercel deploy automatically**
- No PRs used — direct push to main

---

## 10. Problems Encountered & Solutions

### Cursor Chaos
We went through **4 iterations** of cursor experiments:

1. **Dot cursor** — small circle following mouse
2. **State cursor** — dot that changes text label on hover (`View`, `Close`, `Drag`)
3. **Triangle cursor** — large white triangle with `mix-blend-mode: difference`
4. **Native cursor** — **Final decision.** Removed all custom cursors. `body { cursor: none }` was causing accessibility issues and confusion.

**Lesson:** Custom cursors are risky for art sites. Users expect standard behavior.

### Sticky About Section
A `StickyAbout` component was built with `position: sticky` parallax but **removed entirely** because:
- It caused jank on some browsers
- The effect distracted from the artwork
- Mobile performance was poor

### Ambient Glow Orbs
Floating colored orbs (`AmbientGlow`) were added then **removed**:
- Coverage issues on wide screens
- Felt gimmicky next to the paintings
- Replaced with clean CSS radial gradients on `body`

### Package Manager Conflict
Both `package-lock.json` (npm) and `pnpm-lock.yaml` existed. Vercel chose pnpm but the lockfile was stale.

**Fix:** Delete `node_modules` + `package-lock.json`, run `pnpm install`, commit updated lockfile.

### Image Asset Naming
Screenshots from the user's desktop have spaces in filenames (`Screenshot 2026-05-05 213146.png`). Next.js handles these fine, but they're awkward to reference.

**Future fix:** Rename to `artwork-01.png`, `artwork-02.png`, etc.

### Magnifying Lens Visibility
The lens effect used `img` with `src={imageSrc}` inside the hover component. On first hover, the image needs to load, causing a white flash.

**Fix:** The component uses the same image URL that's already loaded by Next.js `<Image>`, so browser cache helps. But on slow connections, there's still a brief flash.

**Future improvement:** Preload the lens image or use a canvas-based approach.

---

## 11. File Organization

```
app/
  layout.tsx          # Root layout — fonts, atmosphere, smooth scroll, transitions
  globals.css         # Tailwind theme tokens, custom CSS, animations
  page.tsx            # Home page
  galerie/
    page.tsx          # Gallery grid
    hero.tsx          # Gallery hero section
  cine-sunt-eu/
    page.tsx          # Artist bio
  reflectii/
    page.tsx          # Reflections list
  workshops/
    page.tsx          # Workshops + booking
  contact/
    page.tsx          # Contact
  design/
    page.tsx          # Design system showcase

components/
  ui/                 # shadcn/ui components (auto-generated)
  painting-hover.tsx  # Mouse-reactive artwork effects
  gallery-grid.tsx    # Masonry grid + filter + lightbox
  gallery-lightbox.tsx# Full-bleed artwork viewer
  featured-artwork.tsx# Home page artwork cards
  artwork-card.tsx    # (legacy — used elsewhere)
  hero.tsx            # Home hero
  site-nav.tsx        # Navigation
  site-footer.tsx     # Footer
  page-preloader.tsx  # Entrance loader
  page-transition.tsx # Route transition
  smooth-scroll.tsx   # Lenis wrapper
  fade-in.tsx         # Scroll fade-in utility
  image-reveal.tsx    # Clip-path reveal utility
  custom-cursor.tsx   # Disabled (returns null)
  ...                 # Atmosphere components, section components

lib/
  types.ts            # Domain types
  mock-data.ts        # Deterministic preview data
  motion.ts           # Animation constants (EASE_OUT_EXPO, DURATION)
  utils.ts            # cn() utility

public/
  icon.svg            # Favicon — italic "S" in warm gold on dark
  apple-icon.png      # Apple touch icon
  fecc44911e822c609f4c8d2d70a0628b.jpg  # Preloader background
  Screenshot 2026-05-05 21*.png         # 9 painting images
  studio-portrait.jpg # About page image
```

---

## 12. How to Work With This Codebase

### Adding a New Page

1. Create `app/new-page/page.tsx`
2. Use `FadeIn` for scroll reveals
3. Import `PaintingHover` for any artwork images
4. Add link to `site-nav.tsx` `LINKS` array
5. The nav will auto-animate the new link in

### Adding a New Painting

1. Add to `lib/mock-data.ts` `mockArtworks` array
2. Ensure image is in `public/` with correct path
3. Set `featured: true` to show on home page (only first 3 featured shown)
4. Choose `category: "abstracte" | "simbolice"`
5. The gallery grid will auto-calculate aspect ratio from `dimensions`

### Changing Colors

Edit `app/globals.css` `:root` block. The accent color (`--accent`) drives:
- Active nav dots
- Hover underlines
- Status badges
- Footer gradient border
- Scroll progress bar

### Changing Motion Timing

Edit `lib/motion.ts` or `globals.css` motion tokens. The easing is hardcoded in many Tailwind classes as `cubic-bezier(0.19,1,0.22,1)` — search and replace if changing globally.

### Adding a New Component

- Place in `components/` (or `components/ui/` if it's a shadcn primitive)
- Use `"use client"` if it uses hooks, browser APIs, or Framer Motion
- Prefer functional components with explicit prop interfaces
- Follow the existing JSDoc comment style

### Testing Hover Effects

Many effects are desktop-only:
- `PaintingHover` checks `window.matchMedia("(pointer: fine)")`
- `CustomCursor` returns `null` on touch devices
- Gallery grid hover overlays use `group-hover:`

Always test on actual mobile, not just responsive mode.

---

## 13. Known Limitations & Future Work

### Not Yet Built
- [ ] Individual artwork detail page (`/galerie/[slug]`)
- [ ] Individual reflection article page (`/reflectii/[slug]`)
- [ ] Contact form backend (currently static page)
- [ ] Workshop booking API integration (`/api/booking`)
- [ ] Sanity CMS connection (currently mock data)
- [ ] SEO meta tags per page (only root metadata exists)
- [ ] OpenGraph images for social sharing
- [ ] Image optimization (all images are `unoptimized: true`)
- [ ] Lazy loading below-the-fold images

### Performance Opportunities
- Images are served unoptimized from `public/` — consider a CDN or Sanity's image pipeline
- `DustParticles` renders 20 DOM nodes — could be canvas-based for >50 particles
- The preloader loads a large background image — consider a smaller version

### Accessibility Notes
- `prefers-reduced-motion` is respected globally in `globals.css`
- Focus rings use `focus-visible:ring-accent`
- All interactive elements have aria labels
- Color contrast passes WCAG AA for text, but the muted text (`#8A8680` on `#0C0908`) is borderline for small sizes

---

## 14. Quick Reference

### Common Tailwind Patterns

```
/* Editorial label */
font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground

/* Display headline */
font-display text-3xl font-light italic text-foreground

/* Card lift on hover */
group-hover:-translate-y-2 group-hover:shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)]

/* Scale-x underline */
origin-left scale-x-0 bg-accent transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100

/* Image treatment */
saturate-[0.65] brightness-[0.92] transition-all duration-[1400ms] group-hover:scale-[1.04] group-hover:saturate-100 group-hover:brightness-100

/* Frosted glass */
bg-background/80 backdrop-blur-xl backdrop-saturate-150
```

### Git Commands for This Project

```bash
# Install dependencies
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Commit and push
git add .
git commit -m "feat: description"
git push origin main
```

---

*Document maintained by the development assistant. Update this file whenever significant architectural decisions are made.*
