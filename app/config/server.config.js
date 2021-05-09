require('dotenv').config();


let PORTS = []
if (process.env.NODE_ENV == "production") {
    PORTS = [80,443]
}
else {
    PORTS = [8080]
}
module.exports = {
    PORTS : PORTS,
    KEYFILE : '/etc/letsencrypt/live/www.xdxd.tech/privkey.pem',
    CERTFILE: '/etc/letsencrypt/live/www.xdxd.tech/fullchain.pem',
    CORSORIGINDOMAIN: 'https://www.xdxd.tech',
    DB_REGION: 'ap-south-1',
    DB_NAME : 'user_account'
}