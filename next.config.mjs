/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 13+ App Router is enabled by default
  // No need for experimental flags for basic routing
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
