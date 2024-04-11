import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/app/[locale]/assets'],
    prependData: `@import "mixins.scss";`,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ru/register',
        destination: '/ru/login',
      },
      {
        source: '/en/register',
        destination: '/en/login',
      },
    ];
  },
  //dev
  productionBrowserSourceMaps: true,
};
//withBundleAnalyzer
export default withNextIntl(nextConfig);
