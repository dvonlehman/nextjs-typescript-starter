// import pathToRegexp from "path-to-regexp";
// import React from "react";
// import { parse, UrlWithParsedQuery } from "url";
// import { Server } from "next";
// import { IncomingMessage, ServerResponse } from "http";
// import { SingletonRouter, EventChangeOptions, UrlLike } from "next/router";
// import { LinkState } from "next/link";
// // import NextLink, { LinkProps } from "next/link";
// // import NextRouter, { RouterProps } from "next/router";

// export type HTTPHandler = (
//   request: IncomingMessage,
//   response: ServerResponse
// ) => void;

// export type RouteParams = {
//   [k: string]: string | number;
// };

// export interface LinkProps extends LinkState {
//   route: string;
//   params?: RouteParams;
// }

// export interface Router extends SingletonRouter {
//   pushRoute(
//     route: string,
//     params?: RouteParams,
//     options?: EventChangeOptions
//   ): Promise<boolean>;
//   replaceRoute(
//     route: string,
//     params?: RouteParams,
//     options?: EventChangeOptions
//   ): Promise<boolean>;
//   prefetchRoute(
//     route: string,
//     params?: RouteParams
//   ): Promise<React.ComponentType<any>>;
// }

// class Routes {
//   routes: Array<Route>;
//   // Link: React.Component<LinkProps>;
//   // Router: React.Component<RouterProps>;

//   constructor() {
//     this.routes = [];
//     // this.Link = this.getLink(Link);
//     // this.Router = this.getRouter(Router);
//   }

//   add(name: string, pattern?: string, page?: string): this {
//     let options: RouteOptions;

//     if (name[0] === "/") {
//       page = pattern;
//       pattern = name;
//       name = null;
//     }
//     options = { name, pattern, page };

//     if (this.findByName(name)) {
//       throw new Error(`Route "${name}" already exists`);
//     }

//     this.routes.push(new Route(options));
//     return this;
//   }

//   findByName(name: string): Route {
//     if (name) {
//       return this.routes.filter(route => route.name === name)[0];
//     }
//   }

//   match(url) {
//     const parsedUrl: UrlWithParsedQuery = parse(url, true);
//     const { pathname, query } = parsedUrl;

//     return this.routes.reduce(
//       (result, route) => {
//         if (result.route) return result;
//         const params = route.match(pathname);
//         if (!params) return result;
//         return { ...result, route, params, query: { ...query, ...params } };
//       },
//       { query, parsedUrl }
//     );
//   }

//   findAndGetUrls(nameOrUrl, params) {
//     const route = this.findByName(nameOrUrl);

//     if (route) {
//       return { route, urls: route.getUrls(params), byName: true };
//     } else {
//       const { route, query } = this.match(nameOrUrl);
//       const href = route ? route.getHref(query) : nameOrUrl;
//       const urls = { href, as: nameOrUrl };
//       return { route, urls };
//     }
//   }

//   getRequestHandler(app: Server, customHandler?: HTTPHandler): HTTPHandler {
//     const nextHandler = app.getRequestHandler();

//     return (req, res) => {
//       const { route, query, parsedUrl } = this.match(req.url);

//       if (route) {
//         if (customHandler) {
//           customHandler({ req, res, route, query });
//         } else {
//           app.render(req, res, route.page, query);
//         }
//       } else {
//         nextHandler(req, res, parsedUrl);
//       }
//     };
//   }

//   getLink(Link) {
//     const LinkRoutes = (props): React.Component<LinkProps> => {
//       const { route, params, to, ...newProps } = props;
//       const nameOrUrl = route || to;

//       if (nameOrUrl) {
//         Object.assign(newProps, this.findAndGetUrls(nameOrUrl, params).urls);
//       }

//       // return React.createFactory();
//       // return <Link {...newProps} />;
//     };
//     return LinkRoutes;
//   }

//   getRouter(Router) {
//     const wrap = method => (route, params, options) => {
//       const {
//         byName,
//         urls: { as, href }
//       } = this.findAndGetUrls(route, params);
//       return Router[method](href, as, byName ? options : params);
//     };

//     Router.pushRoute = wrap("push");
//     Router.replaceRoute = wrap("replace");
//     Router.prefetchRoute = wrap("prefetch");
//     return Router;
//   }
// }

// export interface RouteOptions {
//   name: string;
//   pattern?: string;
//   page: string;
// }

// export default function(opts) {
//   return new Routes();
// }

// class Route implements SingletonRouter {
//   name: string;
//   pattern: string;
//   page: string;
//   regex: RegExp;
//   keys: Array<pathToRegexp.Key>;
//   keyNames: (string | number)[];
//   toPath: pathToRegexp.PathFunction;

//   constructor(options: RouteOptions) {
//     this.name = options.name;
//     this.pattern = options.pattern || `/${name}`;
//     this.page = options.page.replace(/(^|\/)index$/, "").replace(/^\/?/, "/");
//     this.regex = pathToRegexp(this.pattern, (this.keys = []));
//     this.keyNames = this.keys.map(key => key.name);
//     this.toPath = pathToRegexp.compile(this.pattern);
//   }

//   match(path) {
//     const values = this.regex.exec(path);
//     if (values) {
//       return this.valuesToParams(values.slice(1));
//     }
//   }

//   valuesToParams(values) {
//     return values.reduce((params, val, i) => {
//       if (val === undefined) return params;
//       return Object.assign(params, {
//         [this.keys[i].name]: decodeURIComponent(val)
//       });
//     }, {});
//   }

//   getHref(params = {}) {
//     return `${this.page}?${toQuerystring(params)}`;
//   }

//   getAs(params = {}) {
//     const as = this.toPath(params) || "/";
//     const keys = Object.keys(params);
//     const qsKeys = keys.filter(key => this.keyNames.indexOf(key) === -1);

//     if (!qsKeys.length) return as;

//     const qsParams = qsKeys.reduce(
//       (qs, key) =>
//         Object.assign(qs, {
//           [key]: params[key]
//         }),
//       {}
//     );

//     return `${as}?${toQuerystring(qsParams)}`;
//   }

//   getUrls(params) {
//     const as = this.getAs(params);
//     const href = this.getHref(params);
//     return { as, href };
//   }
// }

// const toQuerystring = obj =>
//   Object.keys(obj)
//     .filter(key => obj[key] !== null && obj[key] !== undefined)
//     .map(key => {
//       let value = obj[key];

//       if (Array.isArray(value)) {
//         value = value.join("/");
//       }
//       return [encodeURIComponent(key), encodeURIComponent(value)].join("=");
//     })
//     .join("&");
