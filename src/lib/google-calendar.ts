import { createSign } from "crypto";

/**
 * Google Calendar integration — architecture only, per the brief this was
 * built against: "prepare reusable architecture... do not automatically
 * create calendar events yet." Nothing in this file is called from
 * anywhere else in the codebase. It exists so that when the business
 * decides it wants confirmed reservations to appear on a real calendar,
 * the integration is a single call to `createReservationCalendarEvent()`
 * from the (currently manual) staff-confirmation step — not a new
 * project.
 *
 * Uses a Google Cloud service account with a JWT bearer flow, implemented
 * with Node's built-in `crypto` module rather than the `googleapis` SDK —
 * that package is large, and pulling it in for code that isn't wired up
 * yet would be exactly the "unnecessary dependency" this pass was told to
 * avoid. If this ever needs to do more than create simple events (recurring
 * events, free/busy queries, etc.), reconsider the trade-off then.
 *
 * Setup required before this can do anything (see docs/API_INTEGRATIONS.md):
 * 1. A Google Cloud project with the Calendar API enabled.
 * 2. A service account, with its JSON key's `client_email` and
 *    `private_key` set as GOOGLE_CALENDAR_CLIENT_EMAIL and
 *    GOOGLE_CALENDAR_PRIVATE_KEY.
 * 3. The target calendar shared with that service account's email
 *    address (Settings → Share with specific people → Make changes to
 *    events), with its ID set as GOOGLE_CALENDAR_ID.
 */

const CLIENT_EMAIL = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, "\n");
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";

export type CalendarEventInput = {
  summary: string;
  description?: string;
  /** ISO 8601 date-time with timezone offset, e.g. "2026-08-15T19:30:00+05:30". */
  start: string;
  end: string;
  attendeeEmail?: string;
};

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Signs a service-account JWT and exchanges it for a short-lived OAuth2 access token. */
async function getAccessToken(): Promise<string> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Google Calendar service account credentials are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claimSet = base64url(
    JSON.stringify({
      iss: CLIENT_EMAIL,
      scope: CALENDAR_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claimSet}`);
  signer.end();
  const signature = base64url(signer.sign(PRIVATE_KEY));

  const assertion = `${header}.${claimSet}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google token exchange failed: ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Creates a single event on the configured calendar. Not called from
 * anywhere in this codebase yet — see the module doc comment above.
 * Returns a `skipped` result rather than throwing when credentials
 * aren't configured, matching the fallback pattern used by
 * src/lib/whatsapp.ts and the Resend integration in
 * src/app/api/reservations/route.ts.
 */
export async function createReservationCalendarEvent(
  input: CalendarEventInput,
): Promise<{ ok: boolean; skipped?: boolean; error?: unknown }> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY || !CALENDAR_ID) {
    console.info("[google-calendar] not configured — skipping", { summary: input.summary });
    return { ok: true, skipped: true };
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: input.summary,
          description: input.description,
          start: { dateTime: input.start },
          end: { dateTime: input.end },
          attendees: input.attendeeEmail ? [{ email: input.attendeeEmail }] : undefined,
        }),
      },
    );

    if (!response.ok) {
      return { ok: false, error: await response.text() };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
