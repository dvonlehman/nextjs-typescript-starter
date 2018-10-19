process.env.NODE_CONFIG_DIR = __dirname + "/../config/";

import config, { util as configUtil } from "config";
import "dotenv";
import * as express from "express";
import routes from "lib/routes";
import * as next from "next";
import apiRouter from "server/api-router";
import log from "server/logger";
import * as nextConfig from "./next.config";

log.info(`NODE_ENV=${process.env.NODE_ENV}`);

const port = parseInt(process.env.PORT || "9000", 10);
const dev = process.env.NODE_ENV !== "production";

const combinedConfig = Object.assign(
  {},
  nextConfig,
  configUtil.toObject(config)
);

const serverOptions: next.ServerOptions = {
  dev,
  conf: combinedConfig
};

const nextServer: next.Server = next(serverOptions);
const nextRequestHandler = routes.getRequestHandler(nextServer);

nextServer.prepare().then(() => {
  const expressServer = express();

  expressServer.use("/api", apiRouter);
  expressServer.use(nextRequestHandler);

  expressServer.listen(port, () => {
    log.info(`App listening on port ${port}`);
  });
});
