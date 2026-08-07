import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/commerce/admin-auth";
import { updateBookingStatus } from "@/lib/commerce/bookings-store";
import type { BookingStatus } from "@/lib/commerce/types";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled", "fulfilled"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  let body: { status?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const status = body.status as BookingStatus | undefined;
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const booking = await updateBookingStatus(id, status);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
