const session = require('express-session')
require('dotenv').config();
const MongoStore = require("connect-mongo")

module.exports = async (app, connection) => {
    app.enable("trust proxy", 1);

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            sameSite: process.env.NODE_ENV == "production",
            secure: process.env.NODE_ENV == "production",
            maxAge: 24 * 60 * 60 * 1000
        },
        store: new MongoStore({
            client: connection.connection.getClient(),
            clear_interval: 3600
        })
    }))

    if (process.env.NODE_ENV == "production")
        app.use(async (req, res, next) => {
            if (req.secure)
                next();
            else
                res.redirect("https://" + req.headers.host + req.url);
        });

}