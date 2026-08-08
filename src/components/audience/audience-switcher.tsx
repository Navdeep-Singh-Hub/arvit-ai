"use client";

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useAudience } from "@/components/providers/audience-provider";
import { THERAPY_PROGRESS_ENABLED } from "@/lib/flags";
import { cn } from "@/lib/utils";

/** Compact control to re-open Adult/Child chooser — WHOOP-flat on black nav. */
export function AudienceSwitcher({ className }: { className?: string }) {
  const { audience, copy, openGate, ready } = useAudience();

  if (!THERAPY_PROGRESS_ENABLED) return null;
  if (!ready || !audience || !copy) return null;

  return (
    <motion.button
      type="button"
      onClick={openGate}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "text-nav inline-flex max-w-full items-center gap-1.5 border border-white/20 px-2.5 py-1.5 text-white/80 transition-colors hover:border-white/50 hover:text-white sm:gap-2 sm:px-3",
        className
      )}
      aria-label={`${copy.switchHint}. Change audience.`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-white" />
      <span className="hidden sm:inline">{copy.switchHint}</span>
      <span className="truncate sm:hidden">{audience === "adult" ? "Adult" : "Child"}</span>
      <RefreshCw className="size-3 shrink-0 opacity-60" />
    </motion.button>
  );
}
