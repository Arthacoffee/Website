"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { FormField, inputClasses } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import {
  parseReservation,
  type ReservationFieldErrors,
  type ReservationInput,
} from "@/lib/reservation";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  partySize: "2",
  area: "dining-hall" as const,
  notes: "",
  company: "",
};

const AREA_LABEL: Record<ReservationInput["area"], string> = {
  "dining-hall": "Dining Hall",
  rooftop: "Rooftop Terrace",
  "no-preference": "No preference",
};

function formatSummaryDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatSummaryTime(time: string): string {
  const [hoursStr, minutes] = time.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours)) return time;
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${minutes} ${period}`;
}

export function ReservationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ReservationFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<typeof initialValues | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Move focus to the first invalid field once the error state has
  // actually rendered as aria-invalid — a keyboard/screen-reader user
  // shouldn't have to hunt for what needs fixing.
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  function update<K extends keyof typeof initialValues>(
    key: K,
    value: (typeof initialValues)[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The honeypot field is unreachable by tab and hidden from screen
    // readers, so no sighted, keyboard, or assistive-tech user can ever
    // legitimately type into it — a non-empty value here is browser
    // autofill, not a real answer, and must never block a genuine
    // submission with a confusing "check the highlighted fields" error
    // that highlights nothing a person can see. Real bots that skip this
    // client entirely and POST straight to the API are still caught by
    // the server's own honeypot check, independent of this.
    const payload = { ...values, company: "" };

    const parsed = parseReservation(payload);
    if (!parsed.success) {
      const fieldErrors: ReservationFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in fieldErrors)) {
          fieldErrors[key as keyof ReservationFieldErrors] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setConfirmed(values);
      setValues(initialValues);
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please call us instead.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-stone bg-stone/60 flex flex-col items-start gap-6 border p-10 text-left"
      >
        <CheckCircle2 className="text-forest" size={32} aria-hidden="true" />

        <div>
          <h3 className="font-display text-coffee text-2xl">
            Thank you for choosing Artha.
          </h3>
          <p className="text-body text-foreground/70 mt-3 leading-relaxed">
            We&apos;ve received your reservation request. Our team will review
            availability and confirm your booking shortly. You&apos;ll receive
            updates via email and WhatsApp.
          </p>
        </div>

        {confirmed ? (
          <dl className="border-stone grid w-full grid-cols-2 gap-x-6 gap-y-3 border-t pt-6 sm:grid-cols-4">
            <div>
              <dt className="text-caption text-bronze-ink tracking-[0.08em] uppercase">
                Date
              </dt>
              <dd className="text-body text-coffee mt-1">
                {formatSummaryDate(confirmed.date)}
              </dd>
            </div>
            <div>
              <dt className="text-caption text-bronze-ink tracking-[0.08em] uppercase">
                Time
              </dt>
              <dd className="text-body text-coffee mt-1">
                {formatSummaryTime(confirmed.time)}
              </dd>
            </div>
            <div>
              <dt className="text-caption text-bronze-ink tracking-[0.08em] uppercase">
                Party
              </dt>
              <dd className="text-body text-coffee mt-1">
                {confirmed.partySize} guest{confirmed.partySize === "1" ? "" : "s"}
              </dd>
            </div>
            <div>
              <dt className="text-caption text-bronze-ink tracking-[0.08em] uppercase">
                Preference
              </dt>
              <dd className="text-body text-coffee mt-1">
                {AREA_LABEL[confirmed.area]}
              </dd>
            </div>
          </dl>
        ) : null}

        <Button
          type="button"
          variant="outline"
          className="text-coffee"
          onClick={() => {
            setStatus("idle");
            setConfirmed(null);
          }}
        >
          Make Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      {/*
        Honeypot: invisible to sighted and screen-reader users, never
        reached by tab. Bots that fill every field they can find will fill
        this too. Named and labelled to avoid matching any browser
        autofill category ("company"/"organization" is a common one that
        address-autofill heuristics target even off-screen) — real users'
        browsers should never populate this, but handleSubmit clears it
        before validating regardless, since a false positive here should
        never be able to block a genuine reservation.
      */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="artha-hp">Leave this field blank</label>
        <input
          id="artha-hp"
          name="artha_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClasses}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>
        <FormField id="phone" label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={inputClasses}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </FormField>
      </div>

      <FormField id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="date" label="Date" error={errors.date}>
          <input
            id="date"
            name="date"
            type="date"
            required
            className={inputClasses}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
        </FormField>
        <FormField id="time" label="Time" error={errors.time}>
          <input
            id="time"
            name="time"
            type="time"
            required
            className={inputClasses}
            value={values.time}
            onChange={(e) => update("time", e.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? "time-error" : undefined}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField id="partySize" label="Party size" error={errors.partySize}>
          <input
            id="partySize"
            name="partySize"
            type="number"
            min={1}
            max={75}
            required
            className={inputClasses}
            value={values.partySize}
            onChange={(e) => update("partySize", e.target.value)}
            aria-invalid={Boolean(errors.partySize)}
            aria-describedby={errors.partySize ? "partySize-error" : undefined}
          />
        </FormField>
        <FormField id="area" label="Preference">
          <select
            id="area"
            name="area"
            className={inputClasses}
            value={values.area}
            onChange={(e) => update("area", e.target.value as typeof values.area)}
          >
            <option value="dining-hall">Dining Hall</option>
            <option value="rooftop">Rooftop Terrace</option>
            <option value="no-preference">No Preference</option>
          </select>
        </FormField>
      </div>

      <FormField id="notes" label="Notes (optional)">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={inputClasses}
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </FormField>

      {status === "error" && message ? (
        <p role="alert" className="text-body text-red-700">
          {message}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "loading"} className={cn("w-full")}>
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={16} aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Request Reservation"
        )}
      </Button>
    </form>
  );
}
