module.exports = async (app) => {
    app.delete("/api/session/destroy", async (req, res) =>{
        console.log("Sesson Destorying..")
        req.session.destroy()
    });
};