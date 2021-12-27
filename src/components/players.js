const { ERROR_CODES, DEFAULT } = require("../appConstants");
const axios = require("axios");

module.exports = {
  /*
  {   
    "operator_id": "5f41529dea7e1b306e4e8404",
    "client_id":"fbint-a9e32dc0-19de-45d6-b650-e5dd0bf11a4f@dcc34d63-0746-46bf-aae3-4dd726a71417.gol",
    "client_secret":"abc1598174289174",
    "player_uid":"fb123d456",
    "currency_code": "INR",
    "name": "Test"
  }
  */
  getPlayerToken: (config, callback) => {
    if (!config) {
      console.error("getGames: config is required");
      return;
    }
    const url = `${config.server ? config.server : DEFAULT.API_HOST}/api/player/token`;

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        operator_id: config.operatorId,
        client_secret: config.clientSecret,
        client_id: config.clientId,
        player_uid: config.playerId,
        currency_code: config.currencyCode,
        name: config.name,
      },
      url,
    };
    axios(options)
      .then(function (response) {
        const player = response.data;
        callback(player.token);
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

  /*
  {   
    "operator_id": "5f41529dea7e1b306e4e8404",
    "client_id":"fbint-a9e32dc0-19de-45d6-b650-e5dd0bf11a4f@dcc34d63-0746-46bf-aae3-4dd726a71417.gol",
    "client_secret":"abc1598174289174",
    "player_uid":"fb123d456",
    "currency_code": "INR",
    "name": "Test"
  }
  */
  registerPlayer: (config, callback) => {
    if (!config) {
      console.error("getGames: config is required");
      return;
    }
    const url = `${config.server ? config.server : DEFAULT.API_HOST}/api/player/register`;

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        operator_id: config.operatorId,
        client_secret: config.clientSecret,
        client_id: config.clientId,
        player_uid: config.playerId,
        currency_code: config.currencyCode,
        name: config.name,
      },
      url,
    };
    axios(options)
      .then(function (response) {
        callback(response.data); // player
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
