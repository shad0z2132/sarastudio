"use client"

/**
 * AmbientGlow — dynamic light orbs with mouse-reactive parallax.
 *
 * Orbs gently follow mouse position for a living, breathing background.
 * Scroll parallax + continuous drift + mouse interaction.
 */

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react"

const ORBS = [
  { color: "#8B4513", size: "70vw", x: "-15%", y: "5%", opacity: 0.045, blur: 120 },   // umber
  { color: "#4A306D", size: "55vw", x: "55%", y: "35%", opacity: 0.03, blur: 100 },   // deep purple
  { color: "#C4956A", size: "45vw", x: "25%", y: "65%", opacity: 0.025, blur: 90 },   // warm gold
  { color: "#2D1F3D", size: "80vw", x: "40%", y: "-10%", opacity: 0.02, blur: 140 },  // dark violet wash
]

export function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Mouse tracking with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 50, stiffness: 30, mass: 1.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set((e.clientX - centerX) / centerX)
      mouseY.set((e.clientY - centerY) / centerY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])

  const scrollMotions = [y1, y2, y3, y4]

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
            y: scrollMotions[i],
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: orb.opacity,
            filter: `blur(${orb.blur}px)`,
            x: useTransform(smoothMouseX, [-1, 1], [-30 * (i + 1), 30 * (i + 1)]),
          }}
          animate={{
            scale: [1, 1.08, 0.97, 1.05, 1],
            rotate: [0, 3, -2, 1, 0],
          }}
          transition={{
            duration: 25 + i * 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  )
}
