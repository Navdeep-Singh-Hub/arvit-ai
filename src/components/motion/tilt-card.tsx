"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  maxTilt?: number;
  hoverScale?: number;
  glare?: boolean;
};

/** Wraps children in a subtle pointer-driven 3D tilt with an optional cursor-follow glare. */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
  hoverScale = 1.015,
  glare = true,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.6 };
  const sx = useSpring(px, springConfig);
  const sy = useSpring(py, springConfig);

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform([glareX, glareY], (latest) => {
    const [gx, gy] = latest as [string, string];
    return `radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.14), transparent 55%)`;
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: hoverScale }}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" as const }
      }
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={cn("group/tilt relative", className)}
      {...props}
    >
      {children}
      {glare ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glareBackground }}
        />
      ) : null}
    </motion.div>
  );
}
