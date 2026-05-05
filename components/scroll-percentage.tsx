"use client"

/**
 * ScrollPercentage — bottom-left counter showing scroll progress 0% → 100%.
 * Matches the-boyd.com's preloader percentage aesthetic.
 * Uses spring-smoothed scroll progress.
 */

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion"

export function ScrollPercentage() {
  const { scrollYProgress } = useScroll()
  const [percentage, setPercentage] = useState(0)
  const [visible, setVisible] = useState(false)

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100))
    })

    // Show after page load curtain fades
    const timer = setTimeout(() => setVisible(true), 1500)

    return () => {
      unsubscribe()
      clearTimeout(timer)
    }
  }, [smoothProgress])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: DURATION.page, ease: EASE_OUT_EXPO }}
      className="fixed bottom-8 left-6 z-[90] hidden lg:flex flex-col items-start gap-2"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
        Scroll
      </span>
      <span className="font-display text-3xl font-light tabular-nums text-foreground/70">
        {percentage}%
      </span>
    </motion.div>
  )
}
