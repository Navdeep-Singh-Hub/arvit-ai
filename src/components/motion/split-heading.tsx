"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: string;
  type?: "words" | "chars";
  delay?: number;
  stagger?: number;
};

/** GSAP SplitText powered staggered word/char reveal, used for hero-level headlines. */
export function SplitHeading({
  as: Tag = "h1",
  className,
  children,
  type = "words",
  delay = 0.15,
  stagger = 0.045,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion) return;

      const split = SplitText.create(ref.current, {
        type,
        wordsClass: "split-word",
        charsClass: "split-char",
        mask: type,
      });

      gsap.set(ref.current, { opacity: 1 });
      gsap.from(type === "chars" ? split.chars : split.words, {
        yPercent: 115,
        rotateZ: 4,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger,
        delay,
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [children, type, prefersReducedMotion] }
  );

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={prefersReducedMotion ? undefined : { opacity: 0 }}
    >
      {children}
    </Tag>
  );
}
