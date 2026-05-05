"use client"

/**
 * PageTransition — cinematic route-change curtain.
 *
 * A black wipe slides across on navigation, then fades out.
 * Wraps children in AnimatePresence keyed by pathname.
 */

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { EASE_OUT_EXPO } from "@/lib/motion"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // When pathname changes, trigger curtain
    setIsNavigating(true)

    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsNavigating(false)
    }, 600) // Halfway through curtain animation we swap content

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>

      {/* Curtain overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[9998] bg-background"
          />
        )}
      </AnimatePresence>
    </>
  )
}
