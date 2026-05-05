"use client"

/**
 * GalleryLightbox — immersive full-bleed artwork viewer.
 *
 * Opens on image click. Pure black canvas, artwork centered with object-contain.
 * Title + details fade in on hover or idle. Keyboard nav + swipe + click-outside.
 */

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion"
import type { Artwork } from "@/lib/types"

type Props = {
  artwork: Artwork | null
  isOpen: boolean
  onClose: () => void
}

export function GalleryLightbox({ artwork, isOpen, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [isOpen, handleKey])

  return (
    <AnimatePresence>
      {isOpen && artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          onClick={onClose}
          data-cursor="close"
        >
          {/* Close hint (top-right) */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/80"
          >
            Închide [Esc]
          </motion.button>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: DURATION.micro, ease: EASE_OUT_EXPO }}
            className="relative h-full w-full p-8 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={artwork.image.url}
              alt={artwork.image.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Details overlay (bottom-left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE_OUT_EXPO }}
            className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12"
          >
            <div className="mx-auto max-w-[1400px]">
              <h2 className="font-display text-2xl font-light text-white md:text-3xl">
                {artwork.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                <span>{artwork.medium}</span>
                <span className="text-white/20">·</span>
                <span>
                  {artwork.dimensions.w} × {artwork.dimensions.h} {artwork.dimensions.unit}
                </span>
                <span className="text-white/20">·</span>
                <span>{artwork.year}</span>
                {artwork.price?.status === "available" && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-white/70">
                      €{(artwork.price.amountCents / 100).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                {artwork.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
