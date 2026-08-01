import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AacBoard } from "@/components/illustrations/aac-board";
import { AAC_FEATURES } from "@/lib/data/aac-features";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

export function AacFeaturesShowcase() {
  return (
    <section className="relative section-pad overflow-hidden">
      <AuroraBackground variant="subtle" />
      <Container className="relative grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="mx-auto w-full max-w-sm lg:sticky lg:top-32">
          <div
            aria-hidden="true"
            className="animate-glow-pulse absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-15 blur-3xl"
          />
          <div className="relative">
            <AacBoard />
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AAC_FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="card-glow flex h-full gap-4 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
                  <feature.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
