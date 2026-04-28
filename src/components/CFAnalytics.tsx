/**
 * Cloudflare Web Analytics beacon.
 * Renders the script tag only in production builds and when the token env var is set.
 * Token is provided via NEXT_PUBLIC_CF_BEACON_TOKEN at build time (GitHub Actions secret).
 */
export function CFAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) return null;
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
