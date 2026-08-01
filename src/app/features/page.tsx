import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { FeatureCategoryGrid } from "@/components/sections/features/feature-category-grid";
import { CtaBand } from "@/components/sections/shared/cta-band";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Capabilities across ARVIT AI's two tablets: Adult AAC Tablet for communication, and Child Therapy Tablet with AI speech, OT landmark games, special education, education videos, AAC, and progress tracking.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tablet Features"
        eyebrowIcon={LayoutGrid}
        title="Built into two devices — not one generic app"
        description="Every capability maps to either the Adult AAC Tablet, the Child Therapy Tablet, or the shared cloud that connects families and clinicians."
      />
      <FeatureCategoryGrid
        category="Therapy Tablet"
        eyebrow="Therapy Tablet"
        title="For children — AAC plus measurable therapy"
        description="Our AI speech model, occupational therapy games that track body landmarks, special education, education videos, gamified sessions, and progress — with AAC included."
      />
      <FeatureCategoryGrid
        category="AAC Tablet"
        eyebrow="AAC Tablet"
        title="For adults — communication, first and always"
        description="A dedicated AAC device for adults who are non-speaking or have lost speech — boards, prediction, personalized voice, and emergency phrases without pediatric therapy clutter."
      />
      <FeatureCategoryGrid
        category="Shared & Insights"
        eyebrow="Shared & Insights"
        title="The cloud behind both tablets"
        description="Parent and therapist dashboards, offline AAC, multi-language support, adaptive plans, and clinical-grade security across devices."
      />
      <CtaBand
        title="Not sure which tablet fits?"
        description="Book a walkthrough — we'll match AAC Tablet or Therapy Tablet to your family, practice, or organization."
        primaryLabel="Choose your tablet"
        primaryHref="/#tablets"
      />
    </>
  );
}
