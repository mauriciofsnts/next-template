import withNextIntl from "next-intl/plugin";

const withNextIntlConfig = withNextIntl("./src/lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hides source maps from generated client bundles
  productionBrowserSourceMaps: false,
  webpack: (config,  options ) => {
    config.module.rules.push({
      test: /\.bpmn$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default withNextIntlConfig(nextConfig);
