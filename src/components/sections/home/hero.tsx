"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { HeroScene } from "@/components/three/hero-scene";
import { DashboardMockup } from "@/components/illustrations/dashboard-mockup";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";
import { FloatingParticles } from "@/components/effects/floating-particles";
import { CTA, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const mockupParallaxX = useTransform(springX, [-0.5, 0.5], [10, -10]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative isolate min-h-[100svh] overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pt-44"
    >
      <AuroraBackground variant="hero" />
      <FloatingParticles count={32} />
      <div aria-hidden="true" className="bg-grid mask-fade-bottom pointer-events-none absolute inset-0 opacity-[0.28]" />

      {/* Full-bleed 3D plane behind content */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { x: parallaxX, y: parallaxY }}
        className="pointer-events-none absolute inset-x-0 top-[12%] mx-auto h-[55vh] max-w-5xl opacity-50 sm:opacity-70 lg:right-0 lg:left-auto lg:h-[70vh] lg:w-[55%] lg:max-w-none lg:opacity-90"
      >
        <HeroScene />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10">
        <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.2em] text-brand-primary uppercase">{SITE.name}</p>
            </Reveal>

            <SplitHeading
              as="h1"
              className="text-display mt-5 text-balance text-foreground"
            >
              Two therapy tablets. Clear purpose for every age.
            </SplitHeading>

            <Reveal delay={0.2} className="mt-6 max-w-xl">
              <p className="text-body-lg text-muted-foreground">{SITE.description}</p>
            </Reveal>

            <Reveal delay={0.35} className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href="/#tablets" size="xl" variant="gradient">
                {CTA.chooseTablet}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="/contact" size="xl" variant="outline">
                {CTA.bookDemo}
              </ButtonLink>
              <Button
                size="xl"
                variant="ghost"
                onClick={() => setVideoOpen(true)}
                className="justify-start sm:justify-center"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-foreground/5 transition-colors group-hover/btn:bg-foreground/10">
                  <Play className="size-3.5 translate-x-0.5 fill-current" />
                </span>
                {CTA.watchVideo}
              </Button>
            </Reveal>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center perspective-dramatic lg:mx-0 lg:max-w-none lg:justify-end">
            <div
              className={cn(
                "absolute -inset-8 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl",
                "animate-glow-pulse"
              )}
              aria-hidden="true"
            />
            <motion.div style={prefersReducedMotion ? undefined : { x: mockupParallaxX }}>
              <DashboardMockup className="relative z-10" />
            </motion.div>
          </div>
        </Container>
      </motion.div>

      <Dialog open={videoOpen} onClose={() => setVideoOpen(false)} labelledBy="video-modal-title">
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-brand-ink p-8 text-center">
          <span className="glow-primary flex size-16 items-center justify-center rounded-full bg-gradient-brand">
            <Play className="size-6 translate-x-0.5 fill-white text-white" />
          </span>
          <h3 id="video-modal-title" className="text-xl font-semibold text-white">
            Product walkthrough
          </h3>
          <p className="max-w-sm text-sm text-white/60">
            We&apos;re finishing a full ARVIT AI product tour. Book a live demo and we&apos;ll walk you through
            both tablets — Adult AAC and Child Therapy — end to end.
          </p>
          <ButtonLink href="/contact" variant="gradient" size="sm" onClick={() => setVideoOpen(false)}>
            Book a Live Demo
          </ButtonLink>
        </div>
      </Dialog>
    </section>
  );
}
