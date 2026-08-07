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

function filterConditions(audience: "adult" | "child" | null): Condition[] {
  if (!THERAPY_PROGRESS_ENABLED || audience === "adult" || !audience) {
    return WHO_WE_HELP.filter((c) => c.tablet === "aac" || c.tablet === "both");
  }
  if (audience === "child") {
    return WHO_WE_HELP.filter((c) => c.tablet === "therapy" || c.tablet === "both");
  }
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
  const fitLabel =
    audience === "adult" ? "AAC App" : audience === "child" ? "Therapy App" : null;
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
            className="glass flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
              <condition.icon className="size-3.5" />
            </span>
            <span className="text-sm font-medium whitespace-nowrap text-foreground">{condition.title}</span>
            <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap">
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
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {conditions.map((condition) => (
            <StaggerItem key={condition.title} className="h-full">
              <div className="card-glow group h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-white dark:text-brand-primary-light">
                    <condition.icon className="size-5" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                      effective === "adult" && "bg-brand-secondary/15 text-brand-secondary",
                      effective === "child" && "bg-brand-primary/15 text-brand-primary"
                    )}
                  >
                    {effective === "adult" ? "AAC App" : "Therapy App"}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground">{condition.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{condition.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
