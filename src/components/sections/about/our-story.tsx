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
            Adults need a voice. Children need therapy that sticks. Those are different products.
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Too many platforms force everyone into the same generic app. An adult recovering speech after a stroke
            does not need pediatric games. A child building articulation and motor skills needs more than a symbol
            board. Waitlists stay long either way — and the tools rarely match the person.
          </p>
          <p>
            ARVIT AI was built around that split. Our <strong className="font-semibold text-foreground">AAC Tablet</strong>{" "}
            is for adults who need dedicated communication. Our{" "}
            <strong className="font-semibold text-foreground">Therapy Tablet</strong> is for children — AAC plus our
            own AI speech model, occupational therapy games that track body landmarks, special education, education
            videos, and progress tracking for parents and therapists.
          </p>
          <p>
            We&apos;re still early. But every capability we ship has to clear the same bar: would a licensed clinician
            recognize this as careful, evidence-informed care on the right device for the right person? If not, we
            don&apos;t ship it.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
