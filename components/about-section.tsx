"use client"

/**
 * AboutSection — premium editorial artist statement.
 *
 * Gallery-wall aesthetic: asymmetric grid, oversized type, pull quote,
 * editorial stats, vertical accents. Feels like a museum catalog spread.
 */

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./reveal"
import { ImageReveal } from "./image-reveal"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

const STATS = [
  { value: "9+", label: "Lucrări în colecții" },
  { value: "8", label: "Ani de practică" },
  { value: "50+", label: "Sesiuni de terapie" },
]

export function AboutSection() {
  const quoteRef = useRef<HTMLDivElement>(null)
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 })

  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
      {/* Top hairline */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
      />

      <div className="mx-auto max-w-[1400px]">
        {/* ── HEADER ROW ─────────────────────────────────────────── */}
        <Reveal>
          <div className="flex items-center justify-between gap-6 mb-16 md:mb-24">
            <div className="flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                02b — Despre
              </span>
              <span
                aria-hidden
                className="hidden h-px w-16 bg-foreground/20 md:inline-block"
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
              Atelier · Viena
            </span>
          </div>
        </Reveal>

        {/* ── MAIN EDITORIAL GRID ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* LEFT COLUMN — image + stats */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            {/* Oversized heading */}
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.95] tracking-[-0.03em] text-foreground">
                Cine
                <br />
                <span className="italic text-foreground/60">sunt eu?</span>
              </h2>
            </Reveal>

            {/* Image — dramatic portrait crop */}
            <ImageReveal delay={0.2} className="aspect-[3/4] bg-foreground/5">
              <Image
                src="/Untitled design (1).jpg"
                alt="Sara M. în atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* Layered overlays for mood */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-foreground/[0.02] mix-blend-multiply" />
              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                  Atelier · Viena · 2024
                </span>
              </div>
            </ImageReveal>

            {/* Stats row */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-8 border-t border-foreground/10 pt-8">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="font-display text-3xl font-light text-foreground md:text-4xl">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN — text + philosophy */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12 lg:pt-32">
            {/* Vertical accent line */}
            <Reveal delay={0.25}>
              <div className="flex gap-6">
                <span
                  aria-hidden
                  className="mt-2 h-24 w-px bg-accent/40 shrink-0"
                />
                <div>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/50 mb-6">
                    Studio de artă vizuală și terapie prin artă, cu bază la
                    Viena. Locul unde arta iconică întâlnește peisajul interior.
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed text-foreground/50">
                    O experiență fluidă și autentică atât pentru colecționari,
                    cât și pentru cei care caută vindecare prin creație.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Philosophy block */}
            <Reveal delay={0.4}>
              <div className="border-l border-foreground/10 pl-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60 block mb-4">
                  Filosofie
                </span>
                <p className="font-display text-xl font-light italic leading-relaxed text-foreground/70">
                  "Nu pictez ca să decorez un perete. Pictez ca să dau chip
                  lucrurilor care, altfel, ar rămâne neauzite."
                </p>
              </div>
            </Reveal>

            {/* Artist signature block */}
            <Reveal delay={0.5}>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-14 h-14 rounded-full overflow-hidden relative shrink-0 border border-foreground/10">
                  <Image
                    src="/Untitled design.jpg"
                    alt="Sara M."
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Sara M.
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.1em] text-foreground/40 uppercase">
                    Artistă & Terapeut prin artă
                  </p>
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.6}>
              <Link
                href="/cine-sunt-eu"
                className="group relative inline-flex items-center gap-3 self-start border border-foreground/30 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-700 hover:border-foreground"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-700 group-hover:text-background">
                  Citește povestea
                </span>
                <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-background">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ── BOTTOM PULL QUOTE ──────────────────────────────────── */}
        <div ref={quoteRef} className="mt-32 md:mt-48">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto max-w-4xl text-center"
          >
            {/* Decorative quote mark */}
            <span
              aria-hidden
              className="block font-display text-[120px] font-light leading-none text-accent/10 md:text-[180px]"
            >
              „
            </span>
            <blockquote className="-mt-16 md:-mt-24">
              <p className="font-display text-2xl font-light italic leading-[1.3] text-foreground/80 md:text-4xl">
                Fac vizibil ceea ce trăiește în tăcere. Fiecare pânză este o
                conversație între ceea ce sunt și ceea ce nu îndrăznesc să spun.
              </p>
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-accent/40" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                Sara M.
              </span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
