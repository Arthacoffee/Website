import type { Metadata, Viewport } from "next";
import { display, sans } from "@/lib/fonts";
import { site } from "@/content/site";
import { HeaderVariantProvider } from "@/components/layout/header-variant-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/ui/skip-link";
import "./globals.css";

const fullTitle = `${site.fullName} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: fullTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.fullName,
    title: fullTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#3a2c25",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-background text-foreground flex min-h-dvh flex-col">
        <HeaderVariantProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </HeaderVariantProvider>
      </body>
    </html>
  );
}
