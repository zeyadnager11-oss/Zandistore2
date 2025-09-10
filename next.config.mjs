
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: false
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  reactStrictMode: true
};

export default nextConfig;
