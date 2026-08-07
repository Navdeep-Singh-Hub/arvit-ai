"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";
import { TabletProducts } from "@/components/sections/home/tablet-products";
import { FeatureGrid } from "@/components/sections/home/feature-grid";
import { AacTeaser } from "@/components/sections/home/aac-teaser";
import { WhoWeHelp } from "@/components/sections/home/who-we-help";
import { Stats } from "@/components/sections/home/stats";
import { Faq } from "@/components/sections/home/faq";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { useAudience } from "@/components/providers/audience-provider";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";

const HowItWorks = dynamic(() => import("@/components/sections/home/how-it-works").then((m) => m.HowItWorks));
const AiTherapyTeaser = dynamic(() =>
  import("@/components/sections/home/ai-therapy-teaser").then((m) => m.AiTherapyTeaser)
);
const Testimonials = dynamic(() => import("@/components/sections/home/testimonials").then((m) => m.Testimonials));

export default function HomePage() {
  const { audience, copy, ready } = useAudience();
  // TEMP: therapy progress hidden — always adult path
  const effectiveAudience =
    !THERAPY_PROGRESS_ENABLED || audience === "adult" || !audience ? "adult" : "child";
  const active = AUDIENCE_COPY[effectiveAudience];

  if (!ready) {
    return <div className="min-h-[40vh]" aria-hidden />;
  }

  if (effectiveAudience === "adult") {
    return (
      <>
        <Hero />
        <TabletProducts />
        <FeatureGrid />
        <AacTeaser />
        <WhoWeHelp />
        <Stats />
        <Testimonials />
        <Faq />
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
      <Hero />
      <TabletProducts />
      <FeatureGrid />
      <AiTherapyTeaser />
      <HowItWorks />
      <WhoWeHelp />
      <Stats />
      <Testimonials />
      <Faq />
      <CtaBand
        title={active.ctaTitle}
        description={active.ctaDescription}
        primaryLabel={active.ctaPrimaryLabel}
        primaryHref={active.ctaPrimaryHref}
      />
    </>
  );
}
