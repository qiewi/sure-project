import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    },
    async redirects() {
        return [
        {
            source: "/",         // Match the root path
            destination: "/home", // Redirect to the login page
            permanent: false,    // Use a temporary redirect (307 status code)
        },
        ];
    }
}

export default nextConfig;
