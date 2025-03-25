import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "v3.fal.media",
                pathname: "/files/**",
            },
            {
                protocol: "https",
                hostname: "public.blob.vercel-storage.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
