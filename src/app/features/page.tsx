import type { Metadata } from "next";
import { FeaturesPageContent } from "@/components/sections/features/features-page-content";

export const metadata: Metadata = {
  title: "Features",
  description:
    "ARVIT AI product features for your path — Adult AAC Device or Child AAC + Therapy Progress App.",
};

export default function FeaturesPage() {
  return <FeaturesPageContent />;
}
