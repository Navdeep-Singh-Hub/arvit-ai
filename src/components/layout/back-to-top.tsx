"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => setVisible(latest > 0.12));
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() =>
            lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed bottom-24 right-4 z-40 hidden size-11 lg:flex items-center justify-center rounded-full bg-[#0e1418] text-white shadow-[0_12px_30px_-12px_rgb(14_20_24_/_0.7)] lg:bottom-8 lg:right-8"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
