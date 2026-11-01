"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { CTA } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/button";
import { getAudienceNavGroups } from "@/lib/audience/filter";
import { useAudience } from "@/components/providers/audience-provider";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const { audience, copy } = useAudience();
  const navGroups = getAudienceNavGroups(audience);
  const productHref = copy?.productHref ?? "/aac-communication";
  const productLabel = copy?.productPageLabel ?? "AAC Device";

  const sections = [
    { label: "", items: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "How it works", href: "/#how-it-works" }, { label: "Catalog", href: "/catalog" }] },
    ...navGroups.map((group) => ({
      label: group.label,
      items: group.items.map((i) => ({ label: i.label, href: i.href })),
    })),
    { label: "", items: [{ label: "Contact", href: "/contact" }] },
  ];

  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = original || "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = original;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-brand-ink/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-sm flex-col overflow-y-auto border-l border-black/10 bg-white p-5 text-black sm:p-6 lg:hidden"
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-2 flex flex-1 flex-col gap-1">
              {sections.map((section, index) => (
                <div key={index} className={cn(section.label && "mt-4 border-t border-border/60 pt-4")}>
                  {section.label ? (
                    <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.label}
                    </p>
                  ) : null}
                  {section.items.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={onClose}
                      className={cn(
                        "block rounded-xl px-3 py-3 text-base font-medium transition-colors",
                        pathname === item.href
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-foreground/85 hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-6">
              <ButtonLink
                href={productHref}
                variant="outline"
                magnetic={false}
                className="w-full justify-center"
                onClick={onClose}
              >
                {productLabel}
              </ButtonLink>
              <ButtonLink
                href="/#tablets"
                variant="gradient"
                magnetic={false}
                className="w-full justify-center"
                onClick={onClose}
              >
                {CTA.preBook}
              </ButtonLink>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
