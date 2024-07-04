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
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '5000',
      //   pathname: '**',
      // },
      {
        protocol: process.env.NEXT_PUBLIC_BASE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_BASE_ADDRESS,
        port: process.env.NEXT_PUBLIC_BASE_PORT,
        pathname: '**',
      },
    ],
  },
  //dev
  productionBrowserSourceMaps: false,
  reactStrictMode: process.env.NEXT_PUBLIC_STRICT_MODE,
};

export default withBundleAnalyzer(nextConfig);
