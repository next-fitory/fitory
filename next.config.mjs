/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      {
        protocol: 'https',
        hostname: 'image.msscdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
