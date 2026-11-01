"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/commerce/products";
import type { Booking, BookingStatus } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled", "fulfilled"];

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.status === 401) {
        router.replace("/admin");
        return;
      }
      const data = (await res.json()) as { bookings?: Booking[]; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load bookings.");
      setBookings(data.bookings ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) {
        router.replace("/admin");
        return;
      }
      const data = (await res.json()) as { booking?: Booking; error?: string };
      if (!res.ok) throw new Error(data.error || "Update failed.");
      setBookings((prev) => prev.map((b) => (b.id === id ? (data.booking as Booking) : b)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
    router.refresh();
  }

  return (
    <section className="section-pad pt-28 sm:pt-32">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-primary uppercase">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Bookings</h1>
            <p className="mt-2 text-muted-foreground">
              All AAC Device and AAC + Therapy Progress App reservations.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" magnetic={false} onClick={() => void load()}>
              Refresh
            </Button>
            <Button type="button" variant="ghost" size="sm" magnetic={false} onClick={() => void logout()}>
              Sign out
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="mt-12 text-muted-foreground">Loading bookings…</p>
        ) : error ? (
          <p className="mt-12 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : bookings.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 text-center text-muted-foreground">
            No bookings yet. When customers check out, they will appear here.
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-3xl border border-border bg-card/70 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={booking.status} />
                      <span className="font-mono text-xs text-muted-foreground">{booking.id}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">{booking.customer.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a href={`mailto:${booking.customer.email}`} className="hover:text-foreground">
                        {booking.customer.email}
                      </a>
                      {booking.customer.phone ? ` · ${booking.customer.phone}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(booking.createdAt).toLocaleString()}
                    </p>
                    {booking.customer.notes ? (
                      <p className="mt-3 rounded-xl bg-muted/50 px-3 py-2 text-sm text-foreground/85">
                        {booking.customer.notes}
                      </p>
                    ) : null}
                    <ul className="mt-4 space-y-1.5 text-sm">
                      {booking.items.map((item) => (
                        <li key={`${booking.id}-${item.productId}`} className="flex justify-between gap-4">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatMoney(item.unitPriceCents * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-base font-semibold">
                      Total {formatMoney(booking.totalCents)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={updatingId === booking.id || booking.status === status}
                        onClick={() => void updateStatus(booking.id, status)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                          booking.status === status
                            ? "bg-brand-primary text-white"
                            : "bg-muted text-foreground/80 hover:bg-muted/80 disabled:opacity-50"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    confirmed: "bg-brand-primary/15 text-brand-primary",
    cancelled: "bg-destructive/15 text-destructive",
    fulfilled: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase", styles[status])}>
      {status}
    </span>
  );
}
