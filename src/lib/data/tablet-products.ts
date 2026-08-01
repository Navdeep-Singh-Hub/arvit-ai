import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Mic,
  Gamepad2,
  GraduationCap,
  Clapperboard,
  LineChart,
  Users,
  Volume2,
  Hand,
  Brain,
} from "lucide-react";

export type TabletProduct = {
  id: "aac-adult" | "therapy-child";
  name: string;
  audience: string;
  tagline: string;
  description: string;
  href: string;
  accent: "secondary" | "primary";
  highlights: { icon: LucideIcon; label: string }[];
};

export const TABLET_PRODUCTS: TabletProduct[] = [
  {
    id: "aac-adult",
    name: "AAC Tablet",
    audience: "For adults",
    tagline: "Communication, first and always",
    description:
      "A dedicated AAC tablet for adults who are non-speaking or have lost their voice — symbol boards, text-to-speech, phrase prediction, and voice personalization in one focused device.",
    href: "/aac-communication",
    accent: "secondary",
    highlights: [
      { icon: MessageSquare, label: "Symbol & picture boards" },
      { icon: Volume2, label: "AI text-to-speech" },
      { icon: Mic, label: "Voice personalization" },
      { icon: Users, label: "Built for adult AAC needs" },
    ],
  },
  {
    id: "therapy-child",
    name: "Therapy Tablet",
    audience: "For children",
    tagline: "AAC + therapy progress in one device",
    description:
      "AAC plus guided therapy: our AI speech model, occupational therapy games that track body landmarks, special education, education videos, and live progress for parents and therapists.",
    href: "/ai-therapy",
    accent: "primary",
    highlights: [
      { icon: Mic, label: "AI speech therapy model" },
      { icon: Hand, label: "OT games with body landmarks" },
      { icon: GraduationCap, label: "Special education" },
      { icon: Clapperboard, label: "Education videos" },
      { icon: MessageSquare, label: "AAC included" },
      { icon: LineChart, label: "Therapy progress tracking" },
      { icon: Gamepad2, label: "Gamified sessions" },
      { icon: Brain, label: "Adaptive AI plans" },
    ],
  },
];
