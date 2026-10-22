import type { LucideIcon } from "lucide-react";
import {
  Mic,
  Hand,
  Brain,
  Puzzle,
  Users2,
  Zap,
  LineChart,
  LayoutDashboard,
  UserRound,
  ShieldCheck,
  Gamepad2,
  Ear,
  HeartPulse,
  MessageSquare,
  Clapperboard,
  GraduationCap,
  Tablet,
} from "lucide-react";

export type FeatureCategory = "Therapy Tablet" | "AAC Tablet" | "Shared & Insights";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  category: FeatureCategory;
  href?: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Mic,
    title: "AI Speech Model",
    description:
      "Our own speech AI listens, analyzes, and guides articulation and language practice in real time on the AAC Device.",
    category: "Therapy Tablet",
    href: "/ai-therapy",
  },
  {
    icon: Hand,
    title: "OT Landmark Games",
    description:
      "Occupational therapy games that track landmarks of the child's body — interactive motor practice with measurable movement, not just screen taps.",
    category: "Therapy Tablet",
    href: "/ai-therapy",
  },
  {
    icon: GraduationCap,
    title: "Special Education",
    description:
      "Structured special-ed pathways on the Therapy Tablet that adapt to each learner's pace, goals, and attention profile.",
    category: "Therapy Tablet",
    href: "/ai-therapy",
  },
  {
    icon: Clapperboard,
    title: "Education Videos",
    description:
      "Curated education videos woven into therapy sessions so learning reinforces speech, motor, and classroom skills.",
    category: "Therapy Tablet",
    href: "/ai-therapy",
  },
  {
    icon: LineChart,
    title: "Therapy Progress",
    description:
      "Session-by-session progress for speech, OT, special ed, and AAC — clear trends for parents and therapists.",
    category: "Therapy Tablet",
    href: "/parents",
  },
  {
    icon: MessageSquare,
    title: "Child AAC Included",
    description:
      "The Therapy Tablet includes full AAC so children communicate while they practice speech, motor, and learning goals.",
    category: "Therapy Tablet",
    href: "/aac-communication",
  },
  {
    icon: Gamepad2,
    title: "Gamified Sessions",
    description:
      "Therapy wrapped in rewarding game loops — because engagement is what turns a plan into lasting progress.",
    category: "Therapy Tablet",
    href: "/ai-therapy",
  },
  {
    icon: Tablet,
    title: "AAC Device",
    description:
      "One device for your child — boards, voice, and practice — with a parent view of progress and home tips.",
    category: "AAC Tablet",
    href: "/aac-communication",
  },
  {
    icon: Mic,
    title: "AI Text-to-Speech",
    description:
      "Natural speech output so your child can be heard — at home, at school, and on the go.",
    category: "AAC Tablet",
    href: "/aac-communication",
  },
  {
    icon: Puzzle,
    title: "Symbol & Picture Boards",
    description:
      "Symbol and picture boards for daily needs, play, school, and emergencies — sized for a child's day.",
    category: "AAC Tablet",
    href: "/aac-communication",
  },
  {
    icon: Ear,
    title: "Phrase Prediction",
    description:
      "Predictive phrases that learn common requests and conversations — fewer taps, faster communication.",
    category: "AAC Tablet",
    href: "/aac-communication",
  },
  {
    icon: HeartPulse,
    title: "Emergency Communication",
    description:
      "One-tap emergency phrases and caregiver alerts so critical communication is always within reach.",
    category: "AAC Tablet",
    href: "/aac-communication",
  },
  {
    icon: LayoutDashboard,
    title: "Therapist Dashboard",
    description:
      "Caseload view for Therapy Tablet progress — speech, OT landmarks, special ed, and AAC in one clinical command center.",
    category: "Shared & Insights",
    href: "/therapists",
  },
  {
    icon: UserRound,
    title: "Parent Dashboard",
    description:
      "Plain-language summaries, home-practice suggestions, and messaging with the care team — written for parents.",
    category: "Shared & Insights",
    href: "/parents",
  },
  {
    icon: ShieldCheck,
    title: "Secure Cloud Platform",
    description:
      "Encrypted in transit and at rest, with role-based access for parents and clinicians.",
    category: "Shared & Insights",
    href: "/features",
  },
  {
    icon: Users2,
    title: "Multi-language Support",
    description:
      "AAC and practice content across languages so home and school can share the same voice.",
    category: "Shared & Insights",
    href: "/aac-communication",
  },
  {
    icon: Zap,
    title: "Offline AAC Mode",
    description:
      "Core AAC works offline — your child can communicate without a connection.",
    category: "Shared & Insights",
    href: "/aac-communication",
  },
  {
    icon: Brain,
    title: "Adaptive AI Plans",
    description:
      "Plans adapt from each session while your child's clinician stays in control.",
    category: "Shared & Insights",
    href: "/ai-therapy",
  },
];

export function featuresByCategory(category: FeatureCategory) {
  return FEATURES.filter((feature) => feature.category === category);
}
