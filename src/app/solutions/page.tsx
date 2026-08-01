import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SolutionRow } from "@/components/sections/solutions/solution-row";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { SOLUTIONS } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Deploy ARVIT AI's AAC Tablet and Therapy Tablet for families, schools, clinics, and hospitals — the right device for adult communication or pediatric therapy.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        eyebrowIcon={Layers}
        title="Two tablets. Deployed for how you work."
        description="Whether you're a family, school, clinic, or health system — choose Adult AAC Tablet, Child Therapy Tablet, or both. We adapt the rollout to your workflow."
      />
      {SOLUTIONS.map((solution, index) => (
        <SolutionRow key={solution.audience} solution={solution} reversed={index % 2 === 1} />
      ))}
      <CtaBand
        title="Find the right tablet mix for your team"
        description="Tell us about your organization and we'll tailor a walkthrough of AAC Tablet, Therapy Tablet, or both."
        secondaryLabel="Compare tablets"
        secondaryHref="/#tablets"
      />
    </>
  );
}
