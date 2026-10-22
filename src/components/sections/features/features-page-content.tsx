"use client";

import { LayoutGrid } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { FeatureCategoryGrid } from "@/components/sections/features/feature-category-grid";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FAMILY_COPY } from "@/lib/audience/content";

export function FeaturesPageContent() {
  const active = FAMILY_COPY;

  return (
    <>
      <PageHero
        eyebrow="AAC Device features"
        eyebrowIcon={LayoutGrid}
        title="Built for the child. Clear for the parent."
        description="Everything below lives on one AAC Device — communication for your child, progress and home practice for you."
      />
      <FeatureCategoryGrid
        category="AAC Tablet"
        eyebrow="For the child"
        title="A voice they can use today"
        description="Symbol boards, prediction, speech output, and emergency phrases — ready at home and at school."
      />
      <FeatureCategoryGrid
        category="Therapy Tablet"
        eyebrow="Practice on the same device"
        title="Speech, movement, and learning"
        description="Speech practice, motor games, special education, and progress your clinician can review."
      />
      <FeatureCategoryGrid
        category="Shared & Insights"
        eyebrow="For parents"
        title="A view you can actually read"
        description="Parent summaries, home-practice tips, offline AAC, and clinical-grade security."
      />
      <CtaBand
        title={active.ctaTitle}
        description={active.ctaDescription}
        primaryLabel={active.ctaPrimaryLabel}
        primaryHref={active.ctaPrimaryHref}
      />
    </>
  );
}
