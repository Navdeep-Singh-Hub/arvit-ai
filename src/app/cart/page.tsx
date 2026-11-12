"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/components/commerce/cart-provider";
import { formatMoney } from "@/lib/commerce/products";

export default function CartPage() {
  const { lines, count, totalCents, setQuantity, removeItem, clearCart } = useCart();

  return (
    <section className="section-pad pt-36 sm:pt-40">
      <Container size="narrow">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-primary uppercase">Cart</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your booking
            </h1>
            <p className="mt-2 text-muted-foreground">
              {count === 0
                ? "Your cart is empty. Choose a device to book."
                : `${count} item${count === 1 ? "" : "s"} ready for checkout.`}
            </p>
          </div>
          {count > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {lines.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 text-center">
            <p className="text-muted-foreground">No apps in your cart yet.</p>
            <ButtonLink href="/#tablets" className="mt-6" variant="gradient">
              Browse apps
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {lines.map((line) => (
              <article
                key={line.productId}
                className="flex flex-col gap-4 rounded-3xl border border-border bg-card/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-wide text-brand-primary uppercase">
                    {line.product.audience}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-foreground">{line.product.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{line.product.tagline}</p>
                  <p className="mt-3 text-base font-semibold text-foreground">
                    {formatMoney(line.product.priceCents ?? 0, line.product.currency)}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">each</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-border bg-background">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(line.productId, line.quantity - 1)}
                      className="flex size-10 items-center justify-center rounded-full hover:bg-muted"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(line.productId, line.quantity + 1)}
                      className="flex size-10 items-center justify-center rounded-full hover:bg-muted"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${line.product.name}`}
                    onClick={() => removeItem(line.productId)}
                    className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </article>
            ))}

            <div className="rounded-3xl border border-border bg-muted/40 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Estimated total</span>
                <span className="text-2xl font-semibold text-foreground">{formatMoney(totalCents)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Pay securely online at checkout, or book now and pay after our team calls you to confirm delivery.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <ButtonLink href="/#tablets" variant="outline" magnetic={false}>
                  Keep browsing
                </ButtonLink>
                <ButtonLink href="/checkout" variant="gradient">
                  Checkout
                </ButtonLink>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need help choosing?{" "}
          <Link href="/contact" className="font-medium text-brand-primary hover:underline">
            Contact us
          </Link>
        </p>
      </Container>
    </section>
  );
}
