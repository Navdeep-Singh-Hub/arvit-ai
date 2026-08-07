import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "arvit_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "arvit-admin";
}

function getAdminSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "arvit-dev-secret";
}

export function createAdminSessionToken() {
  return createHmac("sha256", getAdminSecret()).update("arvit-admin-session-v1").digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = getAdminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  const expected = Buffer.from(createAdminSessionToken());
  const actual = Buffer.from(token);
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return isValidAdminToken(jar.get(ADMIN_COOKIE)?.value);
}
