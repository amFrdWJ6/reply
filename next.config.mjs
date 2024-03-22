/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/reply/**',
      },
      {
        protocol: 'https',
        hostname: 'reply.hovinka.cz',
        port: '',
        pathname: '/api/reply/**',
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
