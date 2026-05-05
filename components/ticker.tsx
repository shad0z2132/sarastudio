"use client"

/**
 * Ticker — infinite horizontal marquee.
 * Exact Boyd pattern: duplicate content, CSS translateX(-50%) animation.
 * Used for section transitions and footer branding.
 *
 * Mobile fix: removed `will-change-transform` which forced compositor
 * layer promotion and caused scroll jank on touch devices.
 */

import { cn } from "@/lib/utils"

interface TickerProps {
  children: React.ReactNode
  speed?: number // seconds for one loop
  className?: string
  innerClassName?: string
  pauseOnHover?: boolean
  direction?: "left" | "right"
}

export function Ticker({
  children,
  speed = 30,
  className,
  innerClassName,
  pauseOnHover = false,
  direction = "left",
}: TickerProps) {
  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap",
        pauseOnHover && "group",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex motion-safe:[animation-play-state:running] motion-reduce:[animation-play-state:paused]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          innerClassName
        )}
        style={{
          animation: `ticker-${direction} ${speed}s linear infinite`,
        }}
      >
        {/* First set */}
        <span className="inline-flex items-center">{children}</span>
        {/* Duplicate for seamless loop */}
        <span className="inline-flex items-center">{children}</span>
      </div>
    </div>
  )
}
