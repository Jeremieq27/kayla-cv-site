import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { name, email, message, honey } = await req.json();

    // Honeypot anti-bot: hidden field should be empty
    if (honey) return NextResponse.json({ ok: true }, { status: 200 });

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // TODO: Hook up mail provider (Vercel env vars) — for now log only
    console.log("CONTACT_FORM", { name, email, message });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("CONTACT_FORM_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
