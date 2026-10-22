import type { LucideIcon } from "lucide-react";
import {
  Puzzle,
  Zap,
  Ear,
  Users2,
  Accessibility,
  Dna,
  MicOff,
  MessageSquareOff,
} from "lucide-react";

export type TabletFit = "therapy" | "aac" | "both";

export type Condition = {
  icon: LucideIcon;
  title: string;
  description: string;
  adult?: string;
  child?: string;
  tablet: TabletFit;
};

export const WHO_WE_HELP: Condition[] = [
  {
    icon: Puzzle,
    title: "Autism",
    description: "Boards and voice for the child, plus parent progress across speech, motor, and learning.",
    tablet: "therapy",
  },
  {
    icon: Zap,
    title: "ADHD",
    description: "Short sessions the child can finish — with a parent view of what stuck this week.",
    tablet: "therapy",
  },
  {
    icon: Ear,
    title: "Speech Delay",
    description: "Speech practice on the device, with AAC ready whenever words are hard.",
    tablet: "therapy",
  },
  {
    icon: Users2,
    title: "Developmental Delay",
    description: "Milestone-based speech, motor, learning, and AAC — paced for the child, readable for the parent.",
    tablet: "therapy",
  },
  {
    icon: Accessibility,
    title: "Cerebral Palsy",
    description: "Motor games, speech, and AAC on one device when movement and communication both need support.",
    tablet: "both",
  },
  {
    icon: MicOff,
    title: "Apraxia",
    description: "Motor-speech practice for the child, with AAC when spoken words are unreliable.",
    tablet: "both",
  },
  {
    icon: Dna,
    title: "Down Syndrome",
    description: "Speech, learning, and AAC paced for steady progress — with a parent view of each week.",
    tablet: "therapy",
  },
  {
    icon: MessageSquareOff,
    title: "Non-speaking children",
    description: "A voice through boards and speech output, while parents follow practice at home.",
    tablet: "both",
  },
];

export const TABLET_FIT_LABEL: Record<TabletFit, string> = {
  therapy: "AAC Device",
  aac: "AAC Device",
  both: "AAC Device",
};
