import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
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
    <section className="section-dark section-pad">
      <Container className="max-w-[1400px]">
        <Reveal>
          <h2 className="text-h2 max-w-3xl text-balance text-white">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-body-lg mt-8 max-w-lg text-white/60">{description}</p>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center">
          <ButtonLink
            href={primaryHref}
            size="xl"
            variant="gradient"
            magnetic={false}
            className="text-nav h-12 min-h-12 w-full px-8 sm:w-auto"
          >
            {primaryLabel}
          </ButtonLink>
          <ButtonLink
            href={secondaryHref}
            size="xl"
            variant="outline-invert"
            magnetic={false}
            className="text-nav h-12 min-h-12 w-full rounded-none sm:w-auto"
          >
            {secondaryLabel}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
