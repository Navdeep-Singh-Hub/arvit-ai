"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTA, NAV_GROUPS } from "@/lib/constants";
import { Logo } from "@/components/icons/logo";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const closeTimer = useRef<number | null>(null);

  // Close any open menus on navigation. Adjusting state during render (rather
  // than in an Effect) avoids an extra render pass — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenGroup(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openGroupNow(label: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 180);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex h-[4.5rem] items-center justify-between rounded-2xl border px-4 transition-all duration-250 sm:h-20 sm:px-5",
              scrolled
                ? "glass border-white/25 shadow-[0_8px_32px_rgb(15_23_42_/_0.08)]"
                : "border-transparent bg-transparent"
            )}
          >
            <Link href="/" aria-label="ARVIT AI — home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              <NavItem href="/about" active={pathname === "/about"}>
                About
              </NavItem>

              {NAV_GROUPS.map((group) => {
                const isOpen = openGroup === group.label;
                const isActive = group.items.some((item) => item.href === pathname);
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => openGroupNow(group.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenGroup(isOpen ? null : group.label)}
                      aria-expanded={isOpen}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive ? "text-brand-primary" : "text-foreground/80 hover:text-foreground"
                      )}
                    >
                      {group.label}
                      <ChevronDown
                        className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="glass-strong absolute left-1/2 top-full z-10 mt-3 w-80 -translate-x-1/2 rounded-2xl p-2 shadow-2xl"
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block rounded-xl px-4 py-3 transition-colors hover:bg-foreground/[0.04]"
                            >
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <NavItem href="/contact" active={pathname === "/contact"}>
                Contact
              </NavItem>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <ButtonLink href="/contact" variant="outline" size="sm" magnetic={false}>
                {CTA.bookDemo}
              </ButtonLink>
              <ButtonLink href="/contact" variant="gradient" size="sm">
                {CTA.getStarted}
              </ButtonLink>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                className="flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavItem({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "text-brand-primary" : "text-foreground/80 hover:text-foreground"
      )}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-brand-primary/10"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}
