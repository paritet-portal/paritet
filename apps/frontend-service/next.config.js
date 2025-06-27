// paritet\apps\frontend-service\next.config.js
const { composePlugins, withNx } = require('@nx/next');
const path = require('node:path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone', 
  outputFileTracingRoot: path.join(__dirname, '../../'), 
  nx: {},
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
