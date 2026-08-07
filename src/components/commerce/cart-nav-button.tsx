"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/commerce/cart-provider";
import { cn } from "@/lib/utils";

export function CartNavButton({ className }: { className?: string }) {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted",
        className
      )}
    >
      <ShoppingCart className="size-5" />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
