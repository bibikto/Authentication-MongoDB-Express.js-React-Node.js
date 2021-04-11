"use strict";
const express = require("express");
var session = require('express-session')
const config = require('./app/config/server.config')
const MongoStore = require('connect-mongo');
const fs = require("fs");
require('dotenv').config();

const https = require("https");
const http = require("http");

const db = require("./app/models");
const Role = db.role;


db.mongoose
    .connect(process.env.DB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

const app = express();

const cors = require("cors");   
var corsOptions = {
    origin: config.CORSORIGINDOMAIN
};

app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const helmet = require('helmet')
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);



//Redirect http to https
app.enable("trust proxy",1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    // store: {MemoryStore} 
  }))
app.use(function (req, res, next) {
    if (req.secure)
        next();
    else
        res.redirect("https://" + req.headers.host + req.url);
});

app.get("/ping", function (req, res) {
    return res.send("pong");
});

app.use("/", express.static("./client/build"));
app.use("/profile", express.static("./client/build"));
app.use("/login", express.static("./client/build"));


const httpServer = http.createServer(app);


httpServer.listen(config.PORTS[0], () => {
    console.log("HTTP Server running on port " + config.PORTS[0]);
});

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