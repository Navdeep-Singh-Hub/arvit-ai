export type Audience = "adult" | "child";

export const AUDIENCE_STORAGE_KEY = "arvit-audience";

export type AudienceCopy = {
  label: string;
  shortLabel: string;
  productId: "aac-app" | "therapy-app";
  productHref: string;
  productPageLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  tabletsEyebrow: string;
  tabletsTitle: string;
  tabletsDescription: string;
  featuresEyebrow: string;
  featuresTitle: string;
  featuresDescription: string;
  whoTitle: string;
  whoDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  footerBlurb: string;
  navPrimaryLabel: string;
  navPrimaryHref: string;
  videoBlurb: string;
  switchHint: string;
};

/** One device. Copy is written for the child who uses it and the parent who supports them. */
export const FAMILY_COPY: AudienceCopy = {
  label: "Family",
  shortLabel: "Families",
  productId: "aac-app",
  productHref: "/aac-communication",
  productPageLabel: "AAC Device",
  eyebrow: "For children & parents",
  heroTitle: "A voice for your child, and progress you can follow",
  heroDescription:
    "One AAC Device. Your child communicates with boards and voice. You see practice, progress, and home tips on the same device.",
  primaryCta: "Pre-book now",
  primaryHref: "/#tablets",
  secondaryCta: "Explore the AAC Device",
  tabletsEyebrow: "The device",
  tabletsTitle: "One device for your child — and for you",
  tabletsDescription:
    "Symbol boards and speech for the child. Clear progress and home practice for parents. Pre-book today.",
  featuresEyebrow: "On the device",
  featuresTitle: "Built for the child. Clear for the parent.",
  featuresDescription:
    "Boards, voice, and prediction for your child — plus a parent view of progress, home practice, and safety controls.",
  whoTitle: "Support for every stage of childhood communication",
  whoDescription:
    "Autism, ADHD, speech delay, developmental delay, and more — one device that meets the child where they are, with a parent view you can actually read.",
  ctaTitle: "Ready to pre-book the AAC Device?",
  ctaDescription:
    "Reserve one device for your family. Book a live walkthrough, or ask our team anything.",
  ctaPrimaryLabel: "Pre-book AAC Device",
  ctaPrimaryHref: "/#tablets",
  footerBlurb:
    "ARVIT AI builds one AAC Device for children and the parents who support them — boards, voice, and progress in one place.",
  navPrimaryLabel: "AAC Device",
  navPrimaryHref: "/aac-communication",
  videoBlurb:
    "We're finishing the product tour. Book a live demo and we'll walk you through the AAC Device with your child and your parent view.",
  switchHint: "Family",
};

export const AUDIENCE_COPY: Record<Audience, AudienceCopy> = {
  adult: FAMILY_COPY,
  child: FAMILY_COPY,
};

export const GATE_OPTIONS = [
  {
    id: "adult" as const,
    title: "I'm a parent",
    subtitle: "Or I care for a child",
    description: "One AAC Device — boards and voice for your child, progress you can follow.",
    product: "AAC Device",
    highlights: ["Symbol & picture boards", "AI text-to-speech", "Parent progress", "Home practice"],
    accent: "secondary" as const,
  },
  {
    id: "child" as const,
    title: "I'm here for a child",
    subtitle: "Parent, caregiver, or clinician",
    description: "The same AAC Device — communication plus speech, motor practice, and live reports.",
    product: "AAC Device",
    highlights: ["AAC for the child", "Speech practice", "Parent progress", "Therapist view"],
    accent: "primary" as const,
  },
] as const;
