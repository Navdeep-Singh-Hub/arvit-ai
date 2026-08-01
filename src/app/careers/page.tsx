import type { Metadata } from "next";
import { Briefcase, Heart, Rocket, Users } from "lucide-react";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { CtaBand } from "@/components/sections/shared/cta-band";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description: "Help build the future of AI-powered pediatric therapy and communication at ARVIT AI.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Mission-driven",
    description: "Every role here traces back to a family or clinician getting better access to care.",
  },
  {
    icon: Rocket,
    title: "Move deliberately",
    description: "We ship quickly, but never at the expense of clinical rigor or user trust.",
  },
  {
    icon: Users,
    title: "Clinician-informed",
    description: "Licensed therapists are part of the product process, not an afterthought.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        eyebrowIcon={Briefcase}
        title="Help build the future of therapy and communication"
        description="We're a small, mission-driven team working at the intersection of clinical care and artificial intelligence. If that sounds like your kind of problem, we'd like to hear from you."
      />

      <section className="relative py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="How We Work" title="What it's like to work here" />
          <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {VALUES.map((value) => (
              <StaggerItem key={value.title} className="h-full">
                <div className="card-surface h-full rounded-2xl p-6 text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
                    <value.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="card-surface mx-auto mt-16 max-w-2xl rounded-3xl p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold text-foreground">No open roles listed right now</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We don&apos;t have specific openings posted at the moment, but we&apos;re always glad to hear from
              clinicians, engineers, and designers who care about this mission. Send us a note and a bit about
              yourself at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-brand-primary hover:underline dark:text-brand-primary-light"
              >
                {SITE.email}
              </a>{" "}
              and we&apos;ll keep you in mind as the team grows.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Want to learn more about ARVIT AI first?"
        description="See the platform before you reach out — book a walkthrough with our team."
      />
    </>
  );
}
