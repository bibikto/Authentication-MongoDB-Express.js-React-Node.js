require('dotenv').config();

module.exports ={
    BASE_PATH : process.env.NODE_ENV === "production" ? "" : "http://localhost:8080"
}