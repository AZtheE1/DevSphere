import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile shared packages
  transpilePackages: ["@devsphere/ui", "@devsphere/auth", "@devsphere/types"],
};

export default withNextIntl(nextConfig);
