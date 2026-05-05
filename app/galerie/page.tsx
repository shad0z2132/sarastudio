import { Suspense } from "react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { GalleryGrid, GallerySkeleton } from "@/components/gallery-grid"
import { Ticker } from "@/components/ticker"
import { getArtworks } from "@/lib/cms"
import { GalleryHero } from "./hero"

export const metadata = {
  title: "Galerie — Simbolice & Abstracte",
  description:
    "Lucrări simbolice și abstracte în ulei și acrilic. Dosare private disponibile pentru colecționari și curatori.",
}

export const revalidate = 3600

export default function GaleriePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Subtle noise grain — atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <SiteNav />

      {/* HERO */}
      <GalleryHero />

      {/* Ticker — artwork titles scrolling */}
      <div className="border-y border-border/30 py-4">
        <Ticker speed={40}>
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/[0.08] uppercase mx-8">
            Ispita · Copacul vieții · Pomul cunoașterii · Meditație · Ființa sacră · Poarta · Kundalini · Ochiul din negură · Reflecția ·
          </span>
        </Ticker>
      </div>

      {/* GRID */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          {/* Section header */}
          <div className="mb-16 flex items-end justify-between">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60">
                02 — Colecție
              </span>
              <h2 className="font-display text-4xl font-light tracking-[-0.02em] text-foreground md:text-5xl">
                Lucrări
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] tracking-[0.15em] text-foreground/20 uppercase md:block">
              Scroll pentru a explora
            </span>
          </div>

          <Suspense fallback={<GallerySkeleton />}>
            <GalleryGridServer />
          </Suspense>
        </div>
      </section>

      {/* COLLECTOR SECTION — split layout */}
      <section className="relative border-t border-border/30">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2">
          {/* Left — studio image */}
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/studio-portrait.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 lg:to-background/60" />
          </div>

          {/* Right — content */}
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24 lg:pl-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60">
              03 — Colecționari
            </span>

            <h2 className="mt-6 font-display text-3xl font-light leading-tight text-foreground md:text-4xl">
              Fiecare piesă are o{" "}
              <span className="italic text-muted-foreground">poveste</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Pentru colecționari și curatori, oferim dosare complete cu
              proveniență, certificat de autenticitate și istoricul fiecărei
              lucrări. Fiecare piesă este unică, semnată și datată.
            </p>

            {/* Trust stats */}
            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-border/30 pt-10">
              <div>
                <span className="font-display text-3xl font-light text-foreground">
                  100%
                </span>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
                  Autenticitate
                </p>
              </div>
              <div>
                <span className="font-display text-3xl font-light text-foreground">
                  14
                </span>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
                  Zile retur
                </p>
              </div>
              <div>
                <span className="font-display text-3xl font-light text-foreground">
                  UE
                </span>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60">
                  Livrare
                </p>
              </div>
            </div>

            <a
              href="mailto:studio@example.com?subject=Solicitare%20dosar%20privat"
              className="group mt-10 inline-flex h-12 w-fit items-center gap-3 bg-foreground px-8 font-mono text-[11px] uppercase tracking-[0.18em] text-background transition-all duration-700 hover:bg-accent hover:text-foreground"
            >
              Solicită un dosar privat
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom ticker */}
      <div className="border-y border-border/30 py-3">
        <Ticker speed={50} direction="right">
          <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/[0.06] uppercase mx-6">
            Artă · Terapie · Viena · Atelier · Ulei · Acrilic · Simbol · Umbră · Prezență ·
          </span>
        </Ticker>
      </div>

      <SiteFooter />
    </main>
  )
}

async function GalleryGridServer() {
  const artworks = await getArtworks()
  return <GalleryGrid artworks={artworks} />
}
