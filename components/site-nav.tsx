"use client";

/**
 * Site navigation — glass, with a live scroll-progress hairline.
 * - Scroll progress uses a spring-smoothed transform (no layout thrash).
 * - Each link extends a 1px underline from 40% → 100% on hover (0.8s).
 * - The wordmark eases its letter-spacing on hover to subtly "breathe".
 */

import Link from "next/link";

import { motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Cine sunt eu", href: "/cine-sunt-eu" },
  { label: "Galerie", href: "/galerie" },
  { label: "Workshops", href: "/workshops" },
  { label: "Reflecții", href: "/reflectii" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.35,
  });
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative border-b border-border/60 bg-background/40 backdrop-blur-xl backdrop-saturate-150">
        <nav
          aria-label="Navigație principală"
          className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12"
        >
          {/* Wordmark */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl font-light italic text-foreground transition-[letter-spacing] duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:tracking-[0.04em]">
              Sara's
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-foreground/50 transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-foreground/80">
              Studio
            </span>
          </Link>

          {/* Links */}
          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => {
              const active =
                pathname === l.href ||
                (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={
                      "group relative inline-flex items-center font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] " +
                      (active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    <span className="relative">
                      {l.label}
                      <span
                        aria-hidden
                        className={
                          "pointer-events-none absolute -bottom-1 left-0 h-px bg-current transition-[width] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] " +
                          (active ? "w-full" : "w-0 group-hover:w-full")
                        }
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Locale */}
          <Link
            href="#"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60 transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:text-foreground"
          >
            RO / EN
          </Link>
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
    </header>
  );
}
