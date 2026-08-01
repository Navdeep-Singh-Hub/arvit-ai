import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  className?: string;
  variant?: "default" | "subtle" | "hero";
};

/** Soft ambient wash — restrained, not decorative noise. */
export function AuroraBackground({ className, variant = "default" }: AuroraBackgroundProps) {
  const opacity =
    variant === "subtle"
      ? { a: "opacity-[0.08]", b: "opacity-[0.06]", mesh: "opacity-30" }
      : variant === "hero"
        ? { a: "opacity-[0.14]", b: "opacity-[0.1]", mesh: "opacity-40" }
        : { a: "opacity-[0.1]", b: "opacity-[0.08]", mesh: "opacity-35" };

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("mesh-gradient absolute inset-0", opacity.mesh)} />
      <div
        className={cn(
          "animate-aurora-1 absolute -top-1/4 left-[10%] size-[28rem] rounded-full bg-brand-primary blur-[100px]",
          opacity.a
        )}
      />
      <div
        className={cn(
          "animate-aurora-2 absolute top-1/3 right-[5%] size-[24rem] rounded-full bg-brand-secondary blur-[100px]",
          opacity.b
        )}
      />
    </div>
  );
}
