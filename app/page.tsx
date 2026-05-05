import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { FeaturedArtwork } from "@/components/featured-artwork"
import { Manifest } from "@/components/manifest"
import { Pillars } from "@/components/pillars"
import { WorkshopCTA } from "@/components/workshop-cta"
import { ReflectionsList } from "@/components/reflections-list"
import { Reveal } from "@/components/reveal"
import { Ticker } from "@/components/ticker"
import { AboutSection } from "@/components/about-section"
import { HorizontalArtworkStrip } from "@/components/horizontal-artwork-strip"
import { BackgroundTypography } from "@/components/background-typography"
import { getArtworks, getReflections } from "@/lib/cms"

export const metadata = {
  title: "Studio — Picturi despre lumea interioară",
  description:
    "Picturi în ulei și acrilic despre lumea interioară — umbră, simbol, prezență. Galerie, workshop-uri online și reflecții din atelier.",
}

export default async function HomePage() {
  const [artworks, reflections] = await Promise.all([
    getArtworks(),
    getReflections(),
  ])

  const featured = artworks.filter((a) => a.featured).slice(0, 3)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* 01 — HERO */}
      <Hero />

      {/* 02 — INVITAȚIE */}
      <section className="relative overflow-hidden px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto max-w-[1400px]">
          {/* Top label row */}
          <div className="mb-16 md:mb-24">
            <Reveal>
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
                  02 — Invitație
                </span>
                <span aria-hidden className="h-px w-12 bg-accent/50" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  Atelier · Viena
                </span>
              </div>
            </Reveal>
          </div>

          {/* Main quote */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-1">
              <Reveal>
                <span
                  aria-hidden
                  className="block font-display text-[80px] font-light leading-none text-accent/15 md:text-[120px]"
                >
                  „
                </span>
              </Reveal>
            </div>

            <div className="lg:col-span-10">
              <Reveal delay={0.1}>
                <blockquote className="font-display text-[clamp(2rem,5vw,5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
                  Nu pictez ca să decorez un perete.{" "}
                  <span className="italic text-foreground/50">
                    Pictez ca să dau chip lucrurilor care, altfel, ar rămâne
                    neauzite.
                  </span>
                </blockquote>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-12 max-w-xl">
                  <p className="text-base leading-relaxed text-foreground/40 md:text-lg">
                    Dacă ai ajuns aici, probabil cauți același lucru: o imagine
                    care să spună în locul tău ceea ce încă nu știi să spui.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-10 flex items-center gap-4">
                  <span className="h-px w-16 bg-accent/40" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                    Sara
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02b — ABOUT */}
      <section className="relative overflow-hidden">
        <BackgroundTypography text="UMBRĂ" />
        <AboutSection />
      </section>

      {/* 03 — MANIFEST */}
      <div className="bg-gradient-to-b from-background via-[#0A0807] to-background">
        <Manifest />
      </div>

      {/* Ticker between manifest and gallery */}
      <div className="border-y border-foreground/10 overflow-hidden">
        <Ticker speed={25} pauseOnHover>
          <span className="flex items-center px-4 md:px-8">
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light italic text-foreground/[0.10] whitespace-nowrap">
              Galerie
            </span>
            <span className="mx-6 md:mx-10 h-2 w-2 rotate-45 bg-accent/30" />
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light text-foreground/[0.08] whitespace-nowrap">
              Lucrări
            </span>
            <span className="mx-6 md:mx-10 h-2 w-2 rotate-45 bg-accent/30" />
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light italic text-foreground/[0.10] whitespace-nowrap">
              Pictură
            </span>
            <span className="mx-6 md:mx-10 h-2 w-2 rotate-45 bg-accent/30" />
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light text-foreground/[0.08] whitespace-nowrap">
              Ulei pe pânză
            </span>
            <span className="mx-6 md:mx-10 h-2 w-2 rotate-45 bg-accent/30" />
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light italic text-foreground/[0.10] whitespace-nowrap">
              Simbol
            </span>
            <span className="mx-6 md:mx-10 h-2 w-2 rotate-45 bg-accent/30" />
            <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light text-foreground/[0.08] whitespace-nowrap">
              Arhetip
            </span>
            <span className="mx-6 md:mx-10 h-2 w-2 rotate-45 bg-accent/30" />
          </span>
        </Ticker>
      </div>

      {/* 04 — FEATURED LUCRĂRI */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-8 pb-20 md:pb-28">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                    04 — Lucrări
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-px w-16 bg-foreground/20 md:inline-block"
                  />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
                  Selecție · {featured.length} / {artworks.length}
                </span>
              </div>

              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
                <h2 className="max-w-[16ch] font-display text-4xl font-light leading-[1.02] text-foreground text-balance md:text-7xl">
                  Ce se vede{" "}
                  <span className="italic text-muted-foreground">
                    când privești încet
                  </span>
                </h2>
                <Link
                  href="/galerie"
                  className="group relative inline-flex items-center self-start font-mono text-xs uppercase tracking-[0.3em] text-foreground md:self-auto"
                >
                  <span className="relative">
                    Vezi toată galeria →
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-1 left-0 h-px w-[30%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, i) => (
              <Reveal as="li" key={artwork._id} delay={i * 0.12}>
                <FeaturedArtwork
                  artwork={artwork}
                  index={i}
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 04b — HORIZONTAL STRIP */}
      <HorizontalArtworkStrip artworks={artworks.slice(0, 6)} />

      {/* 05 — PRACTICĂ */}
      <section className="relative overflow-hidden">
        <BackgroundTypography text="SIMBOL" className="top-1/4" />
        <Pillars />
      </section>

      {/* 06 — WORKSHOP CTA */}
      <WorkshopCTA />

      {/* 07 — REFLECȚII */}
      <section className="relative overflow-hidden px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto max-w-[1400px]">
          {/* Section header */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center justify-between gap-6 mb-10">
              <Reveal>
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
                    07 — Reflecții
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-px w-12 bg-accent/40 md:inline-block"
                  />
                </div>
              </Reveal>
              <Reveal>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/25">
                  Arhivă deschisă
                </span>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.95] tracking-[-0.02em] text-foreground">
                    Însemnări
                    <br />
                    <span className="italic text-foreground/40">din atelier</span>
                  </h2>
                </Reveal>
              </div>
              <div className="flex items-end lg:col-span-4 lg:col-start-9">
                <Reveal delay={0.2}>
                  <p className="text-base leading-relaxed text-foreground/40 md:text-lg">
                    Texte scurte, jurnale de lucru, note din nopțile în care
                    pictura nu iese — și din cele în care, în sfârșit, iese.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Reflections list */}
          <ReflectionsList items={reflections} />

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="mt-16 flex items-center gap-6">
              <span className="h-px w-12 bg-accent/30" />
              <Link
                href="/reflectii"
                className="group relative inline-flex items-center font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 transition-colors duration-[800ms] ease-out hover:text-foreground"
              >
                <span className="relative">
                  Vezi toate reflecțiile →
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
                  />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer ticker */}
      <div className="border-y border-foreground/10 overflow-hidden">
        <Ticker speed={35} pauseOnHover direction="right">
          <span className="flex items-center px-4 md:px-8">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-foreground/15 uppercase whitespace-nowrap">
              Studio
            </span>
            <span className="mx-5 md:mx-8 text-foreground/10">✦</span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-foreground/15 uppercase whitespace-nowrap">
              Viena
            </span>
            <span className="mx-5 md:mx-8 text-foreground/10">✦</span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-foreground/15 uppercase whitespace-nowrap">
              Artă & Terapie
            </span>
            <span className="mx-5 md:mx-8 text-foreground/10">✦</span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-foreground/15 uppercase whitespace-nowrap">
              Ulei pe pânză
            </span>
            <span className="mx-5 md:mx-8 text-foreground/10">✦</span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-foreground/15 uppercase whitespace-nowrap">
              Workshop
            </span>
            <span className="mx-5 md:mx-8 text-foreground/10">✦</span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-foreground/15 uppercase whitespace-nowrap">
              Atelier
            </span>
            <span className="mx-5 md:mx-8 text-foreground/10">✦</span>
          </span>
        </Ticker>
      </div>

      {/* 08 — FOOTER */}
      <SiteFooter />
    </main>
  )
}
