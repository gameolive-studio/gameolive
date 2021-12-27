const { ERROR_CODES, DEFAULT } = require("../appConstants");
const { buildURL } = require("./utils.js");
let gameIFrame;
function createModal(config, contentToShow) {
  var modal = document.createElement("div");
  modal.className = "gameoliveModal";
  modal.setAttribute(
    "style",
    "position:absolute; width:100%; height:100%;z-index:9999; background: rgba(0, 0, 0, 0.5);top:0;left:0"
  );

  var modalContent = document.createElement("div");
  modalContent.className = "gameoliveModalContent";
  modalContent.setAttribute(
    "style",
    "position:absolute; width:" +
    (config.width || "90%") +
    "; height:" +
    (config.height || "90%") +
    "; top:" +
    (config.top || "5%") +
    "; left:" +
    (config.left || "5%") +
    ";zIndex:99999"
  );

  modalContent.appendChild(contentToShow);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  return modal;
}
function _onMessageReceieved(message) {
  var eve = message.data;
  var event = eve.event;
  var data = eve.message;
  if (event === "GAMEOLIVE_SIGN_UP_BONUS_DIALOG_ENDED") {
    gameIframe = undefined;
    document.body.removeChild(this.modal);
  }
  if (event && this._evMap && this._evMap[event]) {
    this._evMap[event].forEach(function (cb) {
      if (cb) {
        cb(data);
      }
    });
  }
}
function createIFrame(url) {
  var iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.name = "frame";
  iframe.setAttribute("style", "width:100%; height:100%;");
  if (window.addEventListener) {
    window.addEventListener("message", _onMessageReceieved.bind(this), false);
  } else {
    window.attachEvent("onmessage", _onMessageReceieved.bind(this));
  }
  return iframe;
}

module.exports = {
  launch: (config, callback) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      console.error(
        "It looks like you are trying to launch the game client in nodeJs. It is recommended to generate url in nodeJS if using backend mode and pass it to your client application to display."
      );
      return;
    }
    if (!config) {
      console.error("launch: config is required");
      return;
    }
    buildURL(config, (gameUrl, error) => {
      if (error) {
        console.error(error);
        if (callback) {
          callback(undefined, error);
        }
      } else {
        switch (config.launchType) {
          case "iframe": {
            gameIframe = createIFrame(gameUrl);

            // wipout exiting content in the container
            document
              .getElementById(config.gameContainerId).innerHTML = '';

            // add iframe in the container
            document
              .getElementById(config.gameContainerId)
              .appendChild(gameIframe);
            if (callback) {
              callback(gameIframe, undefined);
            }
            break;
          }
          case "modal": {
            gameIframe = createIFrame(gameUrl);
            var modal = createModal(config, gameIframe);
            if (callback) {
              callback(modal, undefined);
            }
            break;
          }
          case "popup": {
            var win = window.open(gameUrl, config.name, config.specs, config.replace);
            if (callback) {
              callback(win, undefined);
            }
            break;
          }
          case "redirect":
          default: {
            window.location.href = gameUrl;
            break;
          }
        }
      }
    });
  },
  publish: (event, message) => {
    if (!gameIframe) {
      console.log(
        "It looks like either game is not initialized or not launched"
      );
      return;
    }
    gameIframe.contentWindow.postMessage(
      { event: event, message: message },
      "*"
    );
  },
};
