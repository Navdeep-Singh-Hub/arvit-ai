import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { AnimatedCounter } from "@/components/motion/counter";
import { STATS } from "@/lib/data/stats";

export function Stats() {
  return (
    <section className="border-y border-[#12151a]/10 bg-[#fffdf9]/70 py-16 sm:py-20">
      <Container className="max-w-[1400px]">
        <StaggerGroup className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-6">
          {STATS.map((stat, index) => (
            <StaggerItem key={stat.label} className="text-left sm:text-center">
              <p
                className={
                  index % 2 === 0
                    ? "font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium tracking-tight text-[#12151a]"
                    : "font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium tracking-tight text-[#c2410c]"
                }
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-eyebrow mt-3">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
