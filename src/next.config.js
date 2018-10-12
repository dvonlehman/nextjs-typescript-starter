// next.js configuration
const nextConfig = {
  // https://nextjs.org/docs/#exposing-configuration-to-the-server--client-side
  // Settings that are only exposed on the server-side
  serverRuntimeConfig: {
    printApiUrl: process.env.PRINT_API_URL
  },
  // Settings that are accessible on both client and server
  publicRuntimeConfig: {},
  webpack: (config, { isServer }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    if (!config.resolve) {
      config.resolve = {};
    }

    // On the server side alias to the server/api
    if (isServer) {
      config.resolve.alias = {
        "../lib/api": "../server/api"
      };
    }

    return config;
  }
};

module.exports = nextConfig;
