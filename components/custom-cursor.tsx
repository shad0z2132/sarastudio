"use client"

/**
 * CustomCursor — elegant dot cursor, hidden on touch.
 * Small dot that expands on interactive hover. Native cursor hidden.
 */

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 500, mass: 0.4 }
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

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverable = target.closest(
        "a, button, [data-cursor], .hoverable, [role='button'], input, textarea, select"
      )
      setIsHovering(!!hoverable)
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleOver)
    }
  }, [cursorX, cursorY])

  if (isTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-foreground/20"
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Inner dot */}
      <motion.div
        className="rounded-full bg-foreground"
        animate={{
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  )
}
