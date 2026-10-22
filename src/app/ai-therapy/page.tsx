import type { Metadata } from "next";
import { BrainCircuit } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { AiTherapyTeaser } from "@/components/sections/home/ai-therapy-teaser";
import { DomainsGrid } from "@/components/sections/ai-therapy/domains-grid";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { FeatureCategoryGrid } from "@/components/sections/features/feature-category-grid";
import { CtaBand } from "@/components/sections/shared/cta-band";

export const metadata: Metadata = {
  title: "Practice on the AAC Device",
  description:
    "The ARVIT AI AAC Device includes speech practice, motor games, learning, and AAC — with a parent view of progress. One device, not a second product.",
};

export default function AiTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="On the AAC Device"
        eyebrowIcon={BrainCircuit}
        title="Practice for your child. A view for you."
        description="The same AAC Device includes speech practice, motor games, learning, and communication — plus reports parents and clinicians share."
      />
      <AiTherapyTeaser />
      <DomainsGrid />
      <HowItWorks />
      <FeatureCategoryGrid
        category="Therapy Tablet"
        eyebrow="On the device"
        title="Everything a child's care plan needs"
        description="Speech, motor games, special ed, AAC, and progress — one device, not a pile of apps."
      />
      <CtaBand
        title="See the AAC Device in a live session"
        description="Book a walkthrough and watch practice, AAC, and the parent view together."
        primaryLabel="Pre-book AAC Device"
        primaryHref="/#tablets"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  );
}
