const { ERROR_CODES, DEFAULT } = require("../appConstants");
const axios = require("axios");
module.exports = {
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
    }&limit=${config.limit || 50}&offset=${config.offset || 0}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.token || token}`,
      },
      url,
    };
    axios(options)
      .then(function (response) {
        callback(response.data);
      })
      .catch(function (error) {
        console.error(error);
        // handle error
        callback(undefined, ERROR_CODES.CONFIG_REQUEST_FAILED);
      })
      .then(function () {
        // always executed
      });
  },
};
