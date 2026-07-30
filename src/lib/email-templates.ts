import type { ReservationInput } from "@/lib/reservation";
import { site } from "@/content/site";

const AREA_LABEL: Record<ReservationInput["area"], string> = {
  "dining-hall": "Dining Hall",
  rooftop: "Rooftop Terrace",
  "no-preference": "No preference",
};

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  const [hoursStr, minutes] = time.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours)) return time;
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${minutes} ${period}`;
}

/** Shared shell so both emails render identically in every client — inline styles only, no external CSS. */
function emailShell(opts: { preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0; padding:0; background-color:#f8f5f1; font-family:Georgia, 'Times New Roman', serif;">
  <span style="display:none; font-size:0; line-height:0; max-height:0; max-width:0; opacity:0; overflow:hidden;">${opts.preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f5f1;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="100%" style="max-width:520px; background-color:#fffaf3;">
          <tr>
            <td style="background-color:#3a2c25; padding:32px 40px; text-align:center;">
              <span style="font-family:Georgia, serif; font-size:22px; letter-spacing:4px; color:#f8f5f1; text-transform:uppercase;">Artha</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${opts.body}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px; border-top:1px solid #ece7e2; text-align:center;">
              <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#8a8378;">
                ${site.address.streetAddress}, ${site.address.addressLocality} – ${site.address.postalCode}<br />
                ${site.phone} &middot; ${site.email}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0; font-family:Arial, sans-serif; font-size:13px; color:#816130; text-transform:uppercase; letter-spacing:0.06em; width:120px; vertical-align:top;">${label}</td>
    <td style="padding:8px 0; font-family:Arial, sans-serif; font-size:15px; color:#111111;">${value}</td>
  </tr>`;
}

function detailsTable(data: ReservationInput): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    ${detailRow("Name", data.name)}
    ${detailRow("Date", formatDate(data.date))}
    ${detailRow("Time", formatTime(data.time))}
    ${detailRow("Party", `${data.partySize} guest${data.partySize === 1 ? "" : "s"}`)}
    ${detailRow("Preference", AREA_LABEL[data.area])}
    ${detailRow("Phone", data.phone)}
    ${detailRow("Email", data.email)}
    ${data.notes ? detailRow("Notes", data.notes) : ""}
  </table>`;
}

/** Sent to the restaurant when a guest submits the reservation form. */
export function restaurantNotificationEmail(data: ReservationInput): { subject: string; html: string } {
  const subject = `New reservation request — ${data.name}, ${formatDate(data.date)}`;
  const body = `
    <p style="margin:0 0 4px; font-family:Arial, sans-serif; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; color:#816130;">New Reservation Request</p>
    <h1 style="margin:0 0 8px; font-family:Georgia, serif; font-size:26px; color:#3a2c25;">${data.name}</h1>
    <p style="margin:0; font-family:Arial, sans-serif; font-size:14px; color:#4a4038;">Submitted via arthacoffee.com</p>
    ${detailsTable(data)}
    <p style="margin:24px 0 0; font-family:Arial, sans-serif; font-size:13px; color:#8a8378;">Reply to this guest directly, or call ${data.phone} to confirm.</p>
  `;
  return { subject, html: emailShell({ preheader: subject, body }) };
}

/** Sent to the guest confirming their request was received. */
export function guestConfirmationEmail(data: ReservationInput): { subject: string; html: string } {
  const firstName = data.name.trim().split(/\s+/)[0] ?? data.name;
  const subject = "We've received your reservation request";
  const body = `
    <p style="margin:0 0 4px; font-family:Arial, sans-serif; font-size:13px; letter-spacing:0.1em; text-transform:uppercase; color:#816130;">Request Received</p>
    <h1 style="margin:0 0 16px; font-family:Georgia, serif; font-size:26px; color:#3a2c25;">Thank you, ${firstName}.</h1>
    <p style="margin:0 0 16px; font-family:Arial, sans-serif; font-size:15px; line-height:1.6; color:#3a2c25;">
      We've received your request and will confirm by phone or email shortly. Here's what you sent us:
    </p>
    ${detailsTable(data)}
    <p style="margin:24px 0 0; font-family:Arial, sans-serif; font-size:14px; line-height:1.6; color:#4a4038;">
      Need to change anything before we confirm? Just reply to this email, or call us on ${site.phone}.
    </p>
  `;
  return { subject, html: emailShell({ preheader: subject, body }) };
}
