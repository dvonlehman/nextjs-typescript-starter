const next = require("next");
const express = require("express");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const routes = require("./routes");
const handler = routes.getRequestHandler(app);

// https://github.com/fridays/next-routes

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(port);
});
