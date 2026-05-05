"use client"

/**
 * AmbientGlow — massive soft light orbs that drift behind content.
 *
 * Creates a "dark studio with light leaks" atmosphere.
 * Purely decorative, very low opacity, slow movement.
 */

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const ORBS = [
  { color: "#8B4513", size: "60vw", x: "-10%", y: "10%", opacity: 0.04 },   // umber
  { color: "#4A306D", size: "50vw", x: "60%", y: "40%", opacity: 0.025 },   // deep purple
  { color: "#C4956A", size: "40vw", x: "30%", y: "70%", opacity: 0.02 },   // warm gold
]

export function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  const motions = [y1, y2, y3]

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            y: motions[i],
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: orb.opacity,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full blur-[100px]"
        />
      ))}
    </div>
  )
}
