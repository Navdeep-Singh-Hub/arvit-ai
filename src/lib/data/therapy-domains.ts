import type { LucideIcon } from "lucide-react";
import {
  Mic,
  Hand,
  Activity,
  Waves,
  TrendingUp,
  Smile,
  Brain,
  MessageSquare,
  GraduationCap,
  Clapperboard,
} from "lucide-react";

export type TherapyDomain = {
  icon: LucideIcon;
  label: string;
  description: string;
};

/** Domains measured and trained on the Child Therapy Tablet. */
export const THERAPY_DOMAINS: TherapyDomain[] = [
  {
    icon: Mic,
    label: "Speech",
    description: "Our AI speech model analyzes articulation, fluency, and expressive language in real time.",
  },
  {
    icon: Hand,
    label: "Motor Skills",
    description: "OT games track body landmarks so fine and gross motor practice is interactive and measurable.",
  },
  {
    icon: Activity,
    label: "Behavior",
    description: "Engagement and regulation patterns observed across gamified Therapy Tablet sessions.",
  },
  {
    icon: Waves,
    label: "Sensory Development",
    description: "Sensory processing cues help pace OT and speech so sessions stay calm and focused.",
  },
  {
    icon: GraduationCap,
    label: "Special Education",
    description: "Adaptive special-ed pathways that align therapy practice with classroom learning goals.",
  },
  {
    icon: Clapperboard,
    label: "Education Videos",
    description: "Video lessons reinforce speech, motor, and academic skills inside the therapy loop.",
  },
  {
    icon: Brain,
    label: "Cognition",
    description: "Attention, memory, and executive function challenged through adaptive games.",
  },
  {
    icon: MessageSquare,
    label: "AAC Communication",
    description: "Full AAC on the Therapy Tablet so children communicate while they build speech and motor skills.",
  },
  {
    icon: TrendingUp,
    label: "Learning Progress",
    description: "Skill curves across speech, OT, special ed, and AAC — visible to parents and therapists.",
  },
  {
    icon: Smile,
    label: "Emotion Recognition",
    description: "Affect cues help tailor pacing, encouragement, and session difficulty.",
  },
];
