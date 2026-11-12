import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
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
    <section className="bg-zigzag-sky relative overflow-hidden pb-14 pt-36 sm:pb-20 sm:pt-44">
      <Container>
        <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
          <Reveal>
            <Badge icon={eyebrowIcon}>{eyebrow}</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display mt-5 text-balance">{title}</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p
              className={cn(
                "mt-4 text-pretty text-lg text-black/70",
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
