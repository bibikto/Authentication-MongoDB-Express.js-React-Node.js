const session = require("express-session");
require("dotenv").config();
const MongoStore = require("connect-mongo");

module.exports = async (app, connection) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: process.env.NODE_ENV == "production",
        secure: process.env.NODE_ENV == "production",
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: new MongoStore({
        client: connection.connection.getClient(),
        clear_interval: 3600,
      }),
    })
  );

};
