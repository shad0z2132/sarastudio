"use client"

/**
 * BackgroundTypography — massive watermark text as section texture.
 *
 * Renders a huge, low-opacity display word behind content.
 * Creates editorial depth without visual noise.
 */

import { motion, useInView } from "motion/react"
import { useRef } from "react"

export function BackgroundTypography({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 0.025, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[20vw] font-light italic leading-none text-foreground"
        aria-hidden
      >
        {text}
      </motion.span>
    </div>
  )
}
