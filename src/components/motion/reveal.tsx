"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  direction?: Direction;
  blur?: boolean;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
};

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

/** Fades and translates children into place — short, premium, no blur noise. */
export function Reveal({
  children,
  direction = "up",
  blur = false,
  delay = 0,
  duration = 0.45,
  distance = 16,
  once = true,
  amount = 0.25,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = prefersReducedMotion ? {} : getOffset(direction, distance);

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
        ...(blur && !prefersReducedMotion ? { filter: "blur(6px)" } : {}),
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE_OUT_EXPO,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
