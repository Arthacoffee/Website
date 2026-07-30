import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/content/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone bg-coffee text-background/80">
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl tracking-[0.14em] text-background uppercase">
              {site.name}
            </span>
            <p className="mt-5 max-w-sm text-body text-background/70">{site.description}</p>
            <p className="mt-6 font-display text-lg italic text-bronze-light">{site.tagline}</p>
          </div>

          <div>
            <h4 className="text-caption font-medium tracking-[0.16em] text-background/50 uppercase">
              Explore
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body text-background/75 transition-colors hover:text-bronze-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-caption font-medium tracking-[0.16em] text-background/50 uppercase">
              Visit Us
            </h4>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-bronze-light" aria-hidden="true" />
                <a
                  href="https://maps.google.com/?q=Plot+820+Defence+Colony+Road+Sainikpuri+Secunderabad+500094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-background/75 hover:text-bronze-light"
                >
                  {site.address.streetAddress}, {site.address.addressLocality} –{" "}
                  {site.address.postalCode}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-bronze-light" aria-hidden="true" />
                <a href={site.phoneHref} className="text-body text-background/75 hover:text-bronze-light">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-bronze-light" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-body text-background/75 hover:text-bronze-light"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-8 text-caption text-background/50 md:flex-row md:items-center">
          <span>
            &copy; {year} {site.fullName}. All rights reserved.
          </span>
          <span>{site.hours.display}</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Artha on Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 transition-colors hover:border-bronze-light hover:text-bronze-light"
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
