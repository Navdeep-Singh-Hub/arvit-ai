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
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold uppercase",
        /* hex + ! so parent light/dark tokens never wash out labels */
        variant === "default" && "border border-black/10 bg-[#e0f5f4] !text-[#28958a]",
        variant === "outline" && "border border-black/20 bg-white !text-[#15102b]",
        variant === "solid" && "bg-[#28958a] !text-[#ffffff]",
        variant === "glass" && "border border-white/20 bg-white/10 !text-[#7fe0d4]",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-4 shrink-0 text-inherit" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
