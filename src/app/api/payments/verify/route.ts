import { NextResponse } from "next/server";
import { getBooking, markBookingPaid } from "@/lib/commerce/bookings-store";
import { getRazorpayConfig, verifyPaymentSignature } from "@/lib/commerce/razorpay";

type VerifyPayload = {
  bookingId?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

/** Called by the browser after Razorpay Checkout succeeds. The signature proves it. */
export async function POST(request: Request) {
  const config = getRazorpayConfig();
  if (!config) {
    return NextResponse.json({ error: "Online payment is not available right now." }, { status: 503 });
  }

  let body: VerifyPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { bookingId, razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (!bookingId || !orderId || !paymentId || !signature) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  if (!verifyPaymentSignature(config, orderId, paymentId, signature)) {
    console.warn("[payments] signature mismatch", { bookingId, orderId });
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const booking = await getBooking(bookingId);
  if (booking && booking.payment?.razorpayOrderId !== orderId) {
    return NextResponse.json({ error: "Payment does not match this booking." }, { status: 400 });
  }

  // The signature is valid, so the money was taken. If the local record is gone
  // (e.g. a serverless restart), the order notes in Razorpay still identify the customer.
  await markBookingPaid(orderId, paymentId);
  console.info("[payments] payment verified", { bookingId, orderId, paymentId });

  return NextResponse.json({ ok: true, bookingId });
}
