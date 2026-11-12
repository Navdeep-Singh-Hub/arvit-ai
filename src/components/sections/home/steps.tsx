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
    <section id="how-it-works" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading
          align="center"
          title="From Booking To First Words In 3 Steps"
          accent="3 Steps"
          description="No complicated setup and no app store hunting. We guide you the whole way."
        />

        <StaggerGroup role="list" className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <StaggerItem
              key={step.title}
              role="listitem"
              className="relative flex h-full flex-col rounded-[20px] border border-black/20 bg-white p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-14 items-center justify-center rounded-full bg-[#dbf0f9] text-[#15102b]">
                  <step.icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="font-display text-5xl leading-none text-[#007ad1]" aria-hidden>
                  {index + 1}
                </span>
              </div>
              <h3 className="font-display mt-6 text-[1.375rem] leading-tight text-black">{step.title}</h3>
              <p className="mt-2.5 text-lg leading-snug text-black/75">{step.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
