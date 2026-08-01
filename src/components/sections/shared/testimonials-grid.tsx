import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import type { Testimonial } from "@/lib/data/testimonials";

type TestimonialsGridProps = {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
};

export function TestimonialsGrid({ eyebrow, title, testimonials }: TestimonialsGridProps) {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name} className="h-full">
              <div className="card-surface flex h-full flex-col rounded-3xl p-7">
                <Quote className="size-8 fill-brand-primary/15 text-brand-primary/30" />
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
