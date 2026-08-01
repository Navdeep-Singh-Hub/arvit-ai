"use client";

import { motion } from "framer-motion";
import { Home, Utensils, Droplet, Smile, Heart, Sun, Moon, Hand, ThumbsUp, Volume2 } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

const TILES = [
  { icon: Smile, label: "I feel", color: "bg-amber-400" },
  { icon: Utensils, label: "Eat", color: "bg-rose-400" },
  { icon: Droplet, label: "Drink", color: "bg-sky-400" },
  { icon: Home, label: "Home", color: "bg-violet-400" },
  { icon: Heart, label: "Love", color: "bg-pink-400" },
  { icon: Hand, label: "Help", color: "bg-orange-400" },
  { icon: Sun, label: "Outside", color: "bg-yellow-400" },
  { icon: Moon, label: "Sleep", color: "bg-indigo-400" },
  { icon: ThumbsUp, label: "Yes", color: "bg-emerald-400" },
];

export function AacBoard({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass absolute -top-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium text-foreground shadow-lg"
      >
        <Volume2 className="size-3.5 text-brand-primary" />
        &ldquo;I want to eat, please.&rdquo;
      </motion.div>

      <div className="glass-strong rounded-[2rem] p-5 shadow-2xl sm:p-6">
        <StaggerGroup className="grid grid-cols-3 gap-3">
          {TILES.map((tile) => (
            <StaggerItem key={tile.label}>
              <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-background/80 p-2 text-center shadow-sm ring-1 ring-border">
                <span className={cn("flex size-9 items-center justify-center rounded-xl text-white", tile.color)}>
                  <tile.icon className="size-4" />
                </span>
                <span className="text-[0.65rem] font-medium text-foreground/80">{tile.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
