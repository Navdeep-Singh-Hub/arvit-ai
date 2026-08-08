"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion, type MotionValue } from "framer-motion";
import { WebglErrorBoundary } from "@/components/three/webgl-error-boundary";
import { TABLET_MODEL } from "@/lib/media/tablet-model";
import { cn } from "@/lib/utils";
import type { TabletCanvasSize } from "@/components/three/tablet-canvas";

const TabletCanvas = dynamic(() => import("@/components/three/tablet-canvas"), {
  ssr: false,
  loading: () => null,
});

type TabletViewerProps = {
  variant?: "dark" | "light";
  size?: TabletCanvasSize;
  interactive?: boolean;
  followPointer?: boolean;
  scrollProgress?: MotionValue<number>;
  className?: string;
  defer?: boolean;
};

function StaticBeauty({
  className,
  priority = false,
  hero = false,
}: {
  className?: string;
  priority?: boolean;
  hero?: boolean;
}) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={TABLET_MODEL.beauty}
        alt="ARVIT AAC Device tablet"
        fill
        priority={priority}
        sizes={hero ? "(max-width: 768px) 100vw, 70vw" : "(max-width: 768px) 100vw, 50vw"}
        className={cn(
          "object-contain object-center",
          hero ? "scale-[0.92] sm:scale-100" : undefined
        )}
      />
    </div>
  );
}

/**
 * 3D product tablet with GLB + beauty PNG fallback.
 * Hero mode: pass followPointer + scrollProgress for glaze-smooth motion.
 */
export function TabletViewer({
  variant = "dark",
  size = "default",
  interactive = false,
  followPointer = false,
  scrollProgress,
  className,
  defer = true,
}: TabletViewerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(!defer);
  const isHero = size === "hero";

  useEffect(() => {
    if (!defer || prefersReducedMotion) return;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1400 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(() => setReady(true), 280);
    return () => window.clearTimeout(id);
  }, [defer, prefersReducedMotion]);

  if (!ready || prefersReducedMotion) {
    return (
      <div className={cn("relative h-full w-full", className)} aria-hidden="true">
        <StaticBeauty priority={!defer} hero={isHero} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full",
        interactive && !followPointer ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      aria-hidden={!interactive}
    >
      <WebglErrorBoundary fallback={<StaticBeauty hero={isHero} />}>
        <TabletCanvas
          variant={variant}
          size={size}
          interactive={interactive}
          followPointer={followPointer && !prefersReducedMotion}
          scrollProgress={prefersReducedMotion ? undefined : scrollProgress}
          className="absolute inset-0 h-full w-full"
        />
      </WebglErrorBoundary>
    </div>
  );
}
