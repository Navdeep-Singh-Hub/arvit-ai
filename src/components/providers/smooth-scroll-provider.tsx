"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Keeps GSAP's ScrollTrigger perfectly in sync with Lenis's smoothed scroll position. */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
    return unsubscribe;
  }, [lenis]);

  useEffect(() => {
    function syncRaf(time: number) {
      lenis?.raf(time * 1000);
    }
    gsap.ticker.add(syncRaf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(syncRaf);
  }, [lenis]);

  // Pause page smooth-scroll while modals (e.g. tablet chooser) need native overflow scroll.
  useEffect(() => {
    if (!lenis) return;
    const instance = lenis;

    function stop() {
      instance.stop();
    }
    function start() {
      instance.start();
    }

    window.addEventListener("arvit:lenis-stop", stop);
    window.addEventListener("arvit:lenis-start", start);
    return () => {
      window.removeEventListener("arvit:lenis-stop", stop);
      window.removeEventListener("arvit:lenis-start", start);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
