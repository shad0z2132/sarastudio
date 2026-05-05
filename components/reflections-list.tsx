"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import type { Reflection } from "@/lib/types"

const ease = [0.19, 1, 0.22, 1] as const

/**
 * Reflections index list — premium editorial catalogue.
 *
 * Features:
 *   • Featured article as a magazine spread
 *   • Large roman numeral watermarks
 *   • Scroll-reveal on each item
 *   • Left accent line on hover
 *   • Thumbnail slides in on hover
 */

export function ReflectionsList({ items }: { items: Reflection[] }) {
  if (items.length === 0) {
    return (
      <p className="border-t border-foreground/10 py-16 text-sm text-foreground/40">
        Reflecțiile se pregătesc. Revino curând.
      </p>
    )
  }

  const [featured, ...rest] = items

  return (
    <div className="flex flex-col">
      {/* Featured reflection — magazine spread */}
      <FadeIn>
        <Link
          href={`/reflectii/${featured.slug}`}
          className="group relative grid grid-cols-1 gap-8 border-t border-foreground/20 py-16 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:pl-2 focus-visible:pl-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent md:grid-cols-12 md:gap-12 md:py-24"
        >
          {/* Large cover */}
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-foreground/5">
              <Image
                src={featured.coverImage.url}
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover saturate-[0.75] brightness-[0.95] transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:saturate-100 group-hover:brightness-100"
              />
              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
            {/* Bottom caption */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
                Featured
              </span>
              <span className="h-px w-6 bg-accent/30" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/25">
                N° 001
              </span>
            </div>
          </div>

          {/* Meta + title + excerpt */}
          <div className="flex flex-col gap-8 md:col-span-7 md:justify-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              <time dateTime={featured.publishedAt}>
                {formatDate(featured.publishedAt)}
              </time>
              <span className="text-foreground/15">·</span>
              <span>{featured.readingTimeMin} min lectură</span>
              <span className="text-foreground/15">·</span>
              <span className="text-accent/60">{featured.tags[0]}</span>
            </div>

            <h3 className="font-display text-4xl font-light italic leading-[1.02] text-foreground text-balance transition-colors duration-[800ms] group-hover:text-accent md:text-5xl lg:text-6xl">
              {featured.title}
            </h3>

            <p className="max-w-[56ch] text-base leading-relaxed text-foreground/50 md:text-lg">
              {featured.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 transition-colors duration-[800ms] group-hover:text-accent">
                Citește reflecția →
              </span>
            </div>
          </div>

          {/* Hover bottom accent line */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent/50 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
          />

          {/* Left accent line on hover */}
          <span
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px bg-accent/0 transition-colors duration-[800ms] group-hover:bg-accent/30"
          />
        </Link>
      </FadeIn>

      {/* Remaining rows */}
      <ul className="flex flex-col">
        {rest.map((r, i) => (
          <li key={r._id} className="border-t border-foreground/10 last:border-b">
            <FadeIn delay={0.05 * (i + 1)}>
              <Link
                href={`/reflectii/${r.slug}`}
                className="group relative grid grid-cols-1 gap-4 py-12 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:pl-6 focus-visible:pl-6 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent md:grid-cols-12 md:gap-8 md:py-16"
              >
                {/* Left accent line */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-accent/0 transition-colors duration-[800ms] group-hover:bg-accent/30"
                />

                {/* Large number watermark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-display text-[8rem] font-light italic leading-none text-foreground/[0.02] md:text-[12rem]"
                >
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* Meta column */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 md:col-span-3 md:flex-col md:items-start md:gap-3">
                  <span className="text-accent/60">
                    N°&nbsp;{String(i + 2).padStart(3, "0")}
                  </span>
                  <time dateTime={r.publishedAt}>{formatDate(r.publishedAt)}</time>
                  <span>{r.readingTimeMin} min</span>
                  <span className="text-foreground/30">{r.tags[0]}</span>
                </div>

                {/* Title + excerpt */}
                <div className="flex flex-col gap-3 md:col-span-7">
                  <h3 className="font-display text-2xl font-light italic leading-[1.15] text-foreground text-balance transition-colors duration-[800ms] group-hover:text-accent md:text-3xl lg:text-4xl">
                    {r.title}
                  </h3>
                  <p className="line-clamp-2 max-w-[60ch] text-base leading-relaxed text-foreground/40">
                    {r.excerpt}
                  </p>
                </div>

                {/* Hover thumbnail — desktop only */}
                <div
                  aria-hidden
                  className="pointer-events-none hidden md:col-span-2 md:block md:self-center md:justify-self-end"
                >
                  <div className="relative aspect-[4/5] w-24 translate-x-6 overflow-hidden bg-foreground/5 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100">
                    <Image
                      src={r.coverImage.url}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover saturate-[0.8] transition-all duration-500 group-hover:saturate-100"
                    />
                  </div>
                </div>

                {/* Hover bottom hairline */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-foreground/20 transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
                />
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Fade In Component ──────────────────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ── Utilities ──────────────────────────────────────────────────────── */

function formatDate(iso: string) {
  const d = new Date(iso)
  return d
    .toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(".", "")
}
