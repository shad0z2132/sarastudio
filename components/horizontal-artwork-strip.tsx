"use client"

/**
 * HorizontalArtworkStrip — full-bleed horizontal scroll triggered by vertical scroll.
 *
 * As user scrolls down, artwork images translate horizontally (parallax strip).
 * Creates a gallery walkway feeling.
 */

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import type { Artwork } from "@/lib/types"

export function HorizontalArtworkStrip({ artworks }: { artworks: Artwork[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32">
      {/* Section label */}
      <div className="mb-12 px-6 md:px-16 lg:px-32">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4">
          <span className="h-px w-12 bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            Selecție din galerie
          </span>
        </div>
      </div>

      {/* Horizontal track */}
      <div className="relative overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex w-max items-center gap-6 px-6 md:gap-10 md:px-16"
        >
          {artworks.map((artwork, i) => (
            <div
              key={artwork._id}
              className="group relative flex-shrink-0"
              data-cursor="view"
            >
              <div className="relative aspect-[4/5] w-[70vw] overflow-hidden md:w-[32vw] lg:w-[24vw]">
                <Image
                  src={artwork.image.url}
                  alt={artwork.image.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 70vw"
                  className="object-cover saturate-[0.7] brightness-[0.9] transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:saturate-100 group-hover:brightness-100"
                />
                {/* Hover title */}
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="p-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-light text-white">
                      {artwork.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
