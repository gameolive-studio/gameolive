const { ERROR_CODES, DEFAULT } = require("../appConstants");
const axios = require("axios");
module.exports = {
  getAuthToken: (config, callback) => {
    if (!config) {
      console.error("getGames: config is required");
      return;
    }
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
        callback(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // handle error
        callback(undefined, ERROR_CODES.AUTHENTICATION_FAILED);
      })
      .then(function () {
        // always executed
      });
  },
};
