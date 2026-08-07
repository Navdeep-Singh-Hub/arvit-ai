"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Hand,
  MessageSquare,
  Mic,
  Sparkles,
  UserRound,
  Users,
  Volume2,
} from "lucide-react";
import { LogoMark } from "@/components/icons/logo";
import { useAudience } from "@/components/providers/audience-provider";
import { GATE_OPTIONS, type Audience } from "@/lib/audience/content";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";
import { cn } from "@/lib/utils";

/** Gate cards — Therapy Progress option hidden while flag is off. */
const VISIBLE_GATE_OPTIONS = THERAPY_PROGRESS_ENABLED
  ? GATE_OPTIONS
  : GATE_OPTIONS.filter((option) => option.id === "adult");

const ICON_MAP = {
  adult: [MessageSquare, Volume2, Mic, Users],
  child: [Mic, Hand, GraduationCap, Sparkles],
} as const;

function InteractiveOption({
  option,
  index,
  selected,
  onHover,
  onSelect,
  single = false,
}: {
  option: (typeof GATE_OPTIONS)[number];
  index: number;
  selected: Audience | null;
  onHover: (id: Audience | null) => void;
  onSelect: (id: Audience) => void;
  single?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isSelected = selected === option.id;
  const Icons = ICON_MAP[option.id];

  return (
    <motion.button
      type="button"
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 48, scale: 0.94, filter: "blur(12px)" }
      }
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        delay: 0.35 + index * 0.18,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.02 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      onMouseEnter={() => onHover(option.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(option.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(option.id)}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden border border-white/15 bg-white/[0.04] p-6 text-left outline-none sm:p-8",
        "transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        single && "md:mx-auto md:max-w-md",
        isSelected && "border-brand-primary",
        "hover:border-white/40 hover:bg-white/[0.07]"
      )}
    >
      <div className="relative flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center bg-white text-black">
          {option.id === "adult" ? <UserRound className="size-6" /> : <Sparkles className="size-6" />}
        </span>
        <span className="text-eyebrow border border-white/20 px-2.5 py-1 text-white/70">
          {option.product}
        </span>
      </div>

      <h3 className="relative mt-7 text-2xl font-normal tracking-tight text-white sm:text-3xl">
        {option.title}
      </h3>
      <p className="relative mt-2 text-sm font-medium text-white/45">{option.subtitle}</p>
      <p className="relative mt-5 text-sm leading-relaxed text-white/55 sm:text-[0.95rem]">
        {option.description}
      </p>

      <ul className="relative mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {option.highlights.map((label, i) => {
          const Icon = Icons[i] ?? Check;
          return (
            <li
              key={label}
              className="flex items-center gap-2.5 border border-white/10 bg-black/40 px-3 py-2.5 text-xs font-medium text-white/80"
            >
              <Icon className="size-3.5 shrink-0 text-white" />
              {label}
            </li>
          );
        })}
      </ul>

      <span className="text-nav relative mt-8 inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3.5 !text-black transition-colors group-hover:bg-white/90">
        Continue
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}

/** Full-screen audience gate — Adult AAC vs Child Therapy. */
export function AudienceGate() {
  const { gateOpen, ready, setAudience, audience } = useAudience();
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<Audience | null>(null);
  const [picking, setPicking] = useState<Audience | null>(null);

  if (!ready) return null;

  function handleSelect(id: Audience) {
    setPicking(id);
    window.setTimeout(() => {
      setAudience(id);
      setPicking(null);
    }, prefersReducedMotion ? 0 : 420);
  }

  return (
    <AnimatePresence>
      {gateOpen && (
        <motion.div
          key="audience-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audience-gate-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-brand-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Animated ambient layers */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className={cn(
                "absolute -left-1/4 top-0 size-[70vmax] rounded-full blur-[120px] transition-colors duration-700",
                hovered === "adult" || picking === "adult"
                  ? "bg-brand-primary/30"
                  : "bg-brand-primary/15"
              )}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={cn(
                "absolute -right-1/4 bottom-0 size-[70vmax] rounded-full blur-[120px] transition-colors duration-700",
                hovered === "child" || picking === "child"
                  ? "bg-brand-primary/25"
                  : "bg-white/[0.04]"
              )}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }
              }
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="bg-grid absolute inset-0 opacity-[0.07]" />
            {/* Floating particles */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute size-1 rounded-full bg-white/30"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 100}%`,
                }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -24 - (i % 5) * 4, 0],
                        opacity: [0.15, 0.55, 0.15],
                      }
                }
                transition={{
                  duration: 4 + (i % 5),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -20, scale: 1.02, filter: "blur(8px)" }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl"
          >
            <div className="mx-auto max-w-xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mx-auto flex size-14 items-center justify-center bg-white text-black"
              >
                <LogoMark className="size-8" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-5 text-xs font-semibold tracking-[0.25em] text-white/50 uppercase"
              >
                ARVIT AI · Personalize your experience
              </motion.p>
              <motion.h2
                id="audience-gate-title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
                className="mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl"
              >
                {THERAPY_PROGRESS_ENABLED ? "Who is ARVIT for today?" : "Continue with Adult AAC"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base"
              >
                {THERAPY_PROGRESS_ENABLED
                  ? "Choose once — the site adapts copy, product focus, features, and CTAs to your path. You can switch any time from the nav."
                  : "ARVIT is focused on the Adult AAC Device right now. Enter to explore boards, voice, and pre-booking."}
              </motion.p>
            </div>

            <div
              className={cn(
                "mt-10 grid gap-4 md:gap-6",
                VISIBLE_GATE_OPTIONS.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 place-items-center"
              )}
            >
              {VISIBLE_GATE_OPTIONS.map((option, index) => (
                <InteractiveOption
                  key={option.id}
                  option={option}
                  index={index}
                  selected={picking ?? audience}
                  onHover={setHovered}
                  onSelect={handleSelect}
                  single={VISIBLE_GATE_OPTIONS.length === 1}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-xs text-white/35"
            >
              Your preference is saved on this device only.
            </motion.p>
          </motion.div>

          {/* Selection flash */}
          <AnimatePresence>
            {picking && (
              <motion.div
                key="pick-flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "pointer-events-none absolute inset-0 z-20",
                  "bg-gradient-to-br from-brand-primary/25 to-[#05060a]"
                )}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
