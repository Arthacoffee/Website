import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parseReservation, isSpamSubmission } from "@/lib/reservation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { restaurantNotificationEmail, guestConfirmationEmail } from "@/lib/email-templates";
import { site } from "@/content/site";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromEmail = process.env.RESERVATIONS_FROM_EMAIL ?? "reservations@arthacoffee.com";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = parseReservation(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && key !== "company" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // Bots that fill the honeypot get a convincing success response, but no
  // email is ever sent and the request is dropped here.
  if (isSpamSubmission(result.data)) {
    return NextResponse.json({ ok: true, message: "Reservation request received." });
  }

  if (!resend) {
    console.info("[reservation] RESEND_API_KEY not set — logging instead of sending", result.data);
    return NextResponse.json({ ok: true, message: "Reservation request received." });
  }

  const notification = restaurantNotificationEmail(result.data);
  const { error } = await resend.emails.send({
    from: `Artha Reservations <${fromEmail}>`,
    to: site.email,
    replyTo: result.data.email,
    subject: notification.subject,
    html: notification.html,
  });

  if (error) {
    console.error("[reservation] failed to send restaurant notification", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't send your request. Please call us instead." },
      { status: 502 },
    );
  }

  const confirmation = guestConfirmationEmail(result.data);
  const { error: confirmationError } = await resend.emails.send({
    from: `Artha Speciality Coffee <${fromEmail}>`,
    to: result.data.email,
    subject: confirmation.subject,
    html: confirmation.html,
  });

  if (confirmationError) {
    // The request itself succeeded — the restaurant has it — so this is
    // logged, not surfaced as a failure to the guest.
    console.error("[reservation] failed to send guest confirmation", confirmationError);
  }

  return NextResponse.json({ ok: true, message: "Reservation request received." });
}
