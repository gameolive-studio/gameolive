# gameolive
[![Build Status](https://travis-ci.org/gameolive-studio/gameolive.svg?branch=master)](https://travis-ci.org/gameolive-studio/gameolive)
[![npm (tag)](https://img.shields.io/npm/v/@gameolive/gameolive/latest.svg)](https://www.npmjs.com/package/@gameolive/gameolive)

## Installing as module
```
npm i @gameolive/gameolive
```
Import this in your react project
```
const {
  init,
  getGames,
  registerPlayer,
  getPlayerToken,
} = require("@gameolive/gameolive");
```
After import add initConfig as like: 
```
const initConfig = {
  clientId:
    "dashboard-client-bdb2c3b0-98f5-4a27-8223-*****-***-****-****-0282****e9.gol", 
  clientSecret: "gol165804*******",
  operatorId: "62d3c64049**************",
  server: "https://prod-platform-*****-******-em.a.run.app",
};
```
After complete previous step, place this code into your code and then get all of our games
```
useEffect(() => {
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
  }, []);
```
