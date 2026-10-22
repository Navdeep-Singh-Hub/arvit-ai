import type { Metadata } from "next";
import { MessagesSquare } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { AacFeaturesShowcase } from "@/components/sections/aac/aac-features-showcase";
import { AacWhoItHelps } from "@/components/sections/aac/aac-who-it-helps";
import { CtaBand } from "@/components/sections/shared/cta-band";

export const metadata: Metadata = {
  title: "AAC Device",
  description:
    "ARVIT AI AAC Device for children and parents: symbol boards, AI text-to-speech, phrase prediction, speech practice, and a parent view of progress — one device for the whole family.",
};

export default function AacCommunicationPage() {
  return (
    <>
      <PageHero
        eyebrow="AAC Device"
        eyebrowIcon={MessagesSquare}
        title="A voice for your child. Progress you can follow."
        description="One AAC Device for the family. Your child communicates with boards and voice. You see practice, progress, and home tips — without a second product to learn."
      />
      <AacFeaturesShowcase />
      <AacWhoItHelps />
      <CtaBand
        title="Ready to pre-book the AAC Device?"
        description="Reserve one device for your family, book a live walkthrough, or talk with our team."
        primaryLabel="Pre-book AAC Device"
        primaryHref="/#tablets"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </>
  );
}
