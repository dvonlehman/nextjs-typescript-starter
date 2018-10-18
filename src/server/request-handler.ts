import * as http from "http";
import { Server } from "next";
import log from "server/logger";
import { parse } from "url";

const LAUREATE_REGEX = /^\/laureate\/([0-9]+)$/;
const PRIZES_REGEX = /^\/prizes\/([0-9]{4})$/;

export default function(
  app: Server
): (req: http.IncomingMessage, res: http.ServerResponse) => void {
  const handler = app.getRequestHandler();

  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    if (!req.url) {
      throw new Error("Missing req.url");
    }

    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (!pathname || pathname === "/") {
      log.debug("Render page /home");
      return app.render(req, res, "/home", query);
    }

    let match;
    match = pathname.match(PRIZES_REGEX);
    if (match) {
      const year = match[1];
      log.debug(`Render page prizes?year=${year}`);
      return app.render(req, res, "/prizes", Object.assign(query, { year }));
    }

    match = pathname.match(LAUREATE_REGEX);
    if (match) {
      log.debug("Render page /laureate");

      return app.render(
        req,
        res,
        "/laureate",
        Object.assign(query, { id: match[1] })
      );
    }

    handler(req, res, parsedUrl);
  };
}
