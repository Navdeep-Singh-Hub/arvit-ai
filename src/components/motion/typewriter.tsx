"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

/** Cycles through phrases with a type-and-delete cursor animation. */
export function Typewriter({
  words,
  className,
  typingSpeed = 65,
  deletingSpeed = 32,
  pauseDuration = 1700,
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) return;
    const currentWord = words[wordIndex % words.length];

    const atWordEnd = !deleting && subIndex === currentWord.length;
    const atWordStart = deleting && subIndex === 0;
    const delay = atWordEnd ? pauseDuration : deleting ? deletingSpeed : typingSpeed;

    const timeout = setTimeout(() => {
      if (atWordEnd) {
        setDeleting(true);
      } else if (atWordStart) {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  if (words.length === 0) return null;

  const currentWord = words[wordIndex % words.length];
  const visibleText = prefersReducedMotion ? currentWord : currentWord.slice(0, subIndex);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span aria-hidden="true">{visibleText}</span>
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.9em] w-[2px] shrink-0 animate-pulse bg-current align-middle"
        />
      )}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
