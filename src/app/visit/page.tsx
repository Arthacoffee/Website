import type { Metadata } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/sections/page-intro";
import { ReservationForm } from "@/components/sections/reservation-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { site, serviceWindows } from "@/content/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Visit & Reservations",
  description:
    "Find Artha Speciality Coffee on Defence Colony Road, Sainikpuri, Secunderabad. Hours by service window, directions, and table reservations.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Visit", path: "/visit" }])),
        }}
      />

      <PageIntro
        eyebrow="Visit"
        heading="Find us on Defence Colony Road"
        lead="An easy lift up to a room built for lingering, and a rooftop made for the evening. Table service, walk-ins welcome."
      />

      <section className="bg-background pt-4 pb-20 md:pt-8 md:pb-28">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin
                  size={20}
                  className="text-bronze-ink mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <strong className="text-body text-coffee block font-medium">
                    Address
                  </strong>
                  <a
                    href="https://maps.google.com/?q=Plot+820+Defence+Colony+Road+Sainikpuri+Secunderabad+500094"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-foreground/70 hover:text-bronze-ink"
                  >
                    {site.address.streetAddress}, {site.address.addressLocality} –{" "}
                    {site.address.postalCode}, {site.address.addressRegion}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone
                  size={20}
                  className="text-bronze-ink mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <strong className="text-body text-coffee block font-medium">
                    Phone
                  </strong>
                  <a
                    href={site.phoneHref}
                    className="text-body text-foreground/70 hover:text-bronze-ink"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail
                  size={20}
                  className="text-bronze-ink mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <strong className="text-body text-coffee block font-medium">
                    Email
                  </strong>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-body text-foreground/70 hover:text-bronze-ink"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Building2
                  size={20}
                  className="text-bronze-ink mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <strong className="text-body text-coffee block font-medium">
                    The Space
                  </strong>
                  <span className="text-body text-foreground/70">
                    A dining hall and a rooftop, connected by lift — come up for
                    the room, stay for the view.
                  </span>
                </div>
              </li>
            </ul>

            <table className="mt-10 w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-stone text-caption text-bronze-ink border-b pb-3 text-left font-medium tracking-[0.08em] uppercase">
                    Service Window
                  </th>
                  <th className="border-stone text-caption text-bronze-ink border-b pb-3 text-left font-medium tracking-[0.08em] uppercase">
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceWindows.map((row) => (
                  <tr key={row.label}>
                    <td className="border-stone text-body text-foreground/75 border-b py-3">
                      {row.label}
                    </td>
                    <td className="border-stone text-body text-foreground/75 border-b py-3">
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-stone mt-10 aspect-[16/12] w-full overflow-hidden border">
              <iframe
                src="https://www.google.com/maps?q=Plot+No.+820,+Defence+Colony+Road,+Sainikpuri,+Secunderabad+500094&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to Artha Speciality Coffee"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} id="reserve" className="scroll-mt-28">
            <div className="border-stone bg-stone/40 border p-8 md:p-10">
              <Eyebrow>Reserve A Table</Eyebrow>
              <h2 className="text-display-h3 font-display text-coffee mt-3">
                Tell us when you&apos;re coming
              </h2>
              <p className="text-body text-foreground/70 mt-3">
                For groups, the rooftop, or a private booking — send your
                details and we&apos;ll confirm by phone or email.
              </p>
              <div className="mt-8">
                <ReservationForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
