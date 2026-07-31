import { randomUUID } from "crypto";
import { mkdir, appendFile } from "fs/promises";
import path from "path";
import type { ReservationInput } from "@/lib/reservation";

export type StoredReservation = ReservationInput & {
  id: string;
  receivedAt: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "reservations.jsonl");

/**
 * Persists a reservation before any notification is attempted, so a
 * genuine request is never lost purely because Resend or the WhatsApp
 * Cloud API had an outage — the API route calls this first, then
 * attempts email and WhatsApp afterward.
 *
 * The default implementation here appends to a local JSON-lines file.
 * That's genuinely durable for local development and for a
 * single-instance deployment (a Node server running `next start` on one
 * machine) — it is NOT durable on stateless/serverless hosting (Vercel
 * functions, in particular): each invocation can land on a different
 * instance with its own ephemeral filesystem, so a write here can be
 * invisible to the next request or gone entirely on the next cold start.
 *
 * This function is intentionally the *only* place that fact matters.
 * Before deploying to serverless infrastructure, replace the body of
 * this function with a call to a real managed store (Vercel Postgres,
 * Supabase, even an append to a Google Sheet via its API) — the
 * signature and the call site in `src/app/api/reservations/route.ts`
 * don't need to change. See docs/RESERVATION_SYSTEM.md for the specific
 * recommendation and why a local file was still worth shipping now
 * rather than shipping no persistence at all.
 *
 * Failure here is logged but never thrown — a storage hiccup must not
 * be able to block a reservation whose email notification would
 * otherwise have gone through fine.
 */
export async function saveReservation(
  data: ReservationInput,
): Promise<{ ok: boolean; record: StoredReservation }> {
  const record: StoredReservation = {
    ...data,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
  };

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(DATA_FILE, `${JSON.stringify(record)}\n`, "utf-8");
    return { ok: true, record };
  } catch (error) {
    console.error("[reservation-store] failed to persist reservation", error);
    return { ok: false, record };
  }
}
