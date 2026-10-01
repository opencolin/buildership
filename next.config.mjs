/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't reuse the client-side Router Cache for dynamic routes — navigating to
  // /showcase or /judges always refetches live data instead of a cached copy.
  experimental: {
    staleTimes: { dynamic: 0, static: 30 },
  },
  async redirects() {
    // The Blue Angels page moved up to the homepage; keep shared links alive.
    return [{ source: "/blueangels", destination: "/", permanent: false }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
