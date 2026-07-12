import type { NextConfig } from "next";

const securityHeaders = [
  {
    /* Anti-XSS: Content Security Policy */
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live",
      "frame-src 'self' https://vercel.live",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests"
    ].join("; ")
  },
  {
    /* Anti-Clickjacking: prevent embedding in iframe */
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    /* Anti-MIME sniffing */
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    /* Force HTTPS for 1 year + include subdomains */
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload"
  },
  {
    /* Control referrer data leakage */
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    /* XSS filter (legacy browsers) */
    key: "X-XSS-Protection",
    value: "1; mode=block"
  },
  {
    /* Disable unnecessary browser APIs */
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  },
  {
    /* Prevent DNS prefetch data leaks */
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  {
    /* Cross-Origin policies */
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin"
  }
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },

  /* Disable source maps in production to prevent code inspection */
  productionBrowserSourceMaps: false,

  /* Disable x-powered-by header (hides "Next.js" fingerprint) */
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;

