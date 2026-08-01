"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { WHO_WE_HELP, TABLET_FIT_LABEL } from "@/lib/data/who-we-help";
import { cn } from "@/lib/utils";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...WHO_WE_HELP, ...WHO_WE_HELP];
  return (
    <div className="mask-fade-edges overflow-hidden py-2">
      <div
        className={cn(
          "flex w-max gap-3",
          reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"
        )}
        style={{ animationDuration: reverse ? "42s" : "34s" }}
      >
        {items.map((condition, index) => (
          <div
            key={`${condition.title}-${index}`}
            className="glass flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
              <condition.icon className="size-3.5" />
            </span>
            <span className="text-sm font-medium whitespace-nowrap text-foreground">{condition.title}</span>
            <span className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap">
              {TABLET_FIT_LABEL[condition.tablet]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhoWeHelp() {
  return (
    <section className="relative section-pad overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Who We Help"
          title="The right tablet for every stage"
          description="Children grow with the Therapy Tablet. Adults who need a dedicated voice use the AAC Tablet. ARVIT adapts to the person — not a generic curriculum."
        />
      </Container>

      <div className="mt-12 space-y-3" aria-hidden="true">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      <Container>
        <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {WHO_WE_HELP.map((condition) => (
            <StaggerItem key={condition.title} className="h-full">
              <div className="card-glow group h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-white dark:text-brand-primary-light">
                    <condition.icon className="size-5" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
                      condition.tablet === "aac" && "bg-brand-secondary/15 text-brand-secondary",
                      condition.tablet === "therapy" && "bg-brand-primary/15 text-brand-primary",
                      condition.tablet === "both" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {TABLET_FIT_LABEL[condition.tablet]}
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
