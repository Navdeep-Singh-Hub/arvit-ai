"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingParticlesProps = {
  className?: string;
  count?: number;
};

/** Soft DOM particle field for hero / section atmospheres (GPU-friendly transforms only). */
export function FloatingParticles({ className, count = 28 }: FloatingParticlesProps) {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 4),
        duration: 8 + (i % 7) * 1.4,
        delay: (i % 9) * 0.35,
        opacity: 0.2 + (i % 5) * 0.08,
      })),
    [count]
  );

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-brand-primary dark:bg-brand-primary-light"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, (p.id % 2 === 0 ? 10 : -10), 0],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
