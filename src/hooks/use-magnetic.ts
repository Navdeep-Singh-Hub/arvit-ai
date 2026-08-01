"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

type UseMagneticOptions = {
  /** How far the element travels toward the pointer, in pixels. Lower = subtler. */
  strength?: number;
  /** Spring stiffness/damping preset — higher damping feels snappier. */
  disabled?: boolean;
};

type UseMagneticReturn<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (event: React.MouseEvent<T>) => void;
  onMouseLeave: () => void;
};

/**
 * Magnetic hover: nudges an element toward the cursor while it's inside the
 * element's bounds, then springs back to rest on mouse leave.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  disabled = false,
}: UseMagneticOptions = {}): UseMagneticReturn<T> {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMouseMove = (event: React.MouseEvent<T>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    rawX.set(relX * strength);
    rawY.set(relY * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
