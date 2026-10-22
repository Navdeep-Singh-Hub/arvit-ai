import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Mic,
  GraduationCap,
  LineChart,
  Volume2,
  Users,
  Hand,
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

const FAMILY_HIGHLIGHTS = [
  { icon: MessageSquare, label: "Symbol & picture boards" },
  { icon: Volume2, label: "AI text-to-speech" },
  { icon: Mic, label: "Speech practice for the child" },
  { icon: Hand, label: "Motor games parents can follow" },
  { icon: LineChart, label: "Parent progress view" },
  { icon: Users, label: "Home practice you can read" },
  { icon: GraduationCap, label: "Learning at the child's pace" },
];

export const TABLET_PRODUCTS: TabletProduct[] = [
  {
    id: "aac-adult",
    name: "AAC Device",
    audience: "For children & parents",
    tagline: "Communication for your child. Progress you can follow.",
    description:
      "One AAC Device: symbol boards and voice for the child, plus a parent view of progress, home practice, and safety controls.",
    href: "/aac-communication",
    accent: "secondary",
    highlights: FAMILY_HIGHLIGHTS,
  },
  {
    id: "therapy-child",
    name: "AAC Device",
    audience: "For children & parents",
    tagline: "Communication for your child. Progress you can follow.",
    description:
      "One AAC Device: symbol boards and voice for the child, plus a parent view of progress, home practice, and safety controls.",
    href: "/aac-communication",
    accent: "primary",
    highlights: FAMILY_HIGHLIGHTS,
  },
];
