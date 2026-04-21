import type { NextConfig } from "next";

// Static export for GitHub Pages. Custom domain (www.divyanshutyagiofficial.com)
// is preserved via /public/CNAME, so we don't need a basePath.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
