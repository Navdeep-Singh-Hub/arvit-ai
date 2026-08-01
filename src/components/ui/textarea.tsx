import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-32 w-full resize-y rounded-xl border border-input bg-white px-4 py-3.5 text-base text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-250",
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
Textarea.displayName = "Textarea";
