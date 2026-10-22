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
    "ARVIT AI builds one AAC Device for children and the parents who support them — communication, practice, and progress through Artificial Intelligence.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ARVIT AI"
        eyebrowIcon={Users}
        title="One device. A voice for the child, and progress for the parent."
        description="We build a dedicated AAC Device — boards and voice for your child, a view you can actually read as a parent. Not two products to choose between."
      />
      <OurStory />
      <MissionVision />
      <Values />
      <Stats />
      <CtaBand
        title="See the AAC Device in action"
        description="Book a walkthrough of the device your child uses and the parent view you follow."
        primaryHref="/#tablets"
        primaryLabel="Pre-book AAC Device"
      />
    </>
  );
}
