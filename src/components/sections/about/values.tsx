import { ShieldCheck, Globe, Lock, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Clinical integrity first",
    description: "AI augments licensed therapists — it never replaces clinical judgment.",
  },
  {
    icon: Globe,
    title: "Radical accessibility",
    description: "Geography and cost shouldn't decide who gets quality therapy.",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    description: "Security, consent, and control are built in from the first line of code.",
  },
  {
    icon: Sparkles,
    title: "Designed to delight",
    description: "Engagement isn't a nice-to-have — for therapy to work, it has to be enjoyed.",
  },
];

export function Values() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="What We Believe" title="The principles behind every decision" />
        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <StaggerItem key={value.title} className="h-full">
              <div className="card-surface h-full rounded-2xl p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
                  <value.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
