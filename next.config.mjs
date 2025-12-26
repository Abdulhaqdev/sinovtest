/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v1.backend.sinovtest.uz",
        pathname: "/media/**",
      },
    ],
  },
}

export default nextConfig
