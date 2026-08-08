"use client";

import { useEffect, useRef, useState } from "react";
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

const springSoft = { stiffness: 42, damping: 28, mass: 0.72 };
const springCursor = { stiffness: 50, damping: 30, mass: 0.55 };

/**
 * Hero: mobile stack (copy → full device); desktop split with glassy motion.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { audience, copy, ready } = useAudience();
  const active = copy ?? AUDIENCE_COPY.adult;
  const [allowParallax, setAllowParallax] = useState(false);

  // Desktop-only cursor/parallax — phones use simple vertical stack + light scroll
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setAllowParallax(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, springSoft);

  const copyY = useTransform(smoothScroll, [0, 1], [0, allowParallax ? 48 : 24]);
  const copyOpacity = useTransform(smoothScroll, [0, 0.75], [1, allowParallax ? 0.12 : 0.4]);

  const scrollModelY = useTransform(smoothScroll, [0, 1], [0, allowParallax ? 110 : 40]);
  const scrollModelX = useTransform(smoothScroll, [0, 1], [0, allowParallax ? 20 : 0]);
  const modelRotate = useTransform(smoothScroll, [0, 1], [0, allowParallax ? -11 : -4]);
  const modelScaleScroll = useTransform(smoothScroll, [0, 1], [1, allowParallax ? 0.9 : 0.96]);
  const modelOpacity = useTransform(smoothScroll, [0, 0.9], [1, allowParallax ? 0.35 : 0.55]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const softCursorX = useSpring(cursorX, springCursor);
  const softCursorY = useSpring(cursorY, springCursor);

  const stageX = useTransform(
    [softCursorX, scrollModelX],
    ([cursor, scroll]: number[]) => (allowParallax ? cursor : 0) + scroll
  );
  const stageY = useTransform(
    [softCursorY, scrollModelY],
    ([cursor, scroll]: number[]) => (allowParallax ? cursor : 0) + scroll
  );

  const glareX = useTransform(softCursorX, [-28, 28], [42, 78]);
  const glareY = useTransform(softCursorY, [-22, 22], [32, 62]);
  const glare = useMotionTemplate`radial-gradient(ellipse 58% 48% at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.18), transparent 62%)`;

  const sheenX = useTransform(softCursorX, [-28, 28], ["40%", "72%"]);
  const sheenY = useTransform(softCursorY, [-22, 22], ["34%", "60%"]);
  const sheen = useMotionTemplate`radial-gradient(circle 34% at ${sheenX} ${sheenY}, rgb(255 255 255 / 0.28), transparent 68%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || !allowParallax) return;
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
      className="relative isolate overflow-x-clip overflow-y-hidden bg-black text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div className="absolute inset-0" style={{ background: glare }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_58%_at_50%_70%,rgb(255_255_255_/_0.1),transparent_56%)] lg:bg-[radial-gradient(ellipse_75%_58%_at_78%_46%,rgb(255_255_255_/_0.11),transparent_56%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[44%] bg-gradient-to-t from-black via-black/75 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] max-w-[1400px] flex-col justify-end gap-8 pb-10 pt-24 sm:gap-10 sm:pb-14 sm:pt-28 lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:items-center lg:gap-4 lg:py-16 xl:gap-8">
        {/* Copy — full width on phone, left column on desktop */}
        <motion.div
          key={audience ?? "default"}
          initial={ready && audience ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={prefersReducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className="order-1 w-full max-w-none sm:max-w-lg lg:order-none lg:max-w-[30rem] xl:max-w-[32rem]"
        >
          <Reveal>
            <p className="text-nav text-white/55">ARVIT AI</p>
          </Reveal>

          <SplitHeading
            as="h1"
            className="text-display mt-4 max-w-[14ch] text-balance text-white sm:mt-6 sm:max-w-[12ch] md:max-w-[13ch]"
          >
            {active.heroTitle}
          </SplitHeading>

          <Reveal delay={0.15} className="mt-5 sm:mt-7">
            <p className="text-body-lg max-w-md text-pretty text-white/65">{active.heroDescription}</p>
          </Reveal>

          <Reveal delay={0.28} className="mt-8 sm:mt-10">
            <ButtonLink
              href={active.primaryHref}
              size="xl"
              variant="white"
              magnetic={false}
              className="text-nav h-12 min-h-12 w-full max-w-xs rounded-none px-8 !text-black sm:w-auto"
            >
              {active.primaryCta}
            </ButtonLink>
          </Reveal>
        </motion.div>

        {/* Device — centered, fully in viewport on mobile (no negative desktop shifts) */}
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
          className="order-2 relative mx-auto h-[min(42svh,320px)] w-full max-w-[360px] will-change-transform sm:h-[min(48svh,400px)] sm:max-w-[420px] lg:order-none lg:mx-0 lg:h-[min(72svh,640px)] lg:max-w-none lg:-translate-x-10 lg:-translate-y-8 xl:-translate-x-16 xl:-translate-y-10"
        >
          {allowParallax ? (
            <motion.div
              className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
              style={{ background: sheen }}
            />
          ) : null}
          <TabletViewer
            variant="dark"
            size="hero"
            followPointer={!!allowParallax}
            scrollProgress={smoothScroll}
            defer
            className="h-full w-full scale-100 sm:scale-[1.04] lg:scale-[1.16]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
