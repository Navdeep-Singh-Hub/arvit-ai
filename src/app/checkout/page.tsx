"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/components/commerce/cart-provider";
import { formatMoney } from "@/lib/commerce/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, count, totalCents, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (count === 0 && status === "idle") {
      // Allow empty cart render briefly; user can navigate back.
    }
  }, [count, status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lines.length === 0) {
      setError("Your cart is empty.");
      setStatus("error");
      return;
    }

    const form = new FormData(event.currentTarget);
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          notes: String(form.get("notes") ?? ""),
          items: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
          })),
        }),
      });

      const data = (await response.json()) as { error?: string; bookingId?: string };
      if (!response.ok) {
        throw new Error(data.error || "Could not complete pre-booking.");
      }

      clearCart();
      router.push(`/checkout/success?id=${encodeURIComponent(data.bookingId ?? "")}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (lines.length === 0) {
    return (
      <section className="section-pad pt-28 sm:pt-32">
        <Container size="narrow" className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Nothing to check out</h1>
          <p className="mt-3 text-muted-foreground">Add an AAC or Therapy app to your cart first.</p>
          <ButtonLink href="/#tablets" className="mt-8" variant="gradient">
            Browse apps
          </ButtonLink>
        </Container>
      </section>
    );
  }

  return (
    <section className="section-pad pt-28 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-primary uppercase">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Complete your pre-booking
          </h1>
          <p className="mt-3 text-muted-foreground">
            Share your details and we&apos;ll confirm both apps and next steps by email.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card/70 p-6 sm:p-8">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required autoComplete="name" placeholder="Alex Rivera" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="alex@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 415 555 0198" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Tell us about devices needed, clinic size, or preferred timeline."
              />
            </div>

            {status === "error" && error ? (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/cart" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                ← Back to cart
              </Link>
              <Button type="submit" variant="gradient" disabled={status === "submitting"} magnetic={false}>
                {status === "submitting" ? "Submitting…" : "Confirm pre-booking"}
              </Button>
            </div>
          </form>

          <aside className="h-fit rounded-3xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Order summary</h2>
            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={line.productId} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{line.product.name}</p>
                    <p className="text-muted-foreground">Qty {line.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground">
                    {formatMoney(
                      (line.product.priceCents ?? 0) * line.quantity,
                      line.product.currency
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-xl font-semibold text-foreground">{formatMoney(totalCents)}</span>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
