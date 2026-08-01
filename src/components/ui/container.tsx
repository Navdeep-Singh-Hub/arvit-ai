import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  size?: "default" | "narrow" | "wide";
};

/** Default max width 1280px per design system. */
const sizes = {
  default: "max-w-[1280px]",
  narrow: "max-w-3xl",
  wide: "max-w-[1280px]",
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props} />
  );
}
