import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type BadgeProps = React.ComponentProps<"div"> & {
  icon?: LucideIcon;
  variant?: "default" | "outline" | "solid" | "glass";
};

export function Badge({ className, icon: Icon, variant = "default", children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "text-eyebrow inline-flex items-center gap-1.5 px-2.5 py-1",
        variant === "default" && "bg-black text-white",
        variant === "outline" && "border border-black/15 text-muted-foreground",
        variant === "solid" && "bg-black text-white",
        variant === "glass" && "border border-white/20 bg-black text-white",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-3.5" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
