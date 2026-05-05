"use client"

/**
 * SiteNav — premium gallery navigation.
 * - Entrance: slides down with staggered link reveals.
 * - Scroll state: transparent at top, compact + solid when scrolled.
 * - Active link: animated accent dot + underline.
 * - Mobile: elegant hamburger → full-screen overlay menu.
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react"
import { usePathname } from "next/navigation"

const LINKS = [
  { label: "Cine sunt eu", href: "/cine-sunt-eu" },
  { label: "Galerie", href: "/galerie" },
  { label: "Workshops", href: "/workshops" },
  { label: "Reflecții", href: "/reflectii" },
  { label: "Contact", href: "/contact" },
]

const ease = [0.19, 1, 0.22, 1] as const

export function SiteNav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.35,
  })
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`
            relative border-b transition-all duration-700
            ${scrolled 
              ? "border-border/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150" 
              : "border-transparent bg-transparent"
            }
          `}
        >
          <nav
            aria-label="Navigație principală"
            className={`
              mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12
              transition-[height] duration-500
              ${scrolled ? "h-14" : "h-20"}
            `}
          >
            {/* Wordmark */}
            <Link 
              href="/" 
              className="group relative flex flex-col leading-none"
              onClick={() => setMenuOpen(false)}
            >
              <span className="font-display text-2xl font-light italic text-foreground transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:tracking-[0.04em]">
                Sara's
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-foreground/50 transition-colors duration-[800ms] group-hover:text-foreground/80">
                Studio
              </span>
              {/* Wordmark hover dot */}
              <span 
                aria-hidden
                className="absolute -right-2.5 top-1 h-1 w-1 rounded-full bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
              />
            </Link>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-10 md:flex">
              {LINKS.map((l, i) => {
                const active =
                  pathname === l.href ||
                  (l.href !== "/" && pathname.startsWith(l.href))
                return (
                  <motion.li 
                    key={l.label}
                    initial={{ opacity: 0, y: -12 }}
                    animate={mounted ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      className={`
                        group relative inline-flex items-center font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                        ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                      `}
                    >
                      <span className="relative flex items-center gap-2">
                        {/* Active dot */}
                        <span
                          aria-hidden
                          className={`
                            h-1 w-1 rounded-full bg-accent transition-all duration-500
                            ${active ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                          `}
                        />
                        {l.label}
                        <span
                          aria-hidden
                          className={`
                            pointer-events-none absolute -bottom-1 left-0 h-px bg-current transition-[width] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                            ${active ? "w-full" : "w-0 group-hover:w-full"}
                          `}
                        />
                      </span>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            {/* Right side: mobile hamburger */}
            <div className="flex items-center gap-6">
              {/* Desktop only — subtle accent line */}
              <span 
                aria-hidden 
                className="hidden h-px w-8 bg-foreground/10 md:block" 
              />
              
              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              >
                <motion.span
                  animate={{
                    rotate: menuOpen ? 45 : 0,
                    y: menuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.4, ease }}
                  className="block h-px w-5 bg-foreground"
                />
                <motion.span
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    scaleX: menuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3, ease }}
                  className="block h-px w-5 bg-foreground"
                />
                <motion.span
                  animate={{
                    rotate: menuOpen ? -45 : 0,
                    y: menuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.4, ease }}
                  className="block h-px w-5 bg-foreground"
                />
              </button>
            </div>
          </nav>

          {/* Scroll progress hairline */}
          <motion.span
            aria-hidden
            style={{
              scaleX,
              transformOrigin: "0% 50%",
              willChange: "transform",
            }}
            className="absolute inset-x-0 bottom-0 h-px bg-accent"
          />
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
          >
            {/* Background grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />

            <nav className="relative flex flex-1 flex-col justify-center px-8">
              <ul className="flex flex-col gap-6">
                {LINKS.map((l, i) => {
                  const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                  return (
                    <motion.li
                      key={l.label}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4"
                      >
                        <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`
                          font-display text-4xl font-light transition-colors duration-500
                          ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                        `}>
                          {l.label}
                        </span>
                        {active && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="h-2 w-2 rounded-full bg-accent"
                          />
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Mobile menu footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-16 flex flex-col gap-4"
              >
                <span className="h-px w-12 bg-border" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                  Studio · Viena
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
