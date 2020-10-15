const { buildURL } = require("./components/utils.js");
const { launch } = require("./components/launcher.js");

module.exports = {
  launchGame: (config, callback) => launch(config, callback),
  getGameURL: (config, callback) => buildURL(config, callback),
};
