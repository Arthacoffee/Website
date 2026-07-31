import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\s-]{7,15}$/, "Enter a valid phone number"),
  email: z.email("Enter a valid email"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  partySize: z.coerce
    .number()
    .int()
    .min(1, "At least 1 guest")
    .max(75, "Call us for larger groups"),
  area: z.enum(["dining-hall", "rooftop", "no-preference"]),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  /**
   * Honeypot field. Real guests never see or fill this (visually hidden,
   * removed from tab order in ReservationForm) — a non-empty value here
   * means a bot filled every field it could find. Deliberately *not*
   * constrained to empty here (no `.max(0)`) — that would make this whole
   * schema reject a filled honeypot as a generic validation failure
   * before `isSpamSubmission` ever runs, which both defeats the point of
   * a honeypot (the bot gets an honest "invalid" instead of a convincing
   * fake success) and risks a real user's autofilled browser tripping a
   * scary "check the highlighted fields" error that highlights nothing.
   * `isSpamSubmission` below is the single, sole place this field is
   * ever acted on.
   */
  company: z.string().optional().or(z.literal("")),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export type ReservationFieldErrors = Partial<
  Record<Exclude<keyof ReservationInput, "company">, string>
>;

export function parseReservation(data: unknown) {
  return reservationSchema.safeParse(data);
}

/** True when the honeypot field was filled — the request is very likely automated. */
export function isSpamSubmission(data: ReservationInput): boolean {
  return Boolean(data.company);
}
