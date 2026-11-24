import { Hand, MessageCircle, Volume2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { DeviceFrame, RealScreen, SCREENS } from "@/components/illustrations/device";

/** The three words behind the acronym, in plain language. */
const LETTERS = [
  { letter: "A", word: "Augmentative", text: "Adds to the speech your child already has." },
  { letter: "A", word: "Alternative", text: "Stands in for speech when words won't come." },
  { letter: "C", word: "Communication", text: "So your child can ask, tell, share and be understood." },
];

const HOW = [
  { icon: Hand, title: "Tap a picture", text: "Real photos of food, feelings, people and places." },
  { icon: MessageCircle, title: "Build a sentence", text: "\"I want\" + \"apple\" becomes a full sentence." },
  { icon: Volume2, title: "ARVIT speaks it", text: "A clear voice says it out loud for everyone to hear." },
];

/** Explains what AAC means for parents who have never heard the term. */
export function WhatIsAac() {
  return (
    <section id="what-is-aac" className="bg-zigzag-sky scroll-mt-24 py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="New to AAC? Start here"
              title="What Is AAC?"
              accent="AAC"
              accentColor="blue"
              description="AAC means any way of communicating that doesn't depend on speech: picture cards, signs, or a talking device like ARVIT. Millions of children and adults use it every day."
            />

            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {LETTERS.map((item) => (
                <div key={item.word} className="rounded-[20px] border border-[#d9d9de] bg-white p-5">
                  <dt className="flex items-baseline gap-1">
                    <span className="font-display text-4xl leading-none text-[#007ad1]">{item.letter}</span>
                    <span className="font-display text-lg text-black">{item.word.slice(1)}</span>
                  </dt>
                  <dd className="mt-2 text-base leading-snug text-black/70">{item.text}</dd>
                </div>
              ))}
            </dl>

            <h3 className="font-display mt-10 text-2xl text-[#15102b]">How ARVIT does it</h3>
            <StaggerGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {HOW.map((step, index) => (
                <StaggerItem key={step.title} className="rounded-[20px] border border-[#d9d9de] bg-white p-5">
                  <span className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e0f5f4]">
                      <step.icon className="size-5 text-[#1f7a71]" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="text-sm font-semibold uppercase text-[#28958a]">Step {index + 1}</span>
                  </span>
                  <span className="font-display mt-3 block text-xl leading-tight text-black">{step.title}</span>
                  <span className="mt-1 block text-base leading-snug text-black/70">{step.text}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <p className="mt-8 rounded-[20px] border-l-4 border-[#28958a] bg-white px-5 py-4 text-base text-black/80">
              <strong className="font-display text-[#15102b]">Will AAC stop my child from talking?</strong> No. Research
              shows AAC does not hold speech back, and many children say more words once they have a reliable way to be
              understood.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-[420px]">
            <DeviceFrame portrait>
              <RealScreen {...SCREENS.aacTall} />
            </DeviceFrame>
            <figcaption className="mt-4 text-center text-sm text-black/60">
              Real screen: the ARVIT picture board
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
