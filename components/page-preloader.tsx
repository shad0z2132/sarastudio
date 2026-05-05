"use client"

/**
 * PagePreloader — cinematic entrance loader.
 *
 * Full-bleed studio portrait background with heavy vignette.
 * Progress percentage counts up. Fades out with scale + blur once ready.
 * Only runs once per session.
 */

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { EASE_OUT_EXPO } from "@/lib/motion"

const MIN_DISPLAY_MS = 2800

export function PagePreloader() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Progress counter — accelerates toward end
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Slow start, fast finish
        const increment = prev < 50 ? 1.5 : prev < 80 ? 2.5 : 4
        return Math.min(100, prev + increment)
      })
    }, 40)

    // Minimum display time + exit
    const timer = setTimeout(() => {
      setProgress(100)
      clearInterval(interval)

      setTimeout(() => {
        setExiting(true)
      }, 400)
    }, MIN_DISPLAY_MS)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/studio-portrait.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover saturate-[0.6]"
            />
          </div>

          {/* Heavy vignette layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, transparent 0%, rgba(10,10,10,0.6) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-display text-4xl font-light italic text-foreground md:text-5xl">
                Sara's
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/50">
                Studio
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex w-48 flex-col items-center gap-3"
            >
              {/* Bar track */}
              <div className="relative h-px w-full overflow-hidden bg-foreground/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Percentage */}
              <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/40">
                {Math.round(progress).toString().padStart(3, "0")}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="max-w-[32ch] text-center font-display text-sm font-light italic leading-relaxed text-foreground/40"
            >
              Fac vizibil ceea ce trăiește în tăcere
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
