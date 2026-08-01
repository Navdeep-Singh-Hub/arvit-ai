import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  BrainCircuit,
  Sparkles,
  Gamepad2,
  LineChart,
  Users,
} from "lucide-react";

export type HowItWorksStep = {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

/** Journey on the Child Therapy Tablet (assessment → reports). */
export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Assessment",
    description:
      "A guided intake on the Therapy Tablet maps speech, motor landmarks, special-ed baselines, and AAC use in under 20 minutes.",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our speech model and session data identify strengths, gaps, and priority goals across therapy and communication.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Personalized Therapy",
    description:
      "An adaptive plan mixes speech AI drills, OT landmark games, special ed, and education videos — reviewed by clinicians.",
  },
  {
    step: "04",
    icon: Gamepad2,
    title: "Interactive Games",
    description:
      "Sessions unfold as short games that quietly train speech, body movement, and learning — with AAC always available.",
  },
  {
    step: "05",
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Every interaction updates longitudinal progress across speech, OT, special ed, and AAC.",
  },
  {
    step: "06",
    icon: Users,
    title: "Parent & Therapist Reports",
    description:
      "Clear summaries reach parents and therapists automatically so everyone stays aligned on the Therapy Tablet journey.",
  },
];
