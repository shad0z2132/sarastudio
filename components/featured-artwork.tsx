import Link from "next/link"
import Image from "next/image"
import type { Artwork } from "@/lib/types"
import { PaintingHover } from "@/components/painting-hover"

/**
 * Home-page featured artwork — gallery-wall plate treatment.
 *
 * Smooth, layered hover:
 *   • Card lifts with soft shadow
 *   • Image scales 1.03x with full saturation + brightness
 *   • Plate accent line extends
 *   • Roman numeral lifts in accent
 *   • Umber inner glow from bottom
 *   • Title underline reveal
 */

const ROMAN = ["I", "II", "III", "IV", "V"] as const

const STATUS_COPY: Record<NonNullable<Artwork["price"]>["status"], string> = {
  available: "Disponibil",
  reserved: "Rezervat",
  sold: "Vândut",
  nfs: "Din colecție privată",
}

type Props = {
  artwork: Artwork
  index: number
  priority?: boolean
}

export function FeaturedArtwork({ artwork, index, priority = false }: Props) {
  const aspect =
    index === 0 ? "aspect-[4/5]" : index === 1 ? "aspect-[3/5]" : "aspect-[4/6]"
  const offset =
    index === 1 ? "lg:mt-24" : index === 2 ? "lg:mt-12" : "lg:mt-0"

  return (
    <Link
      href={`/galerie/${artwork.slug}`}
      data-cursor="view"
      className={
        "group flex flex-col gap-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent " +
        offset
      }
    >
      {/* Plate header */}
      <header className="relative flex items-baseline justify-between pb-3">
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-foreground/15"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"
        />
        <span className="font-display text-2xl font-light italic text-accent transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-0.5 group-hover:tracking-[0.05em] md:text-3xl">
          {ROMAN[index] ?? String(index + 1)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 transition-colors duration-[900ms] group-hover:text-foreground/80">
          {artwork.category}
        </span>
      </header>

      {/* Image frame with painting hover effect */}
      <PaintingHover className={aspect} imageSrc={artwork.image.url}>
        <div
          className={
            "relative w-full h-full overflow-hidden bg-surface transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-2 group-hover:shadow-[0_32px_80px_-24px_rgba(0,0,0,0.5)]"
          }
        >
          <Image
            src={artwork.image.url}
            alt={artwork.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={artwork.image.lqip}
            priority={priority}
            className="object-cover object-center saturate-[0.7] brightness-[0.9] transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:saturate-100 group-hover:brightness-100"
          />

          {/* Umber bloom from bottom */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/20 via-accent/5 to-transparent opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100"
          />

          {/* Accent ring on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/0 transition-all duration-[1200ms] group-hover:ring-accent/25"
          />
        </div>
      </PaintingHover>

      {/* Caption */}
      <figcaption className="flex flex-col gap-3 pt-1">
        <div className="flex items-end justify-between gap-6">
          <h3 className="font-display text-2xl font-light italic leading-[1.1] text-foreground text-balance transition-colors duration-[900ms] group-hover:text-accent md:text-3xl">
            <span className="relative inline-block">
              {artwork.title}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent/70 transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"
              />
            </span>
          </h3>
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground transition-colors duration-[900ms] group-hover:text-foreground">
            {artwork.year}
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          {artwork.medium} · {artwork.dimensions.w} × {artwork.dimensions.h}{" "}
          {artwork.dimensions.unit}
        </p>

        {artwork.price?.status && (
          <div className="mt-2 flex items-center gap-3 border-t border-foreground/10 pt-3">
            <span
              aria-hidden
              className={
                "inline-block h-1.5 w-1.5 rounded-full transition-transform duration-[900ms] group-hover:scale-150 " +
                (artwork.price.status === "available"
                  ? "bg-accent"
                  : "bg-foreground/30")
              }
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              {STATUS_COPY[artwork.price.status]}
            </span>
            <span
              aria-hidden
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/0 transition-colors duration-[900ms] group-hover:text-accent"
            >
              Vezi lucrarea →
            </span>
          </div>
        )}
      </figcaption>
    </Link>
  )
}
