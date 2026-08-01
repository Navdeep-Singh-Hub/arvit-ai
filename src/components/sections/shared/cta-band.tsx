import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";
import { CTA } from "@/lib/constants";

type CtaBandProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({
  title,
  description,
  primaryLabel = CTA.getStarted,
  primaryHref = "/contact",
  secondaryLabel = CTA.bookDemo,
  secondaryHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="relative section-pad">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-ink px-6 py-16 text-center sm:px-16 sm:py-20">
          <AuroraBackground variant="hero" />
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div className="relative">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
                {description}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href={primaryHref} size="xl" variant="gradient">
                {primaryLabel}
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={secondaryHref} size="xl" variant="outline-invert">
                {secondaryLabel}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
