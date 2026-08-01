"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

/** A soft, blurred brand-gradient glow that trails the cursor on fine-pointer devices. */
export function CursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const enabled = isFinePointer && !prefersReducedMotion;
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { damping: 45, stiffness: 220, mass: 0.5 });
  const springY = useSpring(y, { damping: 45, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[100px] dark:opacity-[0.1]"
      style={{
        x: springX,
        y: springY,
        background: "radial-gradient(circle, var(--brand-primary) 0%, transparent 70%)",
      }}
    />
  );
}
