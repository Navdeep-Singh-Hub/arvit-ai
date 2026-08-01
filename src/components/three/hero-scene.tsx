"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { WebglErrorBoundary } from "@/components/three/webgl-error-boundary";

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="animate-blob size-72 rounded-full bg-gradient-brand opacity-30 blur-3xl sm:size-[26rem]" />
    </div>
  );
}

/**
 * Lazily-loaded, reduced-motion-aware 3D hero visualization. Mounts the WebGL
 * scene once the browser is idle (rather than immediately) so the heavy
 * three.js evaluation doesn't compete with the critical above-the-fold
 * content — headline and CTAs — becoming interactive. A static gradient
 * blob fills the space until then and stays put entirely for reduced-motion.
 */
export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  if (!ready || prefersReducedMotion) {
    return <SceneFallback />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <WebglErrorBoundary fallback={<SceneFallback />}>
        <HeroCanvas />
      </WebglErrorBoundary>
    </div>
  );
}
