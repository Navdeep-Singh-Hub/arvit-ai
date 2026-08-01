import type { LucideIcon } from "lucide-react";
import { Home, School, Stethoscope, Building2 } from "lucide-react";

export type Solution = {
  icon: LucideIcon;
  audience: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
};

export const SOLUTIONS: Solution[] = [
  {
    icon: Home,
    audience: "Families",
    title: "The right tablet for your household",
    description:
      "Children get the Therapy Tablet — AAC plus speech AI, OT landmark games, special ed, videos, and progress. Adults who need a voice get the dedicated AAC Tablet.",
    bullets: [
      "Therapy Tablet for pediatric speech, OT, special ed & AAC",
      "AAC Tablet for adult communication needs",
      "Plain-language parent progress on the Therapy Tablet",
      "Offline AAC so communication never goes dark",
    ],
    href: "/parents",
  },
  {
    icon: School,
    audience: "Schools & Districts",
    title: "Therapy and AAC devices for every IEP",
    description:
      "Equip classrooms with Therapy Tablets for speech, OT, and special ed — and AAC Tablets where adult or transition-age learners need dedicated communication.",
    bullets: [
      "Therapy Tablet caseloads for SLPs, OTs, and special educators",
      "AAC Tablet deployments for communication-first learners",
      "Progress aligned to IEP goals",
      "District rollout and training support",
    ],
    href: "/therapists",
  },
  {
    icon: Stethoscope,
    audience: "Clinics & Private Practice",
    title: "Two SKUs. Cleaner caseloads.",
    description:
      "Prescribe the AAC Tablet for adult neuro and progressive needs, and the Therapy Tablet for pediatric speech, motor, and special-ed programs — with shared clinical dashboards.",
    bullets: [
      "Clear adult AAC vs pediatric therapy device choice",
      "AI speech model + OT landmark games on Therapy Tablet",
      "Outcome analytics across both device types",
      "Less admin, more clinical time",
    ],
    href: "/therapists",
  },
  {
    icon: Building2,
    audience: "Hospitals & Health Systems",
    title: "Enterprise tablets for rehab and AAC",
    description:
      "Deploy Adult AAC Tablets across stroke, ALS, and neuro floors — and Therapy Tablets in pediatric rehab — with SSO, audit trails, and dedicated implementation.",
    bullets: [
      "Role-based access across AAC and Therapy tablets",
      "Department-level device provisioning",
      "Secure cloud with full audit trails",
      "Clinical success and implementation team",
    ],
    href: "/contact",
  },
];
