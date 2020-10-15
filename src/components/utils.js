const axios = require("axios");
const { ERROR_CODES, DEFAULT } = require("../appContants");
const universalBtoa = (str) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString("base64");
  }
};

// const universalAtob = (b64Encoded) => {
//   try {
//     return atob(b64Encoded);
//   } catch (err) {
//     return Buffer.from(b64Encoded, "base64").toString();
//   }
// };
function formulateGameUrl(config, launchConfigFromServer) {
  let urlData = `gameid=${launchConfigFromServer.gameId}&configid=${config.configId}&server=${config.server}&operatorid=${config.operatorId}&playerid=${config.playerId}`;
  if (config.rawUrl !== true) {
    urlData = `token=${universalBtoa(urlData)}`;
  }
  return `${DEFAULT.STATIC_HOST}/${launchConfigFromServer.configuration.clientId}/${DEFAULT.INDEX_PATH}/index.html?${urlData}`;
}
module.exports = {
  buildURL: (config, callback) => {
    if (!config) {
      console.error("launch: config is required");
      return;
    }
    if (!callback) {
      console.error("buildURL: callback function not provided");
      return;
    }
    axios
      .get(
        `${DEFAULT.API_HOST}/api/launch-config/${config.operatorId}/${config.configId}`
      )
      .then(function (response) {
        var gameUrl = formulateGameUrl(config, response.data);
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
