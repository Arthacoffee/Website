import { NextResponse } from "next/server";
import { parseReservation } from "@/lib/reservation";

/**
 * Reservation intake endpoint. Validates and (for now) logs the request —
 * there is no live booking system or payment behind this yet. Wire this up
 * to a real notification path (email via Resend/SES, a webhook to the
 * front-of-house tablet, a CRM) before depending on it for real bookings.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = parseReservation(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // TODO: forward `result.data` to a real notification channel.
  console.info("[reservation] new request", result.data);

  return NextResponse.json({ ok: true, message: "Reservation request received." });
}
