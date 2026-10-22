import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SolutionRow } from "@/components/sections/solutions/solution-row";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { SOLUTIONS } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Deploy ARVIT AI's AAC Device for families, schools, clinics, and hospitals — one device for children and the parents who support them.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        eyebrowIcon={Layers}
        title="One AAC Device. Deployed for how you work."
        description="Whether you're a family, school, clinic, or health system — the same AAC Device for the child and a parent view the care team can share. We adapt the rollout to your workflow."
      />
      {SOLUTIONS.map((solution, index) => (
        <SolutionRow key={solution.audience} solution={solution} reversed={index % 2 === 1} />
      ))}
      <CtaBand
        title="Find the right rollout for your team"
        description="Tell us about your organization and we'll tailor a walkthrough of the AAC Device for families and care teams."
        secondaryLabel="See the device"
        secondaryHref="/#tablets"
      />
    </>
  );
}
