"use client"

/**
 * PaintingHover — artistic mouse-reactive effects over artwork images.
 *
 * Features:
 *   • Spotlight follow — a soft radial glow tracks the mouse cursor
 *     across the painting surface, simulating a gallery light source.
 *   • Varnish sheen — a subtle diagonal light streak shifts with
 *     cursor movement, giving the oil-paint surface a tactile feel.
 *   • Magnifying lens — a circular glass loupe follows the cursor,
 *     zooming the image 2.5× with an inverted/negative filter.
 */

import { useRef, useEffect, useState } from "react"

export function PaintingHover({
  children,
  className = "",
  imageSrc,
}: {
  children: React.ReactNode
  className?: string
  imageSrc?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [rect, setRect] = useState({ width: 0, height: 0 })
  const [hasFinePointer, setHasFinePointer] = useState(false)

  useEffect(() => {
    setHasFinePointer(window.matchMedia("(pointer: fine)").matches)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
      setRect({ width: r.width, height: r.height })
    }

    const handleEnter = () => {
      const r = el.getBoundingClientRect()
      setRect({ width: r.width, height: r.height })
      setIsHovering(true)
    }
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

  const pctX = rect.width > 0 ? (mouse.x / rect.width) * 100 : 50
  const pctY = rect.height > 0 ? (mouse.y / rect.height) * 100 : 50

  const lensSize = 90
  const zoom = 2

  const lensX = mouse.x - lensSize / 2
  const lensY = mouse.y - lensSize / 2

  const imgLeft = lensSize / 2 - mouse.x * zoom
  const imgTop = lensSize / 2 - mouse.y * zoom

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
          background: `radial-gradient(circle 180px at ${pctX}% ${pctY}%, rgba(255,255,255,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Varnish sheen — diagonal light streak */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 0.6 : 0,
          background: `linear-gradient(${135 + (pctX - 50) * 0.5}deg, transparent 40%, rgba(255,255,255,0.04) 48%, rgba(196,149,106,0.06) 50%, rgba(255,255,255,0.04) 52%, transparent 60%)`,
        }}
      />

      {/* Warm vignette edge — darkens corners on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(ellipse at ${pctX}% ${pctY}%, transparent 30%, rgba(10,10,10,0.25) 100%)`,
        }}
      />

      {/* Magnifying lens — zoomed + inverted */}
      {hasFinePointer && imageSrc && rect.width > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-20 rounded-full border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-opacity duration-300"
          style={{
            width: lensSize,
            height: lensSize,
            left: lensX,
            top: lensY,
            opacity: isHovering ? 1 : 0,
            overflow: "hidden",
          }}
        >
          <img
            src={imageSrc}
            alt=""
            className="absolute max-w-none"
            style={{
              width: rect.width * zoom,
              height: rect.height * zoom,
              left: imgLeft,
              top: imgTop,
              objectFit: "cover",
              filter: "invert(1) contrast(1.1) brightness(1.05)",
            }}
          />
          {/* Glass reflection highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)",
            }}
          />
        </div>
      )}
    </div>
  )
}
