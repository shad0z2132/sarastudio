import type { Artwork, Reflection, Workshop } from "./types";

/* Deterministic preview data. Replaces Sanity until env vars are set. */

const img = (url: string, alt: string, w = 1200, h = 1500) => ({
  url,
  width: w,
  height: h,
  // Tiny inline SVG placeholder (valid base64 PNG-like stand-in for blurDataURL).
  lqip: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxNDE0MTQiLz48L3N2Zz4=",
  alt,
});

export const mockArtworks: Artwork[] = [
  {
    _id: "a1",
    slug: "copacul-vietii",
    title: "Copacul vieții",
    category: "simbolice",
    emotionalState: ["speranță", "radacină"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 100, h: 70, unit: "cm" },
    description:
      "Rădăcini adânci și ramuri către stele. Ochiul din centru privește tot ce trăiește în tăcere.",
    image: img(
      "/Screenshot 2026-05-05 213146.png",
      "Copac al vieții cu rădăcini, ochi central și pești în apă",
      1200,
      840,
    ),
    price: { amountCents: 480000, currency: "EUR", status: "available" },
    featured: false,
    publishedAt: "2025-03-15",
  },
  {
    _id: "a2",
    slug: "finta-sacra",
    title: "Ființa sacră",
    category: "simbolice",
    emotionalState: ["transcendență", "femininitate"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 80, h: 100, unit: "cm" },
    description:
      "Siluetă de lumină și culoare. Portalul din spate deschide drumul către interior.",
    image: img(
      "/Screenshot 2026-05-05 213135.png",
      "Figură umană violetă în fața unui portal cosmic",
      960,
      1200,
    ),
    price: { amountCents: 520000, currency: "EUR", status: "available" },
    featured: true,
    publishedAt: "2025-01-22",
  },
  {
    _id: "a3",
    slug: "kundalini",
    title: "Kundalini",
    category: "simbolice",
    emotionalState: ["pasiune", "pericol"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 70, h: 90, unit: "cm" },
    description:
      "Forța care urcă. Șarpele înfășurat în trupul albastru — transformare prin foc.",
    image: img(
      "/Screenshot 2026-05-05 213126.png",
      "Femeie albastră cu șarpe înfășurat în jurul trupului",
      933,
      1200,
    ),
    price: { amountCents: 450000, currency: "EUR", status: "available" },
    featured: true,
    publishedAt: "2024-11-08",
  },
  {
    _id: "a4",
    slug: "reflectia",
    title: "Reflecția",
    category: "simbolice",
    emotionalState: ["liniște", "introspecție"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 80, h: 80, unit: "cm" },
    description:
      "Nud lângă apă. Soarele din spate și floarea care plutește — o clipă de pace.",
    image: img(
      "/Screenshot 2026-05-05 213116.png",
      "Nud feminin așezat lângă apă, cu soare în fundal",
      1200,
      1200,
    ),
    price: { amountCents: 380000, currency: "EUR", status: "reserved" },
    featured: true,
    publishedAt: "2024-08-14",
  },
  {
    _id: "a5",
    slug: "meditatie",
    title: "Meditație",
    category: "simbolice",
    emotionalState: ["prezență", "suflet"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 100, h: 70, unit: "cm" },
    description:
      "Lotusii deschiși în jurul ei. Ochii închiși, dar vede tot. Liniștea ca limbaj.",
    image: img(
      "/Screenshot 2026-05-05 213105.png",
      "Femeie în meditație, înconjurată de flori de lotus",
      1200,
      840,
    ),
    price: { amountCents: 420000, currency: "EUR", status: "available" },
    featured: false,
    publishedAt: "2025-02-28",
  },
  {
    _id: "a6",
    slug: "ochiul-din-negura",
    title: "Ochiul din negură",
    category: "abstracte",
    emotionalState: ["mister", "profunzime"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 60, h: 80, unit: "cm" },
    description:
      "În întuneric, o fălție de lumină. Fața care privește fără să fie văzută.",
    image: img(
      "/Screenshot 2026-05-05 213057.png",
      "Față în întuneric cu o deschizătură verticală de lumină",
      900,
      1200,
    ),
    price: { amountCents: 320000, currency: "EUR", status: "available" },
    featured: false,
    publishedAt: "2024-10-03",
  },
  {
    _id: "a7",
    slug: "ispita",
    title: "Ispita",
    category: "simbolice",
    emotionalState: ["tensiune", "dualitate"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 80, h: 80, unit: "cm" },
    description:
      "Două fețe ale aceleiași povești. Diavolul zâmbește, mireasa ascunde ochii.",
    image: img(
      "/Screenshot 2026-05-05 213048.png",
      "Figură în roșu și figură în alb, scenă simbolică dramatică",
      1200,
      1200,
    ),
    price: { amountCents: 460000, currency: "EUR", status: "sold" },
    featured: false,
    publishedAt: "2025-04-01",
  },
  {
    _id: "a8",
    slug: "poarta",
    title: "Poarta",
    category: "simbolice",
    emotionalState: ["călătorie", "mister"],
    year: 2024,
    medium: "Ulei pe pânză",
    dimensions: { w: 70, h: 90, unit: "cm" },
    description:
      "Pelerinul cu părul alb în fața ușii din cer. Cheia e înăuntru, dar trebuie să cauți.",
    image: img(
      "/Screenshot 2026-05-05 213035.png",
      "Figură în roșu în fața unei porți suspendate printre nori",
      933,
      1200,
    ),
    price: { amountCents: 500000, currency: "EUR", status: "available" },
    featured: false,
    publishedAt: "2024-12-20",
  },
  {
    _id: "a9",
    slug: "pomul-cunoasterii",
    title: "Pomul cunoașterii",
    category: "simbolice",
    emotionalState: ["origine", "alegere"],
    year: 2025,
    medium: "Ulei pe pânză",
    dimensions: { w: 80, h: 80, unit: "cm" },
    description:
      "Eva și Eva. Mărul e acolo, dar șarpele tace. Copacul le unește și le desparte.",
    image: img(
      "/Screenshot 2026-05-05 213020.png",
      "Două figuri feminine de-o parte și de alta a unui copac",
      1200,
      1200,
    ),
    price: { amountCents: 400000, currency: "EUR", status: "available" },
    publishedAt: "2025-03-01",
  },
];

