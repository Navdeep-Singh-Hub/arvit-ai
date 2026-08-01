import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";
import { TabletChooser } from "@/components/sections/home/tablet-chooser";
import { TabletProducts } from "@/components/sections/home/tablet-products";
import { FeatureGrid } from "@/components/sections/home/feature-grid";
import { AiTherapyTeaser } from "@/components/sections/home/ai-therapy-teaser";
import { AacTeaser } from "@/components/sections/home/aac-teaser";
import { WhoWeHelp } from "@/components/sections/home/who-we-help";
import { Stats } from "@/components/sections/home/stats";
import { Faq } from "@/components/sections/home/faq";
import { CtaBand } from "@/components/sections/shared/cta-band";

const HowItWorks = dynamic(() => import("@/components/sections/home/how-it-works").then((m) => m.HowItWorks));
const Testimonials = dynamic(() => import("@/components/sections/home/testimonials").then((m) => m.Testimonials));

export default function HomePage() {
  return (
    <>
      <TabletChooser />
      <Hero />
      <TabletProducts />
      <FeatureGrid />
      <AiTherapyTeaser />
      <AacTeaser />
      <HowItWorks />
      <WhoWeHelp />
      <Stats />
      <Testimonials />
      <Faq />
      <CtaBand
        title="Ready to choose the right ARVIT tablet?"
        description="Compare Adult AAC and Child Therapy tablets, book a live walkthrough, or get started with our team — no long-term contracts, no setup fees."
        primaryLabel="Compare tablets"
        primaryHref="/#tablets"
      />
    </>
  );
}
