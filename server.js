"use strict";
const express = require("express");
const config = require('./app/config/server.config')
const fs = require("fs");
require('dotenv').config();


const http = require("http");
http.globalAgent.keepAlive = true;

const db = require("./app/models");
const Role = db.role;

const app = express();

/*
    MIDDLEWARES
*/

//JSON URLENCODING HELMET
require('./app/middlewares/json_urlEncoded_helmet')(app, express); 
/*
    MIDDLEWARES
*/


// DATABASE CONNECTION

db.mongoose
    .connect(process.env.DB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((connection) => {
        console.log("Successfully connect to MongoDB.");
        /*
            ROUTES & MIDDLEWARES THAT NEED TO COMMUNICATE WITH DB
        */
        //SESSION AND HTTPS REDIRECT MIDDLEWARE
        require('./app/middlewares/session')(app, connection);

        // ROUTES
        require('./app/routes/auth.routes')(app);
        require('./app/routes/user.routes')(app);
        // ROUTES
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

/*
const https = require("https");
https.globalAgent.keepAlive = true;

const httpServer = http.createServer(app);


httpServer.listen(config.PORTS[0], () => {
    console.log("HTTP Server running on port " + config.PORTS[0]);
});


if (process.env.NODE_ENV == "production") {
    const httpsServer = https.createServer(
        {
            key: fs.readFileSync(config.KEYFILE),
            cert: fs.readFileSync(config.CERTFILE),
        },
        app
    );

    httpsServer.listen(config.PORTS[1], () => {
        console.log("HTTPS Server running on port " + config.PORTS[1]);
    });
}
*/