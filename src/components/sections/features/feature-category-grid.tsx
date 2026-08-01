import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TiltCard } from "@/components/motion/tilt-card";
import type { FeatureCategory } from "@/lib/data/features";
import { featuresByCategory } from "@/lib/data/features";

type FeatureCategoryGridProps = {
  category: FeatureCategory;
  eyebrow: string;
  title: string;
  description: string;
};

export function FeatureCategoryGrid({ category, eyebrow, title, description }: FeatureCategoryGridProps) {
  const features = featuresByCategory(category);
  const cols =
    features.length % 3 === 0
      ? "lg:grid-cols-3"
      : features.length === 5
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4";

  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading align="left" eyebrow={eyebrow} title={title} description={description} className="mx-0" />
        <StaggerGroup className={`mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 ${cols}`}>
          {features.map((feature) => {
            const inner = (
              <Card interactive className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <CardIcon>
                    <feature.icon />
                  </CardIcon>
                  {feature.href ? (
                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  ) : null}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            );

            return (
              <StaggerItem key={feature.title} className="h-full">
                <TiltCard className="h-full">
                  {feature.href ? (
                    <Link href={feature.href} className="group block h-full">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
