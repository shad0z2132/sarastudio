"use client"

/**
 * HorizontalArtworkStrip — slow infinite carousel.
 *
 * Artwork images continuously scroll horizontally like a gallery walkway.
 * Duplicates items for seamless loop.
 */

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react"
import type { Artwork } from "@/lib/types"

export function HorizontalArtworkStrip({ artworks }: { artworks: Artwork[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const baseX = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  // Duplicate items 3x for seamless loop
  const items = [...artworks, ...artworks, ...artworks]

  const speed = 0.4 // pixels per frame (slow)

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const singleSetWidth = container.scrollWidth / 3

    let newX = baseX.get() - (isHovered ? speed * 0.2 : speed) * (delta / 16)

    // Reset when we've scrolled one full set
    if (Math.abs(newX) >= singleSetWidth) {
      newX = 0
    }

    baseX.set(newX)
  })

  return (
    <section className="relative py-24 md:py-32">
      {/* Section label */}
      <div className="mb-12 px-6 md:px-16 lg:px-32">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4">
          <span className="h-px w-12 bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            Selecție din galerie
          </span>
        </div>
      </div>

      {/* Horizontal track — infinite scroll */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={containerRef}
          className="flex w-max items-center gap-6 md:gap-10"
          style={{ x: baseX }}
        >
          {items.map((artwork, i) => (
            <div
              key={`${artwork._id}-${i}`}
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
                      {String((i % artworks.length) + 1).padStart(2, "0")}
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
