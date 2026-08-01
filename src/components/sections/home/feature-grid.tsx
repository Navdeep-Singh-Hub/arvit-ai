import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TiltCard } from "@/components/motion/tilt-card";
import { FEATURES } from "@/lib/data/features";

export function FeatureGrid() {
  return (
    <section id="features" className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="Capabilities across both tablets"
          title="Built for the device — not bolted on later"
          description="Therapy Tablet features for children, AAC Tablet features for adults, and shared dashboards that keep families and clinicians aligned."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title} className="h-full">
              <TiltCard className="h-full">
                <Link href={feature.href ?? "/features"} className="group block h-full">
                  <Card interactive className="h-full">
                    <div className="flex items-start justify-between gap-3">
                      <CardIcon>
                        <feature.icon />
                      </CardIcon>
                      <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </Card>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
