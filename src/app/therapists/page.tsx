import type { Metadata } from "next";
import { BookOpen, Clock, GraduationCap, LineChart, Stethoscope, Users2, Tablet } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { TherapistDashboardShowcase } from "@/components/sections/therapists/therapist-dashboard-showcase";
import { BenefitList } from "@/components/sections/shared/benefit-list";
import { TestimonialsGrid } from "@/components/sections/shared/testimonials-grid";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "For Therapists",
  description:
    "Prescribe ARVIT AI's AAC Tablet for adults and Therapy Tablet for children — with caseload dashboards, AI speech insights, OT landmark progress, and documentation that saves hours.",
};

const THERAPIST_BENEFITS = [
  {
    icon: Tablet,
    title: "Two clear prescriptions",
    description: "Adult AAC Tablet for communication-first care. Therapy Tablet for pediatric speech, OT, special ed, and AAC.",
  },
  {
    icon: Clock,
    title: "Hours back every week",
    description: "AI drafts session notes and Therapy Tablet plans so documentation stops eating billable time.",
  },
  {
    icon: LineChart,
    title: "Caseload-wide analytics",
    description: "Speech model outcomes, OT landmark progress, special ed, and AAC — across every client.",
  },
  {
    icon: BookOpen,
    title: "Evidence-informed library",
    description: "Exercises, boards, and education videos ready to customize for each caseload.",
  },
  {
    icon: Users2,
    title: "Flexible session modes",
    description: "1:1, small group, or classroom Therapy Tablet sessions from the same clinical view.",
  },
  {
    icon: Stethoscope,
    title: "You stay the clinician",
    description: "Every AI-generated plan is a draft — you approve, adjust, or override before it reaches a client.",
  },
  {
    icon: GraduationCap,
    title: "Onboarding included",
    description: "Clinical success helps your practice deploy AAC and Therapy tablets — not just software.",
  },
];

export default function TherapistsPage() {
  const professionalTestimonials = TESTIMONIALS.filter((testimonial) => testimonial.role !== "Parent");

  return (
    <>
      <PageHero
        eyebrow="For Therapists"
        eyebrowIcon={Stethoscope}
        title="Two tablets. Your clinical judgment stays in charge."
        description="ARVIT handles device-level therapy delivery and documentation drafts — you prescribe AAC Tablet or Therapy Tablet, refine goals, and spend more time treating."
      />
      <TherapistDashboardShowcase />
      <BenefitList
        eyebrow="Why Therapists Choose ARVIT"
        title="More capacity, without cutting corners"
        items={THERAPIST_BENEFITS}
      />
      {professionalTestimonials.length > 0 && (
        <TestimonialsGrid
          eyebrow="From Clinicians"
          title="What therapists are saying"
          testimonials={professionalTestimonials}
        />
      )}
      <CtaBand
        title="Bring ARVIT tablets to your practice"
        description="Book a walkthrough tailored to your caseload — adult AAC, pediatric therapy, or both."
        primaryLabel="Book a Demo"
      />
    </>
  );
}
