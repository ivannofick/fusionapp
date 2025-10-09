import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/app-next',
  assetPrefix: process.env.NODE_ENV === "production" ? "/app-next" : undefined,
  // output: 'standalone',
};

export default nextConfig;
