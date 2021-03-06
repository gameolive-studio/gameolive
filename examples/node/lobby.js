const {
  init,
  getGames,
  registerPlayer,
  getPlayerToken,
} = require("./gameolive.js");

const initConfig = {
  clientId:
    "SA_Game-815dae14-55ba-446e-bcf0-b97b1fec056e@e74c6b04-0558-417c-9a8f-c08b5a42b9a6.gol",
  clientSecret: "abc1602832965454",
  operatorId: "5f41529dea7e1b306e4e8404",
};

init(initConfig, (token, authError) => {
  if (!authError) {
    generatePlayerToken();
    // registerNewPlayer();
    getGames({ application: "website" }, (games, gamesError) => {
      if (!gamesError) {
        console.log(games);
      } else {
        console.error(gamesError);
      }
    });
  } else {
    console.log(authError);
  }
});

function generatePlayerToken() {
  getPlayerToken(
    {
      playerId: "user1234567890", // unique player id that can be used and mapped by your application for reporting like purposes
      currencyCode: "INR",
      name: "Test",
    },
    (token, error) => {
      console.log("Player token", token);
    }
  );
}
function registerNewPlayer() {
  registerPlayer(
    {
      playerId: "user123456789", // unique player id that can be used and mapped by your application for reporting like purposes
      currencyCode: "INR",
      name: "Test",
    },
    (token, error) => {
      console.log(token);
    }
  );
}
