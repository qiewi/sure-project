import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",         // Match the root path
        destination: "/login", // Redirect to the login page
        permanent: false,    // Use a temporary redirect (307 status code)
      },
    ];
  },
};

export default nextConfig;
