"use client"

/**
 * Practică — three editorial pillars (Ulei · Simbol · Umbră).
 * Enhanced with vertical accent lines, cinematic spacing, and premium hover.
 */

import { useRef } from "react"
import { motion, useInView } from "motion/react"

const ease = [0.19, 1, 0.22, 1] as const

type Pillar = {
  roman: string
  tag: string
  title: string
  body: string
}

const PILLARS: Pillar[] = [
  {
    roman: "I",
    tag: "Materie",
    title: "Ulei",
    body: "Materia rezistă. De aceea o folosesc — pentru că trăirile adevărate nu se lasă modelate ușor. Fiecare strat este o decizie întoarsă spre interior.",
  },
  {
    roman: "II",
    tag: "Limbaj",
    title: "Simbol",
    body: "Imaginile vechi rămân vii pentru că niciodată nu au fost inventate. Le regăsesc, le ascult, le pictez — ca pe niște prieteni care te așteaptă.",
  },
  {
    roman: "III",
    tag: "Direcție",
    title: "Umbră",
    body: "Tot ceea ce nu este privit devine, în timp, greutate. Pictura este felul meu de a aduce în lumină ceea ce rămăsese tăcut.",
  },
]

export function Pillars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2, once: true, margin: "0px 0px -10% 0px" })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-32 md:px-16 md:py-48 lg:px-32"
    >
      {/* Subtle background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-24">
        {/* Section header */}
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.2, ease }}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
                05 — Practică
              </span>
              <span
                aria-hidden
                className="hidden h-px w-16 bg-accent/40 md:inline-block"
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/25">
              III / III
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16"
          >
            <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.95] tracking-[-0.02em] text-foreground lg:col-span-7">
              Trei axe
              <br />
              <span className="italic text-foreground/40">ale atelierului</span>
            </h2>
            <div className="flex items-end lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-relaxed text-foreground/40 md:text-lg">
                Fiecare lucrare se sprijină pe aceleași trei întrebări: ce materie
                aleg, ce limbaj recunosc, spre ce direcție mă întorc.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.roman}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 1.2, ease, delay: 0.3 + i * 0.12 }}
              className="group relative flex flex-col gap-10 overflow-hidden bg-background p-10 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-foreground/[0.02] md:p-14"
            >
              {/* Vertical accent line */}
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-px bg-accent/0 transition-all duration-[800ms] group-hover:bg-accent/30"
              />

              {/* Background roman watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-12 font-display text-[16rem] font-light italic leading-none text-accent/[0.03] transition-all duration-[1200ms] group-hover:text-accent/[0.06] md:text-[20rem]"
              >
                {p.roman}
              </span>

              {/* Top row — roman + tag */}
              <header className="relative flex items-baseline justify-between border-b border-foreground/10 pb-5">
                <span className="font-display text-6xl font-light italic text-accent transition-all duration-[800ms] group-hover:-translate-y-1 md:text-7xl">
                  {p.roman}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  {p.tag}
                </span>
              </header>

              {/* Title */}
              <h3 className="relative font-display text-4xl font-light leading-tight text-foreground transition-colors duration-[800ms] group-hover:text-foreground/90 md:text-5xl">
                {p.title}
              </h3>

              {/* Body */}
              <p className="relative max-w-[34ch] text-base leading-relaxed text-foreground/40">
                {p.body}
              </p>

              {/* Bottom chrome */}
              <div className="relative mt-auto flex items-center justify-between border-t border-foreground/10 pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  Ax.&nbsp;{p.roman}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[10px] text-foreground/20 transition-all duration-[800ms] group-hover:translate-x-2 group-hover:text-accent/60"
                >
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, ease, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-full bg-foreground/5" />
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/20">
            Atelier · Viena
          </span>
          <span className="h-px w-full bg-foreground/5" />
        </motion.div>
      </div>
    </section>
  )
}
