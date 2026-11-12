import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  /** Part of the title to paint in the accent color, e.g. title "Apps Work Together", accent "Together". */
  accent?: string;
  accentColor?: "teal" | "blue" | "coral";
  description?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
};

const ACCENTS = {
  teal: "text-[#28958a] [.section-dark_&]:text-[#7fe0d4]",
  blue: "text-[#007ad1]",
  coral: "text-[#ff7463]",
};

/** Section heads: chunky Nunito title with one accent-colored phrase, short Poppins line under it. */
export function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  accent,
  accentColor = "teal",
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const index = accent ? title.indexOf(accent) : -1;

  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow ? (
        <Reveal>
          <p className="pill [.section-dark_&]:border-white/15 [.section-dark_&]:bg-white/10 [.section-dark_&]:text-[#7fe0d4]">
            {EyebrowIcon ? <EyebrowIcon className="size-4" aria-hidden /> : null}
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "text-h2 text-balance [.section-dark_&]:text-white",
            eyebrow && "mt-4",
            titleClassName
          )}
        >
          {index >= 0 && accent ? (
            <>
              {title.slice(0, index)}
              <span className={ACCENTS[accentColor]}>{accent}</span>
              {title.slice(index + accent.length)}
            </>
          ) : (
            title
          )}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-pretty text-lg text-black/70 [.section-dark_&]:!text-white/80",
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
