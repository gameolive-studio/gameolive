const { buildURL } = require("./components/utils.js");
const { launch } = require("./components/launcher.js");
const { getGames, getToken } = require("./components/games.js");

module.exports = {
  launchGame: (config, callback) => launch(config, callback),
  getGameURL: (config, callback) => buildURL(config, callback),
  getGames: (config, callback) => getGames(config, callback),
  getToken: (config, callback) => getToken(config, callback),
};
