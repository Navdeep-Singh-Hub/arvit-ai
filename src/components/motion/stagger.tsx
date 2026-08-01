"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export const staggerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

type StaggerGroupProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  amount?: number;
  once?: boolean;
};

/** Reveals children one after another as the group scrolls into view. */
export function StaggerGroup({ children, amount = 0.2, once = true, ...props }: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={staggerContainerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
};

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItemVariants} {...props}>
      {children}
    </motion.div>
  );
}
