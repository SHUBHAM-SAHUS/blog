/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add allowed domains for next/image
    domains: ['avatars.githubusercontent.com'], // Add other domains if needed
  },
};

module.exports = nextConfig;
