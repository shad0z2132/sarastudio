import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "Contact — Studio",
  description:
    "Scrie-mi despre o lucrare, un workshop, o colaborare sau pur și simplu ca să îți spui ce ai simțit privind. Răspund personal.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-16 md:pb-24 md:pt-48 lg:px-32">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-8 top-28 select-none font-display text-[22vw] font-light italic leading-none text-accent/[0.04] md:text-[16vw]"
        >
          Hai
        </span>

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                Contact
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-10 font-display text-[clamp(56px,9vw,140px)] font-light leading-[0.92] tracking-[-0.025em] text-foreground text-balance">
              Hai să{" "}
              <span className="italic text-muted-foreground">vorbim</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-10 max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              Scrie-mi despre o lucrare, un workshop, o colaborare — sau pur și
              simplu ca să îți spui ce ai simțit privind. Răspund personal, în
              câteva zile.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 01 — DIRECT */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal as="div" className="flex flex-col gap-4 md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              01 — Direct
            </span>
            <span
              aria-hidden
              className="hidden h-px w-12 bg-accent md:inline-block"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              E-mail · Viena
            </span>
          </Reveal>

          <div className="flex flex-col gap-12 md:col-span-9">
            <Reveal delay={0.15}>
              <p className="max-w-[42ch] font-display text-3xl font-light leading-[1.2] text-foreground md:text-[2.75rem] md:leading-[1.1]">
                Cel mai direct drum e{" "}
                <span className="italic text-muted-foreground">
                  printr-un e-mail scris cu intenție
                </span>
                .
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href="mailto:studio@example.com"
                className="group relative inline-flex w-fit items-center gap-3 overflow-hidden border border-foreground px-10 py-5 font-sans text-xs uppercase tracking-[0.25em] text-foreground"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-background">
                  studio@example.com
                </span>
                <span
                  aria-hidden
                  className="relative z-10 transition-[transform,color] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:text-background"
                >
                  →
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.45}>
              <dl className="grid grid-cols-1 gap-8 border-t border-foreground/10 pt-10 sm:grid-cols-3">
                {[
                  ["Răspuns", "În 2–3 zile"],
                  ["Limbă", "Română · Engleză"],
                  ["Locație", "Viena · Arad"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                      {label}
                    </dt>
                    <dd className="font-display text-xl font-light text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — DESPRE CE */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal as="div" className="flex flex-col gap-4 md:col-span-3 md:sticky md:top-32 md:self-start">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              02 — Despre ce
            </span>
            <span
              aria-hidden
              className="hidden h-px w-12 bg-accent md:inline-block"
            />
          </Reveal>

          <div className="flex flex-col divide-y divide-foreground/10 md:col-span-9">
            {[
              {
                title: "O lucrare",
                body: "Vrei să știi mai multe despre o pânză, prețul ei sau disponibilitatea ei. Sau vrei un dosar privat pentru colecționar.",
                tag: "Achiziție · Informații",
              },
              {
                title: "Un workshop",
                body: "Ai întrebări despre format, dată sau ce te așteaptă. Sau vrei să organizezi o sesiune pentru un grup.",
                tag: "Workshop · Rezervare",
              },
              {
                title: "O colaborare",
                body: "Ești curator, galerie, brand sau artist și simți că avem ceva de construit împreună.",
                tag: "Colaborare · Proiect",
              },
              {
                title: "Orice altceva",
                body: "Ai privit ceva din galerie și vrei să îmi spui ce ai simțit. Și asta e bine venit.",
                tag: "Deschis",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group grid grid-cols-1 gap-4 py-12 transition-[padding] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:pl-4 md:grid-cols-12 md:gap-10 md:py-16">
                  <div className="flex flex-col gap-3 md:col-span-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-3xl font-light text-foreground transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-accent md:text-4xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-sans text-base leading-relaxed text-muted-foreground md:col-span-7 md:pt-9">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE + FINAL CTA */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />

        {/* Ghost quote mark */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-16 select-none font-display text-[20vw] font-light italic leading-none text-accent/[0.05] md:right-16 lg:right-32"
        >
          „
        </span>

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <blockquote className="max-w-[22ch] font-display text-5xl font-light italic leading-[1.1] text-foreground text-balance md:text-7xl lg:text-[6rem]">
              Conversațiile bune{" "}
              <span className="not-italic text-muted-foreground">
                încep cu un singur cuvânt.
              </span>
            </blockquote>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
              <a
                href="mailto:studio@example.com"
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-foreground px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] text-foreground"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-background">
                  Scrie primul
                </span>
                <span
                  aria-hidden
                  className="relative z-10 transition-[transform,color] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:text-background"
                >
                  →
                </span>
              </a>

              <a
                href="/workshops"
                className="group relative inline-flex items-center font-mono text-xs uppercase tracking-[0.3em] text-foreground/60 transition-colors duration-[800ms] ease-out hover:text-foreground"
              >
                <span className="relative">
                  Sau rezervă un workshop
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-1 left-0 h-px w-[30%] bg-current transition-[width] duration-[800ms] ease-out group-hover:w-full"
                  />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
