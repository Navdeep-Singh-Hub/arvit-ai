"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Stylized Bay Area–inspired map panel with living location pulse. */
export function MapVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass-strong glow-border relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]",
        className
      )}
    >
      <div aria-hidden="true" className="mesh-gradient absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0 opacity-30" />

      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none">
        <path
          d="M40 220 C 90 180, 140 240, 200 190 C 250 150, 300 200, 360 160"
          stroke="url(#map-route)"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          className="opacity-70"
        />
        <path
          d="M20 80 H380 M20 150 H380 M20 220 H380 M90 20 V280 M180 20 V280 M270 20 V280 M340 20 V280"
          stroke="currentColor"
          strokeWidth="1"
          className="text-brand-primary/15"
        />
        <circle cx="210" cy="168" r="28" className="fill-brand-primary/10" />
        <circle cx="210" cy="168" r="14" className="fill-brand-primary/20" />
        <defs>
          <linearGradient id="map-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 -m-5 animate-ping-slow rounded-full bg-brand-primary/35" />
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="glow-primary relative flex size-12 items-center justify-center rounded-full bg-gradient-brand text-white"
        >
          <MapPin className="size-6" />
        </motion.span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto">
        <div className="glass-strong inline-flex max-w-sm items-start gap-3 rounded-2xl px-4 py-3 shadow-lg">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
            <Navigation className="size-3.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{SITE.name}</p>
            {SITE.address ? (
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{SITE.address}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