export const mockReflections: Reflection[] = [
  {
    _id: "r1",
    slug: "pictura-ca-limbaj-al-umbrei",
    title: "Pictura ca limbaj al umbrei",
    excerpt:
      "Ce se întâmplă între pictor și pânză atunci când nimeni nu privește? Un scurt eseu despre materie și recunoaștere.",
    coverImage: img(
      "/Screenshot 2026-05-05 213057.png",
      "Ochiul din negură — pictură abstractă",
    ),
    tags: ["umbră", "proces"],
    author: { name: "Sara" },
    readingTimeMin: 4,
    publishedAt: "2025-01-04",
  },
  {
    _id: "r2",
    slug: "arhetipul-femeii-sacree",
    title: "Arhetipul femeii sacre",
    excerpt:
      "Despre figura feminină care apare iar și iar în lucrări — nu ca model, ci ca limbaj.",
    coverImage: img(
      "/Screenshot 2026-05-05 213126.png",
      "Kundalini — femeia cu șarpele",
    ),
    tags: ["arhetip", "feminitate"],
    author: { name: "Sara" },
    readingTimeMin: 6,
    publishedAt: "2025-02-18",
  },
  {
    _id: "r3",
    slug: "intre-arad-si-viena",
    title: "Între Arad și Viena",
    excerpt:
      "Însemnare despre cum două geografii formează o privire — un picior în pământul de acasă, celălalt în întrebări.",
    coverImage: img(
      "/studio-portrait.jpg",
      "Atelier de pictură, lumină naturală",
    ),
    tags: ["biografie", "atelier"],
    author: { name: "Sara" },
    readingTimeMin: 3,
    publishedAt: "2024-11-29",
  },
];

/* Helper: build ISO strings relative to "now" for a living demo. */
const daysFromNow = (d: number, hour = 18): string => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + d);
  date.setUTCHours(hour, 0, 0, 0);
  return date.toISOString();
};

export const mockWorkshops: Workshop[] = [
  {
    _id: "w1",
    slug: "cerc-de-expresie-creativa",
    title: "Cerc de expresie creativă",
    summary:
      "Un spațiu online, în grup mic, în care culoarea devine limbaj și tăcerea devine material de lucru.",
    format: "online",
    durationMin: 90,
    priceCents: 4500,
    currency: "EUR",
    intentions: ["prezență", "expresie", "umbră"],
    coverImage: img(
      "/Screenshot 2026-05-05 213146.png",
      "Atelier online de expresie creativă",
    ),
    sessions: [
      {
        id: "s1",
        startsAtUtc: daysFromNow(5, 18),
        endsAtUtc: daysFromNow(5, 19),
        seatsLeft: 6,
        capacity: 8,
      },
      {
        id: "s2",
        startsAtUtc: daysFromNow(12, 18),
        endsAtUtc: daysFromNow(12, 19),
        seatsLeft: 3,
        capacity: 8,
      },
      {
        id: "s3",
        startsAtUtc: daysFromNow(19, 18),
        endsAtUtc: daysFromNow(19, 19),
        seatsLeft: 8,
        capacity: 8,
      },
      {
        id: "s4",
        startsAtUtc: daysFromNow(26, 18),
        endsAtUtc: daysFromNow(26, 19),
        seatsLeft: 0,
        capacity: 8,
      },
    ],
  },
  {
    _id: "w2",
    slug: "lucru-cu-umbra",
    title: "Lucru cu umbra",
    summary:
      "O sesiune tematică, pentru cei care sunt deja familiarizați cu procesul. Lucrăm cu simbol și arhetip.",
    format: "online",
    durationMin: 120,
    priceCents: 6500,
    currency: "EUR",
    intentions: ["umbră", "arhetip"],
    coverImage: img(
      "/Screenshot 2026-05-05 213057.png",
      "Atelier tematic lucru cu umbra",
    ),
    sessions: [
      {
        id: "s5",
        startsAtUtc: daysFromNow(9, 17),
        endsAtUtc: daysFromNow(9, 19),
        seatsLeft: 4,
        capacity: 6,
      },
      {
        id: "s6",
        startsAtUtc: daysFromNow(23, 17),
        endsAtUtc: daysFromNow(23, 19),
        seatsLeft: 6,
        capacity: 6,
      },
    ],
  },
];
