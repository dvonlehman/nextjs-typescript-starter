export default {
  serverRuntimeConfig: {
    logLevel: "debug",
    printApiUrl: process.env.PRINT_API_URL
  },
  // Settings that are accessible on both client and server
  publicRuntimeConfig: {
    logLevel: "debug"
  }
};
