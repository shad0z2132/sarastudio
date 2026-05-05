"use client"

/**
 * ImageReveal — scroll-triggered image entrance.
 *
 * Reveals images via clip-path wipe + subtle scale + unblur.
 * Creates a cinematic "developing" feel as content enters viewport.
 */

import { useRef } from "react"
import { motion, useInView } from "motion/react"

export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1, filter: "blur(8px)" }}
        animate={
          inView
            ? { clipPath: "inset(0% 0 0 0)", scale: 1, filter: "blur(0px)" }
            : { clipPath: "inset(100% 0 0 0)", scale: 1.1, filter: "blur(8px)" }
        }
        transition={{
          duration: 1.4,
          ease: [0.19, 1, 0.22, 1],
          delay,
        }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
