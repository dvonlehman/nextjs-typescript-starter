import * as http from "http";
import { DeviceFamily } from "lib/interfaces";
import { getDevicePagePath } from "lib/urls";
import { Server } from "next";
import { parse } from "url";

const STORY_URL_REGEX = /^\/s\/([a-z0-9]+)$/i;

export default function(
  app: Server
): (req: http.IncomingMessage, res: http.ServerResponse) => void {
  const handler = app.getRequestHandler();

  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // This header is set in the device-detect middleware
    const deviceFamily = req.headers["device-family"] as DeviceFamily;

    if (pathname === "/") {
      return app.render(
        req,
        res,
        getDevicePagePath("/home", deviceFamily),
        query
      );
    }

    const storyMatch = pathname.match(STORY_URL_REGEX);
    if (storyMatch) {
      const storyId = storyMatch[1];
      return app.render(
        req,
        res,
        getDevicePagePath("/story", deviceFamily),
        Object.assign(query, { storyId })
      );
    }

    handler(req, res, parsedUrl);
  };
}
