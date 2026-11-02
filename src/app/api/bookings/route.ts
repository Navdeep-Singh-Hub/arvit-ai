import { NextResponse } from "next/server";
import { createBooking } from "@/lib/commerce/bookings-store";
import { parseCheckout, type CheckoutPayload } from "@/lib/commerce/checkout";

/** "Book now, pay later" — our team follows up to collect payment. */
export async function POST(request: Request) {
  let body: CheckoutPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseCheckout(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const booking = await createBooking({
    ...parsed.data,
    payment: { method: "later", status: "unpaid" },
  });

  console.info("[booking] new booking created", {
    id: booking.id,
    email: parsed.data.customer.email,
    itemCount: parsed.data.items.length,
    totalCents: parsed.data.totalCents,
  });

  return NextResponse.json({ ok: true, bookingId: booking.id });
}
