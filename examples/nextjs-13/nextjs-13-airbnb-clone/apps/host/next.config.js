const { withZephyr } = require('zephyr-webpack-plugin');
const { merge } = require('lodash');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {(stage: string, options: any) => Promise<import('next').NextConfig>} */
const nextConfig = async (stage, options) => {
  const isServer = [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER].includes(
    stage
  );
  const remoteDir = isServer ? 'ssr' : 'chunks';
  const zeConfig = await withZephyr()({
    plugins: [
      new NextFederationPlugin({
        name: 'airbnb-host',
        filename: `static/${remoteDir}/remoteEntry.js`,
        remotes: {
          'airbnb-remote1': `airbnb-remote1@http://localhost:3011/_next/static/${remoteDir}/remoteEntry.js`,
        },
        shared: {},
        extraOptions: {},
      }),
    ],
  });
  return {
    images: {
      domains: [
        'res.cloudinary.com',
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com',
        'picsum.photos',
      ],
    },
    webpack(config) {
      config = merge(config, zeConfig);
      return config;
    },
  };
};

module.exports = nextConfig;