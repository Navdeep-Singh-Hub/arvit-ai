"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons/logo";
import { ButtonLink } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useCart } from "@/components/commerce/cart-provider";
import { useAudience } from "@/components/providers/audience-provider";
import { getAudienceNavGroups } from "@/lib/audience/filter";

export function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const closeTimer = useRef<number | null>(null);
  const { audience } = useAudience();
  const navGroups = getAudienceNavGroups(audience);
  const { count } = useCart();

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

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
      <header className="fixed inset-x-0 top-0 z-50 text-white">
        <p className="flex h-9 items-center justify-center bg-[#28958a] px-4 text-center text-sm font-medium sm:text-base">
          Now available · Book your AAC Device today
        </p>
        <div className="bg-[#15102b] shadow-[0_2px_12px_rgb(0_0_0_/_0.25)]">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-2 px-4 sm:h-[68px] sm:gap-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="ARVIT AI — home" className="min-w-0 shrink-0">
            <Logo className="text-white" markClassName="size-9 sm:size-10" />
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            <NavItem href="/#how-it-works" active={false}>
              How it works
            </NavItem>
            <NavItem href="/about" active={pathname === "/about"}>
              About
            </NavItem>

            {navGroups.map((group) => {
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
                      "flex items-center gap-1.5 px-4 py-2 text-base font-light transition-colors hover:text-[#ffd235]",
                      isActive ? "text-[#ffd235]" : "text-white"
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 top-full z-10 mt-3 w-80 -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-2 shadow-[0_18px_40px_-12px_rgb(21_16_43_/_0.35)]"
                      >
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#e0f5f4]"
                          >
                            <p className="font-display text-base text-[#15102b]">{item.label}</p>
                            <p className="mt-0.5 text-sm leading-snug text-black/65">
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

            <NavItem href="/catalog" active={pathname === "/catalog"}>
              Catalog
            </NavItem>
            <NavItem href="/contact" active={pathname === "/contact"}>
              Contact
            </NavItem>
          </nav>

          <div className="hidden items-center gap-3 text-white lg:flex">
            <Link
              href="/cart"
              aria-label={`Cart${count ? `, ${count} items` : ""}`}
              className="relative flex size-11 items-center justify-center rounded-[10px] text-white transition-colors hover:bg-white/10"
            >
              <ShoppingBag className="size-5 stroke-[1.75]" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#ffd235] text-[10px] font-bold text-[#15102b]">
                  {count}
                </span>
              ) : null}
            </Link>
            <ButtonLink
              href="/#tablets"
              variant="gradient"
              size="sm"
              magnetic={false}
              className="h-11 min-h-11 px-6 text-base"
            >
              Book now
            </ButtonLink>
          </div>

          <div className="flex min-w-0 items-center gap-0.5 sm:gap-1 lg:hidden">
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#ffd235] text-[#15102b]"
            >
              <ShoppingBag className="size-5 stroke-[1.5]" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#ff7463] text-[10px] font-bold text-white">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="ml-1 flex size-10 shrink-0 items-center justify-center text-white"
            >
              <Menu className="size-7" />
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
        "px-4 py-2 text-base font-light transition-colors hover:text-[#ffd235]",
        active ? "text-[#ffd235]" : "text-white"
      )}
    >
      {children}
    </Link>
  );
}
