import "dotenv";
import * as express from "express";
import * as next from "next";
import routes from "./lib/routes";
import * as nextConfig from "./next.config";
import apiRouter from "./server/api-router";
// import sourcemaps from "./server/sourcemaps";

const port = parseInt(process.env.PORT || "9000", 10);
const dev = process.env.NODE_ENV !== "production";

const serverOptions: next.ServerOptions = { dev, conf: nextConfig };
const nextServer: next.Server = next(serverOptions);
const nextRequestHandler = routes.getRequestHandler(nextServer);

nextServer.prepare().then(() => {
  const expressServer = express();
  // expressServer.use(sourcemaps);

  expressServer.use("/api", apiRouter);
  expressServer.use(nextRequestHandler);

  // expressServer.use(nextRequestHandler);
  expressServer.listen(port, () => {
    console.log("App listening on port", port);
  });
});
