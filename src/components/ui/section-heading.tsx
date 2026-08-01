import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow ? (
        <Reveal>
          <Badge icon={eyebrowIcon}>{eyebrow}</Badge>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2 className={cn("text-h2 mt-4 text-balance text-foreground", titleClassName)}>{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-body-lg mt-4 text-balance text-muted-foreground",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
