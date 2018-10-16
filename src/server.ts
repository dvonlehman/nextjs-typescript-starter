process.env.NODE_CONFIG_DIR = __dirname + "/../config/";

import config, { util as configUtil } from "config";
import "dotenv";
import * as express from "express";
import * as next from "next";
import apiRouter from "server/api-router";
import deviceDetect from "server/device-detect";
import requestHandler from "server/request-handler";
import * as nextConfig from "./next.config";
import log from "./server/logger";

const port = parseInt(process.env.PORT || "9000", 10);
const dev = process.env.NODE_ENV !== "production";

// Merge the next config and custom config settings together
const combinedConfig = Object.assign(
  {},
  nextConfig,
  configUtil.toObject(config)
);
log.debug(JSON.stringify(combinedConfig));

const serverOptions: next.ServerOptions = {
  dev,
  conf: combinedConfig
};

const nextServer: next.Server = next(serverOptions);

nextServer.prepare().then(() => {
  const expressServer = express();

  expressServer.use("/api", apiRouter);
  expressServer.use(deviceDetect);
  expressServer.use(requestHandler(nextServer));

  expressServer.listen(port, () => {
    log.info(`App listening on port ${port}`);
  });
});
