import { ArrowRight, CheckCircle2, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { DashboardMockup } from "@/components/illustrations/dashboard-mockup";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

const DASHBOARD_POINTS = [
  "Speech AI, OT landmark, special ed & AAC progress in plain language",
  "Home-practice suggestions after every Therapy Tablet session",
  "Direct messaging with your care team",
  "A full history of milestones — not just raw scores",
];

export function ParentDashboardShowcase() {
  return (
    <section className="relative section-pad overflow-hidden">
      <AuroraBackground variant="subtle" />
      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md lg:order-1 lg:mx-0">
          <div
            aria-hidden="true"
            className="animate-glow-pulse absolute -inset-8 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl"
          />
          <DashboardMockup className="relative z-10 mx-auto lg:mx-0" />
        </div>
        <div className="lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Parent Dashboard"
            eyebrowIcon={UserRound}
            title="Therapy Tablet progress, without the jargon"
            description="See speech AI outcomes, OT landmark practice, special education, and AAC in one calm parent view — no clinical vocabulary required."
          />
          <StaggerGroup className="mt-7 space-y-3">
            {DASHBOARD_POINTS.map((point) => (
              <StaggerItem key={point} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                <span className="text-sm text-foreground/85">{point}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.3} className="mt-8">
            <ButtonLink href="/contact" variant="gradient">
              Bring ARVIT home
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
