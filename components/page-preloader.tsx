"use client"

/**
 * PagePreloader — cinematic entrance loader.
 *
 * Full-bleed painting background with heavy vignette.
 * Progress percentage counts up. Fades out with scale + blur once ready.
 * Shows every visit.
 */

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { EASE_OUT_EXPO } from "@/lib/motion"

const MIN_DISPLAY_MS = 3200

export function PagePreloader() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = prev < 50 ? 1.2 : prev < 80 ? 2.2 : 3.5
        return Math.min(100, prev + increment)
      })
    }, 40)

    const timer = setTimeout(() => {
      setProgress(100)
      clearInterval(interval)

      setTimeout(() => {
        setExiting(true)
      }, 500)
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
          exit={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/fecc44911e822c609f4c8d2d70a0628b.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={90}
              className="object-cover saturate-[0.7]"
            />
          </div>

          {/* Heavy vignette layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, transparent 0%, rgba(10,10,10,0.7) 100%)",
            }}
          />

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute top-8 left-6 z-10 md:left-16 lg:left-32"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/30">
              Studio · Viena
            </span>
          </motion.div>

          {/* Center content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="font-display text-5xl font-light italic text-foreground md:text-7xl lg:text-8xl">
                Sara's
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-foreground/40">
                Studio
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex w-56 flex-col items-center gap-4"
            >
              <div className="relative h-px w-full overflow-hidden bg-foreground/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/30">
                {Math.round(progress).toString().padStart(3, "0")}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="max-w-[36ch] text-center font-display text-base font-light italic leading-relaxed text-foreground/35 md:text-lg"
            >
              Fac vizibil ceea ce trăiește în tăcere
            </motion.p>
          </div>

          {/* Bottom right info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-8 right-6 z-10 md:right-16 lg:right-32"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/20">
              Pictură · Terapie prin artă
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
