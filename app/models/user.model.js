const mongoose = require("mongoose");

const User = mongoose.model(
  "User_Account",
  new mongoose.Schema({
    email: String,
    password: String,
    emailVerified: Boolean,
    firstName: String,
    lastName: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;