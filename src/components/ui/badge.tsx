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
        /* hex + ! so parent light/dark tokens never wash out labels */
        variant === "default" && "bg-[#000000] !text-[#ffffff]",
        variant === "outline" && "border border-black/20 bg-transparent !text-[#000000]",
        variant === "solid" && "bg-[#000000] !text-[#ffffff]",
        variant === "glass" && "border border-white/30 bg-[#000000] !text-[#ffffff]",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-3.5 shrink-0 text-inherit" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
