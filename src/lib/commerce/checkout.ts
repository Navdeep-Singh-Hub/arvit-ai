import { getPrebookProduct, isProductPurchasable, type PrebookProductId } from "@/lib/commerce/products";
import type { Booking, BookingLineItem } from "@/lib/commerce/types";

export type CheckoutPayload = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  items?: { productId?: string; quantity?: number }[];
};

type ParsedCheckout = Omit<Booking, "id" | "createdAt" | "status" | "payment">;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a checkout request and prices it from the server-side catalog.
 * Client-sent prices are never trusted.
 */
export function parseCheckout(body: CheckoutPayload): { ok: true; data: ParsedCheckout } | { ok: false; error: string } {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";
  const rawItems = Array.isArray(body.items) ? body.items : [];

  if (!name || !email) return { ok: false, error: "Name and email are required." };
  if (!isValidEmail(email)) return { ok: false, error: "Please provide a valid email address." };
  if (rawItems.length === 0) return { ok: false, error: "Your cart is empty." };

  const items: BookingLineItem[] = [];

  for (const item of rawItems) {
    const productId = item.productId as PrebookProductId | undefined;
    const quantity = Math.floor(Number(item.quantity) || 0);
    if (!productId || quantity < 1 || quantity > 20) return { ok: false, error: "Invalid cart item." };
    const product = getPrebookProduct(productId);
    if (!product) return { ok: false, error: `Unknown product: ${productId}` };
    if (!isProductPurchasable(product) || product.priceCents == null) {
      return { ok: false, error: `${product.name} is not available for booking right now.` };
    }
    items.push({ productId: product.id, name: product.name, quantity, unitPriceCents: product.priceCents });
  }

  const totalCents = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);

  return {
    ok: true,
    data: { customer: { name, email, phone, notes }, items, totalCents, currency: "INR" },
  };
}
