import {
  BellRing,
  Camera,
  Eye,
  Gamepad2,
  Keyboard,
  Languages,
  LineChart,
  WifiOff,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

/** Every card here is a feature that exists in the ARVIT app today (checked against the app code). */
const FEATURES = [
  {
    icon: Camera,
    name: "Real-Photo Boards",
    tag: "Communication",
    tint: "bg-[#dbf0f9]",
    text: "Food, feelings, body & pain, people, places and more, shown as real photos children recognise.",
  },
  {
    icon: Languages,
    name: "Multiple Languages",
    tag: "Your language",
    tint: "bg-[#ffeba4]",
    text: "Switch the board language so your child can talk the way your family talks at home.",
  },
  {
    icon: Gamepad2,
    name: "Therapy Buddy",
    tag: "Learning games",
    tint: "bg-[#d9d3f5]",
    text: "Listen, tap or say the answer: sounds, colours, emotions and social skills like asking for help.",
  },
  {
    icon: BellRing,
    name: "One-Tap Alert",
    tag: "Safety",
    tint: "bg-[#ffd9d2]",
    text: "One red button places a WhatsApp call to both caregivers saved on the device.",
  },
  {
    icon: Eye,
    name: "Eye Control",
    tag: "Hands-free access",
    tint: "bg-[#e0f5f4]",
    text: "Look to move the highlight, blink to choose. For children who find tapping hard.",
  },
  {
    icon: Keyboard,
    name: "Type & Speak",
    tag: "Voice",
    tint: "bg-[#dff3c4]",
    text: "A big keyboard with word prediction reads any sentence out loud.",
  },
  {
    icon: LineChart,
    name: "Weekly Report",
    tag: "For parents",
    tint: "bg-[#dbf0f9]",
    text: "A simple summary of the week's practice, sent to caregiver phones every Sunday evening.",
  },
  {
    icon: WifiOff,
    name: "Works Offline",
    tag: "Anywhere",
    tint: "bg-[#ffeba4]",
    text: "The board and your custom tiles keep working without an internet connection.",
  },
  {
    icon: Star,
    name: "Your Own Tiles",
    tag: "Personal",
    tint: "bg-[#ffd9d2]",
    text: "Add favourites and custom words so the board grows with your child.",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-zigzag-warm py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading
          align="center"
          title="Everything Works Together"
          accent="Together"
          description="Communication for your child, safety and clarity for you"
        />

        <p className="pill mx-auto mt-8 flex w-max max-w-full">
          <Star className="size-4 fill-[#ffb82e] text-[#ffb82e]" aria-hidden />
          On every ARVIT device
        </p>

        <StaggerGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.name} className="h-full">
              <div className="flex h-full items-start gap-5 rounded-[20px] border border-black/20 bg-white p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgb(21_16_43_/_0.35)]">
                <span className={`flex size-[76px] shrink-0 items-center justify-center rounded-full ${feature.tint}`}>
                  <feature.icon className="size-9 text-[#15102b]" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="block">
                  <span className="font-display block text-[1.375rem] leading-tight text-black">{feature.name}</span>
                  <span className="mt-1 block text-sm font-semibold uppercase text-[#28958a]">{feature.tag}</span>
                  <span className="mt-2.5 block text-lg leading-snug text-black/75">{feature.text}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/#tablets" variant="solid" magnetic={false} className="px-10">
            Book Your Device
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
