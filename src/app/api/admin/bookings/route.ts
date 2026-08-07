import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/commerce/admin-auth";
import { listBookings } from "@/lib/commerce/bookings-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const bookings = await listBookings();
  return NextResponse.json({ bookings });
}
