import type { Audience } from "@/lib/audience/content";
import type { NavGroup } from "@/lib/constants";
import { CATALOG_PRODUCTS, type PrebookProduct, type PrebookProductId } from "@/lib/commerce/products";

export function productIdForAudience(_audience: Audience | null): PrebookProductId {
  return "aac-app";
}

/** One AAC Device for every visitor. */
export function getAudienceProducts(_audience: Audience | null): PrebookProduct[] {
  return CATALOG_PRODUCTS;
}

export const AUDIENCE_PATHS = {
  adult: {
    product: "/aac-communication",
    blocked: [] as string[],
  },
  child: {
    product: "/aac-communication",
    blocked: [] as string[],
  },
} as const;

export function getBlockedPaths(_audience: Audience | null): string[] {
  return [];
}

export function getAudienceRedirectTarget(_audience: Audience | null): string {
  return "/aac-communication";
}

const FAMILY_NAV: NavGroup[] = [
  {
    label: "AAC Device",
    description: "One device for children and parents",
    items: [
      {
        label: "AAC Device",
        href: "/aac-communication",
        description: "Boards and voice for your child. Progress you can follow.",
      },
      {
        label: "Pre-book",
        href: "/#tablets",
        description: "Reserve the AAC Device for your family.",
      },
      {
        label: "Features",
        href: "/features",
        description: "What the child uses, and what the parent sees.",
      },
    ],
  },
  {
    label: "Family & care",
    description: "Parents, therapists, and programs",
    items: [
      {
        label: "For Parents",
        href: "/parents",
        description: "Progress, home practice, and controls you can read.",
      },
      {
        label: "For Therapists",
        href: "/therapists",
        description: "Caseload tools for speech, OT, and AAC.",
      },
      {
        label: "Solutions",
        href: "/solutions",
        description: "Families, schools, clinics, and hospitals.",
      },
    ],
  },
];

export function getAudienceNavGroups(_audience: Audience | null): NavGroup[] {
  return FAMILY_NAV;
}

export function getAudienceFooterPlatform(_audience: Audience | null) {
  return [
    { label: "AAC Device", href: "/aac-communication" },
    { label: "For Parents", href: "/parents" },
    { label: "Pre-book / Cart", href: "/cart" },
    { label: "Features", href: "/features" },
    { label: "For Therapists", href: "/therapists" },
  ];
}
