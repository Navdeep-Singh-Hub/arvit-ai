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

  const features = FEATURES.filter((feature) => {
    if (feature.category === "Shared & Insights") return true;
    if (effective === "adult") return feature.category === "AAC Tablet";
    return feature.category === "Therapy Tablet";
  });

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
          className="mt-16 grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title} className="h-full">
              <Link
                href={feature.href ?? "/features"}
                className="group flex h-full flex-col bg-white p-5 transition-colors hover:bg-black hover:text-white sm:p-8 md:p-10"
              >
                <div className="flex items-start justify-between gap-3">
                  <feature.icon
                    className="size-6 text-black transition-colors group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-8 text-lg font-semibold tracking-tight text-black transition-colors group-hover:text-white">
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
