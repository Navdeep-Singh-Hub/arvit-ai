import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AnimatedCounter } from "@/components/motion/counter";
import { STATS } from "@/lib/data/stats";

export function Stats() {
  return (
    <section className="relative py-8 sm:py-12">
      <Container>
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] px-6 py-14 sm:px-12">
          <div
            aria-hidden="true"
            className="bg-gradient-brand pointer-events-none absolute inset-0 opacity-[0.06]"
          />
          <StaggerGroup className="relative grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
