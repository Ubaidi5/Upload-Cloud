/** @type {import('next').NextConfig} */
const withSvgr = require("next-plugin-svgr");

const nextConfig = withSvgr({
  swcMinify: true,
  webpack(config) {
    return config;
  },
  compiler: {
    styledComponents: true,
  },
});

module.exports = nextConfig
