"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="card-surface overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground sm:text-base">{question}</span>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300",
            isOpen && "rotate-180 bg-gradient-brand text-white"
          )}
        >
          <ChevronDown className="size-4" />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  );
}
