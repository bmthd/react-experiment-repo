import type { NextConfig } from "next";

export default {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "static.zenn.studio",
      },
    ],
  },
} satisfies NextConfig;
