"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Tablet, X } from "lucide-react";
import { TABLET_PRODUCTS, type TabletProduct } from "@/lib/data/tablet-products";
import { LogoMark } from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

const PRELOADER_KEY = "arvit-preloader-shown";

function ProductCard({
  product,
  onSelect,
  delay = 0,
}: {
  product: TabletProduct;
  onSelect: () => void;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isTherapy = product.id === "therapy-child";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={product.href}
        onClick={onSelect}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 sm:p-7",
          "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isTherapy
            ? "border-brand-primary/35 bg-gradient-to-br from-brand-primary/15 via-card to-brand-accent/10 shadow-[0_20px_60px_-24px_rgb(37_99_235_/_0.55)]"
            : "border-brand-secondary/30 bg-gradient-to-br from-brand-secondary/12 via-card to-transparent shadow-[0_20px_60px_-24px_rgb(6_182_212_/_0.4)]"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase",
              isTherapy
                ? "bg-brand-primary/15 text-brand-primary"
                : "bg-brand-secondary/15 text-brand-secondary"
            )}
          >
            <Tablet className="size-3" />
            {product.audience}
          </span>
          <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{product.name}</h3>
        <p className="mt-1.5 text-sm font-medium text-foreground/80">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <ul className="mt-6 grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
          {product.highlights.slice(0, isTherapy ? 6 : 4).map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-xl bg-background/50 px-3 py-2 text-xs font-medium text-foreground/85 ring-1 ring-border/60"
            >
              <Icon
                className={cn(
                  "size-3.5 shrink-0",
                  isTherapy ? "text-brand-primary" : "text-brand-secondary"
                )}
              />
              {label}
            </li>
          ))}
        </ul>

        <span
          className={cn(
            "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white group-hover:brightness-110",
            isTherapy ? "bg-gradient-brand" : "bg-brand-secondary"
          )}
        >
          Explore {product.name}
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </motion.div>
  );
}

/** Homepage chooser — opens on every visit. Adult AAC tablet vs child Therapy tablet. */
export function TabletChooser() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!mounted) return;

    // Always show after preloader (or quickly if preloader already ran this session).
    const preloaderDone = sessionStorage.getItem(PRELOADER_KEY);
    const delay = preloaderDone ? 250 : 1200;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [mounted]);

  const dismiss = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Pause Lenis if present so wheel events reach the modal scroll area.
    document.documentElement.classList.add("lenis-stopped");
    window.dispatchEvent(new CustomEvent("arvit:lenis-stop"));

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("lenis-stopped");
      window.dispatchEvent(new CustomEvent("arvit:lenis-start"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep wheel/touch scrolling inside the modal — Lenis otherwise owns the page.
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;

    const stopPropagation = (event: Event) => {
      event.stopPropagation();
    };

    el.addEventListener("wheel", stopPropagation, { passive: true });
    el.addEventListener("touchmove", stopPropagation, { passive: true });

    return () => {
      el.removeEventListener("wheel", stopPropagation);
      el.removeEventListener("touchmove", stopPropagation);
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center p-3 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close product chooser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-ink/75 backdrop-blur-md"
            onClick={dismiss}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] shadow-2xl outline-none"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background sm:right-4 sm:top-4"
            >
              <X className="size-4" />
            </button>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <div className="mx-auto max-w-2xl pr-8 text-center sm:pr-0">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-primary/30">
                  <LogoMark className="size-7" />
                </div>
                <h2
                  id={titleId}
                  className="mt-5 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl"
                >
                  Two therapy tablets. Two clear paths.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  ARVIT AI ships purpose-built tablets — choose the AAC device for adults, or the full therapy
                  tablet for children with AAC, speech AI, occupational games, and progress tracking.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {TABLET_PRODUCTS.map((product: TabletProduct, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    delay={0.08 + index * 0.08}
                    onSelect={dismiss}
                  />
                ))}
              </div>

              <div className="mt-6 pb-2 text-center">
                <button
                  type="button"
                  onClick={dismiss}
                  className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Continue exploring the site
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
