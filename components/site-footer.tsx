import Link from "next/link"
import { Newsletter } from "@/components/newsletter"

/**
 * Cinematic Footer — massive display text, sparse chrome, confident silence.
 *
 * One giant wordmark anchors the bottom. Minimal links. Museum-quality restraint.
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

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-foreground/10"
    >
      {/* ── TOP ZONE: links + newsletter ─────────────────────────── */}
      <div className="px-6 pb-20 pt-24 md:px-16 md:pt-32 lg:px-32">
        <div className="relative mx-auto flex max-w-[1400px] flex-col gap-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-end">
            {/* Wordmark + tagline */}
            <div className="flex flex-col gap-5 lg:col-span-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 font-display text-3xl italic tracking-[-0.02em] text-foreground transition-[letter-spacing] duration-[1500ms] ease-out hover:tracking-[0.01em]"
              >
                <span>Studio</span>
                <span
                  aria-hidden
                  className="h-px w-0 bg-accent transition-[width] duration-[1500ms] ease-out group-hover:w-8"
                />
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                Viena · Arad · MMXXVI
              </span>
              <p className="mt-2 max-w-[28ch] font-display text-base font-light italic leading-snug text-foreground/40">
                Pictură, scriere, prezență — privite îndelung.
              </p>
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

      {/* ── BOTTOM ZONE: massive wordmark ────────────────────────── */}
      <div className="relative border-t border-foreground/5 px-6 pb-8 pt-12 md:px-16 lg:px-32">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Giant wordmark */}
          <span
            aria-hidden
            className="pointer-events-none select-none font-display text-[18vw] font-light italic leading-[0.8] tracking-[-0.02em] text-foreground/[0.03] md:text-[14vw]"
          >
            Sara's
          </span>

          {/* Bottom meta */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
              © {year} Studio
              <Separator />
              <FooterLink href="/legal/termeni" muted>
                Termeni
              </FooterLink>
              <Separator />
              <FooterLink href="/legal/confidentialitate" muted>
                Confidențialitate
              </FooterLink>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/20">
              Built slow. On purpose.
            </p>
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
