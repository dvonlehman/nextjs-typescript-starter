import "dotenv";

import * as next from "next";
import * as express from "express";
import apiRouter from "./server/api-router";
import routes from "./lib/routes";
// import { parse } from "url";

import * as nextConfig from "./next.config";

const port = parseInt(process.env.PORT || "9000", 10);
const dev = process.env.NODE_ENV !== "production";

const serverOptions: next.ServerOptions = { dev, conf: nextConfig };
const nextServer: next.Server = next(serverOptions);
const nextRequestHandler = routes.getRequestHandler(nextServer);

// https://github.com/fridays/next-routes

nextServer.prepare().then(() => {
  const expressServer = express();
  expressServer.use("/api", apiRouter);
  expressServer.use(nextRequestHandler);

  // expressServer.use(nextRequestHandler);
  expressServer.listen(port, () => {
    console.log("App listening on port", port);
  });
});
