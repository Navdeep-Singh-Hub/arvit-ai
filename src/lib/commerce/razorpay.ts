import { createHmac, timingSafeEqual } from "crypto";

/**
 * Minimal Razorpay client (Orders API + signature checks) using fetch — no SDK needed.
 * Credentials come only from env vars; the key secret never reaches the browser.
 */

type RazorpayConfig = { keyId: string; keySecret: string; webhookSecret: string | null };

export function getRazorpayConfig(): RazorpayConfig | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret, webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || null };
}

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
};

export async function createRazorpayOrder(
  config: RazorpayConfig,
  input: { amount: number; currency: "USD" | "INR"; receipt: string; notes: Record<string, string> }
): Promise<RazorpayOrder> {
  const auth = Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Razorpay order failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  return (await response.json()) as RazorpayOrder;
}

function safeEqualHex(expectedHex: string, receivedHex: string): boolean {
  const expected = Buffer.from(expectedHex, "hex");
  const received = Buffer.from(receivedHex, "hex");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

/** Checkout handler signature: HMAC_SHA256(order_id + "|" + payment_id, key_secret). */
export function verifyPaymentSignature(
  config: RazorpayConfig,
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!/^[a-f0-9]+$/i.test(signature)) return false;
  const expected = createHmac("sha256", config.keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

/** Webhook signature: HMAC_SHA256(raw request body, webhook_secret). */
export function verifyWebhookSignature(config: RazorpayConfig, rawBody: string, signature: string): boolean {
  if (!config.webhookSecret || !/^[a-f0-9]+$/i.test(signature)) return false;
  const expected = createHmac("sha256", config.webhookSecret).update(rawBody).digest("hex");
  return safeEqualHex(expected, signature);
}
