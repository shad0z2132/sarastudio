"use client"

/**
 * GalleryHero — cinematic full-viewport intro.
 * Painting background, heavy vignette, animated title, scroll cue.
 */

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion"

const CHARS = "Lucrări".split("")

export function GalleryHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.3, once: true })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70dvh] overflow-hidden"
    >
      {/* Background painting — parallax */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 scale-110"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/artwork-symbolic-01.jpg)" }}
        />
        {/* Heavy cinematic overlay */}
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background/90" />
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_80px_rgba(0,0,0,0.6)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex min-h-[70dvh] flex-col justify-center px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: DURATION.page, ease: EASE_OUT_EXPO, delay: 0.1 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">
              Galerie · 2017 — 2025
            </span>
          </motion.div>

          {/* Title — character by character */}
          <h1 className="font-display text-[clamp(4rem,14vw,12rem)] font-light leading-[0.9] tracking-[-0.04em] text-foreground">
            {CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -80 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                transition={{
                  duration: DURATION.page,
                  ease: EASE_OUT_EXPO,
                  delay: 0.2 + i * 0.04,
                }}
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: DURATION.page, ease: EASE_OUT_EXPO, delay: 0.6 }}
            className="mt-8 max-w-xl font-display text-lg font-light italic leading-relaxed text-muted-foreground md:text-xl"
          >
            Pictură simbolică și abstractă. Lucrări despre interior, văzute din
            afară.
          </motion.p>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: DURATION.page, ease: EASE_OUT_EXPO, delay: 0.75 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            {["Simbolice", "Abstracte", "Ulei pe pânză", "2017—2025"].map((tag) => (
              <span
                key={tag}
                className="border border-foreground/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
