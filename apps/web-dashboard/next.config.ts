import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/tailwind-config"],
  reactStrictMode: false,
};

export default nextConfig;
