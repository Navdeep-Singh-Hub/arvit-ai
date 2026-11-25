export type PrebookProductId = "aac-app" | "therapy-app";

export type PrebookProduct = {
  id: PrebookProductId;
  name: string;
  shortName: string;
  audience: string;
  tagline: string;
  description: string;
  /** Price in minor units (cents for USD). Null when not priced yet. */
  priceCents: number | null;
  currency: "USD";
  /** Product not shipping yet — still allowed for pre-book when priced. */
  comingSoon: boolean;
  href: string;
  accent: "secondary" | "primary";
};

/** One AAC Device. therapy-app is kept so older carts still resolve. */
export const PREBOOK_PRODUCTS: PrebookProduct[] = [
  {
    id: "aac-app",
    name: "AAC Device",
    shortName: "AAC",
    audience: "For children & parents",
    tagline: "Communication for your child. Progress you can follow.",
    description:
      "One device with symbol boards, text-to-speech, and phrase prediction for your child — plus live progress and home practice for parents.",
    // $249
    priceCents: 24_900,
    currency: "USD",
    comingSoon: false,
    href: "/aac-communication",
    accent: "secondary",
  },
  {
    id: "therapy-app",
    name: "AAC Device",
    shortName: "AAC",
    audience: "For children & parents",
    tagline: "Communication for your child. Progress you can follow.",
    description:
      "One device with symbol boards, text-to-speech, and phrase prediction for your child — plus live progress and home practice for parents.",
    priceCents: 24_900,
    currency: "USD",
    comingSoon: false,
    href: "/aac-communication",
    accent: "primary",
  },
];

/** The device offered on the site. */
export const CATALOG_PRODUCTS = PREBOOK_PRODUCTS.filter((product) => product.id === "aac-app");

export function getPrebookProduct(id: string): PrebookProduct | undefined {
  return PREBOOK_PRODUCTS.find((product) => product.id === id);
}

/** Format a price from minor units (cents). Older bookings may still be in INR. */
export function formatMoney(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/** Display price for a product (coming-soon status is shown separately in UI). */
export function formatProductPrice(product: PrebookProduct): string {
  if (product.priceCents == null) {
    return "Coming soon";
  }
  return formatMoney(product.priceCents, product.currency);
}

/** Pre-book when a price is set — includes coming-soon products. */
export function isProductPurchasable(product: PrebookProduct): boolean {
  return product.priceCents != null && product.priceCents > 0;
}
