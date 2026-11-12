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
    <div className="overflow-hidden rounded-[20px] border border-black/20 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg leading-snug text-black sm:text-xl">{question}</span>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dbf0f9] text-[#15102b] transition-all duration-300",
            isOpen && "rotate-180 bg-[#007ad1] text-white"
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
          <p className="px-6 pb-6 text-lg leading-snug text-black/75">{answer}</p>
        </div>
      </div>
    </div>
  );
}
