"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";
import { TabletProducts } from "@/components/sections/home/tablet-products";
import { FeatureGrid } from "@/components/sections/home/feature-grid";
import { WhoWeHelp } from "@/components/sections/home/who-we-help";
import { Stats } from "@/components/sections/home/stats";
import { Faq } from "@/components/sections/home/faq";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FAMILY_COPY } from "@/lib/audience/content";
import { useAudience } from "@/components/providers/audience-provider";

const Testimonials = dynamic(() => import("@/components/sections/home/testimonials").then((m) => m.Testimonials));

export default function HomePage() {
  const { ready } = useAudience();
  const active = FAMILY_COPY;

  if (!ready) {
    return <div className="min-h-[40vh]" aria-hidden />;
  }

  return (
    <>
      <Hero />
      <TabletProducts />
      <FeatureGrid />
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
