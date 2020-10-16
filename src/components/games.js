const { ERROR_CODES, DEFAULT } = require("../appContants");
const axios = require("axios");
let token;
module.exports = {
  getToken: (config, callback) => {
    if (!config) {
      console.error("getGames: config is required");
      return;
    }
    // /api/tenant/5f5dd02db40da96623df497b/game?filter[application]=website&orderBy=&limit=10&offset=0
    const url = `${DEFAULT.API_HOST}/api/auth/machine-sign-in`;

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        operator_id: config.operatorId,
        client_secret: config.clientSecret,
        client_id: config.clientId,
      },
      url,
    };
    axios(options)
      .then(function (response) {
        console.log(response.data);
        token = response.data;
        callback();
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
  getGames: (config, callback) => {
    if (!config) {
      console.error("getGames: config is required");
      return;
    }
    // /api/tenant/5f5dd02db40da96623df497b/game?filter[application]=website&orderBy=&limit=10&offset=0
    const url = `${DEFAULT.API_HOST}/api/tenant/${
      config.operatorId
    }/game?filter[application]=${config.application || "website"}&orderBy=${
      config.orderBy || ""
    }&limit=${config.limit || 10}&offset=${config.offset || 0}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url,
    };
    axios(options)
      .then(function (response) {
        console.log(response.data);
        callback(response.data);
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
