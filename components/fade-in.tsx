"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
