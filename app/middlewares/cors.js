require('dotenv').config();
const cors = require("cors");

const config = require('../config/server.config')
var corsOptions = {
    origin: config.CORSORIGINDOMAIN
};

module.exports = async(app) => {
    app.use(cors(process.env.NODE_ENV == "production" ? corsOptions : null));

};
