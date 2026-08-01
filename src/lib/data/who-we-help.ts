import type { LucideIcon } from "lucide-react";
import {
  Puzzle,
  Zap,
  Ear,
  Users2,
  Accessibility,
  HeartPulse,
  Activity,
  MessageSquareOff,
  Dna,
  BrainCircuit,
  MicOff,
} from "lucide-react";

export type TabletFit = "therapy" | "aac" | "both";

export type Condition = {
  icon: LucideIcon;
  title: string;
  description: string;
  tablet: TabletFit;
};

export const WHO_WE_HELP: Condition[] = [
  {
    icon: Puzzle,
    title: "Autism",
    description: "Therapy Tablet — AAC plus speech AI, OT landmark games, and special-ed pathways on the spectrum.",
    tablet: "therapy",
  },
  {
    icon: Zap,
    title: "ADHD",
    description: "Therapy Tablet — focus and executive-function support in short, gamified sessions.",
    tablet: "therapy",
  },
  {
    icon: Ear,
    title: "Speech Delay",
    description: "Therapy Tablet — our AI speech model for early articulation and expressive language.",
    tablet: "therapy",
  },
  {
    icon: Users2,
    title: "Developmental Delay",
    description: "Therapy Tablet — milestone-based speech, motor, special ed, and AAC practice.",
    tablet: "therapy",
  },
  {
    icon: Accessibility,
    title: "Cerebral Palsy",
    description: "AAC Tablet for adult communication; Therapy Tablet when pediatric motor + AAC practice is needed.",
    tablet: "both",
  },
  {
    icon: HeartPulse,
    title: "Stroke Survivors",
    description: "AAC Tablet — dedicated adult communication for speech and language recovery pathways.",
    tablet: "aac",
  },
  {
    icon: Activity,
    title: "ALS",
    description: "AAC Tablet — progressive adult AAC that adapts as communication needs change.",
    tablet: "aac",
  },
  {
    icon: MicOff,
    title: "Apraxia",
    description: "Therapy Tablet for pediatric motor-speech drills; AAC Tablet when adult communication is primary.",
    tablet: "both",
  },
  {
    icon: Dna,
    title: "Down Syndrome",
    description: "Therapy Tablet — speech, cognitive, special ed, and AAC paced for steady progress.",
    tablet: "therapy",
  },
  {
    icon: BrainCircuit,
    title: "Traumatic Brain Injury",
    description: "AAC Tablet for adult neuro-recovery communication; Therapy Tablet for pediatric rehab goals.",
    tablet: "both",
  },
  {
    icon: MessageSquareOff,
    title: "Non-speaking Individuals",
    description: "AAC Tablet for adults; Therapy Tablet when children need AAC alongside therapy progress.",
    tablet: "both",
  },
];

export const TABLET_FIT_LABEL: Record<TabletFit, string> = {
  therapy: "Therapy Tablet",
  aac: "AAC Tablet",
  both: "Both tablets",
};
