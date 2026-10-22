"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { FEATURES } from "@/lib/data/features";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { useAudience } from "@/components/providers/audience-provider";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";

export function FeatureGrid() {
  const { audience } = useAudience();
  const effective = audience === "child" && THERAPY_PROGRESS_ENABLED ? "child" : "adult";
  const active = AUDIENCE_COPY[effective];

  const familyFeatures = new Set([
    "AAC Device",
    "AI Text-to-Speech",
    "Symbol & Picture Boards",
    "Phrase Prediction",
    "AI Speech Model",
    "OT Landmark Games",
    "Therapy Progress",
    "Parent Dashboard",
    "Offline AAC Mode",
    "Secure Cloud Platform",
  ]);
  const features = FEATURES.filter((feature) => familyFeatures.has(feature.title));

  return (
    <section id="features" className="section-pad section-light border-t border-black/5">
      <Container className="max-w-[1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={effective}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionHeading
              eyebrow={active.featuresEyebrow}
              title={active.featuresTitle}
              description={active.featuresDescription}
              align="left"
            />
          </motion.div>
        </AnimatePresence>

        <StaggerGroup
          key={`features-${effective}`}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title} className="h-full">
              <Link
                href={feature.href ?? "/features"}
                className="group flex h-full flex-col rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] p-6 shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)] transition-colors hover:border-[#0e1418] hover:bg-[#0e1418] hover:text-white sm:p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <feature.icon
                    className="size-6 text-[#0c8f86] transition-colors group-hover:text-[#5eead4]"
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-8 text-lg font-semibold tracking-tight text-[#12151a] transition-colors group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60 transition-colors group-hover:text-white/65">
                  {feature.description}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
