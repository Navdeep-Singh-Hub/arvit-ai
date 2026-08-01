"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

const CLIENTS = [
  { initials: "JM", label: "Client — Speech · Week 6", progress: 82, color: "bg-blue-500" },
  { initials: "AK", label: "Client — OT · Week 3", progress: 54, color: "bg-cyan-500" },
  { initials: "RS", label: "Client — Behavioral · Week 9", progress: 91, color: "bg-teal-500" },
  { initials: "TB", label: "Client — Cognitive · Week 2", progress: 38, color: "bg-indigo-500" },
];

export function CaseloadMockup({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, rotate: 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 2 }}
      viewport={{ once: true }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("glass-strong glow-border w-[300px] rounded-3xl p-5 shadow-2xl sm:w-[340px]", className)}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-full bg-gradient-brand text-white">
          <ClipboardList className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Active Caseload</p>
          <p className="text-xs text-muted-foreground">4 clients this week</p>
        </div>
      </div>

      <StaggerGroup className="mt-5 space-y-3">
        {CLIENTS.map((client) => (
          <StaggerItem key={client.label}>
            <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
                  client.color
                )}
              >
                {client.initials}
              </span>
              <p className="min-w-0 flex-1 truncate text-xs font-medium text-foreground/80">{client.label}</p>
              <div className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${client.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-brand"
                />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </motion.div>
  );
}
