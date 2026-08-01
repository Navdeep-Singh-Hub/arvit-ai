"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  MessageCircle,
  Mic,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DOMAINS = [
  { label: "Speech", value: 86, color: "from-brand-primary to-brand-secondary" },
  { label: "Motor", value: 72, color: "from-brand-secondary to-brand-accent" },
  { label: "Behavior", value: 91, color: "from-brand-accent to-brand-primary" },
  { label: "Cognition", value: 78, color: "from-brand-primary to-brand-accent" },
];

const ACTIVITIES = [
  { icon: Mic, title: "Articulation drill", meta: "12 min · completed", tone: "text-brand-primary" },
  { icon: MessageCircle, title: "AAC board practice", meta: "8 phrases · live", tone: "text-brand-secondary" },
  { icon: Brain, title: "Adaptive plan ready", meta: "AI refreshed · just now", tone: "text-brand-accent" },
];

/** Credible therapy OS preview — progress domains, live session feed, AI insight. */
export function DashboardMockup({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotateX: 8, rotateY: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 2, rotateY: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotateX: 0, rotateY: 0, y: -6 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "glass-strong glow-border w-full max-w-[420px] overflow-hidden rounded-[1.75rem] shadow-2xl",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md shadow-brand-primary/30">
            <Activity className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Therapy OS</p>
            <p className="text-[11px] text-muted-foreground">Ava · Session 48</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Weekly progress</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">+18% overall</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">
            <TrendingUp className="size-3" /> Speech lead
          </span>
        </div>

        <div className="space-y-3">
          {DOMAINS.map((domain, index) => (
            <div key={domain.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{domain.label}</span>
                <span className="tabular-nums text-muted-foreground">{domain.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${domain.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.45 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("h-full rounded-full bg-gradient-to-r", domain.color)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/8 via-transparent to-brand-accent/8 p-3.5">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-brand-primary">
            <Sparkles className="size-3.5" />
            AI insight
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Ava responds best to short AAC + speech hybrids. Next Therapy Tablet plan shifts 20% toward phrase
            prediction and OT landmark games.
          </p>
        </div>

        <div className="space-y-2">
          {ACTIVITIES.map(({ icon: Icon, title, meta, tone }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-2xl bg-muted/50 px-3 py-2.5 transition-colors hover:bg-muted/80"
            >
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-xl bg-background", tone)}>
                <Icon className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{title}</p>
                <p className="text-[11px] text-muted-foreground">{meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


