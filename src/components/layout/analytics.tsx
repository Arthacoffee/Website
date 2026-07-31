import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
// Vercel sets this automatically at build time on its own infrastructure.
// @vercel/analytics and @vercel/speed-insights degrade "safely" off
// Vercel, but that still means a script tag pointed at a path
// (/_vercel/insights/script.js) that 404s on any other host — real
// console noise on every page load in local dev or elsewhere. Gating on
// this avoids that entirely without needing an ID for either package.
const onVercel = process.env.VERCEL === "1";

/**
 * All measurement here is opt-in via environment variable — nothing
 * loads, and no script tag renders, until the corresponding ID is set
 * in production. Keeps local development and preview deployments free
 * of tracking by default, and keeps this component safe to render
 * unconditionally in the root layout.
 *
 * @vercel/analytics and @vercel/speed-insights need no ID: both
 * self-detect whether they're running on Vercel's infrastructure and
 * silently no-op everywhere else, so they're always rendered.
 */
export function SiteAnalytics() {
  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}

      {clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}

      {onVercel ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
    </>
  );
}
