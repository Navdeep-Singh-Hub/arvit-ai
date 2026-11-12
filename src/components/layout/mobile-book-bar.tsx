"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CATALOG_PRODUCTS, formatProductPrice } from "@/lib/commerce/products";

const HIDDEN_PREFIXES = ["/cart", "/checkout", "/admin", "/contact"];
const PRODUCT = CATALOG_PRODUCTS[0];

/** Phone-only booking bar: appears once the visitor scrolls past the first screen. */
export function MobileBookBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    if (hidden) return;
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#15102b]/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{PRODUCT.name}</p>
              <p className="text-xs text-white/70">{formatProductPrice(PRODUCT)} · pay online or later</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/contact"
                className="text-nav flex h-11 items-center px-3 text-white/85 underline-offset-4 hover:underline"
              >
                Demo
              </Link>
              <Link
                href="/#tablets"
                className="flex h-11 items-center rounded-[10px] bg-[#ffd235] px-5 text-base font-semibold text-[#15102b] shadow-[0_3px_0_0_rgb(0_0_0_/_0.8)]"
              >
                Book now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
