import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    removeConsole: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    // dirs:["src"]
  },
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  images:{
    remotePatterns: [{
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**', // allow all image paths under /images/
      },],
  }

};



export default withNextIntl(config);

