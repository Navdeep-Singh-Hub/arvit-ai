"use client";

import { useState } from "react";
import { Grid2x2, Keyboard, LineChart, Sparkles, Star, Volume2, Wand2, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  BoardScreen,
  DeviceFrame,
  ParentScreen,
  PredictScreen,
  SpeechScreen,
} from "@/components/illustrations/device";

type Tab = {
  id: string;
  label: string;
  icon: LucideIcon;
  titleAccent: string;
  titleRest: string;
  screen: React.ReactNode;
  chipTop: { icon: LucideIcon; title: string; text: string; tint: string };
  chipBottom: { icon: LucideIcon; title: string; text: string; tint: string };
};

const TABS: Tab[] = [
  {
    id: "boards",
    label: "Symbol Boards",
    icon: Grid2x2,
    titleAccent: "Tap A Picture",
    titleRest: " To Say It",
    screen: <BoardScreen />,
    chipTop: { icon: Volume2, title: "Speaks Out Loud", text: "Every tap has a voice", tint: "bg-[#dbf0f9]" },
    chipBottom: { icon: Star, title: "Made For Small Hands", text: "Big, clear pictures", tint: "bg-[#ffeba4]" },
  },
  {
    id: "speech",
    label: "Text-to-Speech",
    icon: Keyboard,
    titleAccent: "Type Anything",
    titleRest: ", Hear It Spoken",
    screen: <SpeechScreen />,
    chipTop: { icon: Volume2, title: "Reads It Out Loud", text: "Any word, any sentence", tint: "bg-[#e0f5f4]" },
    chipBottom: { icon: Sparkles, title: "Grows With Your Child", text: "From pictures to typing", tint: "bg-[#d9d3f5]" },
  },
  {
    id: "predict",
    label: "Phrase Prediction",
    icon: Wand2,
    titleAccent: "The Next Word",
    titleRest: " Is One Tap Away",
    screen: <PredictScreen />,
    chipTop: { icon: Wand2, title: "Faster Sentences", text: "Suggests what comes next", tint: "bg-[#ffeba4]" },
    chipBottom: { icon: Star, title: "Less Frustration", text: "Fewer taps to be heard", tint: "bg-[#e0f5f4]" },
  },
  {
    id: "parent",
    label: "Parent View",
    icon: LineChart,
    titleAccent: "Progress",
    titleRest: " You Can Actually Read",
    screen: <ParentScreen />,
    chipTop: { icon: LineChart, title: "See What Changed", text: "A simple weekly picture", tint: "bg-[#dbf0f9]" },
    chipBottom: { icon: Sparkles, title: "Home Practice Tips", text: "Small ideas for today", tint: "bg-[#ffeba4]" },
  },
];

function Chip({ chip, className }: { chip: Tab["chipTop"]; className: string }) {
  return (
    <div
      className={`animate-in fade-in zoom-in-95 absolute z-10 hidden items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 shadow-[0_10px_30px_-8px_rgb(21_16_43_/_0.35)] duration-300 sm:flex ${className}`}
    >
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${chip.tint}`}>
        <chip.icon className="size-5 text-[#15102b]" strokeWidth={2} aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="font-display block text-base text-black">{chip.title}</span>
        <span className="block text-[0.95rem] text-black/75">{chip.text}</span>
      </span>
    </div>
  );
}

/** "On the device": one big device, tabs underneath swap the screen and the headline. */
export function Showcase() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];

  return (
    <section id="features" className="bg-white py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <h2 className="text-h2 text-center text-[#15102b]" aria-live="polite">
          <span className="text-[#28958a]">{active.titleAccent}</span>
          {active.titleRest}
        </h2>

        <div className="relative mx-auto mt-10 w-full max-w-[860px]">
          {/* Keys remount the chips and screen on tab change so the CSS enter animation replays. */}
          <Chip key={`${active.id}-top`} chip={active.chipTop} className="-right-6 top-[5%] lg:-right-28" />
          <Chip key={`${active.id}-bottom`} chip={active.chipBottom} className="-left-6 bottom-[7%] lg:-left-28" />

          <DeviceFrame>
            <div key={active.id} className="animate-in fade-in slide-in-from-right-4 h-full duration-300">
              {active.screen}
            </div>
          </DeviceFrame>
        </div>

        <div
          role="tablist"
          aria-label="Device features"
          className="no-scrollbar-x mx-auto mt-8 flex w-full max-w-max gap-1 overflow-x-auto rounded-[14px] bg-[#dbf0f9] p-1"
        >
          {TABS.map((tab) => {
            const selected = tab.id === active.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(tab.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-[10px] px-4 py-3 text-base transition-colors sm:px-5 ${
                  selected ? "bg-[#007ad1] text-white" : "text-black hover:bg-white/70"
                }`}
              >
                <tab.icon className="size-5" strokeWidth={1.75} aria-hidden />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
