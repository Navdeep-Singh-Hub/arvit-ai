import type { LucideIcon } from "lucide-react";
import {
  Volume2,
  LayoutGrid,
  Image as ImageIcon,
  Wand2,
  Fingerprint,
  Siren,
  Languages,
  WifiOff,
  Users,
  Stethoscope,
} from "lucide-react";

export type AacFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const AAC_FEATURES: AacFeature[] = [
  {
    icon: Volume2,
    title: "AI Text-to-Speech",
    description: "Natural, expressive speech synthesis that turns any typed or symbol-built message into a voice.",
  },
  {
    icon: LayoutGrid,
    title: "Symbol Communication",
    description: "Research-backed symbol sets for building requests, feelings, and full conversations quickly.",
  },
  {
    icon: ImageIcon,
    title: "Picture Communication Boards",
    description: "Customizable visual boards that grow from single icons to complex, multi-page vocabularies.",
  },
  {
    icon: Wand2,
    title: "Phrase Prediction",
    description: "Context-aware suggestions that shorten the distance between an intention and a spoken sentence.",
  },
  {
    icon: Fingerprint,
    title: "Voice Personalization",
    description: "Custom voice banking and tuning so a communicator's AAC voice can sound like their own.",
  },
  {
    icon: Siren,
    title: "Emergency Communication",
    description: "One-tap access to urgent phrases and alerts, designed to work under stress and time pressure.",
  },
  {
    icon: Languages,
    title: "Multi-language Support",
    description: "Vocabulary, prediction, and speech output available across major world languages.",
  },
  {
    icon: WifiOff,
    title: "Offline Mode",
    description: "Full communication functionality with zero dependency on an internet connection.",
  },
  {
    icon: Users,
    title: "Caregiver Controls",
    description: "Manage vocabulary, safety settings, and usage insights from a dedicated caregiver view on the AAC Tablet.",
  },
  {
    icon: Stethoscope,
    title: "Therapist Controls",
    description: "Clinical-grade configuration for goal-linked vocabulary sets, data logging, and reporting.",
  },
];
