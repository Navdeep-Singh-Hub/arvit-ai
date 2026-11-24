import { Hero } from "@/components/sections/home/hero";
import { Highlights, TrustRow } from "@/components/sections/home/highlights";
import { Showcase } from "@/components/sections/home/showcase";
import { WhatIsAac } from "@/components/sections/home/what-is-aac";
import { FeatureGrid } from "@/components/sections/home/feature-grid";
import { DemoSection } from "@/components/sections/home/demo-section";
import { Compare } from "@/components/sections/home/compare";
import { Pricing } from "@/components/sections/home/pricing";
import { Steps } from "@/components/sections/home/steps";
import { WhoWeHelp } from "@/components/sections/home/who-we-help";
import { Faq } from "@/components/sections/home/faq";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FAMILY_COPY } from "@/lib/audience/content";

/**
 * Story order: the offer (hero) → why trust it → what you get → see the screens →
 * features → video → comparison → price → how ordering works → who it's for → FAQ → act.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <Highlights />
      <Showcase />
      <WhatIsAac />
      <FeatureGrid />
      <DemoSection />
      <Compare />
      <Pricing />
      <Steps />
      <WhoWeHelp />
      <Faq />
      <CtaBand
        title={FAMILY_COPY.ctaTitle}
        description={FAMILY_COPY.ctaDescription}
        primaryLabel={FAMILY_COPY.ctaPrimaryLabel}
        primaryHref={FAMILY_COPY.ctaPrimaryHref}
        secondaryLabel="Book a free demo"
      />
    </>
  );
}
