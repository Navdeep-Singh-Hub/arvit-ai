"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { TabletViewer } from "@/components/three/tablet-viewer";
import { AUDIENCE_COPY } from "@/lib/audience/content";
import { useAudience } from "@/components/providers/audience-provider";

/** Thick springs = viscous / glassy motion */
const springSoft = { stiffness: 42, damping: 28, mass: 0.72 };
const springCursor = { stiffness: 50, damping: 30, mass: 0.55 };

/**
 * Hero: big glassy tablet that glides with cursor + scroll; copy stays left.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { audience, copy, ready } = useAudience();
  const active = copy ?? AUDIENCE_COPY.adult;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, springSoft);

  const copyY = useTransform(smoothScroll, [0, 1], [0, 48]);
  const copyOpacity = useTransform(smoothScroll, [0, 0.75], [1, 0.12]);

  const scrollModelY = useTransform(smoothScroll, [0, 1], [0, 110]);
  const scrollModelX = useTransform(smoothScroll, [0, 1], [0, 20]);
  const modelRotate = useTransform(smoothScroll, [0, 1], [0, -11]);
  const modelScaleScroll = useTransform(smoothScroll, [0, 1], [1, 0.9]);
  const modelOpacity = useTransform(smoothScroll, [0, 0.9], [1, 0.35]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const softCursorX = useSpring(cursorX, springCursor);
  const softCursorY = useSpring(cursorY, springCursor);

  const stageX = useTransform(
    [softCursorX, scrollModelX],
    ([cursor, scroll]: number[]) => cursor + scroll
  );
  const stageY = useTransform(
    [softCursorY, scrollModelY],
    ([cursor, scroll]: number[]) => cursor + scroll
  );

  const glareX = useTransform(softCursorX, [-28, 28], [42, 78]);
  const glareY = useTransform(softCursorY, [-22, 22], [32, 62]);
  const glare = useMotionTemplate`radial-gradient(ellipse 58% 48% at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.18), transparent 62%)`;

  const sheenX = useTransform(softCursorX, [-28, 28], ["40%", "72%"]);
  const sheenY = useTransform(softCursorY, [-22, 22], ["34%", "60%"]);
  const sheen = useMotionTemplate`radial-gradient(circle 34% at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.28), transparent 68%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    cursorX.set(nx * 28);
    cursorY.set(ny * 22);
  };

  const handlePointerLeave = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate min-h-[100svh] overflow-hidden bg-black text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div className="absolute inset-0" style={{ background: glare }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_58%_at_78%_46%,rgb(255_255_255_/_0.11),transparent_56%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[44%] bg-gradient-to-t from-black via-black/75 to-transparent" />
      </div>

      <Container className="relative z-10 grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-6 py-28 sm:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:gap-2 lg:py-14 xl:gap-6">
        <motion.div
          key={audience ?? "default"}
          initial={ready && audience ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={prefersReducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className="w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[28rem] xl:max-w-[30rem]"
        >
          <Reveal>
            <p className="text-nav text-white/55">ARVIT AI</p>
          </Reveal>

          <SplitHeading
            as="h1"
            className="text-display mt-5 text-balance text-white sm:mt-7 sm:max-w-[11ch] md:max-w-[12ch]"
          >
            {active.heroTitle}
          </SplitHeading>

          <Reveal delay={0.15} className="mt-6 sm:mt-8">
            <p className="text-body-lg max-w-[28ch] text-white/65 sm:max-w-sm">{active.heroDescription}</p>
          </Reveal>

          <Reveal delay={0.28} className="mt-9 sm:mt-11">
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
        </motion.div>

        <motion.div
          aria-hidden
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: stageX,
                  y: stageY,
                  rotate: modelRotate,
                  scale: modelScaleScroll,
                  opacity: modelOpacity,
                }
          }
          className="relative -translate-x-6 -translate-y-4 h-[min(58svh,500px)] w-full will-change-transform sm:-translate-x-10 sm:-translate-y-6 sm:h-[min(66svh,580px)] md:-translate-x-16 md:-translate-y-8 lg:-translate-x-20 lg:-translate-y-12 lg:h-[min(82svh,720px)] lg:w-full xl:-translate-x-24 xl:-translate-y-14"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
            style={prefersReducedMotion ? undefined : { background: sheen }}
          />
          <TabletViewer
            variant="dark"
            size="hero"
            followPointer
            scrollProgress={smoothScroll}
            defer
            className="h-full w-full scale-[1.12] sm:scale-[1.18] lg:scale-[1.28]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
