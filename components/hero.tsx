"use client"

/**
 * Hero — cinematic editorial parallax.
 * Dramatic painting background, sparse chrome, heavy vignette.
 * Entrance: staggered blur-reveal on headline, floating artwork frame.
 */

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, MotionConfig, useScroll, useTransform } from "motion/react"
import { EASE_OUT_EXPO, DURATION, GPU } from "@/lib/motion"

const HEADLINE = [
  { text: "Fac vizibil", indent: false },
  { text: "ceea ce trăiește", indent: true, italic: true },
  { text: "în tăcere.", indent: true, italic: true },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.05])

  // Foreground depth
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT_EXPO }}>
      <section
        ref={ref}
        aria-label="Hero"
        className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-background"
      >
        {/* ── BACKGROUND LAYER ─────────────────────────────────────────── */}
        <motion.div
          aria-hidden
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0"
        >
          <Image
            src="/artwork-symbolic-01.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover saturate-[0.72]"
          />
        </motion.div>

        {/* ── VIGNETTE LAYERS ──────────────────────────────────────────── */}
        {/* Top-to-bottom fade for text readability */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90"
        />
        {/* Left-side heavy shadow for headline contrast */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent"
        />
        {/* Subtle radial vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, transparent 0%, rgba(10,10,10,0.5) 100%)",
          }}
        />

        {/* ── CONTENT LAYER ────────────────────────────────────────────── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 lg:px-32"
        >
          <div className="mx-auto w-full max-w-[1400px]">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.micro, delay: 0.3 }}
              className="mb-10 flex items-center gap-4"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: DURATION.page, delay: 0.5 }}
                className="block h-px w-12 bg-accent origin-left"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                Studio de pictură · Viena
              </span>
            </motion.div>

            {/* Headline — staggered blur reveal */}
            <h1 className="font-display text-[clamp(3rem,10vw,10rem)] font-light leading-[0.92] tracking-[-0.03em] text-foreground">
              {HEADLINE.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: DURATION.page,
                    delay: 0.6 + i * 0.25,
                  }}
                  style={GPU.both}
                  className={`
                    block
                    ${line.indent ? "pl-[0.15em] md:pl-[0.25em]" : ""}
                    ${line.italic ? "italic text-foreground/80" : ""}
                  `}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.page, delay: 1.5 }}
              className="mt-12 max-w-lg"
            >
              <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
                Picturi în ulei și acrilic despre lumea interioară —{" "}
                <span className="text-foreground">umbră, arhetip, emoție</span>{" "}
                care nu încape în cuvinte.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.page, delay: 1.8 }}
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-10"
            >
              <PrimaryCTA href="/galerie" label="Intră în galerie" />
              <UnderlineLink
                href="/workshops"
                label="Rezervă un workshop"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ── FLOATING ARTWORK FRAME (bottom right) ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: DURATION.page, delay: 2.0 }}
          className="pointer-events-none absolute bottom-24 right-6 z-10 hidden md:block md:right-16 lg:right-32"
        >
          <div className="relative w-32 overflow-hidden border border-foreground/10 shadow-2xl lg:w-44">
            <div className="aspect-[3/4]">
              <Image
                src="/Screenshot 2026-05-05 213057.png"
                alt="Ochiul din negură"
                fill
                sizes="200px"
                className="object-cover saturate-[0.8]"
              />
            </div>
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-3 py-2 backdrop-blur-sm">
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/50">
                Ochiul din negură
              </span>
              <span className="block font-mono text-[8px] tracking-[0.1em] text-foreground/30">
                2024 · Ulei pe pânză
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── SCROLL CUE (bottom center) ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
              Scroll
            </span>
            <span className="relative block h-10 w-px overflow-hidden bg-foreground/15">
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                  duration: 2,
                  ease: EASE_OUT_EXPO,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute inset-x-0 block h-full bg-accent"
              />
            </span>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}

/* ── COMPONENTS ─────────────────────────────────────────────────────── */

function PrimaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden border border-foreground/60 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-700 hover:border-foreground"
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
      <span className="relative z-10 transition-colors duration-700 group-hover:text-background">
        {label}
      </span>
      <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-background">
        →
      </span>
    </Link>
  )
}

function UnderlineLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center font-sans text-sm text-foreground/70 transition-colors duration-500 hover:text-foreground"
    >
      <span className="relative">
        {label}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"
        />
      </span>
    </Link>
  )
}
