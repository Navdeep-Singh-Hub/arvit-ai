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
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide",
        variant === "default" &&
          "border border-brand-primary/20 bg-brand-primary/8 text-brand-primary dark:text-brand-primary-light",
        variant === "outline" && "border border-border text-muted-foreground",
        variant === "solid" && "bg-brand-primary text-white shadow-sm",
        variant === "glass" && "glass text-foreground/80",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-3.5" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
