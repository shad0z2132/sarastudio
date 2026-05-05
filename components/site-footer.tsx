"use client"

import Link from "next/link"
import { Newsletter } from "@/components/newsletter"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

/**
 * SiteFooter — museum-quality cinematic footer.
 *
 * Dramatic gradient border, massive bleeding wordmark,
 * manifesto line, editorial nav columns, confident silence.
 */

const NAV_GROUPS: { label: string; items: { label: string; href: string }[] }[] = [
  {
    label: "Atelier",
    items: [
      { label: "Cine sunt eu", href: "/cine-sunt-eu" },
      { label: "Proces", href: "/cine-sunt-eu#proces" },
      { label: "Scrie-mi", href: "mailto:studio@example.com" },
      { label: "Arhiva", href: "/galerie" },
    ],
  },
  {
    label: "Lucrări",
    items: [
      { label: "Toate", href: "/galerie" },
      { label: "Abstracte", href: "/galerie?filter=abstracte" },
      { label: "Simbolice", href: "/galerie?filter=simbolice" },
      { label: "Dosar privat", href: "mailto:studio@example.com?subject=Dosar privat" },
    ],
  },
  {
    label: "Scriere",
    items: [
      { label: "Reflecții", href: "/reflectii" },
      { label: "Workshop-uri", href: "/workshops" },
      { label: "Note de lectură", href: "/reflectii" },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const quoteRef = useRef<HTMLDivElement>(null)
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 })

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* ── ANIMATED TOP BORDER ──────────────────────────────────── */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(139,69,19,0.4) 20%, rgba(196,149,106,0.3) 50%, rgba(139,69,19,0.4) 80%, transparent 100%)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ── MANIFESTO ZONE ───────────────────────────────────────── */}
      <div ref={quoteRef} className="px-6 pt-24 pb-16 md:px-16 md:pt-32 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/20 block mb-8">
              Manifest
            </span>
            <blockquote className="font-display text-2xl font-light italic leading-[1.3] text-foreground/60 md:text-4xl lg:text-5xl max-w-4xl">
              „Nu există lumină fără umbră. Nu existe culoare fără tăcere.
              <span className="text-foreground/40"> Fiecare pânză este o întrebare pe care o pun lumii — și mie însămi."</span>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-12 bg-accent/40" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                Sara M. · {year}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── LINKS + NEWSLETTER ZONE ──────────────────────────────── */}
      <div className="px-6 pb-16 pt-12 md:px-16 md:pb-20 md:pt-16 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-end">
            {/* Wordmark + tagline */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 font-display text-4xl italic tracking-[-0.02em] text-foreground transition-[letter-spacing] duration-[1500ms] ease-out hover:tracking-[0.02em]"
              >
                <span>Sara's</span>
                <span
                  aria-hidden
                  className="h-px w-0 bg-accent transition-[width] duration-[1500ms] ease-out group-hover:w-10"
                />
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                Studio · Viena · Arad
              </span>
              <p className="mt-2 max-w-[30ch] font-display text-lg font-light italic leading-snug text-foreground/40">
                Pictură, scriere, prezență — privite îndelung.
              </p>

              {/* Social placeholder */}
              <div className="mt-4 flex items-center gap-6">
                <FooterLink href="https://instagram.com" muted>
                  Instagram
                </FooterLink>
                <FooterLink href="mailto:studio@example.com" muted>
                  Email
                </FooterLink>
              </div>
            </div>

            {/* Nav columns */}
            <nav className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:col-span-5 lg:gap-12">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col gap-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                    {group.label}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item.href + item.label}>
                        <FooterLink href={item.href}>{item.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      {/* ── MASSIVE WORDMARK ZONE ────────────────────────────────── */}
      <div className="relative border-t border-foreground/5 px-6 pb-10 pt-12 md:px-16 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          {/* Giant bleeding wordmark */}
          <div className="relative overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none block select-none font-display text-[22vw] font-light italic leading-[0.75] tracking-[-0.03em] text-foreground/[0.025] md:text-[18vw]"
              style={{ marginLeft: "-2vw" }}
            >
              Studio
            </span>
          </div>

          {/* Bottom meta row */}
          <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/25">
              © {year} Sara's Studio
              <Separator />
              <FooterLink href="/legal/termeni" muted>
                Termeni
              </FooterLink>
              <Separator />
              <FooterLink href="/legal/confidentialitate" muted>
                Confidențialitate
              </FooterLink>
            </p>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/25 transition-colors duration-500 hover:text-foreground/60"
            >
              <span>Sus</span>
              <span className="flex h-8 w-8 items-center justify-center border border-foreground/10 transition-all duration-500 group-hover:border-foreground/30 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Components ─────────────────────────────────────────────────────── */

function FooterLink({
  href,
  children,
  muted = false,
}: {
  href: string
  children: React.ReactNode
  muted?: boolean
}) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http")
  const color = muted ? "text-foreground/30" : "text-foreground/50"
  const Cmp: React.ElementType = isExternal ? "a" : Link
  return (
    <Cmp
      href={href}
      className={
        "group relative inline-flex items-center font-sans text-sm " +
        (muted ? "text-[9px] uppercase tracking-[0.3em] " : "") +
        color +
        " transition-colors duration-[800ms] ease-out hover:text-foreground"
      }
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-[40%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
        />
      </span>
    </Cmp>
  )
}

function Separator() {
  return (
    <span aria-hidden className="mx-3 text-foreground/15">
      ·
    </span>
  )
}
