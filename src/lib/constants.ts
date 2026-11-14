export const SITE = {
  name: "ARVIT AI",
  legalName: "Arvit Healthtech Private Limited",
  tagline: "One AAC Device for children and parents.",
  description:
    "The ARVIT AAC Device gives non-speaking children a voice in English, Hindi, Punjabi, Tamil and Telugu: real-photo symbol boards, eye control, a one-tap caregiver alert, therapy games and a weekly report for parents.",
  url: "https://www.arvit.ai",
  email: "hello@arvit.ai",
  supportEmail: "support@arvit.ai",
  /** TODO: add the real support number and full office address. The phone row is hidden while empty. */
  phone: "" as string,
  phoneHref: "",
  address: "India",
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Therapy Tablet", href: "/ai-therapy" },
  { label: "AAC Tablet", href: "/aac-communication" },
  { label: "Solutions", href: "/solutions" },
  { label: "Parents", href: "/parents" },
  { label: "Therapists", href: "/therapists" },
  { label: "Contact", href: "/contact" },
];

export type NavGroup = {
  label: string;
  description: string;
  items: { label: string; href: string; description: string }[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Our Tablets",
    description: "Two devices. Two clear paths.",
    items: [
      {
        label: "AAC Tablet",
        href: "/aac-communication",
        description: "For adults — dedicated AAC communication, voice, and boards.",
      },
      {
        label: "Therapy Tablet",
        href: "/ai-therapy",
        description: "For children — AAC plus speech AI, OT landmark games, special ed & progress.",
      },
      {
        label: "Compare tablets",
        href: "/#tablets",
        description: "See the side-by-side difference between both devices.",
      },
      {
        label: "Book your device",
        href: "/cart",
        description: "Book the AAC Device for your family.",
      },
      {
        label: "All features",
        href: "/features",
        description: "Full capability map across both tablets.",
      },
    ],
  },
  {
    label: "Who It's For",
    description: "Built for your world",
    items: [
      {
        label: "Parents",
        href: "/parents",
        description: "Therapy Tablet progress and home practice you can actually follow.",
      },
      {
        label: "Therapists",
        href: "/therapists",
        description: "Caseload tools for speech, OT, special ed, and AAC.",
      },
      {
        label: "Solutions",
        href: "/solutions",
        description: "Deploy AAC or Therapy tablets for families, schools, clinics, and hospitals.",
      },
    ],
  },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Catalog", href: "/catalog" },
    { label: "Features", href: "/features" },
    { label: "Solutions", href: "/solutions" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  platform: [
    { label: "AAC Tablet", href: "/aac-communication" },
    { label: "Therapy Tablet", href: "/ai-therapy" },
    { label: "Compare tablets", href: "/#tablets" },
    { label: "Book / Cart", href: "/cart" },
    { label: "For Parents", href: "/parents" },
    { label: "For Therapists", href: "/therapists" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
  { label: "Twitter / X", href: "https://x.com", icon: "twitter" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "youtube" },
] as const;

export const CTA = {
  getStarted: "Get Started",
  bookDemo: "Book a Demo",
  watchVideo: "Watch Video",
  chooseTablet: "Choose your tablet",
  preBook: "Book now",
  checkout: "Checkout",
};
