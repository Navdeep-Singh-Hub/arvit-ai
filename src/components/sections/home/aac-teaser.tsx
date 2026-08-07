import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AacBoard } from "@/components/illustrations/aac-board";
import { AAC_FEATURES } from "@/lib/data/aac-features";

/** Adult-path AAC teaser — WHOOP dual-tone (black media + white copy optional split). */
export function AacTeaser() {
  return (
    <section className="section-dark section-pad">
      <Container className="relative grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="AAC App"
            title="Giving adults a voice"
            description="A dedicated AAC experience for people who are non-speaking or have lost speech — stroke, ALS, cerebral palsy, TBI, and more."
            titleClassName="text-white"
            className="[&_p]:text-white/55"
          />

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AAC_FEATURES.slice(0, 6).map((feature) => (
              <StaggerItem key={feature.title} className="flex items-center gap-3 border border-white/10 px-4 py-3">
                <feature.icon className="size-4 shrink-0 text-white" strokeWidth={1.5} />
                <span className="text-sm text-white/85">{feature.title}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.25} className="mt-10">
            <ButtonLink
              href="/aac-communication"
              variant="white"
              magnetic={false}
              className="text-nav h-12 min-h-12 rounded-none !text-black"
            >
              Explore the AAC App
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <AacBoard className="w-full" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
