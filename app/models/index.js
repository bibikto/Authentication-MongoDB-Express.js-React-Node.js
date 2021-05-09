const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.userEmail = require("./user.email.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;