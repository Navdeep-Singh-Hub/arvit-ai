import type { Metadata } from "next";
import { MessagesSquare } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { AacFeaturesShowcase } from "@/components/sections/aac/aac-features-showcase";
import { AacWhoItHelps } from "@/components/sections/aac/aac-who-it-helps";
import { CtaBand } from "@/components/sections/shared/cta-band";

export const metadata: Metadata = {
  title: "AAC Tablet",
  description:
    "ARVIT AI AAC Tablet for adults: dedicated Augmentative & Alternative Communication with AI text-to-speech, symbol boards, phrase prediction, voice personalization, and offline mode — for stroke, ALS, cerebral palsy, TBI, and more.",
};

export default function AacCommunicationPage() {
  return (
    <>
      <PageHero
        eyebrow="AAC Tablet"
        eyebrowIcon={MessagesSquare}
        title="Giving adults their voice back"
        description="A dedicated AAC tablet for adults who are non-speaking or have lost the ability to communicate due to stroke, ALS, cerebral palsy, traumatic brain injury, apraxia, or other neurological conditions — focused on communication, not pediatric therapy."
      />
      <AacFeaturesShowcase />
      <AacWhoItHelps />
      <CtaBand
        title="Need AAC for a child instead?"
        description="The Therapy Tablet includes full AAC alongside speech AI, OT landmark games, and progress tracking. Or book a demo of the Adult AAC Tablet."
        primaryLabel="Explore Therapy Tablet"
        primaryHref="/ai-therapy"
        secondaryLabel="Book AAC Tablet demo"
        secondaryHref="/contact"
      />
    </>
  );
}
