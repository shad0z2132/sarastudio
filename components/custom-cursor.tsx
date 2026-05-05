"use client"

/**
 * CustomCursor — state-aware cinematic cursor.
 *
 * States:
 *   • default   — small dot + ring
 *   • view      — expanded circle with "View" label (gallery images)
 *   • close     — expanded circle with "×" (lightbox)
 *   • drag      — expanded circle with "← →" (horizontal scroll)
 *
 * Hovering interactive elements (a, button, [data-cursor]) triggers state.
 * Hidden on touch devices. Native cursor remains visible for accessibility.
 */

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

type CursorState = "default" | "view" | "close" | "drag"

const LABELS: Record<CursorState, string | null> = {
  default: null,
  view: "View",
  close: "×",
  drag: "← →",
}

const SIZES: Record<CursorState, number> = {
  default: 40,
  view: 96,
  close: 72,
  drag: 88,
}

export function CustomCursor() {
  const [state, setState] = useState<CursorState>("default")
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

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverable = target.closest(
        "a, button, [data-cursor], .hoverable, [role='button'], input, textarea, select"
      )

      if (hoverable) {
        const dataCursor = hoverable.getAttribute("data-cursor") as CursorState | null
        setState(dataCursor ?? "default")
      } else {
        setState("default")
      }
    }

    const handleLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleOver)
    document.addEventListener("mouseleave", handleLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleOver)
      document.removeEventListener("mouseleave", handleLeave)
    }
  }, [cursorX, cursorY])

  if (isTouch) return null

  const size = SIZES[state]
  const label = LABELS[state]
  const isActive = state !== "default"

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-white/30"
        animate={{
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* Solid fill for active states */}
      <motion.div
        className="absolute rounded-full bg-white"
        animate={{
          width: isActive ? size - 2 : 0,
          height: isActive ? size - 2 : 0,
          opacity: isActive && isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* Inner dot (default state) */}
      <motion.div
        className="absolute rounded-full bg-white"
        animate={{
          width: isActive ? 0 : 5,
          height: isActive ? 0 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Label */}
      {label && (
        <motion.span
          className="relative z-10 font-mono text-[10px] uppercase tracking-[0.15em] text-black"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isActive && isVisible ? 1 : 0,
            scale: isActive && isVisible ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}
