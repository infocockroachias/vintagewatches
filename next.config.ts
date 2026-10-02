import type { NextConfig } from "next";

// NOTE: `output: "standalone"` is intentionally NOT set — it breaks Vercel's
// build-output routing (404 NOT_FOUND on the deployed URL). The default
// output is fully Vercel-compatible.
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
