"use client"

/**
 * PageBackground — full-page warm gradient background.
 *
 * Large gradient bands that span the entire scrollable page.
 * Creates subtle tonal shifts as user scrolls.
 */

export function PageBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{
        background: `
          linear-gradient(
            180deg,
            #0C0908 0%,
            #0E0B0A 12%,
            #0C0908 24%,
            #0A0807 36%,
            #0C0908 48%,
            #0E0B0A 60%,
            #0C0908 72%,
            #0A0807 84%,
            #0C0908 100%
          )
        `,
        backgroundSize: "100% 600vh",
      }}
    />
  )
}
