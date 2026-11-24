import type { ReactNode } from "react";
import Image from "next/image";
import {
  Apple,
  BedDouble,
  CupSoda,
  Hand,
  Heart,
  Home,
  Music,
  Smile,
  Sun,
  ThumbsDown,
  ThumbsUp,
  Trees,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The AAC Device drawn in code: a chunky kid-proof bumper case around a screen.
 * Everything inside is sized in container units (cqw) so the whole device scales
 * with its width — drop it into any box.
 */
export function DeviceFrame({
  children,
  className,
  portrait = false,
}: {
  children: ReactNode;
  className?: string;
  /** Upright tablet (3:4) instead of landscape (4:3). */
  portrait?: boolean;
}) {
  return (
    <div className={cn("@container w-full", className)}>
      <div
        className={cn(
          "relative rounded-[9cqw] bg-[#7fa7dd] p-[6.5cqw] shadow-[inset_0_-1.6cqw_0_rgb(0_0_0_/_0.12),inset_0_1.2cqw_0_rgb(255_255_255_/_0.28),0_4cqw_6cqw_-3cqw_rgb(21_16_43_/_0.45)]",
          portrait ? "aspect-[3/4]" : "aspect-[4/3]"
        )}
      >
        {/* Handle cut-outs in each corner */}
        <span className="absolute left-[2.6cqw] top-[5cqw] h-[2.6cqw] w-[7cqw] -rotate-45 rounded-full bg-white/85 shadow-[inset_0_0.4cqw_0.6cqw_rgb(0_0_0_/_0.25)]" />
        <span className="absolute right-[2.6cqw] top-[5cqw] h-[2.6cqw] w-[7cqw] rotate-45 rounded-full bg-white/85 shadow-[inset_0_0.4cqw_0.6cqw_rgb(0_0_0_/_0.25)]" />
        <span className="absolute bottom-[5cqw] left-[2.6cqw] h-[2.6cqw] w-[7cqw] rotate-45 rounded-full bg-white/85 shadow-[inset_0_0.4cqw_0.6cqw_rgb(0_0_0_/_0.25)]" />
        <span className="absolute bottom-[5cqw] right-[2.6cqw] h-[2.6cqw] w-[7cqw] -rotate-45 rounded-full bg-white/85 shadow-[inset_0_0.4cqw_0.6cqw_rgb(0_0_0_/_0.25)]" />

        {/* Bezel + screen */}
        <div className="relative h-full rounded-[3cqw] bg-[#17141f] p-[2.2cqw] shadow-[0_0_0_0.5cqw_rgb(0_0_0_/_0.18)]">
          <span className="absolute left-[0.8cqw] top-1/2 size-[0.9cqw] -translate-y-1/2 rounded-full bg-[#3a3648]" />
          <div className="h-full overflow-hidden rounded-[1.4cqw] bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * A real screenshot from the ARVIT app, filling the device screen.
 * Files live in /public/screens (exported from the app store screenshots).
 */
export function RealScreen({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        preload={priority}
        sizes="(min-width: 1024px) 800px, 90vw"
        className="object-cover object-top"
      />
    </div>
  );
}

export const SCREENS = {
  aac: { src: "/screens/aac-board-landscape.webp", alt: "ARVIT AAC board with real-photo symbols, quick words and an Alert button" },
  aacTall: { src: "/screens/aac-board-portrait.webp", alt: "ARVIT AAC board with categories, quick words and favourites" },
  buddy: { src: "/screens/therapy-buddy-landscape.webp", alt: "ARVIT Therapy Buddy: listen, tap or talk learning games" },
  buddyTall: { src: "/screens/therapy-buddy-portrait.webp", alt: "ARVIT Therapy Buddy: basic learning and social skills games" },
} as const;

type Tile = { icon: LucideIcon; label: string; bg: string };

const TILES: Tile[] = [
  { icon: Smile, label: "I feel", bg: "bg-[#ffd235]" },
  { icon: Apple, label: "Eat", bg: "bg-[#ff9d8a]" },
  { icon: CupSoda, label: "Drink", bg: "bg-[#8fd0f5]" },
  { icon: Music, label: "Play", bg: "bg-[#c9b6f7]" },
  { icon: Hand, label: "Help", bg: "bg-[#ffb86b]" },
  { icon: Home, label: "Home", bg: "bg-[#9fe0c2]" },
  { icon: Trees, label: "Outside", bg: "bg-[#b7e37a]" },
  { icon: BedDouble, label: "Sleep", bg: "bg-[#a9b8f5]" },
  { icon: Heart, label: "Love", bg: "bg-[#f9a8c8]" },
  { icon: Sun, label: "Morning", bg: "bg-[#ffe27a]" },
  { icon: ThumbsUp, label: "Yes", bg: "bg-[#8ddba0]" },
  { icon: ThumbsDown, label: "No", bg: "bg-[#ff9d8a]" },
];

function SentenceBar({ words, speaking = true }: { words: string[]; speaking?: boolean }) {
  return (
    <div className="flex items-center gap-[1.2cqw] border-b-[0.3cqw] border-black/10 bg-[#f7f4f3] px-[2.4cqw] py-[1.8cqw]">
      <div className="flex min-w-0 flex-1 items-center gap-[1cqw]">
        {words.map((word) => (
          <span
            key={word}
            className="font-display rounded-[1.2cqw] border-[0.3cqw] border-black/10 bg-white px-[1.8cqw] py-[0.7cqw] text-[3cqw] leading-none text-[#15102b]"
          >
            {word}
          </span>
        ))}
      </div>
      <span
        className={cn(
          "flex size-[6.4cqw] shrink-0 items-center justify-center rounded-full text-white",
          speaking ? "bg-[#28958a]" : "bg-[#15102b]/30"
        )}
      >
        <Volume2 className="size-[3.4cqw]" strokeWidth={2.4} />
      </span>
    </div>
  );
}

function TileGrid({ tiles, cols = 4, active }: { tiles: Tile[]; cols?: 3 | 4; active?: string }) {
  return (
    <div className={cn("grid flex-1 gap-[1.4cqw] p-[2.2cqw]", cols === 4 ? "grid-cols-4" : "grid-cols-3")}>
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className={cn(
            "flex flex-col items-center justify-center gap-[0.6cqw] rounded-[1.8cqw] border-[0.3cqw] border-black/10",
            tile.bg,
            active === tile.label && "ring-[0.7cqw] ring-[#15102b]"
          )}
        >
          <tile.icon className="size-[5cqw] text-[#15102b]" strokeWidth={2} />
          <span className="font-display text-[2.5cqw] leading-none text-[#15102b]">{tile.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Symbol board: tap pictures to build a sentence, the device speaks it. */
export function BoardScreen() {
  return (
    <div className="flex h-full flex-col">
      <SentenceBar words={["I want", "to eat"]} />
      <TileGrid tiles={TILES} active="Eat" />
    </div>
  );
}

/** Text-to-speech: type anything, hear it spoken. */
export function SpeechScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f7f4f3]">
      <div className="m-[2.4cqw] flex flex-1 flex-col justify-between rounded-[2cqw] border-[0.3cqw] border-black/10 bg-white p-[3cqw]">
        <p className="font-display text-[5.2cqw] leading-tight text-[#15102b]">
          Can we go to the park today?<span className="ml-[0.4cqw] inline-block h-[5cqw] w-[0.5cqw] translate-y-[0.8cqw] bg-[#28958a]" />
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-[0.7cqw]">
            {[2.4, 4.6, 3.2, 6, 3.8, 5.2, 2.8, 4.2, 2.2].map((h, i) => (
              <span key={i} className="w-[1cqw] rounded-full bg-[#28958a]" style={{ height: `${h}cqw` }} />
            ))}
          </div>
          <span className="font-display flex items-center gap-[1cqw] rounded-[1.6cqw] bg-[#ffd235] px-[3cqw] py-[1.4cqw] text-[3cqw] leading-none text-[#15102b] shadow-[0_0.5cqw_0_rgb(0_0_0_/_0.8)]">
            <Volume2 className="size-[3.4cqw]" strokeWidth={2.4} />
            Speak
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-[0.8cqw] px-[2.4cqw] pb-[2.4cqw]">
        {"QWERTYUIOPASDFGHJKL".split("").concat(["⌫"]).map((key, i) => (
          <span
            key={i}
            className="flex h-[5cqw] items-center justify-center rounded-[1cqw] border-[0.3cqw] border-black/10 bg-white text-[2.4cqw] font-semibold text-[#15102b]"
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Phrase prediction: the next words are one tap away. */
export function PredictScreen() {
  return (
    <div className="flex h-full flex-col">
      <SentenceBar words={["I want", "to…"]} speaking={false} />
      <div className="flex items-center gap-[1.2cqw] bg-[#e0f5f4] px-[2.4cqw] py-[1.6cqw]">
        <span className="text-[2.2cqw] font-semibold uppercase text-[#28958a]">Next</span>
        {["play", "eat", "go outside", "sleep"].map((word, i) => (
          <span
            key={word}
            className={cn(
              "font-display rounded-full border-[0.3cqw] px-[2.2cqw] py-[0.9cqw] text-[2.7cqw] leading-none",
              i === 0 ? "border-[#28958a] bg-[#28958a] text-white" : "border-black/10 bg-white text-[#15102b]"
            )}
          >
            {word}
          </span>
        ))}
      </div>
      <TileGrid tiles={TILES.slice(0, 8)} active="Play" />
    </div>
  );
}

/** Parent view: a simple weekly picture. Numbers here are sample data for the illustration. */
export function ParentScreen() {
  const days = [
    { d: "M", h: 38 },
    { d: "T", h: 52 },
    { d: "W", h: 46 },
    { d: "T", h: 68 },
    { d: "F", h: 60 },
    { d: "S", h: 82 },
    { d: "S", h: 74 },
  ];
  return (
    <div className="flex h-full flex-col gap-[1.8cqw] bg-[#f7f4f3] p-[2.6cqw]">
      <div className="flex items-center justify-between">
        <p className="font-display text-[3.6cqw] leading-none text-[#15102b]">Weekly report</p>
        <span className="rounded-full bg-[#e0f5f4] px-[2cqw] py-[0.8cqw] text-[2.1cqw] font-semibold uppercase text-[#28958a]">
          Sample · sent every Sunday
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-[1.8cqw]">
        <div className="flex flex-col rounded-[2cqw] border-[0.3cqw] border-black/10 bg-white p-[2.2cqw]">
          <p className="text-[2.3cqw] font-medium text-black/60">Words used each day</p>
          <div className="mt-[1.4cqw] flex flex-1 items-end gap-[1.4cqw]">
            {days.map((day, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.8cqw]">
                <span
                  className={cn("w-full rounded-t-[0.9cqw]", i >= 5 ? "bg-[#007ad1]" : "bg-[#8fd0f5]")}
                  style={{ height: `${day.h}%` }}
                />
                <span className="text-[2.1cqw] font-medium leading-none text-black/55">{day.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[1.8cqw]">
          <div className="flex-1 rounded-[2cqw] border-[0.3cqw] border-black/10 bg-white p-[2.2cqw]">
            <p className="text-[2.3cqw] font-medium text-black/60">New words</p>
            <p className="font-display mt-[0.6cqw] text-[6cqw] leading-none text-[#007ad1]">+6</p>
          </div>
          <div className="flex-1 rounded-[2cqw] border-[0.3cqw] border-black/10 bg-[#ffeba4] p-[2.2cqw]">
            <p className="text-[2.3cqw] font-medium text-black/60">Try at home</p>
            <p className="font-display mt-[0.8cqw] text-[2.8cqw] leading-tight text-[#15102b]">
              Ask &ldquo;eat or drink?&rdquo; at snack time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
