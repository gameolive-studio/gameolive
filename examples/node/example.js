const { launchGame, getGameURL } = require("./gameolive.js");
const launchConfig = {
  operatorId: "5f41529dea7e1b306e4e8404",
  configId: "5f887f579dd500000adf53f5",
  server: "https://beta-elantra-api.gameolive.com",
  playerId: "test1234",
  launchType: "iframe",
  gameContainerId: "gamecontainer",
};

getGameURL(launchConfig, (url, error) => {
  if (!error) {
    console.log(url);
  } else {
    console.error(error);
  }
});

launchGame(launchConfig);
