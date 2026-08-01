import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardDescription, CardIcon, CardTitle } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TiltCard } from "@/components/motion/tilt-card";
import { THERAPY_DOMAINS } from "@/lib/data/therapy-domains";

export function DomainsGrid() {
  return (
    <section className="relative section-pad">
      <Container>
        <SectionHeading
          eyebrow="What the Therapy Tablet measures"
          title="Domains measured every session"
          description="Speech AI, body-landmark motor practice, special education, education videos, AAC, and more — so the Therapy Tablet understands the whole child, not just one exercise."
        />
        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {THERAPY_DOMAINS.map((domain) => (
            <StaggerItem key={domain.label} className="h-full">
              <TiltCard className="h-full">
                <Card interactive className="h-full">
                  <CardIcon>
                    <domain.icon />
                  </CardIcon>
                  <CardTitle>{domain.label}</CardTitle>
                  <CardDescription>{domain.description}</CardDescription>
                </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
