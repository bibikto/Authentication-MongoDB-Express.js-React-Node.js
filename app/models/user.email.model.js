const mongoose = require("mongoose");

const UserEmail = mongoose.model(
  "User_Email_Verification",
  new mongoose.Schema({
    email: String,
    emailVerifyString : String
  })
);

module.exports = UserEmail;