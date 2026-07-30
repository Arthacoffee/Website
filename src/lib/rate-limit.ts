/**
 * In-memory, per-IP sliding-window rate limiter. "Basic" by design: it
 * resets on every cold start and doesn't share state across serverless
 * instances, so it won't hold up a high-traffic multi-region deployment.
 * What it does do is stop a single script from hammering the reservation
 * endpoint in a tight loop, which is the actual threat model for a
 * low-traffic reservation form. Replace with Upstash Redis (or similar)
 * if/when the site runs on more than one instance — see docs/LAUNCH_CHECKLIST.md.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

/** Periodically drop IPs with no recent activity so the map doesn't grow forever. */
function sweep(now: number) {
  for (const [ip, timestamps] of hits) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) {
      hits.delete(ip);
    } else {
      hits.set(ip, recent);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  if (Math.random() < 0.05) sweep(now);

  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((timestamps[0] + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return { allowed: true };
}

/** Best-effort client IP from standard proxy headers; falls back to a shared bucket. */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
