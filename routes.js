const routes = require("next-routes")();

routes.add("home", "/").add("story", "/s/:storyId");

module.exports = {
  routes,
  Link: routes.Link
};
