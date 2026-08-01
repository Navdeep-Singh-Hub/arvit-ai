import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  /** Soft glass surface for interactive product cards. */
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 sm:p-8",
        interactive
          ? "card-glow transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-0.5 hover:scale-[1.01]"
          : "card-surface",
        className
      )}
      {...props}
    />
  );
}

export function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary",
        "[&_svg]:size-5",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-lg font-semibold tracking-tight text-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground", className)} {...props} />;
}
