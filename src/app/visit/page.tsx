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
        lead="Three connected levels — kitchen below, dining hall on the third floor, rooftop terrace above — with lift access throughout. Table service only, walk-ins welcome."
      />

      <section className="bg-background py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-1 shrink-0 text-bronze-ink" aria-hidden="true" />
                <div>
                  <strong className="block text-body font-medium text-coffee">Address</strong>
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
                <Phone size={20} className="mt-1 shrink-0 text-bronze-ink" aria-hidden="true" />
                <div>
                  <strong className="block text-body font-medium text-coffee">Phone</strong>
                  <a href={site.phoneHref} className="text-body text-foreground/70 hover:text-bronze-ink">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="mt-1 shrink-0 text-bronze-ink" aria-hidden="true" />
                <div>
                  <strong className="block text-body font-medium text-coffee">Email</strong>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-body text-foreground/70 hover:text-bronze-ink"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Building2 size={20} className="mt-1 shrink-0 text-bronze-ink" aria-hidden="true" />
                <div>
                  <strong className="block text-body font-medium text-coffee">The Layout</strong>
                  <span className="text-body text-foreground/70">
                    2nd floor kitchen &amp; office · 3rd floor dining hall · rooftop terrace —
                    connected by lift, 75 seats total
                  </span>
                </div>
              </li>
            </ul>

            <table className="mt-10 w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-stone pb-3 text-left text-caption font-medium tracking-[0.08em] text-bronze-ink uppercase">
                    Service Window
                  </th>
                  <th className="border-b border-stone pb-3 text-left text-caption font-medium tracking-[0.08em] text-bronze-ink uppercase">
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceWindows.map((row) => (
                  <tr key={row.label}>
                    <td className="border-b border-stone py-3 text-body text-foreground/75">
                      {row.label}
                    </td>
                    <td className="border-b border-stone py-3 text-body text-foreground/75">
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-10 aspect-[16/12] w-full overflow-hidden border border-stone">
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
            <div className="border border-stone bg-stone/40 p-8 md:p-10">
              <Eyebrow>Reserve A Table</Eyebrow>
              <h2 className="mt-3 text-display-h3 font-display text-coffee">
                Tell us when you&apos;re coming
              </h2>
              <p className="mt-3 text-body text-foreground/70">
                For groups, the rooftop terrace, or a private booking — send us your details
                and we&apos;ll confirm by phone or email.
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
