// apps/web/next.config.js

const { composePlugins, withNx } = require('@nx/next');
const path = require('node:path');
const createNextIntlPlugin = require('next-intl/plugin'); 

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts'); 

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const baseNextConfig = { 
  reactStrictMode: false,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'), 
  nx: {},
};

const plugins = [
  withNx,      
  withNextIntl  
];

module.exports = composePlugins(...plugins)(baseNextConfig);

