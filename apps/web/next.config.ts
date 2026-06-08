import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@fetch-rosetta/sdk", "@fetch-rosetta/ui-kit"],
};

export default nextConfig;
