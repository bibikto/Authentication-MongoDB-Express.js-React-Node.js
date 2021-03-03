"use strict";
const express = require("express");
const config = require('./config/config')
const fs = require("fs");

const https = require("https");
const http = require("http");

const app = express();

const helmet = require('helmet')
app.use(helmet())

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Redirect http to https
app.enable("trust proxy");
app.use(function (req, res, next) {
    if (!req.secure)
        next();
    else
        res.redirect("https://" + req.headers.host + req.url);
});

app.get("/ping", function (req, res) {
    return res.send("pong");
});

app.use("/", express.static("./client/build"));


const httpServer = http.createServer(app);
const httpsServer = https.createServer(
    {
        key: fs.readFileSync("/etc/letsencrypt/live/www.xdxd.tech/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/www.xdxd.tech/fullchain.pem"),
    },
    app
);

httpServer.listen(config.ports[0], () => {
    console.log("HTTP Server running on port " + config.ports[0]);
});

httpsServer.listen(config.ports[1], () => {
    console.log("HTTPS Server running on port " + config.ports[1]);
});