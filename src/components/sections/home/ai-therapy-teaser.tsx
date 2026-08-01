"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { THERAPY_DOMAINS } from "@/lib/data/therapy-domains";
import { cn } from "@/lib/utils";

/** Sticky scroll chapter: AI analyzes domains → generates adaptive plan. */
export function AiTherapyTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.85, 1]);
  const planOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const planY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);
  const domainsOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0.35]);

  return (
    <section ref={sectionRef} className="relative h-auto lg:h-[220vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:py-20">
        <Container className="py-16 sm:py-24 lg:py-0">
          <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-primary/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-brand-accent/15 blur-[100px]"
            />

            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-primary uppercase">
                  <BrainCircuit className="size-4" />
                  Therapy Tablet
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
                  Speech AI. OT landmarks. Progress that compounds.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  The Child Therapy Tablet measures speech with our AI model, motor skills via body-landmark games,
                  special education, education videos, and AAC — then adapts the plan clinicians can refine.
                </p>
                <Reveal delay={0.15} className="mt-8">
                  <ButtonLink href="/ai-therapy" variant="gradient">
                    Explore the Therapy Tablet
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </Reveal>

                {!prefersReducedMotion && (
                  <div className="mt-10 hidden h-1.5 overflow-hidden rounded-full bg-muted lg:block">
                    <motion.div
                      style={{ scaleX: progress, transformOrigin: "left" }}
                      className="h-full rounded-full bg-gradient-brand"
                    />
                  </div>
                )}
              </div>

              <div className="relative min-h-0 lg:min-h-[28rem]">
                <motion.div
                  style={prefersReducedMotion ? undefined : { opacity: domainsOpacity }}
                  className="grid grid-cols-2 gap-3"
                >
                  {THERAPY_DOMAINS.map((domain, i) => (
                    <motion.div
                      key={domain.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.45 }}
                      className="card-glow flex flex-col gap-2.5 rounded-2xl p-4"
                    >
                      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                        <domain.icon className="size-4" />
                      </span>
                      <p className="text-sm font-semibold text-foreground">{domain.label}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{domain.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  style={prefersReducedMotion ? undefined : { opacity: planOpacity, y: planY }}
                  className={cn(
                    "mt-6 lg:pointer-events-none lg:absolute lg:inset-x-6 lg:bottom-0 lg:top-auto lg:mt-0",
                    prefersReducedMotion && "relative"
                  )}
                >
                  <div className="glow-border glass-strong rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
                      <Sparkles className="size-4" />
                      Adaptive therapy plan generated
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Prioritize AAC phrase prediction + short articulation drills. Raise sensory regulation
                      warmup by 15%. Share summary with parent and SLP.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Speech AI", "OT landmarks", "Special ed", "AAC"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-medium text-brand-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
