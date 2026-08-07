export type PrebookProductId = "aac-app" | "therapy-app";

export type PrebookProduct = {
  id: PrebookProductId;
  name: string;
  shortName: string;
  audience: string;
  tagline: string;
  description: string;
  /** Price in minor units (paise for INR). Null when not priced yet. */
  priceCents: number | null;
  currency: "INR";
  /** Product not shipping yet — still allowed for pre-book when priced. */
  comingSoon: boolean;
  href: string;
  accent: "secondary" | "primary";
};

/** Apps available for pre-booking. */
export const PREBOOK_PRODUCTS: PrebookProduct[] = [
  {
    id: "aac-app",
    name: "AAC App",
    shortName: "AAC",
    audience: "For adults",
    tagline: "Communication, first and always",
    description:
      "Dedicated AAC for adults who are non-speaking or have lost their voice — symbol boards, text-to-speech, phrase prediction, and voice personalization.",
    // ₹24,999
    priceCents: 2_499_900,
    currency: "INR",
    comingSoon: false,
    href: "/aac-communication",
    accent: "secondary",
  },
  {
    id: "therapy-app",
    name: "AAC + Therapy Progress App",
    shortName: "Therapy",
    audience: "For children",
    tagline: "AAC plus therapy progress in one app",
    description:
      "AAC with AI speech therapy, OT landmark games, special education, education videos, and live progress for parents and therapists.",
    // ₹27,999 — product not shipping yet; pre-booking open
    priceCents: 2_799_900,
    currency: "INR",
    comingSoon: true,
    href: "/ai-therapy",
    accent: "primary",
  },
];

export function getPrebookProduct(id: string): PrebookProduct | undefined {
  return PREBOOK_PRODUCTS.find((product) => product.id === id);
}

/** Format INR (or other) from minor units (paise). */
export function formatMoney(cents: number, currency: string = "INR"): string {
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
