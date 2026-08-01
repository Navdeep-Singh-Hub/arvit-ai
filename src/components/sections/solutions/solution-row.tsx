import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardMockup } from "@/components/illustrations/dashboard-mockup";
import { CaseloadMockup } from "@/components/illustrations/caseload-mockup";
import { AacBoard } from "@/components/illustrations/aac-board";
import type { Solution } from "@/lib/data/solutions";
import { cn } from "@/lib/utils";

function SolutionVisual({ audience }: { audience: string }) {
  if (audience === "Families") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2.5rem]">
        <div aria-hidden="true" className="mesh-gradient absolute inset-0 opacity-60" />
        <DashboardMockup className="relative z-10 scale-[0.85] sm:scale-90" />
      </div>
    );
  }

  if (audience === "Schools & Districts" || audience === "Clinics & Private Practice") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2.5rem]">
        <div aria-hidden="true" className="mesh-gradient absolute inset-0 opacity-60" />
        <CaseloadMockup className="relative z-10 scale-[0.85] sm:scale-90" />
      </div>
    );
  }

  if (audience === "Hospitals & Health Systems") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2.5rem] p-6">
        <div aria-hidden="true" className="mesh-gradient absolute inset-0 opacity-60" />
        <div className="relative z-10 w-full max-w-[280px] scale-90 sm:max-w-none sm:scale-100">
          <AacBoard />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2.5rem]">
      <span className="glow-primary relative flex size-24 items-center justify-center rounded-[2rem] bg-gradient-brand text-white" />
    </div>
  );
}

export function SolutionRow({ solution, reversed = false }: { solution: Solution; reversed?: boolean }) {
  return (
    <section className="relative py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className={cn(reversed && "lg:order-2")}>
            <Reveal>
              <Badge icon={solution.icon}>{solution.audience}</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {solution.title}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {solution.description}
              </p>
            </Reveal>

            <StaggerGroup className="mt-7 space-y-3">
              {solution.bullets.map((bullet) => (
                <StaggerItem key={bullet} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                  <span className="text-sm text-foreground/85">{bullet}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.32} className="mt-8">
              <ButtonLink href={solution.href} variant="outline">
                Learn more
                <ArrowRight className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal direction={reversed ? "left" : "right"} className={cn("relative", reversed && "lg:order-1")}>
            <div className="glass-strong glow-border overflow-hidden rounded-[2.5rem]">
              <SolutionVisual audience={solution.audience} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
