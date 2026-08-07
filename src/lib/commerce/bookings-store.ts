import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Booking, BookingStatus } from "@/lib/commerce/types";

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

type StoreShape = {
  bookings: Booking[];
};

let writeQueue: Promise<void> = Promise.resolve();

async function ensureStore(): Promise<StoreShape> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    if (!Array.isArray(parsed.bookings)) return { bookings: [] };
    return parsed;
  } catch {
    const empty: StoreShape = { bookings: [] };
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function writeStore(store: StoreShape) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export async function listBookings(): Promise<Booking[]> {
  const store = await ensureStore();
  return [...store.bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "status">
): Promise<Booking> {
  return withLock(async () => {
    const store = await ensureStore();
    const booking: Booking = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    store.bookings.unshift(booking);
    await writeStore(store);
    return booking;
  });
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking | null> {
  return withLock(async () => {
    const store = await ensureStore();
    const index = store.bookings.findIndex((booking) => booking.id === id);
    if (index === -1) return null;
    store.bookings[index] = { ...store.bookings[index], status };
    await writeStore(store);
    return store.bookings[index];
  });
}
