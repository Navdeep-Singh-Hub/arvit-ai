"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

type MagneticProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  strength?: number;
};

/** Generic wrapper that nudges its children toward the cursor on hover. */
export function Magnetic({ children, strength = 0.3, ...props }: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>({
    strength,
    disabled: !!prefersReducedMotion,
  });

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? undefined : { x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}
