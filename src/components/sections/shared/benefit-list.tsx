import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

export type BenefitItem = { icon: LucideIcon; title: string; description: string };

type BenefitListProps = {
  eyebrow: string;
  title: string;
  description?: string;
  items: BenefitItem[];
  columns?: 2 | 3;
};

export function BenefitList({ eyebrow, title, description, items, columns = 3 }: BenefitListProps) {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <StaggerGroup
          className={cn(
            "mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2",
            columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          )}
        >
          {items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="card-surface h-full rounded-2xl p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
