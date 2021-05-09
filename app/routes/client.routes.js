
module.exports = async (app,express) => {
    app.get("/ping", async (req, res) =>{
        return res.send("pong");
    });

    app.use("/", express.static("./client/build"));
    app.use("/profile", express.static("./client/build"));
    app.use("/login", express.static("./client/build"));
    
};