import { Hero } from "@/components/sections/home/hero";
import { Steps } from "@/components/sections/home/steps";
import { TabletProducts } from "@/components/sections/home/tablet-products";
import { FeatureGrid } from "@/components/sections/home/feature-grid";
import { DemoSection } from "@/components/sections/home/demo-section";
import { WhoWeHelp } from "@/components/sections/home/who-we-help";
import { Faq } from "@/components/sections/home/faq";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { FAMILY_COPY } from "@/lib/audience/content";

/**
 * Story order: promise (hero) → how easy it is (steps) → the offer (device + price)
 * → what it does (features) → see it (demo) → is it for my child (who we help)
 * → remaining doubts (FAQ) → act (CTA).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Steps />
      <TabletProducts />
      <FeatureGrid />
      <DemoSection />
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
