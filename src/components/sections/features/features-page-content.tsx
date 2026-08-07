"use client";

import { LayoutGrid } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { FeatureCategoryGrid } from "@/components/sections/features/feature-category-grid";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { useAudience } from "@/components/providers/audience-provider";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";

export function FeaturesPageContent() {
  const { audience, copy } = useAudience();
  const showTherapy = THERAPY_PROGRESS_ENABLED && audience === "child";
  const active = showTherapy ? AUDIENCE_COPY.child : AUDIENCE_COPY.adult;

  if (!showTherapy) {
    return (
      <>
        <PageHero
          eyebrow="AAC Device features"
          eyebrowIcon={LayoutGrid}
          title="Built for adult communication"
          description="Every capability below belongs to the Adult AAC Device — no pediatric therapy modules mixed in."
        />
        <FeatureCategoryGrid
          category="AAC Tablet"
          eyebrow="AAC Device"
          title="Communication, first and always"
          description="Symbol boards, prediction, personalized voice, emergency phrases, and adult-first tools."
        />
        <FeatureCategoryGrid
          category="Shared & Insights"
          eyebrow="Account & cloud"
          title="Secure insights for adult AAC"
          description="Caregiver access, offline AAC, multi-language support, and clinical-grade security."
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

  return (
    <>
      <PageHero
        eyebrow="Therapy App features"
        eyebrowIcon={LayoutGrid}
        title="Built for children and progress"
        description="Every capability below belongs to the AAC + Therapy Progress App for children — speech, OT, special ed, and AAC together."
      />
      <FeatureCategoryGrid
        category="Therapy Tablet"
        eyebrow="Therapy App"
        title="AAC plus measurable therapy"
        description="AI speech model, OT landmark games, special education, education videos, gamified sessions, and progress."
      />
      <FeatureCategoryGrid
        category="Shared & Insights"
        eyebrow="Family & clinic cloud"
        title="Dashboards parents and therapists share"
        description="Parent and therapist views, offline AAC, multi-language support, and clinical-grade security."
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
