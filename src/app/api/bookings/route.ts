import { NextResponse } from "next/server";
import { createBooking } from "@/lib/commerce/bookings-store";
import {
  getPrebookProduct,
  isProductPurchasable,
  type PrebookProductId,
} from "@/lib/commerce/products";
import type { BookingLineItem } from "@/lib/commerce/types";

type CheckoutPayload = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  items?: { productId?: string; quantity?: number }[];
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: CheckoutPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";
  const rawItems = Array.isArray(body.items) ? body.items : [];

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const items: BookingLineItem[] = [];

  for (const item of rawItems) {
    const productId = item.productId as PrebookProductId | undefined;
    const quantity = Math.floor(Number(item.quantity) || 0);
    if (!productId || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    }
    const product = getPrebookProduct(productId);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${productId}` }, { status: 400 });
    }
    if (!isProductPurchasable(product) || product.priceCents == null) {
      return NextResponse.json(
        { error: `${product.name} is not available for booking right now.` },
        { status: 400 }
      );
    }
    items.push({
      productId: product.id,
      name: product.name,
      quantity,
      unitPriceCents: product.priceCents,
    });
  }

  const totalCents = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);

  const booking = await createBooking({
    customer: { name, email, phone, notes },
    items,
    totalCents,
    currency: "INR",
  });

  console.info("[booking] new booking created", {
    id: booking.id,
    email,
    itemCount: items.length,
    totalCents,
  });

  return NextResponse.json({ ok: true, bookingId: booking.id });
}

