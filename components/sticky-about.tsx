"use client"

/**
 * StickyAbout — scroll-driven section inspired by Boyd's architecture.
 * The sticky inner is the grid container. Content in implicit rows animates up from below.
 */

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Link from "next/link"

export function StickyAbout() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Title: slides up and fades in
  const titleY = useTransform(scrollYProgress, [0, 0.25], [60, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // Media: scales from tiny center, nearly invisible
  const mediaScale = useTransform(scrollYProgress, [0.05, 0.45], [0.15, 1])
  const mediaOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 0.35])

  // Bottom content: rises from below the fold
  const descY = useTransform(scrollYProgress, [0.15, 0.5], [120, 0])
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1])

  const captionY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0])
  const captionOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])

  const artistY = useTransform(scrollYProgress, [0.25, 0.55], [80, 0])
  const artistOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] lg:h-[250vh]"
    >
      {/* Sticky inner — GRID CONTAINER, exactly like Boyd */}
      <div
        className="
          lg:sticky lg:top-0 lg:h-[100dvh] lg:overflow-hidden
          grid grid-cols-2 lg:grid-cols-8
          grid-rows-[1fr] auto-rows-max
          pt-32 lg:pt-48 pb-8 lg:pb-8
          px-6 lg:px-8
          max-w-[1440px] mx-auto
        "
      >
        {/* Media layer — absolute, behind everything, starts tiny + invisible */}
        <motion.div
          style={{ scale: mediaScale, opacity: mediaOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <div className="w-full max-w-5xl mx-auto px-8 lg:px-16">
            <div className="aspect-[16/9] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-foreground/[0.01]" />
              <div className="absolute inset-16 border border-foreground/[0.03]" />
            </div>
          </div>
        </motion.div>

        {/* WE — row 1, left, right-aligned */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="col-span-1 lg:col-span-3 lg:text-right lg:pr-4 z-10 self-start"
        >
          <h2 className="font-display text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] font-light leading-[0.85] tracking-[-0.04em] uppercase text-foreground">
            we
          </h2>
        </motion.div>

        {/* ARE — row 1, right */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="col-span-1 lg:col-span-3 lg:col-start-6 z-10 self-start"
        >
          <h2 className="font-display text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] font-light leading-[0.85] tracking-[-0.04em] uppercase text-foreground">
            are
          </h2>
        </motion.div>

        {/* Years — row 2, spanning center */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="col-span-2 lg:col-start-3 lg:col-span-6 mt-2 lg:mt-4 z-10"
        >
          <span className="font-mono text-[10px] tracking-[0.15em] text-foreground/40 uppercase">
            &apos;17 — &apos;26
          </span>
        </motion.div>

        {/* Caption — bottom left, row 3 */}
        <motion.div
          style={{ y: captionY, opacity: captionOpacity }}
          className="col-span-2 lg:col-span-3 lg:row-start-3 mt-12 lg:mt-0 z-10"
        >
          <p className="font-mono text-[10px] tracking-[0.15em] text-foreground/40 uppercase max-w-[12rem]">
            Fac vizibil ceea ce trăiește în tăcere
          </p>
        </motion.div>

        {/* Artist block — bottom center, row 4 */}
        <motion.div
          style={{ y: artistY, opacity: artistOpacity }}
          className="col-span-2 lg:col-start-3 lg:col-span-2 lg:row-start-4 flex items-center gap-4 mt-8 lg:mt-0 z-10"
        >
          <div className="w-12 h-12 rounded-full bg-foreground/10 overflow-hidden relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Sara M.</p>
            <p className="font-mono text-[9px] tracking-[0.1em] text-foreground/40 uppercase">
              Artistă & Terapeut
            </p>
          </div>
        </motion.div>

        {/* Description — right side, rows 2-4, aligned to bottom */}
        <motion.div
          style={{ y: descY, opacity: descOpacity }}
          className="col-span-2 lg:col-start-7 lg:col-span-2 lg:row-start-2 lg:row-span-3 mt-8 lg:mt-0 z-10 self-end"
        >
          <p className="text-sm lg:text-base leading-relaxed text-foreground/50">
            Studio de artă vizuală și terapie prin artă, cu bază la Viena.
            Locul unde arta iconică întâlnește peisajul interior.
          </p>
          <p className="text-sm lg:text-base leading-relaxed text-foreground/50 mt-4">
            O experiență fluidă și autentică atât pentru colecționari,
            cât și pentru cei care caută vindecare prin creație.
          </p>

          <Link
            href="/cine-sunt-eu"
            className="group inline-flex mt-8 text-xs tracking-[0.1em] uppercase text-foreground hover:opacity-40 transition-opacity duration-[800ms]"
          >
            Despre mine
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
