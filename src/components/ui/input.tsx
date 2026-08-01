import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-12 min-h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-250",
          "placeholder:text-muted-foreground",
          "focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
          "dark:bg-card",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
