import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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

/** WHOOP-style section heads: huge type, left bias optional, open space */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-5xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className="text-eyebrow text-black/55">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2 className={cn("text-h2 mt-5 text-balance text-foreground", titleClassName)}>{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-body-lg mt-8 max-w-xl text-pretty text-black/60",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
