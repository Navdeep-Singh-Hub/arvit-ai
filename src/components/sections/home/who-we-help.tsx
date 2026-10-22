"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { WHO_WE_HELP, TABLET_FIT_LABEL, type Condition } from "@/lib/data/who-we-help";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { useAudience } from "@/components/providers/audience-provider";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";
import { cn } from "@/lib/utils";

function filterConditions(_audience: "adult" | "child" | null): Condition[] {
  return WHO_WE_HELP;
}

function MarqueeRow({
  items,
  reverse = false,
  audience,
}: {
  items: Condition[];
  reverse?: boolean;
  audience: "adult" | "child" | null;
}) {
  const loop = [...items, ...items];
  const fitLabel = "AAC Device";
  return (
    <div className="mask-fade-edges overflow-hidden py-2">
      <div
        className={cn(
          "flex w-max gap-3",
          reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"
        )}
        style={{ animationDuration: reverse ? "42s" : "34s" }}
      >
        {loop.map((condition, index) => (
          <div
            key={`${condition.title}-${index}`}
            className="flex shrink-0 items-center gap-2.5 rounded-full bg-[#12151a] px-4 py-2.5 text-white"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-[#0a6b64] text-white">
              <condition.icon className="size-3.5" />
            </span>
            <span className="text-sm font-medium whitespace-nowrap text-white">{condition.title}</span>
            <span className="text-[10px] font-semibold tracking-wide text-white/70 uppercase whitespace-nowrap">
              {fitLabel ?? TABLET_FIT_LABEL[condition.tablet]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhoWeHelp() {
  const { audience } = useAudience();
  const effective =
    THERAPY_PROGRESS_ENABLED && audience === "child" ? "child" : "adult";
  const active = AUDIENCE_COPY[effective];
  const conditions = filterConditions(effective);

  return (
    <section className="section-pad section-light border-t border-black/5 overflow-hidden">
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={effective}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <SectionHeading
              eyebrow="Who We Help"
              title={active.whoTitle}
              description={active.whoDescription}
            />
          </motion.div>
        </AnimatePresence>
      </Container>

      <div className="mt-12 space-y-3" aria-hidden="true">
        <MarqueeRow items={conditions} audience={effective} />
        <MarqueeRow items={conditions} audience={effective} reverse />
      </div>

      <Container>
        <StaggerGroup
          key={`who-${effective}`}
          className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {conditions.map((condition) => (
            <StaggerItem key={condition.title} className="h-full">
              <div className="group h-full rounded-2xl border border-[#12151a]/8 bg-[#fffdf9] p-4 shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)] transition-transform duration-300 hover:-translate-y-1.5 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#0a6b64] text-white sm:size-10">
                    <condition.icon className="size-4 sm:size-5" />
                  </span>
                  <span className="rounded-full bg-[#12151a] px-2 py-1 text-[9px] font-semibold tracking-wide text-white uppercase sm:px-2.5 sm:text-[10px]">
                    AAC Device
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-black sm:mt-4">{condition.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-black/60">{condition.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
