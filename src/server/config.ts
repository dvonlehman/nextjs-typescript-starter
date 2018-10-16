// https://nextjs.org/docs/#exposing-configuration-to-the-server--client-side
// Settings that are only exposed on the server-side
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
