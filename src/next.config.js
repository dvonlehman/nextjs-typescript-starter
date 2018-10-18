// next.js configuration
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    if (!config.resolve) {
      config.resolve = {};
    }

    // On the server side alias to the server/api
    if (isServer) {
      Object.assign(config.resolve.alias, {
        "lib/repository": __dirname + "/server/repository",
        "lib/logger": __dirname + "/server/logger"
      });
    }

    Object.assign(config.resolve.alias, {
      components: __dirname + "/components",
      lib: __dirname + "/lib",
      server: __dirname + "/server"
    });

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
