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
import { AudienceSwitcher } from "@/components/audience/audience-switcher";
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
      <header className="fixed inset-x-0 top-0 z-50 bg-black text-white">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link href="/" aria-label="ARVIT AI — home" className="shrink-0">
            <Logo className="text-white" />
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
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
                      "text-nav flex items-center gap-1 px-3 py-2 transition-opacity hover:opacity-70",
                      isActive ? "text-white" : "text-white/80"
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn("size-3 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 top-full z-10 mt-3 w-80 -translate-x-1/2 border border-white/10 bg-black p-2 shadow-2xl"
                      >
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-3 transition-colors hover:bg-white/5"
                          >
                            <p className="text-sm font-semibold text-white">{item.label}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-white/50">
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

            <NavItem href="/aac-communication" active={pathname === "/aac-communication"}>
              AAC Device
            </NavItem>
            <NavItem href="/contact" active={pathname === "/contact"}>
              Contact
            </NavItem>
          </nav>

          <div className="hidden items-center gap-3 text-white lg:flex">
            <AudienceSwitcher />
            <Link
              href="/cart"
              aria-label={`Cart${count ? `, ${count} items` : ""}`}
              className="relative flex size-9 items-center justify-center text-white transition-opacity hover:opacity-70"
            >
              <ShoppingBag className="size-[18px] stroke-[1.5]" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                  {count}
                </span>
              ) : null}
            </Link>
            <ButtonLink
              href="/#tablets"
              variant="white"
              size="sm"
              magnetic={false}
              className="text-nav h-9 min-h-9 rounded-none px-4 !text-black"
            >
              Pre-book
            </ButtonLink>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <AudienceSwitcher className="mr-0.5" />
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex size-10 items-center justify-center text-white"
            >
              <ShoppingBag className="size-5 stroke-[1.5]" />
              {count > 0 ? (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center text-white"
            >
              <Menu className="size-5" />
            </button>
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
        "text-nav px-3 py-2 transition-opacity hover:opacity-70",
        active ? "text-white" : "text-white/80"
      )}
    >
      {children}
    </Link>
  );
}
