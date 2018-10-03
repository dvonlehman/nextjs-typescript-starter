const withTypescript = require("@zeit/next-typescript");

// https://github.com/zeit/next.js/issues/774

// module.exports = withTypescript({
//   webpack(config, options) {
//     return config;
//   }
// });

// module.exports = {
//   useFileSystemPublicRoutes: false
// };

// next.config.js
const withPlugins = require("next-compose-plugins");
// const images = require('next-images');
// const sass = require('@zeit/next-sass');
const typescript = require("@zeit/next-typescript");

// next.js configuration
const nextConfig = {
  useFileSystemPublicRoutes: false
};

module.exports = withPlugins(
  [
    // another plugin with a configuration
    [typescript]
  ],
  nextConfig
);
