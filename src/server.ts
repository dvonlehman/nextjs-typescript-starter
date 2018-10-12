import "dotenv";
import * as express from "express";
import * as next from "next";
import routes from "./lib/routes";
import * as nextConfig from "./next.config";
import apiRouter from "./server/api-router";
import config from "./server/config";
import log from "./server/logger";

const port = parseInt(process.env.PORT || "9000", 10);
const dev = process.env.NODE_ENV !== "production";

const serverOptions: next.ServerOptions = {
  dev,
  conf: Object.assign({}, nextConfig, config)
};
const nextServer: next.Server = next(serverOptions);
const nextRequestHandler = routes.getRequestHandler(nextServer);

nextServer.prepare().then(() => {
  const expressServer = express();

  expressServer.use("/api", apiRouter);
  expressServer.use(nextRequestHandler);

  // expressServer.use(nextRequestHandler);
  expressServer.listen(port, () => {
    log.info("App listening on port", port);
  });
});
