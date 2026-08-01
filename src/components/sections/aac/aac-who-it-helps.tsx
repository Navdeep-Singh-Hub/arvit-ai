import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { WHO_WE_HELP } from "@/lib/data/who-we-help";

/** Adult-focused conditions for the AAC Tablet page. */
const AAC_TABLET_CONDITIONS = new Set([
  "Cerebral Palsy",
  "Stroke Survivors",
  "ALS",
  "Apraxia",
  "Traumatic Brain Injury",
  "Non-speaking Individuals",
]);

export function AacWhoItHelps() {
  const conditions = WHO_WE_HELP.filter((condition) => AAC_TABLET_CONDITIONS.has(condition.title));

  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Who the AAC Tablet supports"
          title="Built for adult communication needs"
          description="When speech is lost or limited by neurological change, the AAC Tablet focuses on getting a voice back — without pediatric therapy features getting in the way. Children who need AAC use the Therapy Tablet instead."
        />
        <StaggerGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition) => (
            <StaggerItem key={condition.title} className="h-full">
              <div className="card-glow h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
                  <condition.icon className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-foreground">{condition.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{condition.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
