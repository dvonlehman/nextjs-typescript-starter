import * as jsLogger from "js-logger";
import getConfig from "next/config";
import { ILogger } from "./interfaces";

let logLevel;
switch (getConfig().publicRuntimeConfig.logLevel) {
  case "debug":
    logLevel = jsLogger.DEBUG;
    break;
  case "warn":
    logLevel = jsLogger.WARN;
    break;
  case "error":
    logLevel = jsLogger.ERROR;
    break;
  case "info":
  default:
    logLevel = jsLogger.INFO;
    break;
}

jsLogger.setLevel(logLevel);

const logger: ILogger = {
  info: (message, meta) => jsLogger.info(message, meta),
  warn: (message, meta) => jsLogger.warn(message, meta),
  error: (message, meta) => jsLogger.error(message, meta),
  debug: (message, meta) => {
    jsLogger.debug(message, meta);
  }
};

export default logger;
