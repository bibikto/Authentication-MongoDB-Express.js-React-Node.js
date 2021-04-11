const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyInput = require("./verifyInput")
const verifyEmail = require('./verifyEmail')

module.exports = {
  authJwt,
  verifySignUp,
  verifyInput,
  verifyEmail
};