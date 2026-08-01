import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  role?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // This endpoint validates and logs the inquiry but does not yet deliver it
  // anywhere. Wire it up to an email or CRM provider (Resend, Postmark,
  // HubSpot, etc.) before relying on it in production.
  console.info("[contact] new inquiry received", { name, email, role, messageLength: message.length });

  return NextResponse.json({ ok: true });
}
