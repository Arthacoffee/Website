"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { FormField, inputClasses } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { parseReservation, type ReservationFieldErrors } from "@/lib/reservation";
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
};

export function ReservationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ReservationFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  function update<K extends keyof typeof initialValues>(key: K, value: (typeof initialValues)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = parseReservation(values);
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
      setMessage(`Thank you, ${values.name.split(" ")[0]}. We'll confirm by phone or email shortly.`);
      setValues(initialValues);
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please call us instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 border border-stone bg-stone/60 p-10 text-left">
        <CheckCircle2 className="text-forest" size={28} aria-hidden="true" />
        <h3 className="font-display text-2xl text-coffee">Request Received</h3>
        <p className="text-body text-foreground/70">{message}</p>
        <Button variant="outline" className="text-coffee" onClick={() => setStatus("idle")}>
          Make Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
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
            <option value="dining-hall">3rd Floor Dining Hall</option>
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
