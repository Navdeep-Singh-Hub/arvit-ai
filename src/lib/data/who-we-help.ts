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
  adult?: string;
  child?: string;
  tablet: TabletFit;
};

export const WHO_WE_HELP: Condition[] = [
  {
    icon: Puzzle,
    title: "Autism",
    description: "Therapy App — AAC plus speech AI, OT landmark games, and special-ed pathways on the spectrum.",
    tablet: "therapy",
  },
  {
    icon: Zap,
    title: "ADHD",
    description: "Therapy App — focus and executive-function support in short, gamified sessions.",
    tablet: "therapy",
  },
  {
    icon: Ear,
    title: "Speech Delay",
    description: "Therapy App — our AI speech model for early articulation and expressive language.",
    tablet: "therapy",
  },
  {
    icon: Users2,
    title: "Developmental Delay",
    description: "Therapy App — milestone-based speech, motor, special ed, and AAC practice.",
    tablet: "therapy",
  },
  {
    icon: Accessibility,
    title: "Cerebral Palsy",
    description: "AAC Device for adult communication; Therapy App when a child also needs motor practice.",
    adult: "AAC Device for adult communication when movement and speech are both limited.",
    child: "Therapy App for motor practice, speech, and AAC when a child has cerebral palsy.",
    tablet: "both",
  },
  {
    icon: HeartPulse,
    title: "Stroke Survivors",
    description: "AAC Device for adult communication during speech and language recovery.",
    tablet: "aac",
  },
  {
    icon: Activity,
    title: "ALS",
    description: "AAC Device that adapts as adult communication needs change.",
    tablet: "aac",
  },
  {
    icon: MicOff,
    title: "Apraxia",
    description: "Therapy App for pediatric motor-speech practice; AAC Device when adult communication is primary.",
    adult: "AAC Device when adult apraxia makes speech unreliable.",
    child: "Therapy App for pediatric motor-speech practice, with AAC when words are hard to say.",
    tablet: "both",
  },
  {
    icon: Dna,
    title: "Down Syndrome",
    description: "Therapy App — speech, cognitive, special ed, and AAC paced for steady progress.",
    tablet: "therapy",
  },
  {
    icon: BrainCircuit,
    title: "Traumatic Brain Injury",
    description: "AAC Device for adult neuro recovery; Therapy App for pediatric rehab.",
    adult: "AAC Device for communication during adult neuro recovery.",
    child: "Therapy App for pediatric rehab — speech, motor, and AAC in one plan.",
    tablet: "both",
  },
  {
    icon: MessageSquareOff,
    title: "Non-speaking Individuals",
    description: "AAC Device for adults; Therapy App when children need AAC alongside therapy.",
    adult: "AAC Device for adults who communicate without speech.",
    child: "Therapy App when a child needs AAC alongside speech and learning practice.",
    tablet: "both",
  },
];

export const TABLET_FIT_LABEL: Record<TabletFit, string> = {
  therapy: "Therapy App",
  aac: "AAC Device",
  both: "Both products",
};
