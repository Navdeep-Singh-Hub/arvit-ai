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

export const AUDIENCE_COPY: Record<Audience, AudienceCopy> = {
  adult: {
    label: "Adult",
    shortLabel: "Adults",
    productId: "aac-app",
    productHref: "/aac-communication",
    productPageLabel: "AAC Device",
    eyebrow: "Adult AAC",
    heroTitle: "Unlock clearer communication with ARVIT",
    heroDescription:
      "The AAC system for adults — symbol boards, AI voice, phrase prediction, and personalization in one focused product.",
    primaryCta: "Pre-book now",
    primaryHref: "/#tablets",
    secondaryCta: "Explore AAC Device",
    tabletsEyebrow: "Membership app",
    tabletsTitle: "Wear ARVIT daily, improve how you communicate",
    tabletsDescription:
      "A purpose-built adult AAC experience. Pre-book today for boards, speech, and caregiver tools without pediatric clutter.",
    featuresEyebrow: "How it works",
    featuresTitle: "What makes ARVIT different makes it better",
    featuresDescription:
      "Symbol boards, AI voice, phrase prediction, caregiver tools, and secure cloud sync — tuned for adult AAC.",
    whoTitle: "Built for adult communication journeys",
    whoDescription:
      "Stroke recovery, ALS, progressive conditions, and lifelong non-speaking adults — tools that respect dignity and independence.",
    ctaTitle: "Ready to pre-book the AAC Device?",
    ctaDescription:
      "Reserve the Adult AAC Device, book a live walkthrough, or ask our team anything.",
    ctaPrimaryLabel: "Pre-book AAC Device",
    ctaPrimaryHref: "/#tablets",
    footerBlurb:
      "ARVIT AI builds the Adult AAC Device for people who need a clear, reliable voice — boards, speech, and personalization without pediatric noise.",
    navPrimaryLabel: "AAC Device",
    navPrimaryHref: "/aac-communication",
    videoBlurb:
      "We're finishing the Adult AAC product tour. Book a live demo and we'll walk you through the AAC Device end to end.",
    switchHint: "Adult mode",
  },
  child: {
    label: "Child",
    shortLabel: "Children",
    productId: "therapy-app",
    productHref: "/ai-therapy",
    productPageLabel: "Therapy App",
    eyebrow: "Therapy for children",
    heroTitle: "Unlock better therapy progress with ARVIT",
    heroDescription:
      "Child AAC, speech AI, OT games, and live progress for parents and clinicians — one continuous system.",
    primaryCta: "Pre-book now",
    primaryHref: "/#tablets",
    secondaryCta: "Explore Therapy App",
    tabletsEyebrow: "Membership app",
    tabletsTitle: "Use ARVIT daily, improve your child’s progress",
    tabletsDescription:
      "Speech, motor, learning, and communication in one progressive app — pre-book while the product finishes.",
    featuresEyebrow: "How it works",
    featuresTitle: "What makes ARVIT different makes it better",
    featuresDescription:
      "Speech AI, OT landmark games, special ed pathways, AAC on the same app, and dashboards parents and clinicians use.",
    whoTitle: "Support for every stage of development",
    whoDescription:
      "Autism, ADHD, speech delay, developmental delay, and more — adaptive therapy that meets each child where they are.",
    ctaTitle: "Reserve Therapy before launch",
    ctaDescription:
      "The app is still in progress — pre-book now at ₹27,999 INR, or talk with our team.",
    ctaPrimaryLabel: "Pre-book Therapy App",
    ctaPrimaryHref: "/#tablets",
    footerBlurb:
      "ARVIT AI builds the AAC + Therapy Progress App for children — speech, motor, learning, and communication in one progressive experience.",
    navPrimaryLabel: "Therapy App",
    navPrimaryHref: "/ai-therapy",
    videoBlurb:
      "We're finishing the Therapy App product tour. Book a live demo and we'll walk you through speech AI, OT games, and progress end to end.",
    switchHint: "Child mode",
  },
};

export const GATE_OPTIONS = [
  {
    id: "adult" as const,
    title: "I'm an adult",
    subtitle: "Or I care for an adult",
    description:
      "Dedicated AAC — boards, AI voice, phrase prediction, and tools designed for adult communication.",
    product: "AAC Device",
    highlights: ["Symbol & picture boards", "AI text-to-speech", "Voice personalization", "Adult-first design"],
    accent: "secondary" as const,
  },
  {
    id: "child" as const,
    title: "I'm here for a child",
    subtitle: "Parent, caregiver, or clinician",
    description:
      "AAC plus therapy progress — speech AI, OT landmark games, special ed, videos, and live reports.",
    product: "AAC + Therapy Progress",
    highlights: ["AI speech therapy", "OT landmark games", "Special education", "Parent progress"],
    accent: "primary" as const,
  },
] as const;
