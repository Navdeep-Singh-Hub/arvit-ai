"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

export const buttonVariants = cva(
  "group/btn relative isolate inline-flex shrink-0 select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[10px] font-semibold outline-none transition-[transform,background-color,color,border-color,box-shadow,opacity] duration-150 ease-out active:translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[#28958a] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Primary: sunny yellow with a hard "pressable" shadow. Explicit !color so parent text colors never win. */
        gradient:
          "border border-[#ffd235] bg-[#ffd235] !text-[#15102b] shadow-[0_3px_0_0_rgb(0_0_0_/_0.8)] hover:bg-[#ffdc5c] hover:!text-[#15102b] active:shadow-[0_1px_0_0_rgb(0_0_0_/_0.8)]",
        /* Secondary: teal with the same pressable shadow */
        solid:
          "border border-[#28958a] bg-[#28958a] !text-[#ffffff] shadow-[0_3px_0_0_rgb(0_0_0_/_0.8)] hover:bg-[#1f7a71] hover:!text-[#ffffff] active:shadow-[0_1px_0_0_rgb(0_0_0_/_0.8)]",
        white:
          "border border-black/15 bg-[#ffffff] !text-[#15102b] shadow-[0_3px_0_0_rgb(0_0_0_/_0.8)] hover:bg-[#f7f4f3] hover:!text-[#15102b]",
        outline:
          "border-2 border-[#15102b] bg-[#ffffff] !text-[#15102b] hover:bg-[#15102b] hover:!text-[#ffffff]",
        "outline-invert":
          "border-2 border-white bg-transparent !text-[#ffffff] hover:bg-[#ffffff] hover:!text-[#15102b]",
        ghost: "!text-inherit hover:bg-black/5",
        glass:
          "border-2 border-white/40 bg-transparent !text-[#ffffff] hover:bg-[#ffffff] hover:!text-[#15102b]",
      },
      size: {
        sm: "h-11 min-h-11 px-5 text-[0.95rem]",
        default: "h-12 min-h-12 px-6 text-base",
        lg: "h-12 min-h-12 px-7 text-base",
        xl: "h-[52px] min-h-12 px-8 text-lg",
        icon: "size-12 min-h-12 min-w-12",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
);

type Ripple = { id: number; x: number; y: number; size: number };

function useRipples() {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const idRef = React.useRef(0);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const id = idRef.current++;
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size },
    ]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);
  };

  const rippleLayer = (
    <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.45, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute rounded-full bg-white/60"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
            }}
          />
        ))}
      </AnimatePresence>
    </span>
  );

  return { addRipple, rippleLayer };
}

export type ButtonProps = Omit<HTMLMotionProps<"button">, "ref" | "children"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    magnetic?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, onClick, onMouseMove, onMouseLeave, children, ...props }, forwardedRef) => {
    const { addRipple, rippleLayer } = useRipples();
    const { ref, x, y, onMouseMove: magMove, onMouseLeave: magLeave } = useMagnetic<HTMLButtonElement>({
      strength: 0.12,
      disabled: !magnetic,
    });

    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLButtonElement);

    return (
      <motion.button
        ref={ref}
        style={magnetic ? { x, y } : undefined}
        whileTap={{ scale: 0.96 }}
        onMouseMove={(e) => {
          magMove(e);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => {
          magLeave();
          onMouseLeave?.(e);
        }}
        onClick={(e) => {
          addRipple(e);
          onClick?.(e);
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2 text-inherit [&_svg]:text-inherit">{children}</span>
        {rippleLayer}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

const MotionLink = motion.create(Link);

type LinkConflictingProps =
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

export type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, LinkConflictingProps> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    magnetic?: boolean;
  };

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, magnetic = true, onClick, onMouseMove, onMouseLeave, children, ...props }, forwardedRef) => {
    const { addRipple, rippleLayer } = useRipples();
    const { ref, x, y, onMouseMove: magMove, onMouseLeave: magLeave } = useMagnetic<HTMLAnchorElement>({
      strength: 0.12,
      disabled: !magnetic,
    });

    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLAnchorElement);

    return (
      <MotionLink
        ref={ref}
        style={magnetic ? { x, y } : undefined}
        whileTap={{ scale: 0.96 }}
        onMouseMove={(e: React.MouseEvent<HTMLAnchorElement>) => {
          magMove(e);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
          magLeave();
          onMouseLeave?.(e);
        }}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          addRipple(e);
          onClick?.(e);
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2 text-inherit [&_svg]:text-inherit">{children}</span>
        {rippleLayer}
      </MotionLink>
    );
  }
);
ButtonLink.displayName = "ButtonLink";
