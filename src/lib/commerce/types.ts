import type { PrebookProductId } from "@/lib/commerce/products";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "fulfilled";

export type BookingLineItem = {
  productId: PrebookProductId;
  name: string;
  quantity: number;
  unitPriceCents: number;
};

export type Booking = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  items: BookingLineItem[];
  totalCents: number;
  /** New bookings are USD; bookings made before the switch are INR. */
  currency: "USD" | "INR";
  /** Missing on bookings made before online payment existed (treated as pay-later). */
  payment?: BookingPayment;
};

export type BookingPayment = {
  method: "online" | "later";
  status: "unpaid" | "paid";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paidAt?: string;
};

export type CartItem = {
  productId: PrebookProductId;
  quantity: number;
};
