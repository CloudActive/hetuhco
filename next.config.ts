import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: served as plain files (DigitalOcean App Platform static site / Cloudflare Pages).
  output: "export",
  // Emit /about/index.html so every host resolves /about and /about/ without extra config.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
