import { Target, Eye, HeartHandshake, Globe2, Tablet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardIcon } from "@/components/ui/card";

const PRINCIPLES = [
  {
    icon: Tablet,
    title: "One device, two jobs",
    body: "The child gets a voice and practice. The parent gets a view they can follow. We never split that into two products.",
  },
  {
    icon: HeartHandshake,
    title: "Accessible by design",
    body: "World-class communication and therapy should not depend on zip code or waitlists. Purpose-built tablets help us scale care without scaling scarcity.",
  },
  {
    icon: Globe2,
    title: "Built for the long run",
    body: "We measure progress in months and years. Speech AI, OT landmarks, and AAC are designed to compound outcomes for families and care teams.",
  },
];

export function MissionVision() {
  return (
    <section className="relative section-pad">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <Card interactive className="h-full p-8 sm:p-10">
              <CardIcon>
                <Target />
              </CardIcon>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Our Mission</h2>
              <p className="mt-4 text-lg font-medium leading-snug text-foreground/90">
                To make world-class communication and practice accessible, affordable, and engaging through Artificial
                Intelligence — on one AAC Device for children and parents.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We partner with licensed clinicians so children build a voice and practice on the AAC Device, and
                parents stay in the loop at home, in clinic, and everywhere in between.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.12}>
            <Card interactive className="h-full p-8 sm:p-10">
              <CardIcon>
                <Eye />
              </CardIcon>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Our Vision</h2>
              <p className="mt-4 text-lg font-medium leading-snug text-foreground/90">
                To become the world&apos;s leading AI-powered therapy tablet ecosystem.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Two connected devices — Adult AAC and Child Therapy — trusted by hospitals, clinics, schools, and
                families, with shared progress and clinical oversight in the cloud.
              </p>
            </Card>
          </Reveal>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRINCIPLES.map((item, index) => (
            <Reveal key={item.title} delay={0.08 * (index + 1)}>
              <div className="card-glow flex h-full gap-4 rounded-3xl p-6 sm:p-7">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
