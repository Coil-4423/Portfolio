/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,   // Enable React strict mode for better debugging
    swcMinify: true,         // Enable SWC compiler for faster builds
    images: {
      domains: ['sumitake.ca'],  // Allow images from specific domains
    },
    output: 'standalone',    // This option makes it easier to deploy on platforms like Vercel
  };
  
  export default nextConfig;
  