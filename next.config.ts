import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https"
      },
      {
        hostname: "yt3.ggpht.com",
        protocol: "https"
      },
      {
        hostname: "cdn.stability.ai",
        protocol: "https", 
      },
      {
        
        hostname: "oceanic-mule-275.convex.cloud",
        protocol: "https",
      }
    ],
  },
};

export default nextConfig;
