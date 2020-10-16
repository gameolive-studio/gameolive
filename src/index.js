const { buildURL } = require("./components/utils.js");
const { launch } = require("./components/launcher.js");
const { getAuthToken } = require("./components/auth.js");
const { getGames } = require("./components/games.js");
const { getPlayerToken, registerPlayer } = require("./components/players.js");
const { ERROR_CODES } = require("./appConstants");
let initConfig;
/**
 * GameOlive client library for easy integration with GameOlive platform.
 * @module gameolive
 */

module.exports = {
  /**
   * Initialize the library with machine user credentials.
   *    @param {json} config Credentials of machine user.
   *    @param {String} config.clientId
   *    @param {String} config.clientSecret
   *    @param {String} config.operatorId
   * @param {function} callback
   */
  init: (config, callback) => {
    getAuthToken(config, (token, error) => {
      if (error) {
        callback(undefined, ERROR_CODES.AUTHENTICATION_FAILED);
      }
      initConfig = { ...config, token };
      callback(token);
    });
  },
  getAuthToken: (config, callback) => getAuthToken(config, callback),
  getPlayerToken: (config, callback) =>
    getPlayerToken({ ...initConfig, ...config }, callback),
  registerPlayer: (config, callback) =>
    registerPlayer({ ...initConfig, ...config }, callback),
  getGames: (config, callback) =>
    getGames({ ...initConfig, ...config }, callback),
  launchGame: (config, callback) => launch(config, callback),
  getGameURL: (config, callback) => buildURL(config, callback),
};
