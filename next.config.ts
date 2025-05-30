import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  PORT: process.env.PORT,
  /* config options here */
};

export default nextConfig;
