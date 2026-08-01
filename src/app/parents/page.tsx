import type { Metadata } from "next";
import { Heart, MessageCircle, Puzzle, ShieldCheck, Smartphone, TrendingUp, Mic, Hand } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ParentDashboardShowcase } from "@/components/sections/parents/parent-dashboard-showcase";
import { BenefitList } from "@/components/sections/shared/benefit-list";
import { TestimonialsGrid } from "@/components/sections/shared/testimonials-grid";
import { Faq } from "@/components/sections/home/faq";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "For Parents",
  description:
    "The ARVIT AI Therapy Tablet brings AAC, AI speech therapy, OT landmark games, special education, and clear progress home — built alongside your child's care team.",
};

const PARENT_BENEFITS = [
  {
    icon: Smartphone,
    title: "One Therapy Tablet",
    description: "AAC, speech AI, OT games, special ed, and videos on a single child device — not five apps to manage.",
  },
  {
    icon: Mic,
    title: "Speech that actually listens",
    description: "Our AI speech model guides articulation and language practice with feedback in every session.",
  },
  {
    icon: Hand,
    title: "OT with body landmarks",
    description: "Occupational therapy games track how your child moves — measurable motor practice, not just taps.",
  },
  {
    icon: TrendingUp,
    title: "See real progress",
    description: "Clear trends across speech, OT, special ed, and AAC — so you know what's improving week to week.",
  },
  {
    icon: MessageCircle,
    title: "AAC included",
    description: "If your child needs another way to communicate, it's already on the same Therapy Tablet.",
  },
  {
    icon: ShieldCheck,
    title: "You're always in control",
    description: "Parent controls for vocabulary, safety, and usage — with your therapist in the loop.",
  },
  {
    icon: Heart,
    title: "Designed to be enjoyed",
    description: "Gamified sessions and education videos your child wants to come back to.",
  },
  {
    icon: Puzzle,
    title: "Built for their profile",
    description: "Plans adapt to autism, ADHD, speech delay, developmental delay, and more.",
  },
];

export default function ParentsPage() {
  const parentTestimonials = TESTIMONIALS.filter((testimonial) => testimonial.role === "Parent");

  return (
    <>
      <PageHero
        eyebrow="For Parents"
        eyebrowIcon={Heart}
        title="The Therapy Tablet that fits into everyday life"
        description="You don't need a clinical background. ARVIT turns your care team's plan into short Therapy Tablet sessions — speech AI, OT landmark games, special ed, AAC, and progress you can actually read."
      />
      <ParentDashboardShowcase />
      <BenefitList
        eyebrow="Why Parents Choose the Therapy Tablet"
        title="Everything your child needs on one device"
        items={PARENT_BENEFITS}
      />
      {parentTestimonials.length > 0 && (
        <TestimonialsGrid eyebrow="From Parents" title="What families are saying" testimonials={parentTestimonials} />
      )}
      <Faq />
      <CtaBand
        title="Ready to bring the Therapy Tablet home?"
        description="Book a demo and we'll show how it fits your family's routine — or compare with the Adult AAC Tablet."
        secondaryLabel="Compare tablets"
        secondaryHref="/#tablets"
      />
    </>
  );
}
