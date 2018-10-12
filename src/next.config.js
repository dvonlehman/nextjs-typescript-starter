// next.js configuration
const nextConfig = {
  // https://nextjs.org/docs/#exposing-configuration-to-the-server--client-side
  // Settings that are only exposed on the server-side
  // serverRuntimeConfig: {
  //   printApiUrl: process.env.PRINT_API_URL
  // },
  // // Settings that are accessible on both client and server
  // publicRuntimeConfig: {
  //   logLevel: ''
  // },
  webpack: (config, { isServer }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    if (!config.resolve) {
      config.resolve = {};
    }

    // On the server side alias to the server/api
    if (isServer) {
      config.resolve.alias = {
        "../lib/api": "../server/api",
        "../lib/logger": "../server/logger"
      };
    }

    // Configure webpack to use the typescript generated sourcemaps
    // so we can debug the original tsx files in devtools
    config.module.rules.push({
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre"
    });

    return config;
  }
};

module.exports = nextConfig;
