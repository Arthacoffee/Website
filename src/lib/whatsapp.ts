import type { ReservationInput } from "@/lib/reservation";

const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
const templateName = process.env.WHATSAPP_TEMPLATE_NAME ?? "reservation_acknowledgement";
const configured = Boolean(accessToken && phoneNumberId);

/**
 * Reformats a guest-entered number for the WhatsApp Cloud API, which wants
 * digits only with a country code and no leading "+". Assumes India (91)
 * when the guest typed a bare 10-digit mobile number, since that's the
 * overwhelming majority of what this form collects. Not a general-purpose
 * phone normalizer — good enough for the one country this business serves.
 */
function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits.replace(/^0+/, "");
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatTime(time: string): string {
  const [hoursStr, minutes] = time.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours)) return time;
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${minutes} ${period}`;
}

/**
 * Sends a guest acknowledgement via the WhatsApp Business Cloud API —
 * receipt only, never a confirmed booking (a human still has to review
 * availability). Business-initiated messages like this one fall outside
 * any customer-service window the guest might have open, so WhatsApp
 * requires a pre-approved Message Template rather than free-form text;
 * `templateName` must match one approved in Meta Business Manager. See
 * docs/RESERVATION_SYSTEM.md for the exact template body to submit and
 * the env vars this reads.
 *
 * Best-effort by design: a WhatsApp failure never blocks or fails the
 * reservation request — email is the channel of record.
 */
export async function sendReservationAcknowledgement(
  data: ReservationInput,
): Promise<{ ok: boolean; skipped?: boolean; error?: unknown }> {
  if (!configured) {
    console.info(
      "[whatsapp] WHATSAPP_ACCESS_TOKEN/WHATSAPP_PHONE_NUMBER_ID not set — skipping",
      { to: data.phone },
    );
    return { ok: true, skipped: true };
  }

  const firstName = data.name.trim().split(/\s+/)[0] ?? data.name;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: toWhatsAppNumber(data.phone),
          type: "template",
          template: {
            name: templateName,
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: firstName },
                  { type: "text", text: formatDate(data.date) },
                  { type: "text", text: formatTime(data.time) },
                  { type: "text", text: String(data.partySize) },
                ],
              },
            ],
          },
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return { ok: false, error: errorBody };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
