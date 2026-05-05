"use client"

/**
 * EdgeLightLeaks — warm colored glows at viewport corners.
 *
 * Simulates light leaking into a darkroom or studio.
 * Very subtle, creates depth at the periphery.
 */

import { motion } from "motion/react"

const LEAKS = [
  { position: "top-0 left-0", gradient: "from-amber-900/20 via-transparent to-transparent", size: "w-[50vw] h-[50vh]" },
  { position: "bottom-0 right-0", gradient: "from-transparent via-transparent to-purple-900/15", size: "w-[60vw] h-[60vh]" },
  { position: "top-0 right-0", gradient: "from-transparent via-amber-900/10 to-transparent", size: "w-[40vw] h-[40vh]" },
]

export function EdgeLightLeaks() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {LEAKS.map((leak, i) => (
        <motion.div
          key={i}
          className={`absolute ${leak.position} ${leak.size} bg-gradient-to-br ${leak.gradient}`}
          animate={{
            opacity: [0.6, 1, 0.7, 0.9, 0.6],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
