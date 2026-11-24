"use client";

import { useState } from "react";
import {
  BellRing,
  Camera,
  Gamepad2,
  Grid2x2,
  Keyboard,
  Languages,
  LineChart,
  MessageCircle,
  Smartphone,
  Sparkles,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  DeviceFrame,
  ParentScreen,
  RealScreen,
  SCREENS,
  SpeechScreen,
} from "@/components/illustrations/device";

type ChipData = { icon: LucideIcon; title: string; text: string; tint: string };

type Tab = {
  id: string;
  label: string;
  icon: LucideIcon;
  titleAccent: string;
  titleRest: string;
  screen: React.ReactNode;
  /** Real app screenshot, or an illustration of a real feature. */
  real: boolean;
  chipTop: ChipData;
  chipBottom: ChipData;
};

const TABS: Tab[] = [
  {
    id: "boards",
    label: "Picture Boards",
    icon: Grid2x2,
    titleAccent: "Real Pictures",
    titleRest: ", Real Words",
    screen: <RealScreen {...SCREENS.aac} />,
    real: true,
    chipTop: { icon: Camera, title: "Real-Photo Symbols", text: "Easy to recognise", tint: "bg-[#dbf0f9]" },
    chipBottom: { icon: BellRing, title: "One-Tap Alert", text: "WhatsApp call to caregivers", tint: "bg-[#ffd9d2]" },
  },
  {
    id: "buddy",
    label: "Therapy Buddy",
    icon: Gamepad2,
    titleAccent: "Learn Through Play",
    titleRest: " With Buddy",
    screen: <RealScreen {...SCREENS.buddy} />,
    real: true,
    chipTop: { icon: Languages, title: "Play In Your Language", text: "More than one to choose from", tint: "bg-[#ffeba4]" },
    chipBottom: { icon: Sparkles, title: "Listen, Tap Or Talk", text: "Three ways to answer", tint: "bg-[#d9d3f5]" },
  },
  {
    id: "speech",
    label: "Type & Speak",
    icon: Keyboard,
    titleAccent: "Type Anything",
    titleRest: ", Hear It Spoken",
    screen: <SpeechScreen />,
    real: false,
    chipTop: { icon: Volume2, title: "Reads It Out Loud", text: "Any word, any sentence", tint: "bg-[#e0f5f4]" },
    chipBottom: { icon: Sparkles, title: "Word Prediction", text: "Fewer taps to be heard", tint: "bg-[#ffeba4]" },
  },
  {
    id: "report",
    label: "Weekly Report",
    icon: LineChart,
    titleAccent: "Progress",
    titleRest: " Sent To Your Phone",
    screen: <ParentScreen />,
    real: false,
    chipTop: { icon: Smartphone, title: "Every Sunday Evening", text: "Straight to caregiver phones", tint: "bg-[#dbf0f9]" },
    chipBottom: { icon: MessageCircle, title: "Easy To Read", text: "No clinical jargon", tint: "bg-[#ffeba4]" },
  },
];

function Chip({ chip, className }: { chip: ChipData; className: string }) {
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
          <Chip key={`${active.id}-top`} chip={active.chipTop} className="-right-6 top-[5%] xl:-right-28" />
          <Chip key={`${active.id}-bottom`} chip={active.chipBottom} className="-left-6 bottom-[7%] xl:-left-28" />

          <DeviceFrame>
            <div key={active.id} className="animate-in fade-in slide-in-from-right-4 h-full duration-300">
              {active.screen}
            </div>
          </DeviceFrame>
        </div>

        <p className="mt-4 text-center text-sm text-black/55">
          {active.real ? "Real screen from the ARVIT app" : "Illustration of a real ARVIT feature"}
        </p>

        <div
          role="tablist"
          aria-label="Device features"
          className="no-scrollbar-x mx-auto mt-5 flex w-full max-w-max gap-1 overflow-x-auto rounded-[14px] bg-[#dbf0f9] p-1"
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
