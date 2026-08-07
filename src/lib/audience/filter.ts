import type { Audience } from "@/lib/audience/content";
import type { NavGroup } from "@/lib/constants";
import { PREBOOK_PRODUCTS, type PrebookProduct, type PrebookProductId } from "@/lib/commerce/products";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";

export function productIdForAudience(audience: Audience | null): PrebookProductId | null {
  // Therapy Progress temporarily off — only AAC Device is offered
  if (!THERAPY_PROGRESS_ENABLED) return "aac-app";
  if (audience === "adult") return "aac-app";
  if (audience === "child") return "therapy-app";
  return null;
}

/** Only the product that belongs to the selected audience. */
export function getAudienceProducts(audience: Audience | null): PrebookProduct[] {
  if (!THERAPY_PROGRESS_ENABLED) {
    return PREBOOK_PRODUCTS.filter((p) => p.id === "aac-app");
  }
  if (audience === "adult") {
    return PREBOOK_PRODUCTS.filter((p) => p.id === "aac-app");
  }
  if (audience === "child") {
    return PREBOOK_PRODUCTS.filter((p) => p.id === "therapy-app");
  }
  return [];
}

/** Adult-only destinations children should not land on (and vice versa). */
export const AUDIENCE_PATHS = {
  adult: {
    product: "/aac-communication",
    blocked: ["/ai-therapy", "/parents"] as string[],
  },
  child: {
    product: "/ai-therapy",
    blocked: ["/aac-communication"] as string[],
  },
} as const;

export function getBlockedPaths(audience: Audience | null): string[] {
  if (!THERAPY_PROGRESS_ENABLED) {
    return ["/ai-therapy", "/parents"];
  }
  if (audience === "adult") return [...AUDIENCE_PATHS.adult.blocked];
  if (audience === "child") return [...AUDIENCE_PATHS.child.blocked];
  return [];
}

export function getAudienceRedirectTarget(audience: Audience | null): string {
  if (!THERAPY_PROGRESS_ENABLED) return "/aac-communication";
  if (audience === "child") return AUDIENCE_PATHS.child.product;
  return AUDIENCE_PATHS.adult.product;
}

export function getAudienceNavGroups(audience: Audience | null): NavGroup[] {
  // TEMP: no Therapy Progress in menus — AAC / adult nav only
  if (!THERAPY_PROGRESS_ENABLED || audience === "adult" || !audience) {
    return [
      {
        label: "AAC Device",
        description: "Adult communication tools",
        items: [
          {
            label: "AAC Device",
            href: "/aac-communication",
            description: "Symbol boards, voice, prediction — built for adults.",
          },
          {
            label: "Pre-book AAC",
            href: "/#tablets",
            description: "Reserve the Adult AAC Device.",
          },
          {
            label: "AAC features",
            href: "/features",
            description: "Full capability map for adult AAC.",
          },
        ],
      },
      {
        label: "For professionals",
        description: "Clinics and care teams",
        items: [
          {
            label: "Therapists",
            href: "/therapists",
            description: "Caseload tools for adult AAC prescribing.",
          },
          {
            label: "Solutions",
            href: "/solutions",
            description: "Deploy AAC for clinics, rehab, and hospitals.",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Talk with our team about adult AAC.",
          },
        ],
      },
    ];
  }

  if (audience === "child") {
    return [
      {
        label: "Therapy App",
        description: "Child progress tools",
        items: [
          {
            label: "Therapy App",
            href: "/ai-therapy",
            description: "AAC plus speech AI, OT games, special ed & progress.",
          },
          {
            label: "Pre-book Therapy",
            href: "/#tablets",
            description: "Reserve AAC + Therapy Progress for your child.",
          },
          {
            label: "Therapy features",
            href: "/features",
            description: "Speech, OT, special ed, AAC, and dashboards.",
          },
        ],
      },
      {
        label: "Who it's for",
        description: "Families and care teams",
        items: [
          {
            label: "Parents",
            href: "/parents",
            description: "Progress and home practice you can follow.",
          },
          {
            label: "Therapists",
            href: "/therapists",
            description: "Caseload tools for pediatric therapy.",
          },
          {
            label: "Solutions",
            href: "/solutions",
            description: "Schools, clinics, and pediatric programs.",
          },
        ],
      },
    ];
  }

  return [];
}

export function getAudienceFooterPlatform(audience: Audience | null) {
  if (!THERAPY_PROGRESS_ENABLED || audience === "adult" || !audience) {
    return [
      { label: "AAC Device", href: "/aac-communication" },
      { label: "Pre-book / Cart", href: "/cart" },
      { label: "Features", href: "/features" },
      { label: "For Therapists", href: "/therapists" },
    ];
  }
  if (audience === "child") {
    return [
      { label: "Therapy App", href: "/ai-therapy" },
      { label: "Pre-book / Cart", href: "/cart" },
      { label: "Features", href: "/features" },
      { label: "For Parents", href: "/parents" },
      { label: "For Therapists", href: "/therapists" },
    ];
  }
  return [
    { label: "Pre-book / Cart", href: "/cart" },
    { label: "Contact", href: "/contact" },
  ];
}
