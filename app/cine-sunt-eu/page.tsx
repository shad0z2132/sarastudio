import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ImageReveal } from "@/components/image-reveal"
import { FadeIn } from "@/components/fade-in"

export const metadata = {
  title: "Cine sunt eu — Studio",
  description:
    "Artist născut la Arad, bazat în Viena. Pictez simboluri, arhetipuri și umbra — ceea ce trăiește în tăcere în fiecare dintre noi.",
}

export default function CineSuntEuPage() {
  return (
    <main className="min-h-screen text-foreground">
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-20 pt-36 md:px-16 md:pb-28 md:pt-44 lg:px-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              Biografie · Atelier
            </span>
          </div>

          <h1 className="mt-10 font-display text-[clamp(3.5rem,10vw,10rem)] font-light leading-[0.92] tracking-[-0.03em]">
            Cine
            <br />
            <span className="italic text-foreground/60">sunt eu?</span>
          </h1>

          <p className="mt-12 max-w-2xl font-display text-xl font-light italic leading-relaxed text-foreground/50 md:text-2xl">
            M-am născut într-un oraș de câmpie și am învățat să privesc adâncul
            înainte de a avea cuvinte pentru el.
          </p>
        </div>
      </section>

      {/* ── PORTRAIT + INTRO ─────────────────────────────────────── */}
      <section className="border-t border-foreground/10 px-6 py-20 md:px-16 md:py-28 lg:px-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-5">
            <ImageReveal className="aspect-[3/4] bg-foreground/5">
              <Image
                src="/Untitled design (1).jpg"
                alt="Sara M. — portret de atelier"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-black/10" />
            </ImageReveal>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">
              Atelier · Viena, 2024
            </p>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center gap-8 lg:col-span-6 lg:col-start-7">
            <FadeIn>
              <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
                Mă numesc Sara. M-am născut în 1999, la Arad, și lucrez astăzi din
                Viena — un oraș care respiră straturi, istorie și o liniște
                aparte, potrivită pentru cineva care ascultă mult înainte să
                picteze.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
                Între cele două locuri s-a format felul în care privesc
                lumea: cu un picior în pământul de acasă și cu celălalt în
                întrebările care nu se termină.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-4 pt-4">
                <span className="h-px w-12 bg-accent/40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  Arad · 1999
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CHAPTERS ─────────────────────────────────────────────── */}
      <Chapter index="01" label="Practică" title="Ce caut în fiecare lucrare">
        <p>
          Pictez cu ulei și acrilic pentru că îmi trebuie o materie care să
          opună rezistență — ceva care să nu se lase modelat ușor, așa cum nu se
          lasă modelate nici trăirile pe care le explorez. Lucrez cu simboluri,
          cu arhetipuri și cu ceea ce Jung numea{" "}
          <em className="font-display italic text-foreground/80">
            umbra
          </em>
          : acele părți din noi pe care nu le arătăm, dar care ne conduc mai
          mult decât recunoaștem.
        </p>
        <p>
          Nu le pictez ca să le exorcizez. Le pictez ca să le dau demnitate.
        </p>
      </Chapter>

      <Chapter index="02" label="Motivație" title="De ce fac asta">
        <p>
          Cred că arta cea mai onestă nu vine din a spune ceva nou, ci din a
          recunoaște, încet, ceea ce era deja acolo. Fiecare pânză este o
          întâlnire — între ceea ce știu și ceea ce încă nu îndrăznesc să știu.
        </p>
        <p>
          Dacă, privindu-le, simți că una dintre ele te-a văzut pe tine,
          înseamnă că lucrarea și-a găsit celălalt capăt.
        </p>
      </Chapter>

      {/* ── PULL QUOTE ───────────────────────────────────────────── */}
      <section className="border-t border-foreground/10 px-6 py-24 md:px-16 md:py-36 lg:px-32">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <span
              aria-hidden
              className="block font-display text-[100px] font-light leading-none text-accent/10 md:text-[140px]"
            >
              „
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="-mt-12 md:-mt-16">
              <p className="font-display text-2xl font-light italic leading-[1.3] text-foreground/70 md:text-4xl lg:text-5xl">
                Nu pictez ca să fiu înțeles. Pictez ca să nu mă pierd pe drum.
              </p>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <Chapter index="03" label="Formare" title="Formare și practică">
        <p>
          Practica mea artistică este continuă și autodidactă în cea mai mare
          parte, susținută de studiul psihologiei analitice, al simbolisticii și
          al artei figurative europene.
        </p>
        <p>
          Pregătesc, în paralel, o tranziție către arta-terapie formală — pentru
          că ceea ce se întâmplă deja, tăcut, în workshopurile mele, merită un
          cadru profesional pe măsură.
        </p>
      </Chapter>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-foreground/10 px-6 py-20 md:px-16 md:py-28 lg:px-32">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <FadeIn>
            <h2 className="font-display text-3xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              Acum ai cuvintele. <br />
              <span className="italic text-foreground/50">Urmează imaginile.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/galerie"
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-foreground/60 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors duration-700 hover:border-foreground"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-700 group-hover:text-background">
                  Vezi lucrările
                </span>
                <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-background">
                  →
                </span>
              </Link>
              <Link
                href="mailto:studio@example.com"
                className="group relative inline-flex items-center font-sans text-sm text-foreground/70 transition-colors duration-500 hover:text-foreground"
              >
                <span className="relative">
                  Scrie-mi
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"
                  />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

/* ── COMPONENTS ─────────────────────────────────────────────────────── */

function Chapter({
  index,
  label,
  title,
  children,
}: {
  index: string
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-foreground/10 px-6 py-20 md:px-16 md:py-28 lg:px-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <FadeIn>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60">
              {index} — {label}
            </span>
          </FadeIn>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-8">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex max-w-2xl flex-col gap-6 text-base leading-relaxed text-foreground/50 md:text-lg">
              {children}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
