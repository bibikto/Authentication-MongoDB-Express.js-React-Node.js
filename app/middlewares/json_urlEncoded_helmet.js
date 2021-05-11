require('dotenv').config();
const helmet = require('helmet')

module.exports = async(app,express) =>{
    app.use("trust proxy","loopback")

    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );

}