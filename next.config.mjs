/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/app/assets'],
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
        source: '/register',
        destination: '/login',
      },
    ];
  },
};

export default nextConfig;
