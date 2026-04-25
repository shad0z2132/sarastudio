import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { ReflectionsList } from "@/components/reflections-list"
import { Reveal } from "@/components/reveal"
import { getReflections } from "@/lib/cms"

export const metadata = {
  title: "Reflecții — Însemnări din atelier",
  description:
    "Texte scurte, jurnale de lucru și note din atelier. O arhivă deschisă de gânduri despre pictură, prezență și lumea interioară.",
}

export const revalidate = 3600

export default async function ReflectiiPage() {
  const reflections = await getReflections()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-16 md:pb-24 md:pt-48 lg:px-32">
        {/* Ghost wordmark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 top-24 select-none font-display text-[22vw] font-light italic leading-none text-accent/[0.04] md:text-[16vw]"
        >
          Reflecții
        </span>

        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                01 — Arhivă deschisă
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-10 font-display text-[clamp(56px,9vw,140px)] font-light leading-[0.92] tracking-[-0.025em] text-foreground text-balance">
              Însemnări{" "}
              <span className="italic text-muted-foreground">din atelier</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-10 max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              Texte scurte, jurnale de lucru, note din nopțile în care pictura
              nu iese — și din cele în care, în sfârșit, iese.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ARCHIVE LIST */}
      <section className="relative px-6 py-16 md:px-16 md:py-24 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-center justify-between pb-16">
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Toate
                </span>
                <span
                  aria-hidden
                  className="hidden h-px w-16 bg-foreground/20 md:inline-block"
                />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/30">
                {reflections.length} texte
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ReflectionsList items={reflections} />
          </Reveal>
        </div>
      </section>

      {/* CLOSING QUOTE */}
      <section className="relative px-6 py-32 md:px-16 md:py-48 lg:px-32">
        <span
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-foreground/10 md:inset-x-16 lg:inset-x-32"
        />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal as="div" className="flex flex-col gap-4 md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
              02 — De ce scriu
            </span>
            <span
              aria-hidden
              className="hidden h-px w-12 bg-accent md:inline-block"
            />
          </Reveal>

          <div className="flex flex-col gap-10 md:col-span-9">
            <Reveal delay={0.15}>
              <p className="max-w-[46ch] font-display text-3xl font-light leading-[1.2] text-foreground text-balance md:text-[2.75rem] md:leading-[1.1]">
                Scriu ca să înțeleg ce pictez.{" "}
                <span className="italic text-muted-foreground">
                  Uneori ordinea se inversează.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                Aceste texte nu sunt articole. Sunt urme — ale unui proces care
                nu se termină în atelier, ci continuă în cuvinte, noaptea, când
                pânza a rămas în urmă.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
