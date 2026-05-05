"use client"

/**
 * PaintingHover — artistic mouse-reactive effects over artwork images.
 *
 * Features:
 *   • Spotlight follow — a soft radial glow tracks the mouse cursor
 *     across the painting surface, simulating a gallery light source.
 *   • Varnish sheen — a subtle diagonal light streak shifts with
 *     cursor movement, giving the oil-paint surface a tactile feel.
 */

import { useRef, useEffect, useState } from "react"

export function PaintingHover({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMouse({ x, y })
    }

    const handleEnter = () => setIsHovering(true)
    const handleLeave = () => setIsHovering(false)

    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseenter", handleEnter)
    el.addEventListener("mouseleave", handleLeave)

    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseenter", handleEnter)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      data-cursor="view"
    >
      {children}

      {/* Spotlight follow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Varnish sheen — diagonal light streak */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 0.6 : 0,
          background: `linear-gradient(${135 + (mouse.x - 50) * 0.5}deg, transparent 40%, rgba(255,255,255,0.04) 48%, rgba(196,149,106,0.06) 50%, rgba(255,255,255,0.04) 52%, transparent 60%)`,
        }}
      />

      {/* Warm vignette edge — darkens corners on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(ellipse at ${mouse.x}% ${mouse.y}%, transparent 30%, rgba(10,10,10,0.25) 100%)`,
        }}
      />

      {/* Negative / inverted color effect on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          opacity: isHovering ? 0.15 : 0,
          background: 'white',
          mixBlendMode: 'difference',
        }}
      />
    </div>
  )
}
