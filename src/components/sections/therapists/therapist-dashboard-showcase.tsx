import { ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { CaseloadMockup } from "@/components/illustrations/caseload-mockup";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

const DASHBOARD_POINTS = [
  "Separate views for AAC Tablet and Therapy Tablet caseloads",
  "AI-drafted notes for speech, OT landmarks, and special ed",
  "Goal-linked boards, exercises, and education videos",
  "EHR-friendly exports when you need them",
];

export function TherapistDashboardShowcase() {
  return (
    <section className="relative section-pad overflow-hidden">
      <AuroraBackground variant="subtle" />
      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Therapist Dashboard"
            eyebrowIcon={LayoutDashboard}
            title="Prescribe the right tablet. Keep the clinical judgment."
            description="ARVIT drafts documentation across AAC and Therapy Tablet caseloads — you approve every plan. Spend more time treating, less time typing."
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
              Bring ARVIT to your practice
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
          <div
            aria-hidden="true"
            className="animate-glow-pulse absolute -inset-8 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl"
          />
          <CaseloadMockup className="relative z-10 mx-auto lg:mx-0" />
        </div>
      </Container>
    </section>
  );
}
