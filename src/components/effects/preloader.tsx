"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/icons/logo";
import { useMounted } from "@/hooks/use-mounted";

const STORAGE_KEY = "arvit-preloader-shown";

export function Preloader() {
  const mounted = useMounted();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mounted || sessionStorage.getItem(STORAGE_KEY)) return;

    const showTimer = setTimeout(() => setVisible(true), 0);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 1050);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative flex size-16 items-center justify-center">
              <span className="absolute inset-0 animate-ping-slow rounded-2xl bg-gradient-brand opacity-40" />
              <span className="glow-primary relative flex size-16 items-center justify-center rounded-2xl bg-gradient-brand">
                <LogoMark className="size-9" />
              </span>
            </div>
            <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full bg-gradient-brand-animated"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
