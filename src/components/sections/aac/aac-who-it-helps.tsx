import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { WHO_WE_HELP } from "@/lib/data/who-we-help";

export function AacWhoItHelps() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Who the AAC Device supports"
          title="Built for children — and the parents beside them"
          description="When speech is limited or still emerging, one device gives the child a voice and gives you a clear view of practice at home."
        />
        <StaggerGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHO_WE_HELP.map((condition) => (
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
