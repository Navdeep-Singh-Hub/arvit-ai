import { ArrowRight, MessagesSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AacBoard } from "@/components/illustrations/aac-board";
import { AAC_FEATURES } from "@/lib/data/aac-features";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

export function AacTeaser() {
  return (
    <section className="relative overflow-hidden section-pad">
      <AuroraBackground variant="subtle" />
      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="AAC Tablet"
            eyebrowIcon={MessagesSquare}
            title="Giving adults a voice"
            description="The Adult AAC Tablet is a dedicated communication device for people who are non-speaking or have lost speech — stroke, ALS, cerebral palsy, TBI, and more. Children who need AAC get it on the Therapy Tablet alongside speech and OT."
          />

          <StaggerGroup className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {AAC_FEATURES.slice(0, 6).map((feature) => (
              <StaggerItem key={feature.title} className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
                  <feature.icon className="size-3.5" />
                </span>
                <span className="text-sm text-foreground/85">{feature.title}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.3} className="mt-9">
            <ButtonLink href="/aac-communication" variant="gradient">
              Explore the AAC Tablet
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="order-1 relative mx-auto w-full max-w-sm lg:order-2 lg:mx-0 lg:ml-auto">
          <div
            aria-hidden="true"
            className="animate-glow-pulse absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl"
          />
          <AacBoard />
        </div>
      </Container>
    </section>
  );
}
