import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/app/assets'],
    prependData: `@import "mixins.scss";`,
  },
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
  //dev
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
