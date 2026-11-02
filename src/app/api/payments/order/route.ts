import { NextResponse } from "next/server";
import { createBooking, updateBooking } from "@/lib/commerce/bookings-store";
import { parseCheckout, type CheckoutPayload } from "@/lib/commerce/checkout";
import { createRazorpayOrder, getRazorpayConfig } from "@/lib/commerce/razorpay";

/**
 * Starts an online payment: creates the booking, then a Razorpay order for the
 * server-computed total. The browser gets only the public key id and the order id.
 */
export async function POST(request: Request) {
  const config = getRazorpayConfig();
  if (!config) {
    return NextResponse.json({ error: "Online payment is not available right now." }, { status: 503 });
  }

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

  const { customer, totalCents, currency, items } = parsed.data;

  const booking = await createBooking({
    ...parsed.data,
    payment: { method: "online", status: "unpaid" },
  });

  try {
    // Notes make the Razorpay dashboard a complete record of the order on its own.
    const order = await createRazorpayOrder(config, {
      amount: totalCents,
      currency,
      receipt: booking.id,
      notes: {
        booking_id: booking.id,
        name: customer.name.slice(0, 250),
        email: customer.email.slice(0, 250),
        phone: customer.phone.slice(0, 250),
        items: items.map((item) => `${item.name} x${item.quantity}`).join(", ").slice(0, 250),
      },
    });

    await updateBooking(
      (b) => b.id === booking.id,
      (b) => ({ payment: { ...b.payment!, razorpayOrderId: order.id } })
    );

    return NextResponse.json({
      keyId: config.keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      bookingId: booking.id,
      customer: { name: customer.name, email: customer.email, phone: customer.phone },
    });
  } catch (error) {
    console.error("[payments] order creation failed", { bookingId: booking.id, error });
    return NextResponse.json(
      { error: "We couldn't start the payment. Please try again, or choose “Book now, pay later”." },
      { status: 502 }
    );
  }
}
