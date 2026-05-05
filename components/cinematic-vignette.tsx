"use client"

/**
 * CinematicVignette — breathing edge darkening.
 *
 * Heavy vignette that subtly pulses, drawing focus to center content.
 */

import { motion } from "motion/react"

export function CinematicVignette() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2]">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(8,6,5,0.4) 100%)",
        }}
        animate={{
          opacity: [0.8, 1, 0.85, 0.95, 0.8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Corner darkening */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 0% 0%, rgba(8,6,5,0.3) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 100% 100%, rgba(8,6,5,0.25) 0%, transparent 50%)",
        }}
      />
    </div>
  )
}
