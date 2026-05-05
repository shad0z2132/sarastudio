"use client"

/**
 * AboutSection — clean editorial layout replacing the buggy sticky scroll.
 * Uses simple Reveal scroll-in animations. No sticky positioning.
 */

import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./reveal"
import { ImageReveal } from "./image-reveal"

export function AboutSection() {
  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
      {/* Top hairline */}
      <span
        aria-hidden
        className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Header row */}
        <Reveal>
          <div className="flex items-center justify-between gap-6 mb-20 md:mb-28">
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

        {/* Heading — single line like other sections */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.75rem,7vw,7rem)] font-light leading-[1.02] tracking-[-0.02em] text-foreground text-balance mb-6">
            Cine sunt eu?
          </h2>
        </Reveal>

        {/* Years */}
        <Reveal delay={0.2}>
          <span className="font-mono text-[10px] tracking-[0.15em] text-foreground/40 uppercase block mb-16 md:mb-24">
            &apos;17 — &apos;26
          </span>
        </Reveal>

        {/* Content grid: image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image — left side */}
          <div className="lg:col-span-6">
            <ImageReveal delay={0.25} className="aspect-square bg-foreground/5">
              <Image
                src="/Untitled design (1).jpg"
                alt="Design conceptual — artă și terapie"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Darkening overlay for mood */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Subtle grain overlay */}
              <div className="absolute inset-0 bg-foreground/[0.03] mix-blend-multiply" />
            </ImageReveal>
          </div>

          {/* Text block — right side */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-between">
            <div>
              <Reveal delay={0.3}>
                <p className="text-base lg:text-lg leading-relaxed text-foreground/50 mb-6">
                  Studio de artă vizuală și terapie prin artă, cu bază la Viena.
                  Locul unde arta iconică întâlnește peisajul interior.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-base lg:text-lg leading-relaxed text-foreground/50 mb-6">
                  O experiență fluidă și autentică atât pentru colecționari,
                  cât și pentru cei care caută vindecare prin creație.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="font-mono text-[10px] tracking-[0.15em] text-foreground/40 uppercase max-w-[12rem] mb-12">
                  Fac vizibil ceea ce trăiește în tăcere
                </p>
              </Reveal>
            </div>

            <div>
              {/* Artist block */}
              <Reveal delay={0.55}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 overflow-hidden relative shrink-0">
                    <Image
                      src="/Untitled design.jpg"
                      alt="Sara M."
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sara M.</p>
                    <p className="font-mono text-[9px] tracking-[0.1em] text-foreground/40 uppercase">
                      Artistă & Terapeut
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.6}>
                <Link
                  href="/cine-sunt-eu"
                  className="group relative inline-flex items-center font-mono text-xs uppercase tracking-[0.3em] text-foreground"
                >
                  <span className="relative">
                    Despre mine →
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-1 left-0 h-px w-[30%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
                    />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
