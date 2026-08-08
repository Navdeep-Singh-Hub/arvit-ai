import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TabletViewer } from "@/components/three/tablet-viewer";
import { AAC_FEATURES } from "@/lib/data/aac-features";

/** Adult-path AAC teaser — WHOOP dual-tone with live product tablet. */
export function AacTeaser() {
  return (
    <section className="section-dark section-pad">
      <Container className="relative grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="AAC Device"
            title="Giving adults a voice"
            description="A dedicated AAC experience for people who are non-speaking or have lost speech — stroke, ALS, cerebral palsy, TBI, and more."
            titleClassName="text-white"
            className="[&_p]:text-white/55"
          />

          <StaggerGroup className="mt-8 grid grid-cols-1 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3">
            {AAC_FEATURES.slice(0, 6).map((feature) => (
              <StaggerItem key={feature.title} className="flex items-center gap-3 border border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
                <feature.icon className="size-4 shrink-0 text-white" strokeWidth={1.5} />
                <span className="text-sm text-white/85">{feature.title}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.25} className="mt-8 sm:mt-10">
            <ButtonLink
              href="/aac-communication"
              variant="white"
              magnetic={false}
              className="text-nav h-12 min-h-12 w-full rounded-none !text-black sm:w-auto"
            >
              Explore the AAC Device
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative mx-auto aspect-[4/3] min-h-[220px] w-full max-w-md sm:min-h-[300px] sm:max-w-none">
            <TabletViewer variant="dark" size="default" interactive className="absolute inset-0 h-full w-full" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
