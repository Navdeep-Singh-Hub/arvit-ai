"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOW_IT_WORKS } from "@/lib/data/how-it-works";

function StepContent({ step }: { step: (typeof HOW_IT_WORKS)[number] }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="glow-ring relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-background text-brand-primary ring-1 ring-border">
          <step.icon className="size-6" />
          <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-[#c2410c] text-[0.65rem] font-bold text-white">
            {step.step}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wider text-brand-primary uppercase">Step {step.step}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{step.title}</h3>
        </div>
      </div>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{step.description}</p>
    </>
  );
}

function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof HOW_IT_WORKS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const total = HOW_IT_WORKS.length;

  // Hard isolation: each step owns 1/N of the scroll. No ghost opacity between steps.
  const opacity = useTransform(progress, (v) => {
    const local = v * total - index;
    if (local < 0 || local > 1) return 0;
    if (index > 0 && local < 0.14) return local / 0.14;
    if (index < total - 1 && local > 0.86) return (1 - local) / 0.14;
    return 1;
  });

  const y = useTransform(progress, (v) => {
    const local = v * total - index;
    if (local < 0 || local > 1) return 24;
    if (index > 0 && local < 0.14) return 24 * (1 - local / 0.14);
    if (index < total - 1 && local > 0.86) return -24 * ((local - 0.86) / 0.14);
    return 0;
  });

  // Remove from hit-testing / compositing bleed when fully faded
  const visibility = useTransform(opacity, (o) => (o < 0.05 ? "hidden" : "visible"));

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className="absolute inset-0 flex items-center"
      aria-hidden={true}
    >
      <article className="w-full max-w-2xl rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] p-7 text-[#12151a] shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)] sm:p-9">
        <StepContent step={step} />
      </article>
    </motion.div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative mx-auto hidden h-[18rem] w-12 lg:block" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
      <motion.div
        style={{ height: fill }}
        className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-brand"
      />
      <div className="relative flex h-full flex-col justify-between py-1">
        {HOW_IT_WORKS.map((step, index) => (
          <StepDot key={step.step} index={index} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function StepDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const total = HOW_IT_WORKS.length;
  const scale = useTransform(progress, (v) => {
    const local = v * total - index;
    return local >= 0 && local <= 1 ? 1.35 : 1;
  });
  const opacity = useTransform(progress, (v) => {
    const local = v * total - index;
    return local >= 0 && local <= 1 ? 1 : 0.35;
  });

  return (
    <motion.span
      style={{ scale, opacity }}
      className="mx-auto size-2.5 rounded-full bg-brand-primary"
    />
  );
}

/** Sticky scroll chapter: exactly one readable step at a time. */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (prefersReducedMotion) {
    return (
      <section className="relative section-pad">
        <Container>
          <SectionHeading
            eyebrow="How the AAC Device works"
            title="From first session to progress you can see"
            description="Six steps on one device — speech, motor practice, learning, AAC, and reports parents and clinicians share."
          />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <article key={step.step} className="rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] p-7 text-[#12151a] shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)]">
                <StepContent step={step} />
              </article>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[400vh] lg:h-[460vh]">
      <div className="sticky top-0 flex min-h-[100svh] items-center py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How the AAC Device works"
            title="From first session to progress you can see"
            description="Six steps on one device — speech, motor practice, learning, AAC, and reports parents and clinicians share."
          />

          <div className="relative mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[auto_1fr] lg:gap-16">
            <ProgressRail progress={scrollYProgress} />

            {/* Mobile / tablet: readable stacked list */}
            <div className="space-y-5 lg:hidden">
              {HOW_IT_WORKS.map((step) => (
                <article key={step.step} className="rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] p-7 text-[#12151a] shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)]">
                  <StepContent step={step} />
                </article>
              ))}
            </div>

            {/* Desktop: single visible card, crossfades with scroll */}
            <div className="relative hidden min-h-[20rem] lg:block" aria-live="polite">
              {HOW_IT_WORKS.map((step, index) => (
                <StepCard key={step.step} step={step} index={index} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
