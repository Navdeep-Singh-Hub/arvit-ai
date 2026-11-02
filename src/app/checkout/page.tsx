"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/components/commerce/cart-provider";
import { formatMoney } from "@/lib/commerce/products";
import { SITE } from "@/lib/constants";

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve(true), { once: true });
    script.addEventListener("error", () => resolve(false), { once: true });
    if (!existing) {
      script.src = RAZORPAY_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

type Status = "idle" | "paying" | "booking" | "error";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, totalCents, clearCart } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const busy = status === "paying" || status === "booking";

  function fail(message: string) {
    setStatus("error");
    setError(message);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lines.length === 0) return fail("Your cart is empty.");

    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const mode = submitter?.value === "later" ? "later" : "online";

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      notes: String(form.get("notes") ?? ""),
      items: lines.map((line) => ({ productId: line.productId, quantity: line.quantity })),
    };

    setError("");
    if (mode === "later") {
      await bookPayLater(payload);
    } else {
      await payOnline(payload);
    }
  }

  async function bookPayLater(payload: object) {
    setStatus("booking");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; bookingId?: string };
      if (!response.ok) throw new Error(data.error || "Could not complete your booking.");
      clearCart();
      router.push(`/checkout/success?id=${encodeURIComponent(data.bookingId ?? "")}`);
    } catch (err) {
      fail(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  async function payOnline(payload: object) {
    setStatus("paying");
    try {
      const [loaded, response] = await Promise.all([
        loadRazorpay(),
        fetch("/api/payments/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ]);

      const order = (await response.json()) as {
        error?: string;
        keyId: string;
        orderId: string;
        amount: number;
        currency: string;
        bookingId: string;
        customer: { name: string; email: string; phone: string };
      };
      if (!response.ok) throw new Error(order.error || "Could not start the payment.");
      if (!loaded || !window.Razorpay) {
        throw new Error("The payment window couldn't load. Check your connection, or book now and pay later.");
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: SITE.name,
        description: "AAC Device",
        prefill: { name: order.customer.name, email: order.customer.email, contact: order.customer.phone },
        notes: { booking_id: order.bookingId },
        theme: { color: "#0c8f86" },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            setError("Payment cancelled. You can try again, or book now and pay later.");
          },
        },
        handler: async (result: RazorpaySuccess) => {
          try {
            const verify = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ bookingId: order.bookingId, ...result }),
            });
            if (!verify.ok) throw new Error();
            clearCart();
            router.push(`/checkout/success?id=${encodeURIComponent(order.bookingId)}&paid=1`);
          } catch {
            fail(
              `We received your payment but couldn't confirm it here. Please don't pay again — contact us with payment ID ${result.razorpay_payment_id}.`
            );
          }
        },
      });

      checkout.on("payment.failed", (response) => {
        fail(response.error?.description || "Payment failed. Please try again.");
      });
      checkout.open();
    } catch (err) {
      fail(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (lines.length === 0) {
    return (
      <section className="section-pad pt-28 sm:pt-32">
        <Container size="narrow" className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Nothing to check out</h1>
          <p className="mt-3 text-muted-foreground">Add the AAC Device to your cart first.</p>
          <ButtonLink href="/#tablets" className="mt-8" variant="gradient">
            See the device
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
            Complete your order
          </h1>
          <p className="mt-3 text-muted-foreground">
            Pay securely now, or book and pay after our team calls you.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card/70 p-6 sm:p-8">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required autoComplete="name" placeholder="Priya Sharma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" placeholder="priya@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Delivery address & notes</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Delivery address, best time to call, anything about your child we should know."
              />
            </div>

            {error ? (
              <p
                className={
                  status === "error"
                    ? "rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    : "rounded-xl bg-muted px-4 py-3 text-sm text-foreground"
                }
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                name="mode"
                value="online"
                variant="gradient"
                size="xl"
                disabled={busy}
                magnetic={false}
                className="w-full justify-center"
              >
                <Lock className="size-4" aria-hidden />
                {status === "paying" ? "Opening secure payment…" : `Pay ${formatMoney(totalCents)} now`}
              </Button>
              <Button
                type="submit"
                name="mode"
                value="later"
                variant="outline"
                size="xl"
                disabled={busy}
                magnetic={false}
                className="w-full justify-center"
              >
                {status === "booking" ? "Booking…" : "Book now, pay later"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Secure payments by Razorpay · UPI, cards, net banking & wallets
              </p>
            </div>

            <Link href="/cart" className="inline-block text-sm font-medium text-muted-foreground hover:text-foreground">
              ← Back to cart
            </Link>
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
                    {formatMoney((line.product.priceCents ?? 0) * line.quantity, line.product.currency)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total (inclusive)</span>
              <span className="text-xl font-semibold text-foreground">{formatMoney(totalCents)}</span>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
