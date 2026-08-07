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
  currency: "INR";
};

export type CartItem = {
  productId: PrebookProductId;
  quantity: number;
};
