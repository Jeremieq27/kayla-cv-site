import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure this runs on Node.js (Nodemailer doesn't work on the Edge runtime)
export const runtime = "nodejs";

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

    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_USER,
      EMAIL_PASS,
      CONTACT_TO,
      CONTACT_FROM,
    } = process.env;

    // Validate server-side env vars exist
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !CONTACT_TO || !CONTACT_FROM) {
      console.error("CONTACT_FORM_ENV_MISSING", {
        EMAIL_HOST: !!EMAIL_HOST,
        EMAIL_PORT: !!EMAIL_PORT,
        EMAIL_USER: !!EMAIL_USER,
        EMAIL_PASS: !!EMAIL_PASS,
        CONTACT_TO: !!CONTACT_TO,
        CONTACT_FROM: !!CONTACT_FROM,
      });
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
    }

    const port = Number(EMAIL_PORT);
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure: port === 465, // true for SSL (465), false for STARTTLS (587)
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Optional: verify connection (can add ~200ms)
    // await transporter.verify();

    const subject = `New message from ${name} — Kayla CV Site`;
    const mail = await transporter.sendMail({
      from: `"Kayla CV Site" <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: email, // so you can reply directly to the sender
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    // Basic success logging (Message-ID is safe to log)
    console.log("CONTACT_FORM_SENT", { messageId: mail.messageId });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("CONTACT_FORM_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
