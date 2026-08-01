import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description: string;
  align?: "center" | "left";
  children?: ReactNode;
};

export function PageHero({ eyebrow, eyebrowIcon, title, description, align = "center", children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pb-24 sm:pt-48">
      <AuroraBackground variant="subtle" />
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-bottom pointer-events-none absolute inset-0 opacity-[0.3]"
      />
      <Container>
        <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
          <Reveal>
            <Badge icon={eyebrowIcon}>{eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display mt-6 text-balance text-foreground">{title}</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p
              className={cn(
                "text-body-lg mt-6 text-balance text-muted-foreground",
                align === "center" && "mx-auto max-w-2xl"
              )}
            >
              {description}
            </p>
          </Reveal>
        </div>
        {children}
      </Container>
    </section>
  );
}
