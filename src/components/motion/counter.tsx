"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { formatNumber } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/** Counts up to `value` with a spring, starting once it scrolls into view. */
export function AnimatedCounter({ value, suffix = "", prefix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 32, stiffness: 55, mass: 1 });

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      motionValue.set(value);
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatNumber(value)}${suffix}`;
      }
      return;
    }
    motionValue.set(0);
    motionValue.set(value);
  }, [isInView, value, motionValue, prefersReducedMotion, prefix, suffix]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatNumber(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {prefersReducedMotion && isInView ? formatNumber(value) : "0"}
      {suffix}
    </span>
  );
}
