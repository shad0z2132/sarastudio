"use client"

/**
 * ============================================================================
 * GalleryGrid — editorial masonry with asymmetric tiles, museum wall labels,
 * sticky floating filter, staggered scroll reveals.
 * ============================================================================
 */

import { useMemo, useRef, useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useInView,
} from "motion/react"
import type { Artwork, GalleryFilter } from "@/lib/types"
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion"
import { GalleryLightbox } from "./gallery-lightbox"
import { PaintingHover } from "@/components/painting-hover"

type Props = {
  artworks: Artwork[]
  initialFilter?: GalleryFilter
}

const FILTERS: { key: GalleryFilter; label: string }[] = [
  { key: "toate", label: "Toate" },
  { key: "abstracte", label: "Abstracte" },
  { key: "simbolice", label: "Simbolice" },
]

const STATUS: Record<string, string> = {
  available: "Disponibil",
  reserved: "Rezervat",
  sold: "Vândut",
  nfs: "Colecție privată",
}

export function GalleryGrid({ artworks, initialFilter = "toate" }: Props) {
  const [filter, setFilter] = useState<GalleryFilter>(initialFilter)
  const [isPending, startTransition] = useTransition()
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { amount: 0.05, once: true })

  const filtered = useMemo(() => {
    if (filter === "toate") return artworks
    return artworks.filter((a) => a.category === filter)
  }, [artworks, filter])

  const handleFilter = (next: GalleryFilter) => {
    startTransition(() => setFilter(next))
  }

  const counts = useMemo(
    () => ({
      toate: artworks.length,
      abstracte: artworks.filter((a) => a.category === "abstracte").length,
      simbolice: artworks.filter((a) => a.category === "simbolice").length,
    }),
    [artworks],
  )

  if (artworks.length === 0) return <GalleryEmpty reason="no-data" />

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT_EXPO }}>
      <div ref={gridRef}>
        {/* Filter bar */}
        <FilterBar value={filter} onChange={handleFilter} counts={counts} />

        {/* Grid */}
        {filtered.length === 0 ? (
          <GalleryEmpty reason="no-matches" />
        ) : (
          <LayoutGroup>
            <motion.ul
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
              style={{ gridAutoRows: "auto", gridAutoFlow: "dense" }}
              data-pending={isPending ? "" : undefined}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((artwork, i) => {
                  const { w, h } = artwork.dimensions
                  const ratio = w / h
                  const isHorizontal = ratio >= 1.15
                  const isTall = ratio <= 0.8
                  const isSquare = ratio > 0.8 && ratio < 1.15

                  // Editorial placement based on index + shape
                  const isFeatured = i === 0 || i === 4
                  const isWide = isHorizontal && !isFeatured

                  return (
                    <motion.li
                      key={artwork._id}
                      layout
                      initial={{ opacity: 0, y: 60 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{
                        layout: { duration: DURATION.page, ease: EASE_OUT_EXPO },
                        opacity: { duration: DURATION.micro, delay: Math.min(i * 0.08, 0.5) },
                        y: { duration: DURATION.micro, delay: Math.min(i * 0.08, 0.5) },
                      }}
                      className={
                        isFeatured
                          ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                          : isWide
                            ? "sm:col-span-2"
                            : isTall
                              ? "lg:row-span-2"
                              : ""
                      }
                    >
                      <GalleryTile
                        artwork={artwork}
                        priority={i < 4}
                        size={
                          isFeatured ? "featured" : isWide ? "wide" : isTall ? "tall" : "standard"
                        }
                        onOpenLightbox={() => setLightboxArtwork(artwork)}
                      />
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        )}

        <GalleryLightbox
          artwork={lightboxArtwork}
          isOpen={!!lightboxArtwork}
          onClose={() => setLightboxArtwork(null)}
        />
      </div>
    </MotionConfig>
  )
}

/* ------------------------------------------------------------------ */
/* Filter Bar — floating pills                                          */
/* ------------------------------------------------------------------ */

function FilterBar({
  value,
  onChange,
  counts,
}: {
  value: GalleryFilter
  onChange: (f: GalleryFilter) => void
  counts: Record<GalleryFilter, number>
}) {
  return (
    <div className="sticky top-0 z-30 -mx-6 mb-12 border-b border-border/50 bg-background/80 px-6 py-5 backdrop-blur-xl md:-mx-12 md:px-12">
      <div className="flex items-center justify-between">
        <div
          role="tablist"
          aria-label="Filtrează lucrările"
          className="flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((f) => {
            const active = value === f.key
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => onChange(f.key)}
                className={`
                  relative flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500
                  ${active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"}
                `}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] ${active ? "text-background/60" : "text-muted-foreground/40"}`}>
                  {String(counts[f.key]).padStart(2, "0")}
                </span>
              </button>
            )
          })}
        </div>

        <span className="hidden font-mono text-[10px] tracking-[0.12em] text-foreground/20 md:block">
          {counts[value]} lucrări
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Gallery Tile — museum wall label aesthetic                           */
/* ------------------------------------------------------------------ */

type TileSize = "featured" | "wide" | "tall" | "standard"

function GalleryTile({
  artwork,
  priority,
  size,
  onOpenLightbox,
}: {
  artwork: Artwork
  priority: boolean
  size: TileSize
  onOpenLightbox: () => void
}) {
  const status = artwork.price?.status
  const isAvailable = status === "available"

  // Aspect ratio based on actual painting dimensions
  const { w, h } = artwork.dimensions
  const ratio = w / h

  // Choose container aspect to respect the painting while fitting the tile size
  let aspectClass: string
  if (size === "featured") {
    aspectClass = ratio >= 1 ? "aspect-[16/10]" : "aspect-[4/5]"
  } else if (size === "wide") {
    aspectClass = "aspect-[16/9]"
  } else if (size === "tall") {
    aspectClass = "aspect-[3/5]"
  } else {
    aspectClass = ratio >= 1.1 ? "aspect-[4/3]" : ratio <= 0.9 ? "aspect-[4/5]" : "aspect-[1/1]"
  }

  return (
    <div className="group">
      {/* Image frame — click opens lightbox */}
      <PaintingHover className="w-full">
        <button
          onClick={onOpenLightbox}
          data-cursor="view"
          className="relative block w-full overflow-hidden bg-foreground/[0.03] text-left transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          <div className={aspectClass}>
            <Image
              src={artwork.image.url}
              alt={artwork.image.alt}
              fill
              sizes={
                size === "featured"
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : size === "wide"
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              }
              placeholder="blur"
              blurDataURL={artwork.image.lqip}
              priority={priority}
              className="object-cover object-center saturate-[0.65] brightness-[0.92] transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04] group-hover:saturate-100 group-hover:brightness-100"
            />
          </div>

          {/* Status badge */}
          {status && !isAvailable && (
            <span
              className={`
                absolute top-4 right-4 z-10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] backdrop-blur-sm
                ${status === "sold" ? "bg-foreground/90 text-background" : ""}
                ${status === "reserved" ? "bg-accent text-foreground" : ""}
                ${status === "nfs" ? "bg-foreground/10 text-foreground/50 border border-foreground/10" : ""}
              `}
            >
              {STATUS[status]}
            </span>
          )}

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-background/70 via-background/5 to-transparent opacity-0 transition-opacity duration-[1000ms] group-hover:opacity-100">
            <span className="m-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80 mix-blend-difference">
              Vezi detalii →
            </span>
          </div>
        </button>
      </PaintingHover>

      {/* Wall label — links to detail page */}
      <Link
        href={`/galerie/${artwork.slug}`}
        className="mt-5 flex flex-col gap-2.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        {/* Title row */}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-light leading-tight text-foreground transition-colors duration-700 group-hover:text-accent md:text-2xl">
            {artwork.title}
          </h3>
          <span className="shrink-0 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
            {artwork.year}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-8 bg-accent/30 transition-all duration-700 group-hover:w-16" />

        {/* Details — museum format */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
          <span>{artwork.medium}</span>
          <span className="text-foreground/10">·</span>
          <span>
            {artwork.dimensions.w} × {artwork.dimensions.h} {artwork.dimensions.unit}
          </span>
          {isAvailable && artwork.price && (
            <>
              <span className="text-foreground/10">·</span>
              <span className="text-foreground/50">
                €{(artwork.price.amountCents / 100).toLocaleString()}
              </span>
            </>
          )}
        </div>
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Empty state                                                          */
/* ------------------------------------------------------------------ */

function GalleryEmpty({ reason }: { reason: "no-data" | "no-matches" }) {
  const title =
    reason === "no-data" ? "Galeria se pregătește" : "Niciun rezultat"
  const body =
    reason === "no-data"
      ? "Lucrările sunt în curs de pregătire. Revino curând sau solicită un dosar privat."
      : "Încearcă o altă categorie sau revino la vederea completă."

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.page, ease: EASE_OUT_EXPO }}
      className="flex flex-col items-center gap-6 py-32 text-center"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/50">
        —
      </span>
      <h3 className="font-display text-3xl font-light text-foreground">
        {title}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Skeleton                                                             */
/* ------------------------------------------------------------------ */

export function GallerySkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-16">
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 w-28 animate-pulse rounded-full bg-foreground/5" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`flex flex-col gap-5 ${
              i === 0 || i === 4 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div
              className={`w-full animate-pulse bg-foreground/5 ${
                i === 0 || i === 4 ? "aspect-[4/5]" : i === 1 || i === 5 ? "aspect-[16/9]" : "aspect-[4/5]"
              }`}
            />
            <div className="flex flex-col gap-3">
              <div className="h-2 w-24 animate-pulse bg-foreground/5" />
              <div className="h-5 w-40 animate-pulse bg-foreground/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
