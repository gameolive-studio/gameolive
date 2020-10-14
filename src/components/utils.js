const axios = require("axios");

const { ERROR_CODES, DEFAULT } = require("../appContants");

function formulateGameUrl(launchConfig) {
  return `${DEFAULT.STATIC_HOST}/${launchConfig.configuration.clientId}/${DEFAULT.INDEX_PATH}`;
}
module.exports = {
  buildURL: (config, callback) => {
    if (!callback) {
      console.error("buildURL: callback function not provided");
      return;
    }
    axios
      .get(
        `${DEFAULT.API_HOST}/api/launch-config/${config.operatorId}/${config.configId}`
      )
      .then(function (response) {
        var gameUrl = formulateGameUrl(response.data);
        console.log(gameUrl);
        callback(gameUrl);
      })
      .catch(function (error) {
        console.log(error);
        // handle error
        callback(undefined, ERROR_CODES.CONFIG_REQUEST_FAILED);
      })
      .then(function () {
        // always executed
      });
  },
};
