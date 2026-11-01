import { CalendarCheck, PhoneCall, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

/** The real ordering journey today: book → we call → set up. */
const STEPS = [
  {
    icon: CalendarCheck,
    title: "Book online or ask for a demo",
    description:
      "Book the AAC Device in two minutes, or ask for a free walkthrough first. You don't pay anything at this step.",
  },
  {
    icon: PhoneCall,
    title: "We call you",
    description:
      "Our team calls to answer questions, confirm payment and delivery, and learn a little about your child.",
  },
  {
    icon: Sparkles,
    title: "Your child starts talking. You follow along.",
    description:
      "The device arrives ready to use. Your child communicates with boards and voice, and you see their progress on the same device.",
  },
] as const;

export function Steps() {
  return (
    <section id="how-it-works" className="section-pad section-light border-t border-black/5">
      <Container className="max-w-[1400px]">
        <SectionHeading
          eyebrow="How it works"
          title="From booking to first words, in three steps"
          description="No complicated setup and no app store hunting. We guide you the whole way."
        />

        <StaggerGroup role="list" className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <StaggerItem
              key={step.title}
              role="listitem"
              className="relative flex h-full flex-col rounded-3xl border border-[#12151a]/8 bg-[#fffdf9] p-6 shadow-[0_18px_40px_-28px_rgb(18_21_26_/_0.35)] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e7f4f2] text-[#0a6b64]">
                  <step.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="font-display text-4xl font-medium text-[#12151a]/15" aria-hidden>
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-8 text-lg font-semibold tracking-tight text-[#12151a]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">{step.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
