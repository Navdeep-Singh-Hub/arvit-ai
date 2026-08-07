"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { useAudience } from "@/components/providers/audience-provider";

/**
 * WHOOP monochrome hero: pure black, white type, white solid CTA.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { audience, copy, ready } = useAudience();
  const active = copy ?? AUDIENCE_COPY.adult;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_75%_60%,rgb(255_255_255_/_0.08),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-[22%] right-[12%] h-[40%] w-[38%] max-w-lg rounded-[45%] bg-white/[0.04] blur-3xl max-sm:hidden" />
      </div>

      <motion.div
        key={audience ?? "default"}
        initial={ready && audience ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={prefersReducedMotion ? undefined : { y, opacity }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28"
      >
        <Container className="max-w-[1400px]">
          <Reveal>
            <p className="text-nav text-white/55">ARVIT AI</p>
          </Reveal>

          <SplitHeading as="h1" className="text-display mt-6 max-w-[16ch] text-balance text-white sm:mt-8">
            {active.heroTitle}
          </SplitHeading>

          <Reveal delay={0.15} className="mt-8 max-w-md sm:mt-10">
            <p className="text-body-lg text-white/65">{active.heroDescription}</p>
          </Reveal>

          <Reveal delay={0.28} className="mt-10 sm:mt-12">
            <ButtonLink
              href={active.primaryHref}
              size="xl"
              variant="white"
              magnetic={false}
              className="text-nav h-12 min-h-12 rounded-none px-8 !text-black"
            >
              {active.primaryCta}
            </ButtonLink>
          </Reveal>
        </Container>
      </motion.div>
    </section>
  );
}
