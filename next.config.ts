import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    // dirs:["src"]
  },
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  images:{
    // remotePatterns: [new URL('https://cdn.sanity.io/images/**')],

    // domains:['images.pexels.com', 'cdn.sanity.io']
    remotePatterns: [{
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**', // allow all image paths under /images/
      },],
  }

};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

