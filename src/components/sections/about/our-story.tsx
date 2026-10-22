import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function OurStory() {
  return (
    <section className="relative section-pad">
      <Container size="narrow">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-brand-primary-light">
            Our Story
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Children need a voice. Parents need to see progress. That is one device.
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Too many platforms split the family. The child gets a board. The parent gets a PDF. The therapist gets a
            different login. Waitlists stay long — and nobody shares the same picture of the week.
          </p>
          <p>
            ARVIT AI builds one <strong className="font-semibold text-foreground">AAC Device</strong> for that
            family. The child communicates with boards and voice, and practices speech and motor skills on the same
            tablet. The parent sees progress, home tips, and controls they can actually read.
          </p>
          <p>
            We&apos;re still early. But every capability we ship has to clear the same bar: would a parent understand
            it, and would a licensed clinician recognize it as careful care? If not, we don&apos;t ship it.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
