import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.orendapsych.com',
      },
      {
        protocol: 'http',
        hostname: 'api.orendapsych.com',
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'orenda-bkt.s3.eu-north-1.amazonaws.com',
      }
    ],
  },
};

export default nextConfig;
