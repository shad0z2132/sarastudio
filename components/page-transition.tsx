"use client"

/**
 * PageTransition — blink/flash route transition.
 *
 * Instead of a curtain wipe, the screen briefly flashes dark
 * like a camera shutter or an eye blink. Fast, elegant, unobtrusive.
 */

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    // Start blink
    setIsBlinking(true)

    // Swap content at the peak of the blink (when screen is darkest)
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children)
    }, 250)

    // End blink
    const endTimer = setTimeout(() => {
      setIsBlinking(false)
    }, 500)

    return () => {
      clearTimeout(swapTimer)
      clearTimeout(endTimer)
    }
  }, [pathname, children])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0.95 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>

      {/* Blink overlay */}
      <AnimatePresence>
        {isBlinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut",
            }}
            className="pointer-events-none fixed inset-0 z-[9998] bg-black"
          />
        )}
      </AnimatePresence>
    </>
  )
}
