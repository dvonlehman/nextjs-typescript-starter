// Simple ILogger implementation that wraps window.console for browser usage

/* tslint:disable:no-console */

import getConfig from "next/config";
import { ILogger } from "./interfaces";

interface ILogLevel {
  name: string;
  rank: number;
  fn: (message?: any, ...optionalParams: any[]) => void;
}

const LOG_LEVELS: { [key: string]: ILogLevel } = {
  error: { name: "error", rank: 0, fn: console.error || console.log },
  warn: { name: "warn", rank: 1, fn: console.warn || console.log },
  info: { name: "info", rank: 2, fn: console.info || console.log },
  debug: { name: "debug", rank: 3, fn: console.debug || console.log }
};

let configuredLogLevel: ILogLevel =
  LOG_LEVELS[getConfig().publicRuntimeConfig.logLevel || "info"];
if (!configuredLogLevel) {
  configuredLogLevel = LOG_LEVELS.info;
}

const print = (logLevel: ILogLevel, message: string, meta: any) => {
  if (logLevel.rank <= configuredLogLevel.rank) {
    const formatted = `[${logLevel.name}] ${message}`;
    logLevel.fn(formatted, meta);
  }
};

const logger: ILogger = {
  info: (message, meta) => print(LOG_LEVELS.error, message, meta),
  warn: (message, meta) => print(LOG_LEVELS.warn, message, meta),
  error: (message, meta) => print(LOG_LEVELS.error, message, meta),
  debug: (message, meta) => print(LOG_LEVELS.debug, message, meta)
};

export default logger;
