"use client"

/**
 * CustomCursor — elegant triangle cursor.
 *
 * A minimal triangle pointer that follows the mouse with spring physics.
 * Hidden on touch devices. Mix-blend-difference for contrast.
 */

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseleave", handleLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseleave", handleLeave)
    }
  }, [cursorX, cursorY])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Triangle cursor */}
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative"
      >
        {/* Main triangle shape */}
        <div
          className="w-3 h-3 bg-white"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(-45deg)",
          }}
        />
        {/* Subtle glow */}
        <div
          className="absolute inset-0 -z-10 scale-150 blur-sm bg-white/20"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            transform: "rotate(-45deg)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
