import type { Metadata } from "next"
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NoiseOverlay } from "@/components/noise-overlay"
import { ShadowCurtain } from "@/components/shadow-curtain"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollPercentage } from "@/components/scroll-percentage"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PageTransition } from "@/components/page-transition"
import { PagePreloader } from "@/components/page-preloader"
import { AmbientGlow } from "@/components/ambient-glow"
import { OilPaintTexture } from "@/components/oil-paint-texture"
import { EdgeLightLeaks } from "@/components/edge-light-leaks"
import { CinematicVignette } from "@/components/cinematic-vignette"
import { DustParticles } from "@/components/dust-particles"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Studio — Picturi despre lumea interioară",
    template: "%s · Studio",
  },
  description:
    "Picturi în ulei și acrilic despre lumea interioară — umbră, simbol, prezență. Galerie, workshop-uri online și reflecții din atelier.",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark" as const,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ro"
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Full-page warm gradient wrapper */}
        <div
          className="relative min-h-screen w-full"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,69,19,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 20% 80%, rgba(74,48,109,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 70% 60% at 80% 50%, rgba(196,149,106,0.05) 0%, transparent 55%),
              linear-gradient(180deg, #0C0908 0%, #0A0807 50%, #0C0908 100%)
            `,
          }}
        >
          <PagePreloader />
          <AmbientGlow />
          <OilPaintTexture />
          <EdgeLightLeaks />
          <CinematicVignette />
          <DustParticles count={20} />
          <ShadowCurtain />
          <CustomCursor />
          <ScrollPercentage />
          <SmoothScroll>
            <PageTransition>{children}</PageTransition>
          </SmoothScroll>
          <NoiseOverlay />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </div>
      </body>
    </html>
  )
}
