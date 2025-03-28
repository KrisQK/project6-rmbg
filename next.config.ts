import type { NextConfig } from "next";

// Next.js 配置文件
// 在 Next.js 中,为了安全性考虑,默认情况下不允许加载外部域名的图片和字体等资源
// 需要在配置文件中显式声明允许加载的外部域名,否则会报错:
// Error: Invalid src prop on `next/image`, hostname "{hostname}" is not configured under images in your `next.config.js`
// Error: Failed to load font, hostname "{hostname}" is not configured under fonts in your `next.config.js`
const nextConfig: NextConfig = {
    // 配置外部图片域名白名单
    // 只有在此白名单中的域名才能通过 next/image 组件加载图片
    images: {
        remotePatterns: [
            {
                // fal.ai 的媒体文件服务器
                protocol: "https",
                hostname: "v3.fal.media",
                pathname: "/files/**",
            },
            {
                // Vercel Blob 存储服务
                protocol: "https",
                hostname: "public.blob.vercel-storage.com",
                pathname: "/**",
            },
            {
                // fal.ai 的其他子域名
                protocol: "https",
                hostname: "*.fal.ai",
                pathname: "/**",
            },
            {
                // 允许加载任意 HTTPS 图片用于测试
                protocol: "https",
                hostname: "**",
                pathname: "/**",
            },
        ],
    },
    // 配置外部字体域名白名单
    // 只有在此白名单中的域名才能加载字体文件
    fonts: {
        remotePatterns: [
            {
                // Google Fonts
                protocol: "https",
                hostname: "fonts.gstatic.com",
            },
            {
                // Adobe Fonts
                protocol: "https",
                hostname: "use.typekit.net",
            },
        ],
    },
    // 实验性功能配置
    experimental: {
        serverActions: {
            // 设置服务器端操作的请求体大小限制为10MB
            // 因为需要处理较大的图片文件
            bodySizeLimit: "10mb",
        },
    },
};

export default nextConfig;
