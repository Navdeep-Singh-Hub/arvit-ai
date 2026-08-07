import type { Metadata } from "next";
import { BrainCircuit } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { AiTherapyTeaser } from "@/components/sections/home/ai-therapy-teaser";
import { DomainsGrid } from "@/components/sections/ai-therapy/domains-grid";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { FeatureCategoryGrid } from "@/components/sections/features/feature-category-grid";
import { CtaBand } from "@/components/sections/shared/cta-band";

export const metadata: Metadata = {
  title: "Therapy Tablet",
  description:
    "ARVIT AI Therapy Tablet for children: AAC plus our AI speech model, occupational therapy games with body landmarks, special education, education videos, and live therapy progress for parents and therapists.",
};

export default function AiTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="Therapy Tablet"
        eyebrowIcon={BrainCircuit}
        title="The child tablet — AAC and therapy progress together"
        description="One device for speech (our AI model), occupational therapy games that track body landmarks, special education, education videos, AAC communication, and clear progress for the care team."
      />
      <AiTherapyTeaser />
      <DomainsGrid />
      <HowItWorks />
      <FeatureCategoryGrid
        category="Therapy Tablet"
        eyebrow="Inside the Therapy Tablet"
        title="Everything a child's care plan needs"
        description="Speech AI, OT landmark games, special ed, education videos, AAC, and progress — designed as one tablet experience, not a pile of apps."
      />
      <CtaBand
        title="See the Therapy App in a live session"
        description="Book a walkthrough and watch assessment turn into adaptive speech, OT, and learning practice in real time."
        primaryLabel="Pre-book Therapy App"
        primaryHref="/#tablets"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  );
}
