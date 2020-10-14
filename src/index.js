const {buildURL} = require('./components/utils.js');

module.exports = {
  launch: (num1, num2) => num1 + num2,
  getGameURL: (config,callback) => buildURL(config,callback),
};