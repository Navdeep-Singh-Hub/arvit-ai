import { BellRing, Eye, ShieldCheck, WifiOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { DeviceFrame, RealScreen, SCREENS } from "@/components/illustrations/device";

/** Languages the AAC board supports today (from the app's language list). */
const LANGUAGES = [
  { native: "English", name: "English" },
  { native: "हिंदी", name: "Hindi" },
  { native: "ਪੰਜਾਬੀ", name: "Punjabi" },
  { native: "தமிழ்", name: "Tamil" },
  { native: "తెలుగు", name: "Telugu" },
];

const POINTS = [
  {
    icon: BellRing,
    tint: "bg-[#ffd9d2]",
    title: "One-tap Alert",
    text: "A big red button places a WhatsApp call to both caregivers when your child needs you.",
  },
  {
    icon: Eye,
    tint: "bg-[#d9d3f5]",
    title: "Eye control",
    text: "For children who can't tap: look to move the highlight, blink to choose.",
  },
  {
    icon: WifiOff,
    tint: "bg-[#ffeba4]",
    title: "Works offline",
    text: "The board keeps talking without Wi-Fi, at home, in the car or at school.",
  },
  {
    icon: ShieldCheck,
    tint: "bg-[#e0f5f4]",
    title: "Voice stays on the device",
    text: "Speech and camera are processed on the tablet itself. No ads, no trackers.",
  },
];

/** Where ARVIT is different: Indian languages and safety features built for families here. */
export function MadeForIndia() {
  return (
    <section className="bg-zigzag-sky py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Made in India, for Indian families"
              title="Speaks Your Family's Language"
              accent="Your Family's Language"
              accentColor="blue"
              description="Most AAC apps only speak English. ARVIT lets your child talk in the language your family uses at home."
            />

            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Supported languages">
              {LANGUAGES.map((language) => (
                <li
                  key={language.name}
                  lang={language.name === "English" ? "en" : undefined}
                  className="font-display rounded-[10px] border-2 border-[#007ad1]/25 bg-white px-4 py-2 text-xl text-[#15102b]"
                >
                  {language.native}
                  <span className="sr-only"> ({language.name})</span>
                </li>
              ))}
            </ul>

            <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {POINTS.map((point) => (
                <StaggerItem key={point.title} className="flex gap-4 rounded-[20px] border border-[#d9d9de] bg-white p-5">
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${point.tint}`}>
                    <point.icon className="size-6 text-[#15102b]" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="font-display block text-xl leading-tight text-black">{point.title}</span>
                    <span className="mt-1 block text-base leading-snug text-black/70">{point.text}</span>
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <figure className="mx-auto w-full max-w-[420px]">
            <DeviceFrame portrait>
              <RealScreen {...SCREENS.buddyTall} />
            </DeviceFrame>
            <figcaption className="mt-4 text-center text-sm text-black/60">
              Real screen: Therapy Buddy in English, Hindi and Punjabi
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
