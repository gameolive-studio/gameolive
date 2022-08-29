const axios = require("axios");
const { ERROR_CODES, DEFAULT } = require("../appConstants");
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
  let additionLaunchQs = "";
  const lConfig = launchConfigFromServer.configuration;
  if (lConfig && lConfig.launch) {
    let lp = lConfig.launch;
    additionLaunchQs = Object.keys(lp)
      .map((key) => key + "=" + lp[key])
      .join("&");
  }
  let urlData = `gameid=${launchConfigFromServer.gameId}&configid=${config.configId}&server=${config.server}&operatorid=${config.operatorId}&playerid=${config.playerId}&playertoken=${config.playerToken}&currency=${config.currency}&${additionLaunchQs}`;
  if (config.rawUrl !== true) {
    urlData = `token=${universalBtoa(urlData)}`;
  }

  if (lConfig && lConfig.gameLink) {
    return `${lConfig.gameLink}?${urlData}`;
  }

  if (launchConfigFromServer.gameLink) {
    return `${launchConfigFromServer.gameLink}?${urlData}`;
  }
  return `${DEFAULT.STATIC_HOST}/${lConfig.clientId}/${DEFAULT.INDEX_PATH}/index.html?${urlData}`;
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
    var launchConfigUrl;
    if (config.server) {
      launchConfigUrl = `${config.server}/api/launch-config/${config.operatorId}/${config.configId}`;
    } else {
      // fallback to default
      `${DEFAULT.API_HOST}/api/launch-config/${config.operatorId}/${config.configId}`;
    }
    axios
      .get(launchConfigUrl)
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
