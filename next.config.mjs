/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,   // Enable React strict mode for better debugging
  swcMinify: true,         // Enable SWC compiler for faster builds
  images: {
    domains: ['sumitake.ca'],  // Allow images from specific domains
  },
  output: 'export',        // Enable static HTML export
  trailingSlash: true,     // Ensure URLs work correctly with static export
};

export default nextConfig;
