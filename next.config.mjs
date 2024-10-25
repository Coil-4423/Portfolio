/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,   // Enable React strict mode for better debugging
  swcMinify: true,         // Enable SWC compiler for faster builds
  images: {
    domains: ['sumitake.ca'],  // Allow images from specific domains
    unoptimized: true,         // Disable Image Optimization for static export
  },
  output: 'export',        // Ensure the site is exported as static files
  trailingSlash: true,     // Add trailing slashes to all paths for static hosting compatibility
};

export default nextConfig;
