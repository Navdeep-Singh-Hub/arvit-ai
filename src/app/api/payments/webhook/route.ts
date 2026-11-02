import { NextResponse } from "next/server";
import { markBookingPaid } from "@/lib/commerce/bookings-store";
import { getRazorpayConfig, verifyWebhookSignature } from "@/lib/commerce/razorpay";

type WebhookEvent = {
  event?: string;
  payload?: {
    payment?: { entity?: { id?: string; order_id?: string; status?: string } };
    order?: { entity?: { id?: string } };
  };
};

/**
 * Razorpay → server confirmation. Catches payments where the customer closed the
 * tab before the browser could call /api/payments/verify.
 * Dashboard: Settings → Webhooks → URL https://<your-domain>/api/payments/webhook,
 * events: payment.captured, order.paid.
 */
export async function POST(request: Request) {
  const config = getRazorpayConfig();
  if (!config?.webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(config, rawBody, signature)) {
    console.warn("[payments] webhook signature mismatch");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: WebhookEvent;
  try {
    event = JSON.parse(rawBody) as WebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (event.event === "payment.captured" || event.event === "order.paid") {
    const payment = event.payload?.payment?.entity;
    const orderId = payment?.order_id ?? event.payload?.order?.entity?.id;
    if (orderId && payment?.id) {
      const booking = await markBookingPaid(orderId, payment.id);
      console.info("[payments] webhook marked paid", { event: event.event, orderId, found: Boolean(booking) });
    }
  }

  // Always 200 for verified events so Razorpay doesn't retry ones we ignore.
  return NextResponse.json({ ok: true });
}
