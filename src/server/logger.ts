import * as config from "config";
import * as winston from "winston";
import { ILogger } from "../lib/interfaces";

// This is the server implementation of the application logger. Just using a lightweight
// wrapper around a subset of the winston ILogger interface.

const winstonLogger = winston.createLogger({
  level: config.get("serverRuntimeConfig.logLevel"),
  format: winston.format.simple(),
  transports: [new winston.transports.Console()]
});

const logger: ILogger = {
  info: (message, meta) => winstonLogger.info(message, meta),
  warn: (message, meta) => winstonLogger.warn(message, meta),
  error: (message, meta) => winstonLogger.error(message, meta),
  debug: (message, meta) => winstonLogger.debug(message, meta)
};

export default logger;
