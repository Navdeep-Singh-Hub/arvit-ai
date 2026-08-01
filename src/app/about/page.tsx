import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { OurStory } from "@/components/sections/about/our-story";
import { MissionVision } from "@/components/sections/about/mission-vision";
import { Values } from "@/components/sections/about/values";
import { Stats } from "@/components/sections/home/stats";
import { CtaBand } from "@/components/sections/shared/cta-band";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ARVIT AI builds two purpose-built therapy tablets — an Adult AAC Tablet and a Child Therapy Tablet — to make world-class communication and therapy accessible through Artificial Intelligence.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ARVIT AI"
        eyebrowIcon={Users}
        title="Two tablets. One mission: therapy and voice that reach further."
        description="We build dedicated devices — not a one-size-fits-all app. Adults get focused AAC. Children get AAC plus speech AI, OT landmark games, special education, and progress parents can trust."
      />
      <OurStory />
      <MissionVision />
      <Values />
      <Stats />
      <CtaBand
        title="See both tablets in action"
        description="Book a walkthrough of the Adult AAC Tablet, the Child Therapy Tablet, or both."
        primaryHref="/#tablets"
        primaryLabel="Compare tablets"
      />
    </>
  );
}
